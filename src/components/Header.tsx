import { ModeToggle } from "@/components/ModeToggle";

export default async function Header() {
  return (
    <nav className="flex flex-row items-center border-b border-primary p-4 shadow-xl justify-between mb-2">
      <p>Todo list</p>
      <div className="flex items-center space-x-5">
        <ModeToggle />
      </div>
    </nav>
  );
}
