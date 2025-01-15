import MainHeader from "@/component/global/mainHeader";
import Breadcrumbs from "@/component/global/breadCrumb";
import "./globals.css";
import AuthStatus from "@/component/authentication/authStatus";
import SessionProviderWrapper from "@/component/global/sessionProviderWrapper";

export const metadata = {
  title: "Next News App",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <MainHeader />
          <Breadcrumbs />
          <AuthStatus />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
