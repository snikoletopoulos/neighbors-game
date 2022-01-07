import styles from "./Modal.module.scss";
import Card from "./Card";
import Button from "./Button";

const Backdrop = () => {
  return <div className={styles["modal__backdrop"]}></div>;
};

const Modal = (props: Props) => {
  return (
    <>
      <Backdrop />
      <Card className={`${styles["modal"]}`}>
        <header className={styles["modal__header"]}>Game over</header>

        <main className={styles["modal__body"]}>Mpla mpla</main>

        <footer className={styles["modal__actions"]}>
          <Button className={styles["modal__btn"]}>Action 1</Button>
          <Button
            className={`${styles["modal__btn"]} ${styles["modal__btn--primary"]}`}
          >
            Action 2
          </Button>
        </footer>
      </Card>
    </>
  );
};

export default Modal;

interface Props {}
