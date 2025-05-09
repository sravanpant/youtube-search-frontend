// frontend/src/components/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col md:flex-row py-6 md:h-16 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} Wesocioo x Tech. All rights reserved.
        </p>
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}