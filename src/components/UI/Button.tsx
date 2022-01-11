import { ReactNode } from "react";
import styles from "./Button.module.scss";

const Button = ({
  active = true,
  children,
  onClick,
  className,
  ...buttonProperties
}: Props) => {
  return (
    <p
      className={`${styles["btn"]} ${
        active ? styles["btn--active"] : styles["btn--inactive"]
      } ${className ?? ""}`}
      onClick={active ? onClick ?? undefined : undefined}
      {...buttonProperties}
    >
      {children}
    </p>
  );
};

export default Button;

interface Props {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  [buttonProperties: string]: any;
}
