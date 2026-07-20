import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Edit2, Star, Trophy, Calendar, MapPin, Bell, Shield, CreditCard,
  Heart, LogOut, ChevronRight, User, Settings
} from "lucide-react";
import { sports } from "../app/data";

const STATS = [
  { label: "Bookings", value: "24", icon: <Calendar size={16} /> },
  { label: "Venues Visited", value: "9", icon: <MapPin size={16} /> },
  { label: "Hours Played", value: "38", icon: <Trophy size={16} /> },
  { label: "Rating Given", value: "4.8★", icon: <Star size={16} /> },
];

const PREFERRED_SPORTS = ["football", "badminton", "tennis"];

const SETTINGS_ITEMS = [
  { icon: <Bell size={16} />, label: "Notifications", desc: "Manage alerts and reminders" },
  { icon: <CreditCard size={16} />, label: "Saved Payments", desc: "Cards, UPI, wallets" },
  { icon: <Heart size={16} />, label: "Favourite Venues", desc: "3 venues saved" },
  { icon: <Shield size={16} />, label: "Privacy & Security", desc: "Password, 2FA, data" },
  { icon: <Settings size={16} />, label: "App Settings", desc: "Language, theme, notifications" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Arjun Mehta");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("arjun.mehta@gmail.com");
  const [preferredSports, setPreferredSports] = useState<string[]>(PREFERRED_SPORTS);

  const toggleSport = (id: string) => {
    setPreferredSports((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Profile header */}
        <div className="bg-white border border-border rounded-2xl p-6 mb-5">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
                  AM
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#32C766] rounded-full border-2 border-white" />
              </div>
              <div>
                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xl font-black text-foreground bg-muted rounded-lg px-3 py-1 outline-none border border-primary/30 mb-0.5"
                  />
                ) : (
                  <h1 className="text-xl font-black text-foreground mb-0.5">{name}</h1>
                )}
                <p className="text-sm text-muted-foreground">Member since Jan 2024</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} fill="#FFC857" className="text-[#FFC857]" />
                  <span className="text-xs font-bold text-foreground">4.8</span>
                  <span className="text-xs text-muted-foreground">· 24 bookings</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setEditing((v) => !v)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                editing
                  ? "bg-primary text-primary-foreground hover:bg-[#0d6e3c]"
                  : "border border-border text-foreground hover:border-primary/40"
              }`}
            >
              {editing ? (
                "Save"
              ) : (
                <><Edit2 size={13} /> Edit</>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="text-center bg-muted/50 rounded-xl p-3">
                <div className="flex justify-center text-primary mb-1">{s.icon}</div>
                <div className="text-base font-black text-foreground">{s.value}</div>
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-white border border-border rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <User size={15} className="text-primary" />
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider">Personal Info</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Full Name", value: name, setter: setName },
              { label: "Phone", value: phone, setter: setPhone },
              { label: "Email", value: email, setter: setEmail },
            ].map((field) => (
              <div key={field.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs font-black text-muted-foreground uppercase tracking-wider w-24">{field.label}</span>
                {editing ? (
                  <input
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="flex-1 text-right text-sm font-semibold text-foreground bg-muted rounded-lg px-3 py-1 outline-none border border-primary/20 focus:border-primary/40 transition-colors"
                  />
                ) : (
                  <span className="text-sm font-semibold text-foreground">{field.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sports preferences */}
        <div className="bg-white border border-border rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">⚽</span>
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider">Sports Preferences</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => {
              const active = preferredSports.includes(sport.id);
              return (
                <button
                  key={sport.id}
                  onClick={() => editing && toggleSport(sport.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-200 ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  } ${editing ? "hover:border-primary/60 cursor-pointer" : "cursor-default"}`}
                >
                  {sport.icon} {sport.label}
                </button>
              );
            })}
          </div>
          {editing && (
            <p className="text-[11px] text-muted-foreground mt-3">Tap sports to toggle your preferences</p>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden mb-5">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider">Settings</h2>
          </div>
          <div className="divide-y divide-border">
            {SETTINGS_ITEMS.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <ChevronRight size={15} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Referral */}
        <div className="bg-[#0F7B45] rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-black text-base mb-1">Refer & Earn</div>
              <div className="text-white/70 text-xs font-medium">Invite friends and earn ₹100 per booking</div>
            </div>
            <button className="bg-white text-primary font-black text-xs px-4 py-2.5 rounded-xl hover:bg-[#32C766] hover:text-white transition-all">
              Share Code
            </button>
          </div>
          <div className="mt-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-center">
            <span className="text-white font-black text-sm tracking-widest">ARJUN100</span>
          </div>
        </div>

        {/* Log out */}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 py-3.5 border border-border rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:border-red-200 transition-all duration-200"
        >
          <LogOut size={15} />
          Log Out
        </button>
      </div>
    </div>
  );
}
