import { redirect } from "next/navigation";
import { KanbanBoard } from "@/components/dashboard/kanban-board";

export default async function DashboardPage() {

  return <KanbanBoard />;
}
