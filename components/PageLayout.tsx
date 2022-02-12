import classNames from "classnames";
import { FC } from "react";
import { CommonHead, Navbar, Footer } from "./";

interface PageLayoutProps {
  CommonHeadComp?: React.ReactElement;
  hideHeader?: boolean;
  hideFooter?: boolean;
  notFullHeight?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  CommonHeadComp = <CommonHead />,
  children,
  hideHeader,
  hideFooter,
  notFullHeight,
}) => {
  return (
    <div className="PageLayout">
      {CommonHeadComp}
      {!hideHeader && <Navbar />}
      <main
        className={classNames(
          "container-fluid d-flex flex-column align-items-stretch",
          !notFullHeight && "vh-100",
        )}
      >
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};
