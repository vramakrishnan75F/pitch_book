import type { HowItWorksStep } from "../types";

// ─── HowItWorksSection ────────────────────────────────────────────────────────
// Fully static section — no callbacks, no props needed beyond content.

export type HowItWorksSectionProps = {
  steps: HowItWorksStep[];
  className?: string;
};

export function HowItWorksSection({ steps, className = "" }: HowItWorksSectionProps) {
  return (
    <section className={`py-20 bg-primary ${className}`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-white mb-3">How GoArena Works</h2>
          <p className="text-white/65 text-lg font-medium">Book your next game in under 60 seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {/* Dashed connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[58%] w-[84%] border-t-2 border-dashed border-white/20" />
              )}
              <div className="relative z-10 inline-flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-5 border border-white/20">
                  {step.icon}
                </div>
                <div className="text-[#32C766] text-[11px] font-black uppercase tracking-widest mb-2">
                  Step {step.step}
                </div>
                <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
