import classNames from "classnames";
import { FC } from "react";
import { CommonHead } from "./";

interface PageLayoutProp {
  CommonHeadComp?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;
}

export const PageLayout: FC<PageLayoutProp> = ({
  className,
  CommonHeadComp = <CommonHead />,
  children,
}) => {
  return (
    <div className={classNames("PageLayout", className)}>
      {CommonHeadComp}
      <main className="container-fluid">{children}</main>
    </div>
  );
};
