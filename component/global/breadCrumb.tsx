"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Breadcrumb {
  href: string;
  label: string;
  isCurrent: boolean;
}

const Breadcrumbs: React.FC = () => {
  const pathName = usePathname();
  const pathnames = pathName?.split("/").filter((path) => path);

  const breadcrumbs: Breadcrumb[] = pathnames.map((_, index) => {
    const href = "/" + pathnames.slice(0, index + 1).join("/");
    const isCurrent = index === pathnames.length - 1;

    return {
      href,
      label: pathnames[index],
      isCurrent,
    };
  });

  return (
    <nav className="flex max-w-[1024px] mx-auto mb-3 justify-end">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-white font-bold hover:underline ">
            Home
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="">
            <span className="font-bold">/</span>
            {breadcrumb.isCurrent ? (
              <span className="font-extrabold text-red-700 ml-2">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-white font-bold ml-2 hover:underline"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <span dir="rtl" className="ml-2">
        شما اینجا هستید:
      </span>
    </nav>
  );
};

export default Breadcrumbs;
