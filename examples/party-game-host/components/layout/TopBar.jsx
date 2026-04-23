export function TopBar({ title, subtitle }) {
  return (
    <div className="px-5 pt-4 pb-3 border-b border-white/6 bg-[#0D0D11]/90 backdrop-blur">
      <div className="flex items-center justify-between text-[11px] text-white/35 mb-2">
        <span>9:41</span>
        <span className="font-medium text-white/55">Party Host</span>
        <span>100%</span>
      </div>
      <div>
        <div className="text-[20px] leading-6 font-semibold tracking-tight text-white">{title}</div>
        {subtitle ? <div className="text-sm text-white/50 mt-1">{subtitle}</div> : null}
      </div>
    </div>
  );
}
