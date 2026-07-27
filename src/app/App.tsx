import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/logo.png";
import {
  CheckCircle, Star, Zap, Shield, Clock, ChevronDown,
  MessageCircle, Sparkles, Users, MapPin, ArrowRight, X,
} from "lucide-react";

const WHATSAPP_NUMBER = "5519998392091";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20de%20depila%C3%A7%C3%A3o%20a%20laser.`;

const FONT_HEADING = "'Montserrat', sans-serif";
const FONT_BODY = "'Open Sans', sans-serif";

// ─── Navbar ───────────────────────────────────────────────────────────────────
function NavBar({ onOpenForm }: { onOpenForm: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo placeholder */}
        <a href="#" className="flex-none">
          <ImageWithFallback src={logoImg} alt="Espaçolaser Depilação" className="h-9 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Quem Somos", href: "#quem-somos" },
            { label: "Benefícios", href: "#beneficios" },
            { label: "Como Funciona", href: "#como-funciona" },
            { label: "Depoimentos", href: "#depoimentos" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              style={{ fontFamily: FONT_HEADING }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenForm}
            className="hidden sm:flex items-center gap-2 border-2 border-primary text-primary text-sm font-bold px-4 py-2 rounded-full hover:bg-secondary transition-colors"
            style={{ fontFamily: FONT_HEADING }}
          >
            Cadastre-se
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)", fontFamily: FONT_HEADING }}
          >
            <MessageCircle size={15} />
            Agende Agora
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Background gradient blob */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 90% at 80% 50%, #EEF3FF 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-5 bg-secondary px-3 py-1.5 rounded-full"
            style={{ fontFamily: FONT_HEADING }}
          >
            <Sparkles size={12} /> A maior rede de depilação a laser do mundo
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6"
            style={{ fontFamily: FONT_HEADING }}
          >
            Pele Lisa<br />
            <span style={{ color: "#0050F5" }}>Pra Sempre.</span>
          </h1>
          <p
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
            style={{ fontFamily: FONT_BODY }}
          >
            Com tecnologia de ponta e mais de 800 unidades no Brasil e América Latina,
            a Espaçolaser oferece depilação a laser segura, eficaz e definitiva —
            para todos os fototipos de pele.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white font-bold text-base px-8 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-blue-200"
              style={{ background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)", fontFamily: FONT_HEADING }}
            >
              <MessageCircle size={18} />
              Entre em Contato
            </a>
            <button
              onClick={onOpenForm}
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold text-base px-8 py-4 rounded-full hover:bg-secondary transition-colors"
              style={{ fontFamily: FONT_HEADING }}
            >
              Quero ser avisado(a)
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-border">
            {[
              { icon: Users, n: "+800 unidades", label: "no Brasil e América Latina" },
              { icon: Star, n: "4,9 ★", label: "avaliação média" },
              { icon: MapPin, n: "Mais de 20 anos", label: "de experiência" },
            ].map(({ icon: Icon, n, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} className="text-primary flex-none" />
                <div>
                  <span className="text-sm font-bold text-foreground" style={{ fontFamily: FONT_HEADING }}>{n}</span>
                  <span className="text-xs text-muted-foreground ml-1">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-secondary shadow-2xl shadow-blue-100">
            <img
              src="https://images.unsplash.com/photo-1728727217834-b190862837a3?w=800&h=1000&fit=crop&auto=format"
              alt="Mulher com pele lisa e radiante após depilação a laser"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(107,31,168,0.3) 0%, transparent 50%)" }}
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-4 shadow-xl border border-border">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #003FC3, #0050F5)" }}
              >
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground" style={{ fontFamily: FONT_HEADING }}>
                  Resultado garantido
                </p>
                <p className="text-xs text-muted-foreground">Tecnologia certificada</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Quem Somos ───────────────────────────────────────────────────────────────
function QuemSomos() {
  return (
    <section id="quem-somos" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[4/3] bg-muted shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1713085085470-fba013d67e65?w=800&h=600&fit=crop&auto=format"
            alt="Especialista realizando depilação a laser"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(107,31,168,0.15) 0%, transparent 60%)" }}
          />
        </div>
        <div>
          <span
            className="text-xs font-bold tracking-widest uppercase text-primary"
            style={{ fontFamily: FONT_HEADING }}
          >
            Quem somos
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-foreground mt-3 mb-6 leading-tight"
            style={{ fontFamily: FONT_HEADING }}
          >
            A maior rede de depilação a laser do mundo
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: FONT_BODY }}>
            Com mais de 800 unidades no Brasil, Colômbia e Chile, a Espaçolaser é referência
            em depilação a laser há mais de 20 anos. Combinamos tecnologia de última geração
            com atendimento humanizado para entregar resultados reais e duradouros.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: FONT_BODY }}>
            Nossos equipamentos são certificados pela ANVISA e operados por especialistas treinados.
            Aqui, cada sessão é personalizada para o seu fototipo de pele — com segurança e conforto.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)", fontFamily: FONT_HEADING }}
          >
            <MessageCircle size={16} />
            Fale com uma especialista
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Benefícios ───────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: Zap,
    title: "Resultado definitivo",
    desc: "Após o protocolo completo, a redução dos pelos é permanente. Chega de gilete, cera e reposição constante.",
  },
  {
    icon: Shield,
    title: "Seguro para todos os fototipos",
    desc: "Equipamentos certificados pela ANVISA, indicados para peles claras, morenas e negras. Avaliação individualizada.",
  },
  {
    icon: Clock,
    title: "Sessões rápidas",
    desc: "Pernas completas em menos de 40 minutos. Encaixe na sua rotina sem complicação.",
  },
  {
    icon: CheckCircle,
    title: "Fim dos pelos encravados",
    desc: "Adeus irritações, manchas e encravados. Sua pele fica uniforme e macia desde as primeiras sessões.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia de ponta",
    desc: "Laser Diodo 808nm — o padrão ouro mundial para depilação. Máxima eficácia com mínimo desconforto.",
  },
  {
    icon: Users,
    title: "Atendimento especializado",
    desc: "Mais de 800 unidades com profissionais treinados e atualizados. Você está em boas mãos.",
  },
];

function Benefits() {
  return (
    <section id="beneficios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase text-primary"
            style={{ fontFamily: FONT_HEADING }}
          >
            Por que escolher laser
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-foreground mt-3"
            style={{ fontFamily: FONT_HEADING }}
          >
            Muito mais do que depilação —<br className="hidden md:block" /> é liberdade no dia a dia
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group bg-white border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{ background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)" }}
              >
                <Icon size={22} className="text-white" />
              </div>
              <h3
                className="font-bold text-foreground text-base mb-2"
                style={{ fontFamily: FONT_HEADING }}
              >
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Como Funciona ─────────────────────────────────────────────────────────────
const steps = [
  {
    n: "01",
    title: "Avaliação gratuita",
    desc: "Nossa especialista analisa seu fototipo de pele e indica o protocolo ideal para o seu caso, sem compromisso.",
  },
  {
    n: "02",
    title: "Sessões personalizadas",
    desc: "Realizamos as sessões no intervalo correto para o seu tipo de pelo. Em média, 6 a 10 sessões para resultado completo.",
  },
  {
    n: "03",
    title: "Manutenção simples",
    desc: "Após o protocolo, manutenções esporádicas garantem a pele sempre lisa. Liberdade total do dia a dia.",
  },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase text-primary"
            style={{ fontFamily: FONT_HEADING }}
          >
            Processo
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-foreground mt-3"
            style={{ fontFamily: FONT_HEADING }}
          >
            Como funciona
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
              className="relative bg-white rounded-3xl p-8 border border-border shadow-sm"
            >
              <span
                className="text-6xl font-black leading-none mb-4 block"
                style={{ color: "#EDE0FF", fontFamily: FONT_HEADING }}
              >
                {n}
              </span>
              <h3
                className="font-bold text-foreground text-lg mb-2"
                style={{ fontFamily: FONT_HEADING }}
              >
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
                {desc}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={24} className="text-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-blue-200"
            style={{ background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)", fontFamily: FONT_HEADING }}
          >
            <MessageCircle size={18} />
            Agendar minha avaliação gratuita
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Depoimentos ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Camila Rodrigues",
    region: "Campinas, SP",
    text: "Fiz 8 sessões e o resultado superou tudo que eu esperava. Minha pele ficou completamente lisa. Melhor investimento que já fiz na minha vida!",
    stars: 5,
    img: "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?w=60&h=60&fit=crop&auto=format",
  },
  {
    name: "Fernanda Lima",
    region: "Ribeirão Preto, SP",
    text: "Tinha muito medo da dor e fui totalmente surpreendida. Quase não senti nada! O atendimento é super acolhedor. Já indiquei para todas as amigas.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1539172146135-23cf5c773474?w=60&h=60&fit=crop&auto=format",
  },
  {
    name: "Juliana Matos",
    region: "São Paulo, SP",
    text: "O agendamento pelo WhatsApp é muito prático. Os resultados apareceram rápido — já na 3ª sessão vi uma diferença enorme. Estou amando!",
    stars: 5,
    img: "https://images.unsplash.com/photo-1733685372930-ee012533a876?w=60&h=60&fit=crop&auto=format",
  },
];

function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase text-primary"
            style={{ fontFamily: FONT_HEADING }}
          >
            Depoimentos
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-foreground mt-3"
            style={{ fontFamily: FONT_HEADING }}
          >
            Quem já transformou a pele conta
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
              className="bg-secondary border border-border rounded-2xl p-7 flex flex-col gap-5"
            >
              <div className="flex gap-1">
                {[...Array(stars)].map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed flex-1" style={{ fontFamily: FONT_BODY }}>
                "{text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover bg-muted flex-none" />
                <div>
                  <div className="text-sm font-bold text-foreground" style={{ fontFamily: FONT_HEADING }}>{name}</div>
                  <div className="text-xs text-muted-foreground">{region}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Quantas sessões são necessárias?",
    a: "Em média, de 6 a 10 sessões para redução definitiva. O número exato depende do fototipo de pele, da cor e espessura dos pelos e da área tratada. Nossa especialista indica o protocolo ideal na avaliação gratuita.",
  },
  {
    q: "O procedimento dói?",
    a: "A tecnologia atual é muito mais confortável do que as gerações anteriores. A maioria das clientes descreve como um leve estalo rápido. Nossos equipamentos possuem sistema de resfriamento integrado para maior conforto.",
  },
  {
    q: "É seguro para todos os tipos de pele?",
    a: "Sim! Nossa tecnologia é indicada para todos os fototipos (do tipo I ao VI), inclusive peles negras. Realizamos avaliação prévia para definir os parâmetros ideais para o seu caso.",
  },
  {
    q: "Quando começam a aparecer os resultados?",
    a: "Os pelos tratados caem naturalmente entre 1 e 3 semanas após cada sessão. A partir da 2ª ou 3ª sessão já é possível notar redução significativa. Após o protocolo completo, a maioria das clientes fica livre dos pelos permanentemente.",
  },
  {
    q: "Preciso fazer alguma preparação antes das sessões?",
    a: "Sim. Recomendamos raspar (não arrancar) os pelos 24h antes de cada sessão, evitar exposição solar por 7 dias antes e depois, e não usar cremes ou desodorante no dia do procedimento. Nossa equipe orientará você em detalhes.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span
            className="text-xs font-bold tracking-widest uppercase text-primary"
            style={{ fontFamily: FONT_HEADING }}
          >
            Tire suas dúvidas
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-foreground mt-3"
            style={{ fontFamily: FONT_HEADING }}
          >
            Perguntas frequentes
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={q} className="bg-white border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary/50 transition-colors"
              >
                <span
                  className="font-bold text-foreground text-sm pr-4"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  {q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-none text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: FONT_BODY }}>
                    {a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lead Form Modal ───────────────────────────────────────────────────────────
function LeadFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
    }, 400);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(26, 10, 46, 0.7)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div
          className="px-8 pt-8 pb-6 relative"
          style={{ background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)" }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <Sparkles size={28} className="text-white/80 mb-3" />
          <h3
            className="text-2xl font-black text-white leading-tight"
            style={{ fontFamily: FONT_HEADING }}
          >
            Receba nosso contato!
          </h3>
          <p className="text-white/80 text-sm mt-2" style={{ fontFamily: FONT_BODY }}>
            Preencha seus dados e uma especialista entrará em contato via WhatsApp para agendar sua avaliação gratuita.
          </p>
        </div>

        <div className="px-8 py-7">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  Seu nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria da Silva"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                  style={{ fontFamily: FONT_BODY }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  Seu WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(19) 99999-0000"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                  style={{ fontFamily: FONT_BODY }}
                />
                <p className="text-xs text-muted-foreground mt-1.5" style={{ fontFamily: FONT_BODY }}>
                  Entraremos em contato em até 24h úteis.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-4 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)",
                  fontFamily: FONT_HEADING,
                }}
              >
                {loading ? "Enviando..." : "Quero ser contatado(a) →"}
              </button>
              <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: FONT_BODY }}>
                Seus dados são confidenciais. Nada de spam.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #003FC3, #0050F5)" }}
              >
                <CheckCircle size={32} className="text-white" />
              </div>
              <h4
                className="text-xl font-black text-foreground mb-2"
                style={{ fontFamily: FONT_HEADING }}
              >
                Cadastro realizado!
              </h4>
              <p className="text-sm text-muted-foreground mb-6" style={{ fontFamily: FONT_BODY }}>
                Ótimo, <strong>{name.split(" ")[0]}</strong>! Um(a) especialista entrará em contato pelo{" "}
                <strong>{phone}</strong> em breve para agendar sua avaliação gratuita.
              </p>
              <button
                onClick={handleClose}
                className="text-sm font-bold text-primary underline hover:no-underline"
                style={{ fontFamily: FONT_HEADING }}
              >
                Fechar
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Lead Form Section ────────────────────────────────────────────────────────
function LeadFormSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        {/* Text side */}
        <div>
          <span
            className="text-xs font-bold tracking-widest uppercase text-primary"
            style={{ fontFamily: FONT_HEADING }}
          >
            Quero ser contactada
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-foreground mt-3 mb-5 leading-tight"
            style={{ fontFamily: FONT_HEADING }}
          >
            Deixe seus dados e<br />
            <span style={{ color: "#0050F5" }}>nós te ligamos.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: FONT_BODY }}>
            Preencha o formulário ao lado com seu nome e número de WhatsApp.
            Uma de nossas especialistas entrará em contato para tirar dúvidas
            e agendar sua avaliação — sem compromisso, sem custo.
          </p>
          <ul className="space-y-3">
            {[
              "Avaliação gratuita e sem compromisso",
              "Atendimento personalizado",
              "Agendamento rápido e fácil",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-primary flex-none" />
                <span className="text-sm text-muted-foreground" style={{ fontFamily: FONT_BODY }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form side */}
        <div className="bg-secondary border border-border rounded-3xl p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3
                className="text-xl font-black text-foreground"
                style={{ fontFamily: FONT_HEADING }}
              >
                Preencha seus dados
              </h3>
              <div>
                <label
                  className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria da Silva"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                  style={{ fontFamily: FONT_BODY }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(19) 99999-0000"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                  style={{ fontFamily: FONT_BODY }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-black py-4 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 text-sm"
                style={{
                  background: "linear-gradient(135deg, #003FC3 0%, #0050F5 100%)",
                  fontFamily: FONT_HEADING,
                }}
              >
                {loading ? "Enviando..." : "Quero ser contatado(a) →"}
              </button>
              <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: FONT_BODY }}>
                Entraremos em contato em até 24h úteis. Seus dados são confidenciais.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #003FC3, #0050F5)" }}
              >
                <CheckCircle size={32} className="text-white" />
              </div>
              <h4
                className="text-xl font-black text-foreground mb-2"
                style={{ fontFamily: FONT_HEADING }}
              >
                Recebemos seu contato!
              </h4>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: FONT_BODY }}>
                Obrigada, <strong>{name.split(" ")[0]}</strong>! Em breve uma especialista
                entrará em contato pelo <strong>{phone}</strong>.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1700760933574-9f0f4ea9aa3b?w=1400&h=700&fit=crop&auto=format&crop=top"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(0,63,195,0.92) 0%, rgba(0,20,80,0.95) 100%)" }}
        />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase text-blue-300 mb-5"
          style={{ fontFamily: FONT_HEADING }}
        >
          Comece hoje
        </span>
        <h2
          className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: FONT_HEADING }}
        >
          Você merece uma pele<br />
          <span style={{ color: "#7AAAFF" }}>lisa e confiante.</span>
        </h2>
        <p
          className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: FONT_BODY }}
        >
          Fale agora com uma de nossas especialistas pelo WhatsApp.
          Tire suas dúvidas e agende sua avaliação gratuita — sem compromisso.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-primary font-black text-base px-12 py-5 rounded-full hover:bg-secondary active:scale-95 transition-all shadow-2xl"
          style={{ fontFamily: FONT_HEADING }}
        >
          <MessageCircle size={20} />
          Entre em Contato pelo WhatsApp
        </a>
        <p className="text-sm text-white/40 mt-5" style={{ fontFamily: FONT_BODY }}>
          Atendimento rápido · Avaliação gratuita · Sem compromisso
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-10 border-t border-border"
      style={{ background: "#001433" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <ImageWithFallback src={logoImg} alt="Espaçolaser Depilação" className="h-8 w-auto object-contain brightness-0 invert" />
        <p className="text-xs text-white/40 text-center" style={{ fontFamily: FONT_BODY }}>
          © {new Date().getFullYear()} Espaçolaser. Todos os direitos reservados.<br className="sm:hidden" />{" "}
          A maior rede de depilação a laser do mundo.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-blue-300 hover:text-white transition-colors"
          style={{ fontFamily: FONT_HEADING }}
        >
          <MessageCircle size={14} />
          (19) 99839-2091
        </a>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: FONT_BODY }}>
      <NavBar onOpenForm={() => setFormOpen(true)} />
      <Hero onOpenForm={() => setFormOpen(true)} />
      <QuemSomos />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <LeadFormSection />
      <FinalCTA />
      <Footer />
      <LeadFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
