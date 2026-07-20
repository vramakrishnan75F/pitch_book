// ─── PaymentFailedScreen ──────────────────────────────────────────────────────
// Shown when payment is declined or an error occurs.

export type PaymentFailedScreenProps = {
  errorMessage?: string;
  totalLabel: string;
  onRetry: () => void;
  onCancel: () => void;
};

export function PaymentFailedScreen({
  errorMessage,
  totalLabel,
  onRetry,
  onCancel,
}: PaymentFailedScreenProps) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-destructive/10 border-4 border-destructive/20 flex items-center justify-center text-destructive mb-5">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </div>
      <h2 className="text-2xl font-black text-foreground mb-2">Payment Failed</h2>
      <p className="text-muted-foreground text-sm mb-1 max-w-xs">
        {errorMessage ?? "Your payment could not be processed. No amount has been charged."}
      </p>
      <p className="text-xs text-muted-foreground mb-8">Amount: {totalLabel}</p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={onRetry}
          className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-all"
        >
          Try Again
        </button>
        <button
          onClick={onCancel}
          className="flex-1 border border-border text-foreground font-bold py-3 rounded-xl hover:border-foreground/30 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── PaymentCancelledScreen ───────────────────────────────────────────────────
// Shown when the user closes the payment gateway without paying.

export type PaymentCancelledScreenProps = {
  onGoBack: () => void;
  onBrowseVenues: () => void;
};

export function PaymentCancelledScreen({ onGoBack, onBrowseVenues }: PaymentCancelledScreenProps) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <div className="text-6xl mb-5">🚫</div>
      <h2 className="text-2xl font-black text-foreground mb-2">Payment Cancelled</h2>
      <p className="text-muted-foreground text-sm mb-8 max-w-xs">
        You cancelled the payment. Your slot has not been reserved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={onGoBack}
          className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-all"
        >
          Go Back
        </button>
        <button
          onClick={onBrowseVenues}
          className="flex-1 border border-border text-foreground font-bold py-3 rounded-xl hover:border-foreground/30 transition-all"
        >
          Browse Venues
        </button>
      </div>
    </div>
  );
}
