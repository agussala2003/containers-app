import { Inter } from 'next/font/google'
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";4

const inter = Inter({ subsets: ['latin'] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Containers App",
  description: "La mejor app para manejar tus contenedores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <Sidebar />
        <main className="h-full flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
