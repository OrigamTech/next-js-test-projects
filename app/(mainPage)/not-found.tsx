import React from "react";
import Link from "next/link";

export default function Custom404() {
  const suggestedPages = [
    { id: 1, href: "/news", title: "News" },
    { id: 2, href: "/contact", title: "Contact Us" },
    { id: 3, href: "/blog", title: "Blog" },
  ];

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Here are some pages you might find interesting:</p>

      <ul>
        {suggestedPages.map((page) => (
          <li key={page.id}>
            <Link href={page.href}>{page.title}</Link>
          </li>
        ))}
      </ul>

      <Link href="/">Go back home</Link>
    </div>
  );
}
