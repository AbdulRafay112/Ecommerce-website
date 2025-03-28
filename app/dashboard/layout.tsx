
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <div className="max-w-[1440px] m-auto min-h-screen">
        {children}
        </div>
      </body>
    </html>
  );
}



