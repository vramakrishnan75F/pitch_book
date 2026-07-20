import { useState } from "react";
import type { PaymentMethod, UpiApp, Bank, Wallet } from "../types";

// ─── PaymentMethodPanel ───────────────────────────────────────────────────────
// UPI / Cards / Net Banking / Wallets tab panel.
// onPayNow — parent calls actual Razorpay SDK. This component only handles form UI.

export type PaymentMethodPanelProps = {
  upiApps: UpiApp[];
  banks: Bank[];
  wallets: Wallet[];
  isProcessing: boolean;
  totalLabel: string;         // e.g. "₹1,224"
  onPayNow: (method: PaymentMethod, payload: PaymentPayload) => void;
};

export type PaymentPayload =
  | { type: "upi_app"; appId: string }
  | { type: "upi_id"; upiId: string }
  | { type: "card"; cardNumber: string; expiry: string; cvv: string; name: string }
  | { type: "netbanking"; bankId: string }
  | { type: "wallet"; walletId: string };

const METHOD_TABS: { id: PaymentMethod; label: string }[] = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Cards" },
  { id: "netbanking", label: "Net Banking" },
  { id: "wallet", label: "Wallets" },
];

export function PaymentMethodPanel({
  upiApps,
  banks,
  wallets,
  isProcessing,
  totalLabel,
  onPayNow,
}: PaymentMethodPanelProps) {
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handlePay = () => {
    if (method === "upi") {
      if (selectedUpiApp) onPayNow("upi", { type: "upi_app", appId: selectedUpiApp });
      else if (upiId) onPayNow("upi", { type: "upi_id", upiId });
    } else if (method === "card") {
      onPayNow("card", { type: "card", cardNumber: cardNum, expiry: cardExpiry, cvv: cardCvv, name: cardName });
    } else if (method === "netbanking") {
      onPayNow("netbanking", { type: "netbanking", bankId: selectedBank });
    } else {
      onPayNow("wallet", { type: "wallet", walletId: selectedWallet });
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <h2 className="text-base font-black text-foreground px-5 pt-5 mb-4">Choose Payment Method</h2>

      {/* Tab strip */}
      <div className="flex border-b border-border px-5">
        {METHOD_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMethod(tab.id)}
            className={`px-4 py-3 text-xs font-bold border-b-2 -mb-px transition-all ${
              method === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {/* UPI */}
        {method === "upi" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {upiApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedUpiApp(app.id === selectedUpiApp ? "" : app.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                    selectedUpiApp === app.id ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                  }`}
                >
                  {app.icon}
                  <span className="text-sm font-bold text-foreground">{app.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-semibold">or enter UPI ID</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-2">
              <input
                value={upiId}
                onChange={(e) => { setUpiId(e.target.value); setSelectedUpiApp(""); }}
                placeholder="yourname@upi"
                className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
              />
              <button className="px-4 py-2.5 text-sm font-bold text-primary border border-primary rounded-xl hover:bg-secondary transition-all">
                Verify
              </button>
            </div>
          </div>
        )}

        {/* Cards */}
        {method === "card" && (
          <div className="space-y-3">
            {[
              { label: "Card Number", value: cardNum, set: (v: string) => setCardNum(formatCard(v)), placeholder: "1234 5678 9012 3456", type: "text" },
              { label: "Name on Card", value: cardName, set: setCardName, placeholder: "Rahul Sharma", type: "text" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-black text-foreground uppercase tracking-wider block mb-1.5">{f.label}</label>
                <input
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  type={f.type}
                  className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-black text-foreground uppercase tracking-wider block mb-1.5">Expiry</label>
                <input
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-black text-foreground uppercase tracking-wider block mb-1.5">CVV</label>
                <input
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="•••"
                  type="password"
                  className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Net Banking */}
        {method === "netbanking" && (
          <div className="space-y-2">
            {banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => setSelectedBank(bank.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                  selectedBank === bank.id ? "border-primary bg-secondary text-primary" : "border-border text-foreground hover:border-primary/40"
                }`}
              >
                {bank.name}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ))}
          </div>
        )}

        {/* Wallets */}
        {method === "wallet" && (
          <div className="grid grid-cols-2 gap-2">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => setSelectedWallet(wallet.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  selectedWallet === wallet.id ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                }`}
              >
                {wallet.icon}
                <span className="text-sm font-bold text-foreground">{wallet.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className={`w-full font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-200 mt-5 ${
            isProcessing
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.01] active:scale-95"
          }`}
        >
          {isProcessing ? (
            <>
              <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Pay {totalLabel} Securely
            </>
          )}
        </button>

        <p className="text-center text-xs text-muted-foreground mt-3">
          256-bit SSL encrypted · Powered by Razorpay
        </p>
      </div>
    </div>
  );
}
