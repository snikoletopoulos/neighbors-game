const CardArea = (props: Props) => (
  <section id="neighbours-panel">{props.children}</section>
);

export default CardArea;

interface Props {
  children: React.ReactNode;
}
