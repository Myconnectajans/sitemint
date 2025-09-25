import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { I18nProvider } from "@/context/I18nContext";
import LiveChatButton from "@/components/LiveChatButton";

export const metadata: Metadata = {
  title: "SiteMint",
  description: "Auth-aware navbar + falling squares demo",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          <I18nProvider>
            <ThemeProvider>
              <Navbar />
              {children}
              <LiveChatButton />
            </ThemeProvider>
          </I18nProvider>
        </CartProvider>
    </body>
    </html>
  );
}
