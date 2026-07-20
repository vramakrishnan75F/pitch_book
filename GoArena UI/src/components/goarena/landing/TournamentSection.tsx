import type { TournamentCard } from "../types";

// ─── TournamentSection ────────────────────────────────────────────────────────
// Tournament cards section on landing page.

export type TournamentSectionProps = {
  tournaments: TournamentCard[];
  onRegister: (tournamentId: string) => void;
  onViewAll?: () => void;
  className?: string;
};

export function TournamentSection({
  tournaments,
  onRegister,
  onViewAll,
  className = "",
}: TournamentSectionProps) {
  return (
    <section className={`py-16 max-w-7xl mx-auto px-5 ${className}`}>
      <div className="flex items-center justify-between mb-9">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC857" stroke="#FFC857" strokeWidth="1.5">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
            <span className="text-[11px] font-black text-[#FFC857] uppercase tracking-widest">Tournaments</span>
          </div>
          <h2 className="text-3xl font-black text-foreground">Compete & Win</h2>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="hidden md:flex text-sm font-bold text-primary items-center gap-1 hover:gap-2 transition-all duration-200"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tournaments.map((t) => (
          <div key={t.id} className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer bg-muted">
            <img
              src={t.imageUrl}
              alt={t.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15202B] via-[#15202B]/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="bg-[#FFC857] text-[#15202B] text-[10px] font-black px-3 py-1.5 rounded-full">
                {t.registrationTag}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="text-[11px] font-bold text-[#32C766] mb-1 uppercase tracking-wide">{t.sport}</div>
              <h3 className="text-xl font-black text-white mb-2">{t.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-white/65 text-xs font-semibold mb-3">
                <span>{t.dateRange}</span>
                <span>{t.teamsLabel}</span>
                <span>{t.prizeLabel}</span>
              </div>
              <button
                onClick={() => onRegister(t.id)}
                className="bg-white text-foreground text-xs font-black px-4 py-2 rounded-lg hover:bg-[#32C766] hover:text-white transition-all duration-200"
              >
                Register Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
