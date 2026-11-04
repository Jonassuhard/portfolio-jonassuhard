type AnimatedTitleProps = {
  children: string;
  glitch?: boolean;
};

// Le texte réel reste unique et visible dès la première frame. Les copies
// colorées viennent de pseudo-éléments CSS alimentés côté serveur.
export default function AnimatedTitle({ children, glitch = true }: AnimatedTitleProps) {
  return (
    <h1
      className="chroma-title"
      data-text={children}
      data-glitch={glitch ? "true" : undefined}
    >
      <span className="title-text">{children}</span>
    </h1>
  );
}
