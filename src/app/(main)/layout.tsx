
import "../globals.css";
import Navbar from "@/components/header/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <div className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        </div>
  );
}
