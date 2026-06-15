import { JobsProvider } from "../../contexts/JobsContext";
import { Navbar } from "../../components/dashboard/navbar";
import { Sidebar } from "../../components/dashboard/sidebar";
import { KanbanBoard } from "../../components/dashboard/kanban-board";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <JobsProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
          <KanbanBoard />
        </div>
      </div>
    </JobsProvider>
  );
}
