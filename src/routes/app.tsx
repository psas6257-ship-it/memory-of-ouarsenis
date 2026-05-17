import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { InstallPrompt } from "@/components/InstallPrompt";

export const Route = createFileRoute("/app")({
  component: AppLayout,
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("mom-auth-v1");
      if (!raw) throw redirect({ to: "/login" });
    }
  },
});

function AppLayout() {
  return (
    <PhoneFrame>
      <div className="relative flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
          <Outlet />
        </div>
        <InstallPrompt />
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
