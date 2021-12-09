const ProgressBar = ({ progress }: Props) => (
  <section id="progress">
    <div style={{ width: progress + "%" }} id="current-progress"></div>
  </section>
);

export default ProgressBar;

interface Props {
  progress: number;
}
