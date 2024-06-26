export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
