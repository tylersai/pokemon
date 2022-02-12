import { FC } from "react";
import { CommonHead, Navbar, Footer } from "./";

interface PageLayoutProps {
  CommonHeadComp?: React.ReactElement;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  CommonHeadComp = <CommonHead />,
  children,
  hideHeader,
  hideFooter,
}) => {
  return (
    <div className="PageLayout">
      {CommonHeadComp}
      {!hideHeader && <Navbar />}
      <main className="container-fluid d-flex flex-column align-items-stretch">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
