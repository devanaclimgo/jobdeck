import { JobsProvider } from "../../contexts/JobsContext";
import { Navbar } from "../../components/dashboard/navbar";
import { Sidebar } from "../../components/dashboard/sidebar";
import { KanbanBoard } from "../../components/dashboard/kanban-board";

export default function DashboardLayout() {
  return (
    <JobsProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />
          <KanbanBoard />
        </div>
      </div>
    </JobsProvider>
  );
}
