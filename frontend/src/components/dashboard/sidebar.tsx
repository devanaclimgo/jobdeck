import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  KanbanSquare,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";
import { Logo } from "../../components/logo";
import { useTranslation } from "../../hooks/useTranslation";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (val: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({
  collapsed,
  onCollapse,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const { t } = useTranslation();

  const items = [
    { key: "dashboard" as const, icon: LayoutDashboard, active: true },
    { key: "board" as const, icon: KanbanSquare, active: false },
    { key: "statistics" as const, icon: BarChart3, active: false },
    { key: "settings" as const, icon: Settings, active: false },
  ];

  const NavItems = () => (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {items.map(({ key, icon: Icon, active }) => (
        <button
          key={key}
          type="button"
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            collapsed ? "justify-center gap-0" : "gap-3",
            active
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
          )}
        >
          <Icon className="size-4 shrink-0" />
          {!collapsed && <span>{t.nav[key]}</span>}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden md:flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200",
          collapsed ? "w-16" : "w-45",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center px-4",
            collapsed ? "justify-center" : "justify-between px-6",
          )}
        >
          {!collapsed && <Logo />}
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0"
            onClick={() => onCollapse(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        </div>
        <NavItems />

        {!collapsed && (
          <div className="border-t border-sidebar-border p-4">
            <p className="text-xs text-muted-foreground">{t.common.tagline}</p>
          </div>
        )}
      </aside>

      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar md:hidden">
            <div className="flex h-16 items-center justify-between px-6">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={onMobileClose}
                aria-label="Close menu"
              >
                <X className="size-4" />
              </Button>
            </div>
            <NavItems />
            <div className="border-t border-sidebar-border p-4">
              <p className="text-xs text-muted-foreground">
                {t.common.tagline}
              </p>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
