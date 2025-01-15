import Logout from "@/component/authentication/logout";
// import { logout } from "@/lib/session";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="flex flex-col  max-w-[1024px] mx-auto">
        <Link href="/news">News Page</Link>
        <Link href="/archive">Archive</Link>
        {/* <Logout /> */}
      </div>
    </>
  );
};

export default page;
