import { useEffect, useState } from "react";

const GTM_ID = "GTM-TNMM6F66";
const GA_ID = "G-DZW429EFK8";
const META_PIXEL_ID = "1179417823827972";
const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzG6tfdpPOuL45YJub2UKSj3UWqKT4bqeFtWAWBQMWmneCOvxXLl0t9qkjjUEtXYECK0Q/exec";
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

export default function WppRedirect({ origem, label }: Props) {
  const [status, setStatus] = useState("Aguardando rastreamento...");

  useEffect(() => {
    // ── 1. GTM ──────────────────────────────────────────────────────────────
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    const gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(gtmScript);

    // ── 2. gtag ──────────────────────────────────────────────────────────────
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(gtagScript);

    // ── 3. Meta Pixel ────────────────────────────────────────────────────────
    if (!window.fbq) {
      const fbq: Window["fbq"] = Object.assign(
        function (...args: unknown[]) {
          if (fbq.callMethod) fbq.callMethod(...args);
          else fbq.queue.push(args);
        },
        { queue: [] as unknown[], loaded: true, version: "2.0", push: (...args: unknown[]) => fbq.queue.push(args) }
      );
      window._fbq = window.fbq = fbq;

      const pixelScript = document.createElement("script");
      pixelScript.async = true;
      pixelScript.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(pixelScript);
    }
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");

    // ── 4. Captura UTMs e envia para planilha ────────────────────────────────
    const params = new URLSearchParams(window.location.search);
    const utmData = {
      tipo: "whatsapp",
      origem,
      utm_source: params.get("utm_source") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      fbclid: params.get("fbclid") || "",
      timestamp: new Date().toISOString(),
    };

    setStatus("Registrando clique...");

    fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(utmData),
    }).finally(() => {
      // ── 5. Dispara eventos após registro ────────────────────────────────────
      window.fbq("track", "Contact");
      window.gtag("event", "contact", {
        event_category: "WhatsApp",
        event_label: label,
        utm_source: utmData.utm_source,
        utm_campaign: utmData.utm_campaign,
        utm_content: utmData.utm_content,
        utm_term: utmData.utm_term,
      });

      setStatus("Redirecionando para o WhatsApp...");

      const mensagem = utmData.utm_term
        ? `Olá! Vi o anúncio da @${origem} de ${utmData.utm_term} e quero mais informações sobre depilação a laser.`
        : `Olá! Vi o anúncio da Espaçolaser e quero mais informações sobre depilação a laser.`;

      window.location.href = `https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    });
  }, [origem, label]);

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
      <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>{status}</p>
    </div>
  );
}
