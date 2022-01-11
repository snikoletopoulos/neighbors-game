import styles from "./Card.module.scss";

const Card = (props: Props) => {
  const { children, className, ...divProperties } = props;

  return (
    <div className={`${styles["card"]} ${className}`} {...divProperties}>
      {children}
    </div>
  );
};

export default Card;

interface Props {
  children: React.ReactNode;
  className?: string;
  [props: string]: any;
}
