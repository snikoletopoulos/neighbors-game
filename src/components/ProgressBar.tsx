import styles from './ProgressBar.module.scss';

const ProgressBar = ({ progress }: Props) => (
  <section id="progress" className={styles['progress-bar']}>
    <div id='current-progress' style={{ width: progress + "%" }} className={styles['progress-bar__persentage']}></div>
  </section>
);

export default ProgressBar;

interface Props {
  progress: number;
}
