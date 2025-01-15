import MainHeaderBackground from '../components/mainHeader/mainHeaderBackground';
import MainHeader from '@/components/mainHeader/mainHeader';
import './globals.css';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBackground/>
        <MainHeader/>
        {children}
      </body>
    </html>
  );
}
    