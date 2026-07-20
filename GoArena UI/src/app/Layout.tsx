import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, Bell, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Venues", to: "/search" },
  { label: "Games", to: "/search?tab=open" },
  { label: "Tournaments", to: "/search?tab=tournaments" },
  { label: "Coaches", to: "/search?tab=coaches" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Manrope','Inter',sans-serif" }}>
      <nav
        className={`sticky top-0 z-50 border-b border-border transition-colors ${
          isHome ? "bg-white/92 backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/30">
              <span className="text-white font-black text-lg leading-none">G</span>
            </div>
            <span className="text-xl font-black text-foreground tracking-tight">
              Go<span className="text-primary">Arena</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/bookings"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <Bell size={16} />
              My Bookings
            </Link>
            <Link
              to="/profile"
              className="hidden md:flex w-8 h-8 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-[#0d6e3c] transition-colors"
            >
              <User size={15} />
            </Link>
            <Link
              to="/search"
              className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#0d6e3c] transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-primary/25"
            >
              Book Now
            </Link>
            <button className="md:hidden text-foreground" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-border bg-white px-5 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/bookings" onClick={() => setOpen(false)} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              My Bookings
            </Link>
            <Link to="/profile" onClick={() => setOpen(false)} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
          </div>
        )}
      </nav>

      <Outlet />
    </div>
  );
}
