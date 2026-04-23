import { TOKENS } from "../../app/tokens";
import { cn } from "../../utils/cn";

export function SurfaceCard({ children, className }) {
  return (
    <div
      className={cn(
        TOKENS.radius.xl,
        TOKENS.colors.surface,
        "border px-4 py-4",
        TOKENS.colors.border,
        TOKENS.shadow.card,
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children, className }) {
  return <div className={cn("text-xs uppercase tracking-[0.18em] text-white/35", className)}>{children}</div>;
}

export function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "h-13 min-h-[52px] rounded-2xl px-4 text-sm font-semibold text-white transition active:scale-[0.985] disabled:opacity-40 disabled:pointer-events-none",
        TOKENS.colors.primary,
        TOKENS.colors.primaryHover,
        className
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "h-13 min-h-[52px] rounded-2xl px-4 text-sm font-medium text-white/85 transition active:scale-[0.985] disabled:opacity-40 disabled:pointer-events-none",
        TOKENS.colors.subtle,
        TOKENS.colors.subtleHover,
        className
      )}
    >
      {children}
    </button>
  );
}

export function Chip({ active, children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center h-8 rounded-full px-3 text-xs border",
        active ? "bg-violet-500/15 text-violet-200 border-violet-400/25" : "bg-white/5 text-white/55 border-white/8",
        className
      )}
    >
      {children}
    </span>
  );
}

export function ProgressDots({ total, current }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn("h-2 rounded-full transition-all", i === current ? "w-6 bg-violet-400" : "w-2 bg-white/15")} />
      ))}
    </div>
  );
}
