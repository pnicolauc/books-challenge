import { ReactNode } from "react";

interface PageFrameProps {
  title: string;
  navHeader: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  header: ReactNode;
}

export const PageFrame = ({ title, navHeader, children, footer, header }: PageFrameProps) => {
  return (
    <div className="md:h-screen flex flex-col container mx-auto py-2 justify-between">
      <header>
        <nav
          className="flex items-center justify-between p-4"
          aria-label="Global"
        >
          <h1 className="text-xl font-bold">{title}</h1>
          <div>
            {navHeader}
          </div>
        </nav>
        <div className="mb-2 mx-2">
        {header}
        </div>
      </header>
      <main className="p-4 overflow-y-auto flex-1">{children}</main>
      <footer className="row-start-3 flex items-center justify-center mt-3">
        {footer}
      </footer>
    </div>
  );
};
