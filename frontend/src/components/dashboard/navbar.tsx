import { Link } from "react-router-dom";
import { KanbanSquare, LogOut, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Logo } from "../../components/logo";
import { LanguageSwitcher } from "../../components/language-switcher";
import { useTranslation } from "../../hooks/useTranslation";

export function Navbar() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground md:hidden">
            <KanbanSquare className="size-5" />
          </span>
          <div className="hidden md:block">
            <Logo />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="icon" aria-label="Account" />
              <User className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>alex@jobdeck.app</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Link to="/" />
                <LogOut className="size-4" />
                {t.common.signOut}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
