import ActionGroup from "../molecules/ActionGroup";
import NavGroup from "../molecules/NavGroup";

export default function NavBar() {
  return (
    <>
      <nav className="border-t p-2 sm:p-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <NavGroup />
          <ActionGroup />
        </div>
      </nav>
    </>
  );
}
