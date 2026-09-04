import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  Dumbbell,
  ExternalLink,
  Menu,
  Music2,
  Quote,
  Share2,
  X,
  Zap,
} from "lucide-react";
import "./index.css";

const YOUTUBE_PLAYLIST = import.meta.env.VITE_YOUTUBE_PLAYLIST;

const YOUTUBE_EMBED = import.meta.env.VITE_YOUTUBE_EMBED;

const quotes = [
  {
    white: "NO EXCUSES.",
    red: "JUST ONE MORE REP.",
  },
  {
    white: "DISCIPLINE BUILDS.",
    red: "MOTIVATION FOLLOWS.",
  },
  {
    white: "TRAIN INSANE.",
    red: "OR REMAIN THE SAME.",
  },
  {
    white: "ONE MORE SET.",
    red: "ONE MORE REP.",
  },
  {
    white: "PAIN IS",
    red: "TEMPORARY.",
  },
  {
    white: "BUILD YOURSELF.",
    red: "EVERY SINGLE DAY.",
  },
  {
    white: "STOP TALKING.",
    red: "START LIFTING.",
  },
  {
    white: "EARN YOUR",
    red: "REST.",
  },
  {
    white: "THE IRON",
    red: "NEVER LIES.",
  },
  {
    white: "GET STRONG.",
    red: "STAY HUNGRY.",
  },
  {
    white: "SHOW UP.",
    red: "DO THE WORK.",
  },
  {
    white: "BUILT BY",
    red: "DISCIPLINE.",
  },
];

const reminderQuotes = [
  "NO EXCUSES. JUST ONE MORE REP.",
  "ONE MORE REP.",
  "ONE MORE SET.",
  "STAY HUNGRY.",
  "EARN YOUR REST.",
  "THE IRON NEVER LIES.",
  "DISCIPLINE OVER MOTIVATION.",
  "SHOW UP. DO THE WORK.",
  "BUILT BY DISCIPLINE.",
];

