import styles from "./CardArea.module.scss";

import Modal from "../UI/Modal";

const CardArea = (props: Props) => (
  <>
    <section className={styles["neighbours"]}>
      {props.showModal && <Modal header="Game over" body={props.message} />}
      {props.children}
    </section>
  </>
);

export default CardArea;

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  message: string;
}
