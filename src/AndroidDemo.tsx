import { Android } from "@/components/ui/android";
import App from "./App";

export function AndroidDemo() {
  return (
    <div className="relative w-[320px] mx-auto">
      {/* Android frame */}
      <Android className="size-full" />

      {/* Your Telegram Mini App inside the screen */}
      <div className="absolute inset-[7%] overflow-hidden rounded-[2.5rem] bg-white">
        <div className="h-full w-full overflow-y-auto">
          <App />
        </div>
      </div>
    </div>
  );
}