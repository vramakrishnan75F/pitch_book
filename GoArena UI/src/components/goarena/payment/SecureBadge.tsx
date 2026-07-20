// ─── SecureBadge ──────────────────────────────────────────────────────────────
// Trust header shown at the top of the payment screen. Fully static.

export function SecureBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-between bg-[#F0FAF4] border border-primary/15 rounded-2xl px-5 py-3 ${className}`}>
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span className="text-sm font-bold text-foreground">Secure Payment</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          SSL Encrypted
        </span>
        <span>·</span>
        <span>Powered by Razorpay</span>
      </div>
    </div>
  );
}
