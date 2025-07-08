import NavBar from "../organisms/NavBar";
import ThemeToggle from "../atoms/ThemeToggle";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ThemeToggle />
      <main className="flex-1 px-4 sm:px-6 pt-4 sm:pt-6 overflow-hidden">{children}</main>
      <NavBar />
    </div>
  );
}
