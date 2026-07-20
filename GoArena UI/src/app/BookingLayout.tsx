import { Link, Outlet, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

const STEPS = [
  { label: "Slot", path: "/booking/slots" },
  { label: "Summary", path: "/booking/summary" },
  { label: "Payment", path: "/booking/payment" },
  { label: "Confirm", path: "/booking/success" },
];

export default function BookingLayout() {
  const location = useLocation();
  const currentIndex = STEPS.findIndex((s) => s.path === location.pathname);
  const isSuccess = location.pathname === "/booking/success";

  const backPath =
    currentIndex > 0 ? STEPS[currentIndex - 1].path : "/";

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Manrope','Inter',sans-serif" }}>
      {/* Booking nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-6">
          {!isSuccess && (
            <Link
              to={backPath}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          )}

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm leading-none">G</span>
            </div>
            <span className="text-base font-black text-foreground tracking-tight">
              Go<span className="text-primary">Arena</span>
            </span>
          </Link>

          {/* Step indicator */}
          {!isSuccess && (
            <div className="flex-1 flex items-center justify-end gap-1">
              {STEPS.filter((s) => s.path !== "/booking/success").map((step, i) => (
                <div key={step.label} className="flex items-center gap-1">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      i < currentIndex
                        ? "bg-primary/10 text-primary"
                        : i === currentIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      i < currentIndex ? "bg-primary text-white" : i === currentIndex ? "bg-white text-primary" : "bg-muted-foreground/20 text-muted-foreground"
                    }`}>
                      {i < currentIndex ? "✓" : i + 1}
                    </span>
                    <span className="hidden sm:block">{step.label}</span>
                  </div>
                  {i < 2 && <div className="w-4 h-px bg-border" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-5 py-8">
        <Outlet />
      </div>
    </div>
  );
}
