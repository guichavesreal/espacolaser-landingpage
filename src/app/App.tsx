import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/logo.png";
import WppRedirect from "@/app/WppRedirect";
import {
  CheckCircle, Star, ChevronDown, MessageCircle, Sparkles, Users, Navigation,
} from "lucide-react";

const WPP_URL = `https://wa.me/5519998392091?text=${encodeURIComponent("Olá! Vi o anúncio da Espaçolaser Americana e quero mais informações sobre as 3 sessões grátis.")}`;const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzHrH8s2VG1ZQdRylo_maYrxCKLykIqyLTIkhbd2sYz9NGxIRH1QpBnZwfj_LPHGH-sNw/exec";const FONT_HEADING = "'Montserrat', sans-serif";
const FONT_BODY = "'Open Sans', sans-serif";

// ─── Paleta ────────────────────────────────────────────────────────────────────
const BLUE = "#003FC3";
const TEAL = "#0a5470";
const TEAL_DARK = "#063347";

// ─── NavBar ────────────────────────────────────────────────────────────────────
function NavBar({ onScrollToForm }: { onScrollToForm: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      {/* Top bar */}
      <div style={{ background: BLUE }}>
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-6">
            {["Quem somos", "Tire suas dúvidas", "Indique e Ganhe"].map((item) => (
              <span key={item} className="text-white/80 text-xs font-semibold hover:text-white cursor-default transition-colors" style={{ fontFamily: FONT_HEADING }}>{item}</span>
            ))}
          </nav>
          <a href={WPP_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white text-xs font-bold hover:text-white/80 transition-colors ml-auto"
            style={{ fontFamily: FONT_HEADING }}>
            <MessageCircle size={13} />
            (19) 99839-2091
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <ImageWithFallback src={logoImg} alt="Espaçolaser Depilação" className="h-10 w-auto object-contain" />
          <button
            onClick={onScrollToForm}
            className="text-white text-sm font-black px-6 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
            style={{ background: BLUE, fontFamily: FONT_HEADING }}>
            GANHAR 3 SESSÕES GRÁTIS
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero + Form ───────────────────────────────────────────────────────────────
function HeroWithForm({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function formatPhone(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) return;

    setLoading(true);

    const leadData = {
      tipo: "form",
      origem: "FormSite",
      nome: name.trim(),
      whatsapp: phone.replace(/\D/g, ""),
      utm_source: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      fbclid: "",
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
    } catch (error) {
      console.error("Erro ao enviar lead para o Google Sheets:", error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${TEAL_DARK} 0%, ${TEAL} 60%, #0e6a8a 100%)` }}
    >
      {/* Background photo overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?w=1400&h=900&fit=crop&auto=format&crop=top"
          alt=""
          className="w-full h-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${TEAL_DARK}f0 40%, ${TEAL_DARK}80 100%)` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Offer */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: FONT_HEADING }}>
            Oferta exclusiva
          </p>
          <h1 className="text-white font-black leading-none mb-4" style={{ fontFamily: FONT_HEADING, fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            GANHE<br />
            <span style={{ color: "#7dd3f8" }}>3 SESSÕES</span><br />
            DE DEPILAÇÃO<br />
            A LASER
          </h1>
          <p className="text-white/80 text-xl font-bold mb-2" style={{ fontFamily: FONT_HEADING }}>
            Pacote de Axilas — <span className="text-white">100% Grátis</span>
          </p>
          <p className="text-white/60 text-sm mb-8 max-w-sm" style={{ fontFamily: FONT_BODY }}>
            Sem pegadinhas. Você se cadastra, passa pela avaliação gratuita na unidade e já inicia o tratamento no mesmo dia.
          </p>

          <div className="flex flex-wrap gap-5">
            {[
              { icon: Users, text: "+800 unidades no Brasil" },
              { icon: Star, text: "4,9 ★ de avaliação média" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={14} className="text-white/50" />
                <span className="text-white/70 text-xs" style={{ fontFamily: FONT_BODY }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {!submitted ? (
            <>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} style={{ color: BLUE }} />
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: BLUE, fontFamily: FONT_HEADING }}>
                  Oferta por tempo limitado
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1 leading-tight" style={{ fontFamily: FONT_HEADING }}>
                Garanta suas<br />3 sessões grátis
              </h2>
              <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: FONT_BODY }}>
                Preencha abaixo e entraremos em contato para agendar sua avaliação gratuita.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider" style={{ fontFamily: FONT_HEADING }}>
                    Seu nome
                  </label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Maria da Silva" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                    style={{ fontFamily: FONT_BODY }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider" style={{ fontFamily: FONT_HEADING }}>
                    WhatsApp
                  </label>
                  <input
                    type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="(19) 99999-0000" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                    style={{ fontFamily: FONT_BODY }}
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full text-white font-black py-4 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 text-sm tracking-wide"
                  style={{ background: BLUE, fontFamily: FONT_HEADING }}>
                  {loading ? "Enviando..." : "EU QUERO MINHAS SESSÕES GRÁTIS →"}
                </button>
              </form>
              <p className="text-center text-xs text-gray-400 mt-4" style={{ fontFamily: FONT_BODY }}>
                Seus dados são confidenciais.
              </p>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: BLUE }}>
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2" style={{ fontFamily: FONT_HEADING }}>
                Cadastro realizado!
              </h3>
              <p className="text-sm text-gray-500" style={{ fontFamily: FONT_BODY }}>
                Obrigado, <strong>{name.split(" ")[0]}</strong>! Em breve uma especialista vai entrar em contato pelo <strong>{phone}</strong> para agendar sua avaliação gratuita.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Faixa da oferta ───────────────────────────────────────────────────────────
function OfferStrip() {
  return (
    <div className="py-5" style={{ background: BLUE }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 text-white text-center">
        {[
          "✅ Sem custo — 100% grátis",
          "✅ Pacote de axilas completo",
          "✅ Avaliação + início no mesmo dia",
          "✅ Laser certificado pela ANVISA",
        ].map((item) => (
          <span key={item} className="text-sm font-bold" style={{ fontFamily: FONT_HEADING }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Como funciona ─────────────────────────────────────────────────────────────
const steps = [
  {
    n: "01",
    title: "Cadastre-se e garanta sua cortesia",
    desc: "Preencha o formulário acima com seu nome e WhatsApp. Você receberá a confirmação da sua cortesia de 3 sessões do pacote de axilas — sem nenhum custo.",
  },
  {
    n: "02",
    title: "Passe pela avaliação gratuita na unidade",
    desc: "Vá até a Espaçolaser Americana para uma avaliação inicial rápida com nossa especialista. Ela verifica se você está apta(o) e explica tudo sobre o tratamento.",
  },
  {
    n: "03",
    title: "Já inicia o tratamento no mesmo dia",
    desc: "Aprovada a avaliação, você já começa a primeira sessão de laser na hora. A sessão de axilas dura menos de 5 minutos — é só chegar e sair pronta(o)!",
  },
];

function HowItWorks() {
  return (
    <section className="py-20" style={{ background: "#f0f7fb" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: BLUE, fontFamily: FONT_HEADING }}>
            É simples assim
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: FONT_HEADING }}>
            Como funciona a cortesia
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ n, title, desc }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-3xl p-8 border border-blue-50 shadow-sm relative"
            >
              <span className="text-6xl font-black leading-none mb-4 block" style={{ color: "#e0ecff", fontFamily: FONT_HEADING }}>{n}</span>
              <h3 className="font-black text-gray-900 text-base mb-2" style={{ fontFamily: FONT_HEADING }}>{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: FONT_BODY }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefícios ────────────────────────────────────────────────────────────────
const benefits = [
  {
    emoji: "⚡",
    title: "Sessão de axilas em menos de 5 minutos",
    desc: "Encaixe na sua rotina sem perder tempo. Você entra, faz a sessão e sai — rápido assim.",
  },
  {
    emoji: "🛡️",
    title: "Seguro para todos os tipos de pele",
    desc: "Tecnologia certificada pela ANVISA, aprovada para peles claras, morenas e negras. Profissionais treinados cuidam de você.",
  },
  {
    emoji: "✨",
    title: "Resultado desde as primeiras sessões",
    desc: "Já nas primeiras sessões você nota a redução dos pelos. Após o tratamento completo, a pele fica lisa de forma definitiva.",
  },
  {
    emoji: "🚫",
    title: "Fim dos pelos encravados",
    desc: "Adeus irritações, manchas e encravados. A depilação a laser elimina os pelos pela raiz, sem agredir a pele.",
  },
  {
    emoji: "💙",
    title: "Atendimento humanizado",
    desc: "Equipe treinada, ambiente acolhedor e todo o suporte que você precisa antes, durante e depois de cada sessão.",
  },
  {
    emoji: "🏆",
    title: "Melhor laser do mercado",
    desc: "A Espaçolaser usa o Laser Diodo 808nm — padrão ouro mundial, eleito o melhor laser para remoção de pelos.",
  },
];

function Benefits() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: BLUE, fontFamily: FONT_HEADING }}>
            Por que escolher a Espaçolaser
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: FONT_HEADING }}>
            Depilação definitiva com<br className="hidden md:block" /> quem é referência no Brasil
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl p-7 border-2 border-blue-50 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{emoji}</span>
              <h3 className="font-black text-gray-900 text-sm mb-2" style={{ fontFamily: FONT_HEADING }}>{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: FONT_BODY }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Depoimentos ───────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Camila Rodrigues",
    region: "Americana, SP",
    text: "Comecei com as 3 sessões grátis e me apaixonei pelo resultado! Fechei o pacote completo logo na segunda visita. Nunca mais vou depilar de outro jeito.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?w=60&h=60&fit=crop&auto=format",
  },
  {
    name: "Fernanda Lima",
    region: "Santa Bárbara d'Oeste, SP",
    text: "Não acreditei quando disseram que era grátis, mas era mesmo! Fiz a avaliação e já saí com a primeira sessão feita. O atendimento é incrível.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1539172146135-23cf5c773474?w=60&h=60&fit=crop&auto=format",
  },
  {
    name: "Rafael Souza",
    region: "Americana, SP",
    text: "Fiz as sessões de faixa de barba e o resultado foi surpreendente. Super rápido, menos de 5 minutos. Indico pra todo mundo.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1733685372930-ee012533a876?w=60&h=60&fit=crop&auto=format",
  },
];

function Testimonials() {
  return (
    <section className="py-20" style={{ background: "#f0f7fb" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: BLUE, fontFamily: FONT_HEADING }}>Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: FONT_HEADING }}>
            Quem já aproveitou conta
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, region, text, stars, img }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white border border-blue-50 rounded-2xl p-7 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {[...Array(stars)].map((_, j) => (
                  <Star key={j} size={14} style={{ fill: BLUE, color: BLUE }} />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed flex-1" style={{ fontFamily: FONT_BODY }}>"{text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover bg-gray-100 flex-none" />
                <div>
                  <div className="text-sm font-black text-gray-900" style={{ fontFamily: FONT_HEADING }}>{name}</div>
                  <div className="text-xs text-gray-400">{region}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "A cortesia de 3 sessões é realmente grátis?",
    a: "Sim, 100% grátis! Você se cadastra, passa pela avaliação inicial na unidade e já recebe suas 3 sessões do pacote de axilas sem pagar nada. Sem asteriscos escondidos.",
  },
  {
    q: "Já posso iniciar o tratamento no dia da avaliação?",
    a: "Sim! Se você estiver apta(o) após a avaliação inicial, a primeira sessão já é realizada no mesmo dia. Não é preciso agendar para outra data.",
  },
  {
    q: "Quanto tempo dura a sessão de axilas?",
    a: "A sessão de axilas dura menos de 5 minutos. É o procedimento mais rápido do portfólio — perfeito para encaixar em qualquer rotina.",
  },
  {
    q: "O laser é seguro? Vai doer?",
    a: "Nosso laser é certificado pela ANVISA e aprovado para todos os fototipos de pele. O desconforto é mínimo — a maioria das pessoas descreve como um leve e rápido estalo.",
  },
  {
    q: "Quantas sessões são necessárias no total para resultado definitivo?",
    a: "Em média de 6 a 10 sessões para resultado permanente, dependendo do tipo de pelo e fototipo de pele. Após a cortesia, nossa especialista indicará o pacote ideal para você.",
  },
];

function FAQ({ onScrollToForm }: { onScrollToForm: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: BLUE, fontFamily: FONT_HEADING }}>Tire suas dúvidas</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: FONT_HEADING }}>Perguntas frequentes</h2>
        </div>
        <div className="space-y-3 mb-10">
          {faqs.map(({ q, a }, i) => (
            <div key={q} className="border-2 border-blue-50 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-blue-50/50 transition-colors"
              >
                <span className="font-black text-gray-900 text-sm pr-4" style={{ fontFamily: FONT_HEADING }}>{q}</span>
                <ChevronDown size={18} className={`flex-none transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} style={{ color: BLUE }} />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: FONT_BODY }}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onScrollToForm}
            className="text-white font-black px-10 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all text-sm tracking-wide"
            style={{ background: BLUE, fontFamily: FONT_HEADING }}>
            QUERO MINHAS 3 SESSÕES GRÁTIS →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
const units = [
  {
    name: "Unidade Vila Medon",
    address: "R. Fortunato Basseto, 329",
    city: "Americana · SP",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+Fortunato+Basseto+329+Americana+SP",
  },
  {
    name: "Unidade Paulista",
    address: "Av. Paulista, 1449 – Salão 01 Jardim",
    city: "Americana · SP",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Avenida+Paulista+1449+Americana+SP",
  },
  {
    name: "Unidade Tivoli Shopping",
    address: "R. do Ósmio, 699 – Luc 245, Piso Satélite",
    city: "Santa Bárbara d'Oeste · SP",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+do+Osmio+699+Santa+Barbara+d'Oeste+SP",
  },
];

function Footer() {
  return (
    <footer className="border-t border-gray-100">
      {/* Unidades */}
      <div style={{ background: TEAL_DARK }} className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-8 text-center" style={{ fontFamily: FONT_HEADING }}>
            Nossas unidades
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {units.map(({ name, address, city, mapsUrl }) => (
              <a
                key={name}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-5 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white font-black text-sm leading-tight" style={{ fontFamily: FONT_HEADING }}>{name}</p>
                  <Navigation size={15} className="text-white/40 group-hover:text-white/70 flex-none mt-0.5 transition-colors" />
                </div>
                <p className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: FONT_BODY }}>{address}</p>
                <p className="text-white/40 text-xs" style={{ fontFamily: FONT_BODY }}>{city}</p>
                <span className="text-xs font-bold mt-1 group-hover:underline" style={{ color: "#7dd3f8", fontFamily: FONT_HEADING }}>
                  Abrir no Maps →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <ImageWithFallback src={logoImg} alt="Espaçolaser Depilação" className="h-8 w-auto object-contain" />
          <p className="text-xs text-gray-400 text-center" style={{ fontFamily: FONT_BODY }}>
            © {new Date().getFullYear()} Espaçolaser · Todos os direitos reservados.
          </p>
          <a href={WPP_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold hover:underline"
            style={{ color: BLUE, fontFamily: FONT_HEADING }}>
            <MessageCircle size={13} />
            (19) 99839-2091
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ──────────────────────────────────────────────────────────────
function LandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: FONT_BODY }}>
      <NavBar onScrollToForm={scrollToForm} />
      <HeroWithForm formRef={formRef} />
      <OfferStrip />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ onScrollToForm={scrollToForm} />
      <Footer />
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
import { useRef } from "react";

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/wpp-amr") return <WppRedirect origem="espacolaseramericana" label="Clique WhatsApp - Americana" />;
  if (path === "/wpp-tvl") return <WppRedirect origem="espacolasertivoli" label="Clique WhatsApp - Tivoli" />;
  return <LandingPage />;
}
