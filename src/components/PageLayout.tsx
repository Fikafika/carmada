import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  /** When true, header is always solid (white bg, navy text). Use on pages without a dark hero. */
  solidHeader?: boolean;
}

export function PageLayout({ children, solidHeader = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header solid={solidHeader} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
