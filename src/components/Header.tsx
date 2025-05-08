// frontend/src/components/Header.tsx
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex container mx-auto w-full h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold text-xl"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Wesocioo <span className="text-foreground">x</span> Tech
          </span>
          <span className="text-xs ml-2 text-muted-foreground font-normal bg-muted px-2 py-0.5 rounded-full">
            Enterprise
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          {/* <Button variant="ghost" size="sm" className="hidden md:flex items-center">
            <BookOpenText className="h-4 w-4 mr-2" />
            Documentation
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Support
          </Button> */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
