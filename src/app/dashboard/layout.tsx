import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import "../globals.css";
import Navbar from "@/components/header/Navbar";
import MobileSidebar from "@/components/dashboard/sidebar/MobileSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <MobileSidebar/>
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
