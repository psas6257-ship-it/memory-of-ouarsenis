import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/app")({ component: AppLayout });

function AppLayout() {
  return (
    <PhoneFrame>
      <div className="relative flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
