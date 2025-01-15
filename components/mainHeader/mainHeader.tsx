import Link from "next/link";
import logoImage from "@/assets/logo.png";
import Image from "next/image";
import NavLink from "./navLink";

const MainHeader = () => {
  return (
    <header className="flex justify-between items-center pt-8 pb-8 pl-4 pr-4 min-w-[768px]">
      <Link href="/" className="flex items-center justify-center gap-8 no-underline text-[#ddd6cb] font-bold tracking-tight uppercase text-lg">
        <Image className="object-contain w-20 h-20 filter drop-shadow-lg " src={logoImage} alt="A plate with food on it" priority/>
        NextLevel Food
      </Link>
      <nav className="flex gap-8 mr-9 items-center justify-center">
        <NavLink href="/meals" children="Browse Meals"/>
        <NavLink href="/community" children="Foodies Community"/>
      </nav>
    </header>
  );
};

export default MainHeader;
