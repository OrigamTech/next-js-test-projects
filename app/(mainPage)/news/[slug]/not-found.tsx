import React from "react";
import Link from "next/link";

const Custom404 =() =>{
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/news">Go back</Link>
    </div>
  );
}
export default Custom404;