import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      {/* <Navbar /> */}
      <main className="h-full w-full">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
