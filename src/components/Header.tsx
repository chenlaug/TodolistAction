import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Header() {
  return (
    <nav className="flex flex-row items-center border-b border-primary p-4 shadow-xl justify-between mb-2">
      <Link href={"/"}>
        <Button variant={"link"}>Todo list</Button>
      </Link>
      <div>
        <Link href={"/tag"}>
          <Button variant={"link"}>Tag</Button>
        </Link>
        <Link href={"/category"}>
          <Button variant={"link"}>Category</Button>
        </Link>
      </div>
      <div className="flex items-center space-x-5">
        <ModeToggle />
      </div>
    </nav>
  );
}
