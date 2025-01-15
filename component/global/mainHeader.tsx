import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="w-full max-w-[1024px] mx-auto mt-5 mb-5">
      <header className="w-full flex justify-between items-center">
        <div className="">
          <Link href="/" className="">
            Home
          </Link>
        </div>
        <nav className="">
          <ul className="">
            <li>
              <Link href="/news" className="">
                News Logo
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainHeader;
