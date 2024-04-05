import BaseLayout from "@/components/BaseLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>API Wishman</title>
      </head>
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
