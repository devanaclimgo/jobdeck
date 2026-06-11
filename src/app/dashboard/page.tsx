import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { KanbanBoard } from "@/components/dashboard/kanban-board";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <KanbanBoard />;
}
