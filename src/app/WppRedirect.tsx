import { useEffect, useState } from "react";

const GTM_ID = "GTM-TNMM6F66";
const GA_ID = "G-DZW429EFK8";
const META_PIXEL_ID = "1179417823827972";
const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzbrZF3ROnEOOBa5u0w0xSSfRNC3e4vUiTewMXMn-s565Dqfg93wWD-VLRB_mpkxotD_A/exec";
const WPP_NUMBER = "5519998392091";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
      _fbq?: unknown;
    };
    _fbq?: unknown;
  }
}

interface Props {
  origem: string;
  label: string;
}

// Suppress repeat attempts in the same tab for 30 minutes, not unique people.
const attempts = new Map<string, number>();
let trackersStarted = false;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      script.removeEventListener("load", done);
      script.removeEventListener("error", done);
      resolve();
    };
    const script = document.createElement("script");
    const timeout = window.setTimeout(done, 1200);
    script.async = true;
    script.src = src;
    script.addEventListener("load", done);
    script.addEventListener("error", done);
    document.head.appendChild(script);
  });
}

function startTrackers(): Promise<void> {
  if (trackersStarted) return Promise.resolve();
  trackersStarted = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  void loadScript("https://www.googletagmanager.com/gtm.js?id=" + GTM_ID);
  if (!window.gtag) {
    window.gtag = function () { window.dataLayer.push(arguments); };
  }
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  const googleReady = loadScript("https://www.googletagmanager.com/gtag/js?id=" + GA_ID);
  let metaReady = Promise.resolve();
  if (!window.fbq) {
    const fbq: Window["fbq"] = Object.assign(
      function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      },
      { queue: [] as unknown[], loaded: true, version: "2.0",
        push: (...args: unknown[]) => fbq.queue.push(args) }
    );
    window._fbq = window.fbq = fbq;
    metaReady = loadScript("https://connect.facebook.net/en_US/fbevents.js");
  }
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
  return Promise.all([googleReady, metaReady]).then(() => undefined);
}

export default function WppRedirect({ origem, label }: Props) {
  const [status, setStatus] = useState("Preparando seu atendimento...");
  const unidade = origem === "espacolasertivoli" ? "Tivoli" : "Americana";
  const mensagem = "Olá! Vi o anúncio da Espaçolaser " + unidade +
    " e quero conhecer os pacotes e as condições de depilação a laser.";
  const whatsappUrl = "https://wa.me/" + WPP_NUMBER + "?text=" + encodeURIComponent(mensagem);

  useEffect(() => {
    let cancelled = false;
    let redirected = false;
    let graceTimer: number | undefined;
    const redirect = () => {
      if (cancelled || redirected) return;
      redirected = true;
      setStatus("Abrindo o WhatsApp. Se não abrir, use o botão abaixo.");
      window.location.replace(whatsappUrl);
    };
    // Independent deadline: analytics or Sheets must never block the customer.
    const deadline = window.setTimeout(redirect, 2500);
    // Defer side effects so React StrictMode cleanup can cancel its first run.
    const startTimer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const read = (key: string) => (params.get(key) || "").slice(0, 500);
      const utmData = {
        tipo: "whatsapp", origem,
        utm_source: read("utm_source"), utm_medium: read("utm_medium"),
        utm_campaign: read("utm_campaign"), utm_content: read("utm_content"),
        utm_term: read("utm_term"), fbclid: read("fbclid"),
        timestamp: new Date().toISOString(),
        event_name: "whatsapp_redirect",
        event_id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() :
          Date.now().toString(36) + Math.random().toString(36).slice(2),
      };
      const key = "wpp-redirect-v2:" + JSON.stringify([
        origem, utmData.utm_source, utmData.utm_medium, utmData.utm_campaign,
        utmData.utm_content, utmData.utm_term, utmData.fbclid,
      ]);
      let lastAttempt = attempts.get(key) || 0;
      try { lastAttempt = Math.max(lastAttempt, Number(sessionStorage.getItem(key)) || 0); }
      catch { /* Storage may be disabled; the in-memory guard still works. */ }
      if (Date.now() - lastAttempt < 30 * 60 * 1000) {
        redirect();
        return;
      }
      const now = Date.now();
      attempts.set(key, now);
      try { sessionStorage.setItem(key, String(now)); } catch { /* Best effort. */ }
      // Keep the existing JSON payload contract. A no-cors response cannot
      // confirm a saved row; only the Apps Script/Sheet can verify persistence.
      void fetch(SHEETS_URL, {
        method: "POST", mode: "no-cors", keepalive: true,
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(utmData),
      }).catch(() => { /* Do not retry blindly: the server may have saved it. */ });
      void startTrackers().then(() => {
        if (cancelled || redirected) return;
        // A redirect attempt is not a confirmed Contact, Lead or conversation.
        window.fbq("trackSingleCustom", META_PIXEL_ID, "WhatsAppRedirect", {
          origem, event_label: label,
        }, { eventID: utmData.event_id });
        window.gtag("event", "whatsapp_redirect", {
          send_to: GA_ID, event_category: "WhatsApp", event_label: label,
          utm_source: utmData.utm_source, utm_medium: utmData.utm_medium,
          utm_campaign: utmData.utm_campaign, utm_content: utmData.utm_content,
          utm_term: utmData.utm_term, event_id: utmData.event_id,
          transport_type: "beacon",
        });
        // Give browser transports time to send. This is not a delivery receipt.
        graceTimer = window.setTimeout(redirect, 700);
      }).catch(() => { /* The independent deadline still opens WhatsApp. */ });
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(deadline);
      window.clearTimeout(graceTimer);
    };
  }, [origem, label, whatsappUrl]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        background: "#EEF3FF",
        color: "#003FC3",
        gap: "16px",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ animation: "spin 1s linear infinite" }}>
        <circle cx="20" cy="20" r="17" stroke="#003FC3" strokeWidth="4" strokeOpacity="0.2" />
        <path d="M20 3a17 17 0 0 1 17 17" stroke="#003FC3" strokeWidth="4" strokeLinecap="round" />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </svg>
      <p role="status" aria-live="polite" style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>{status}</p>
      <a href={whatsappUrl} style={{ color: "#003FC3", fontWeight: 700 }}>Abrir WhatsApp</a>
    </div>
  );
}
