export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © 2026 Atacama Partners. All rights reserved.
        </p>
        <a
          href="mailto:ginsu@atacamapartners.com"
          className="text-primary hover:underline transition-all duration-300 font-medium"
        >
          ginsu@atacamapartners.com
        </a>
      </div>
    </footer>
  );
}
