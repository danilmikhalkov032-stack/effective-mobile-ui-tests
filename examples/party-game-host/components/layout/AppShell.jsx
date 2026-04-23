import { TOKENS } from "../../app/tokens";
import { cn } from "../../utils/cn";
import { TopBar } from "./TopBar";

export function AppShell({ title, subtitle, children, bottomBar }) {
  return (
    <div
      className={cn(
        "w-[375px] h-[812px] overflow-hidden border",
        TOKENS.radius.phone,
        TOKENS.colors.bg,
        TOKENS.colors.border,
        TOKENS.shadow.phone,
        "text-white"
      )}
    >
      <div className="h-full flex flex-col">
        <TopBar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-hidden">{children}</main>
        {bottomBar}
      </div>
    </div>
  );
}
