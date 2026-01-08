import HeaderButton from '@/components/header-button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
        <div className="text-2xl font-semibold tracking-tight text-foreground">
          Atacama Partners
        </div>
        <HeaderButton />
      </div>
    </header>
  );
}
