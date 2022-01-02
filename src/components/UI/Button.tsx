import { ReactNode } from "react";
import styles from "./Button.module.scss";

const Button = ({ active = true, children, onClick,  ...buttonProperties }: Props) => {
  return (
    <p
      className={`${styles["btn"]} ${
        active ? styles["btn--active"] : styles["btn--inactive"]
      }`}
      onClick={active ? onClick ?? undefined : undefined}
      id="btn-next-round"
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
  [x: string]: any;
}
