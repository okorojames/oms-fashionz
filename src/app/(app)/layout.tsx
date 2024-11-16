import { MobileNav } from "@/components/navbar/MobileNav";
import { Navbar } from "@/components/navbar/Navbar";
import { Fragment, ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="min-h-[calc(100dvh-100px)] my-3">{children}</div>
      <MobileNav />
    </Fragment>
  );
};

export default AppLayout;
