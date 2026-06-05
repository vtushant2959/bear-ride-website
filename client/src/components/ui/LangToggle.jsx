import { useLang } from "../../context/LangContext";

export default function LangToggle({ className = "" }) {
  const { lang, switchLang } = useLang();
  return (
    <button
      onClick={() => switchLang(lang === "en" ? "hi" : "en")}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-yellow-500/20 text-sm font-bold text-yellow-400 hover:bg-yellow-400/10 transition-all ${className}`}
      title="Toggle Language"
    >
      {lang === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
    </button>
  );
}
