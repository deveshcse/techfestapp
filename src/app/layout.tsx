import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ModalProvider from "@/components/providers/modal-provider";
import ReactQueryClientProvider from "@/components/providers/react-query-client-provider";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { GlobalConfirmDialog } from "@/components/common/confirm-dialog";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "TechFestApp | Technical Festival Management",
    template: "%s | TechFestApp",
  },
  description:
    "Create techfests, schedule activities, automate waitlists, and track attendance — the campus platform for technical festivals.",
  metadataBase: new URL("https://techfestapp.com"),
  openGraph: {
    title: "TechFestApp | Technical Festival Management",
    description:
      "Run technical festivals without spreadsheet chaos. Registrations, waitlists, and attendance in one place.",
    type: "website",
    siteName: "TechFestApp",
    url: "https://techfestapp.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFestApp | Technical Festival Management",
    description:
      "Manage techfest activities and registrations from a single dashboard.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ReactQueryClientProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              enableColorScheme
            >
              {children}
              <ModalProvider />
              <GlobalConfirmDialog />
              <Toaster position="top-right" richColors />
              <SpeedInsights />
            </ThemeProvider>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
