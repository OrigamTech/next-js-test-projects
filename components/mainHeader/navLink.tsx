"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./mainHeader.module.css";

interface IProps {
  href: string;
  children: string;
}

const NavLink = ({ href, children }: IProps) => {
  const path = usePathname();
  return (
    <div>
      <ul className="">
        <li>
          <Link
            href={href}
            className={path.startsWith(href) ? classes.active : undefined}
          >
            {children}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavLink;
