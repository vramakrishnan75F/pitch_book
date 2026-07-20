import type { SettingsItem } from "../types";

// ─── SettingsList ─────────────────────────────────────────────────────────────
// Grouped settings list with chevron icons.
// onSettingClick — parent handles navigation or action.

export type SettingsListProps = {
  items: SettingsItem[];
  onSettingClick: (id: string) => void;
  className?: string;
};

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

export function SettingsList({ items, onSettingClick, className = "" }: SettingsListProps) {
  return (
    <div className={`bg-card border border-border rounded-2xl overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onSettingClick(item.id)}
          className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/50 transition-colors duration-150 ${
            index < items.length - 1 ? "border-b border-border" : ""
          } ${item.destructive ? "text-destructive" : "text-foreground"}`}
        >
          {/* Icon slot — parent passes React.ReactNode via SettingsItem.icon */}
          {item.icon && (
            <span className={`shrink-0 ${item.destructive ? "text-destructive" : "text-muted-foreground"}`}>
              {item.icon}
            </span>
          )}

          {/* Label + optional description */}
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-bold leading-tight ${item.destructive ? "text-destructive" : "text-foreground"}`}>
              {item.label}
            </div>
            {item.description && (
              <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
            )}
          </div>

          {/* Optional badge */}
          {item.badge && (
            <span className="bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded-full mr-1">
              {item.badge}
            </span>
          )}

          {/* Chevron (hidden for destructive / logout items with no further page) */}
          {!item.hideChevron && (
            <span className="text-muted-foreground shrink-0">
              <ChevronRight />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
