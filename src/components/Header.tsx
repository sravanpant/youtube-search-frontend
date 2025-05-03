// components/Header.tsx
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex container mx-auto w-full h-14 items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center space-x-2 font-bold text-xl"
        >
          <span>Wesocioo x Tech</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}