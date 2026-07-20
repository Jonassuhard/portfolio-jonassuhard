type AnimatedTitleProps = {
  children: string;
  glitch?: boolean;
};

// Le texte réel reste visible dès la première frame. Les deux copies colorées
// sont des pseudo-éléments animés uniquement avec transform + opacity.
export default function AnimatedTitle({ children, glitch = false }: AnimatedTitleProps) {
  return (
    <h1
      className="chroma-title"
      data-glitch={glitch ? "true" : undefined}
    >
      <span className="chroma-layer chroma-layer-cyan" aria-hidden="true">
        {children}
      </span>
      <span className="chroma-layer chroma-layer-red" aria-hidden="true">
        {children}
      </span>
      <span className="title-text">{children}</span>
    </h1>
  );
}
