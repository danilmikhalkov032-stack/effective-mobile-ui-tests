import { cn } from "../../utils/cn";

const ITEMS = [
  { id: "home", label: "Главная" },
  { id: "games", label: "Игры" },
  { id: "packs", label: "Паки" },
  { id: "profile", label: "Профиль" },
];

export function BottomNav({ tab, onChange }) {
  return (
    <div className="grid grid-cols-4 gap-2 px-3 py-3 border-t border-white/6 bg-[#0D0D11]/95 backdrop-blur">
      {ITEMS.map((item) => {
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              "h-12 rounded-2xl text-xs font-medium transition",
              active ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
