import type { ProfileStats } from "../types";

// ─── ProfileHeader ────────────────────────────────────────────────────────────
// Avatar, name, member info, stats grid.
// onEdit — parent enters edit mode.

export type ProfileHeaderProps = {
  name: string;
  memberSince: string;    // "Jan 2024"
  rating: number;
  bookingCount: number;
  avatarUrl?: string;     // if absent, initials are shown
  initials: string;
  stats: ProfileStats[];
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  className?: string;
};

export function ProfileHeader({
  name,
  memberSince,
  rating,
  bookingCount,
  avatarUrl,
  initials,
  stats,
  isEditing,
  onEdit,
  onSave,
  className = "",
}: ProfileHeaderProps) {
  return (
    <div className={`bg-card border border-border rounded-2xl p-6 ${className}`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
                {initials}
              </div>
            )}
            {/* Online dot */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#32C766] rounded-full border-2 border-card" />
          </div>

          {/* Name + meta */}
          <div>
            <h1 className="text-xl font-black text-foreground mb-0.5">{name}</h1>
            <p className="text-sm text-muted-foreground">Member since {memberSince}</p>
            <div className="flex items-center gap-1 mt-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC857" stroke="#FFC857" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-xs font-bold text-foreground">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">· {bookingCount} bookings</span>
            </div>
          </div>
        </div>

        {/* Edit / Save toggle */}
        <button
          onClick={isEditing ? onSave : onEdit}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            isEditing
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "border border-border text-foreground hover:border-primary/40"
          }`}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="text-center bg-muted/50 rounded-xl p-3">
            <div className="flex justify-center text-primary mb-1">{s.icon}</div>
            <div className="text-base font-black text-foreground">{s.value}</div>
            <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