function App() {
  const [ironModeStarted, setIronModeStarted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [reminderIndex, setReminderIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ironModeStarted) {
      return;
    }

    const interval = setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ironModeStarted]);

  useEffect(() => {
    if (!ironModeStarted) {
      return;
    }

    const interval = setInterval(() => {
      setReminderIndex((current) => (current + 1) % reminderQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [ironModeStarted]);

  const enterIronMode = () => {
    setIronModeStarted(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: "IRON MODE",
      text: "NO EXCUSES. JUST ONE MORE REP.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  const currentQuote = quotes[quoteIndex];

  /*
   * INTRO SCREEN
   *
   * The YouTube iframe is not loaded until the user
   * clicks ENTER IRON MODE.
   *
   * This gives the browser a user interaction before
   * YouTube attempts autoplay.
   */

  if (!ironModeStarted) {
    return (
      <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-black">
        {/* Background glow */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/10 blur-[130px]" />

        {/* Background grid */}

        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div className="absolute left-[10%] top-0 h-full w-px bg-white" />
          <div className="absolute left-[25%] top-0 h-full w-px bg-white" />
          <div className="absolute right-[25%] top-0 h-full w-px bg-white" />
          <div className="absolute right-[10%] top-0 h-full w-px bg-white" />
        </div>

        {/* Content */}

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
          {/* Logo */}

          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.25)] sm:h-20 sm:w-20">
            <Dumbbell size={28} strokeWidth={2.5} />
          </div>

          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/[0.06] px-4 py-2 text-[9px] font-black uppercase tracking-[0.25em] text-red-500 sm:text-[10px]">
            <Zap size={12} fill="currentColor" />
            Hardcore Workout Radio
          </div>

          {/* Brand */}

          <h1 className="font-display text-[clamp(4.5rem,14vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.05em]">
            <span className="block text-white">IRON</span>

            <span className="block text-red-600">MODE</span>
          </h1>

          {/* Tagline */}

          <p className="mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 sm:text-xs">
            NO EXCUSES. JUST ONE MORE REP.
          </p>

          {/* Enter button */}

          <button
            type="button"
            onClick={enterIronMode}
            className="mt-10 inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-xl bg-white px-8 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[0_15px_50px_rgba(255,255,255,0.08)] transition duration-200 hover:bg-red-600 hover:text-white active:scale-95 sm:px-10"
          >
            <Music2 size={17} />
            ENTER IRON MODE
            <ArrowRight size={16} />
          </button>

          <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.25em] text-white/20">
            Press play. Put in the work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* Background */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-red-950/10 blur-[150px]" />

        <div className="absolute -left-64 top-[35%] h-[500px] w-[500px] rounded-full bg-red-950/10 blur-[140px]" />

        <div className="absolute -right-64 top-[60%] h-[500px] w-[500px] rounded-full bg-red-950/10 blur-[140px]" />
      </div>

      {/* =========================
          HEADER
      ========================= */}

      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between px-5 sm:h-[76px] sm:px-8 lg:px-10">
          {/* Logo */}

          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 shadow-[0_0_25px_rgba(220,38,38,0.25)] transition group-hover:bg-red-500 sm:h-10 sm:w-10">
              <Dumbbell size={18} strokeWidth={2.5} />
            </div>

            <div>
              <div className="text-[14px] font-black tracking-[0.18em] sm:text-[16px]">
                IRON MODE
              </div>

              <div className="mt-0.5 hidden text-[8px] font-bold uppercase tracking-[0.28em] text-white/35 sm:block">
                NO EXCUSES. JUST ONE MORE REP.
              </div>
            </div>
          </a>

          {/* Desktop navigation */}

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#playlist"
              className="text-[12px] font-semibold text-white/45 transition hover:text-white"
            >
              Playlist
            </a>

            <a
              href="#motivation"
              className="text-[12px] font-semibold text-white/45 transition hover:text-white"
            >
              Motivation
            </a>

            <a
              href={YOUTUBE_PLAYLIST}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[12px] font-semibold text-white/45 transition hover:text-white"
            >
              YouTube
              <ExternalLink size={13} />
            </a>
          </nav>

          {/* Mobile menu button */}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}

        {menuOpen && (
          <div className="border-t border-white/[0.08] bg-black px-5 py-4 md:hidden">
            <nav className="flex flex-col">
              <a
                href="#playlist"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.04] hover:text-white"
              >
                Playlist
              </a>

              <a
                href="#motivation"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.04] hover:text-white"
              >
                Motivation
              </a>

              <a
                href={YOUTUBE_PLAYLIST}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.04] hover:text-white"
              >
                YouTube
                <ExternalLink size={14} />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* =========================
          HERO
      ========================= */}

      <section id="top" className="hero-section border-b border-white/[0.06]">
        {/* Glow */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/[0.07] blur-[130px] sm:h-[550px] sm:w-[1000px]" />

        {/* Grid */}

        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div className="absolute left-[8%] top-0 h-full w-px bg-white" />

          <div className="absolute left-[20%] top-0 h-full w-px bg-white" />

          <div className="absolute right-[20%] top-0 h-full w-px bg-white" />

          <div className="absolute right-[8%] top-0 h-full w-px bg-white" />
        </div>

        <div className="hero-content relative z-10">
          {/* Badge */}

          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/[0.06] px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-red-500 sm:text-[10px]">
            <Zap size={12} fill="currentColor" />
            Hardcore Workout Radio
          </div>

          {/* Quote */}

          <div key={quoteIndex} className="hero-quote">
            <div className="hero-open-quote">“</div>

            <h1>
              <span className="quote-white">{currentQuote.white}</span>

              <span className="quote-red">{currentQuote.red}</span>
            </h1>

            <div className="hero-close-quote">”</div>
          </div>

          {/* Tagline */}

          <div className="hero-tagline">
            <div className="hero-tagline-line" />

            <span className="hero-tagline-text">
              NO EXCUSES. JUST ONE MORE REP.
            </span>

            <div className="hero-tagline-line" />
          </div>

          {/* Quote dots */}

          <div className="hero-dots">
            {quotes.slice(0, 5).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setQuoteIndex(index)}
                className={`hero-dot ${
                  index === quoteIndex % 5 ? "active" : ""
                }`}
                aria-label={`Show quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          PLAYLIST
      ========================= */}

      <section
        id="playlist"
        className="mx-auto w-full max-w-[1400px] scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[390px_1fr] xl:grid-cols-[420px_1fr] xl:gap-12">
          {/* Artwork */}

          <div className="w-full">
            <div className="group relative mx-auto max-w-[420px]">
              <div className="absolute -inset-5 rounded-[40px] bg-red-700/[0.08] blur-3xl transition group-hover:bg-red-700/[0.15]" />

              <div className="relative aspect-square overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-red-950">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />

                <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full border-[35px] border-red-700/10" />

                <div className="absolute -bottom-5 -right-5 h-56 w-56 rounded-full border-[22px] border-red-700/10" />

                <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.35em] text-white/35">
                        IRON MODE
                      </div>

                      <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
                        EST. 2026
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                      <Dumbbell size={19} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[clamp(4rem,10vw,6.5rem)] font-black uppercase leading-[0.72] tracking-[-0.08em]">
                      IRON
                    </div>

                    <div className="text-[clamp(4rem,10vw,6.5rem)] font-black uppercase leading-[0.72] tracking-[-0.08em] text-red-600">
                      MODE
                    </div>

                    <div className="mt-7 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
                      LIFT HEAVY • STAY HUNGRY
                    </div>
                  </div>

                  <div className="flex h-8 items-end gap-[3px]">
                    {Array.from({ length: 36 }).map((_, index) => (
                      <span
                        key={index}
                        className="w-[3px] rounded-full bg-red-600"
                        style={{
                          height: `${10 + ((index * 17) % 25)}px`,
                          animation: `equalizer ${
                            0.6 + (index % 5) * 0.15
                          }s ease-in-out infinite`,
                          animationDelay: `${index * 50}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-5 flex max-w-[420px] items-end justify-between">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600">
                  Featured
                </div>

                <h2 className="mt-1 text-lg font-black uppercase tracking-tight">
                  IRON MODE PLAYLIST
                </h2>
              </div>

              <Music2 size={20} className="text-red-600" />
            </div>
          </div>

          {/* YouTube */}

          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600">
                  YouTube Playlist
                </div>

                <h2 className="mt-1 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  FEED THE BEAST
                </h2>
              </div>

              <a
                href={YOUTUBE_PLAYLIST}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-white/35 transition hover:text-white sm:flex"
              >
                Open YouTube
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* YouTube player */}

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <iframe
                title="IRON MODE YouTube Playlist"
                src={YOUTUBE_EMBED}
                width="100%"
                height="600"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="eager"
                className="block h-[500px] w-full sm:h-[600px]"
              />
            </div>

            {/* Buttons */}

            <div className="mt-4 flex flex-col gap-3 min-[450px]:flex-row">
              <a
                href={YOUTUBE_PLAYLIST}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-[10px] font-black uppercase tracking-wider transition hover:bg-red-500 active:scale-[0.98]"
              >
                <Music2 size={15} />
                Open in YouTube
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-[10px] font-black uppercase tracking-wider text-white/80 transition hover:bg-white/[0.07] active:scale-[0.98]"
              >
                <Share2 size={15} />

                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          DAILY REMINDER
      ========================= */}

      <section
        id="motivation"
        className="border-y border-white/[0.07] bg-[#030303]"
      >
        <div className="mx-auto flex min-h-[220px] w-full max-w-[1400px] items-center justify-center px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex w-full max-w-5xl flex-col items-center justify-center text-center sm:flex-row sm:gap-8 sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-600/30 bg-red-600/[0.05] text-red-600">
              <Quote size={28} />
            </div>

            <div className="mt-6 min-w-0 sm:mt-0">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600">
                Daily Reminder
              </div>

              <div
                key={reminderIndex}
                className="quote-animation mt-3 text-[clamp(1.8rem,5vw,4.2rem)] font-black uppercase leading-[0.95] tracking-[-0.04em]"
              >
                "{reminderQuotes[reminderIndex]}"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          RULES
      ========================= */}

      <section className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="relative overflow-hidden rounded-[24px] border border-red-900/30 bg-gradient-to-br from-red-950/30 via-black to-[#080808] px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-800/[0.08] blur-[100px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="mb-4 text-[9px] font-black uppercase tracking-[0.3em] text-red-600">
                The Rules
              </div>

              <h2 className="text-[clamp(3.3rem,8vw,7rem)] font-black uppercase leading-[0.8] tracking-[-0.06em]">
                SHOW UP.
                <br />
                <span className="text-red-600">LIFT.</span>
                <br />
                REPEAT.
              </h2>
            </div>

            <div>
              <p className="max-w-md text-sm leading-7 text-white/40 sm:text-base">
                Put your headphones on, turn the volume up and get to work. The
                playlist handles the music. You handle the reps.
              </p>

              <a
                href={YOUTUBE_PLAYLIST}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-white px-6 py-3 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-white/90 active:scale-[0.98]"
              >
                <Music2 size={15} />
                Start Training
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex min-h-[90px] w-full max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-7 text-center sm:flex-row sm:px-8 sm:text-left lg:px-10">
          <div className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25">
            IRON MODE © 2026
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[9px] font-black uppercase tracking-[0.2em] text-white/25 sm:justify-end">
            <a
              href={YOUTUBE_PLAYLIST}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              YouTube
            </a>

            <span>NO EXCUSES. JUST ONE MORE REP.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
