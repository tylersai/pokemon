import classNames from "classnames";
import { FC } from "react";
import { CommonHead, Navbar, Footer } from "./";

interface PageLayoutProps {
  CommonHeadComp?: React.ReactElement;
  hideHeader?: boolean;
  hideFooter?: boolean;
  loading?: boolean;
  notFullHeight?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  CommonHeadComp = <CommonHead />,
  children,
  hideHeader,
  hideFooter,
  loading,
  notFullHeight,
}) => {
  return (
    <div className="PageLayout">
      {CommonHeadComp}
      {!hideHeader && <Navbar loading={loading} />}
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
