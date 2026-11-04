import Image from "next/image";

type ProjectCardImageProps = {
  src: string;
  alt: string;
  preload?: boolean;
  fullColor?: boolean;
};

// Image serveur uniquement : Next génère un srcset adapté au viewport sans
// ajouter de JavaScript côté client. La qualité 65 reste nette sous le filtre
// éditorial des cartes et réduit le transfert mesuré par PageSpeed.
export default function ProjectCardImage({
  src,
  alt,
  preload = false,
  fullColor = false
}: ProjectCardImageProps) {
  if (src === "/assets/cards/cortex-orbital-square-20260910-art.webp") {
    return (
      <div className="cortex-card-art">
        <div className="cortex-card-caption" aria-hidden="true">
          <strong>Cortex<br />Bridge</strong>
          <span>Luna · Terra<br />Sol · Astra</span>
        </div>
        <Image src={src} alt={alt} width={760} height={760}
          sizes="(max-width: 604px) 65vw, 240px" quality={85}
          preload={preload} loading={preload ? undefined : "lazy"}
          className="full-color-media" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={760}
      height={460}
      sizes="(max-width: 604px) calc(100vw - 28px), (max-width: 640px) calc(50vw - 22px), (max-width: 960px) calc(50vw - 30px), (max-width: 1120px) calc(33.333vw - 26px), 348px"
      quality={65}
      preload={preload}
      loading={preload ? undefined : "lazy"}
      className={fullColor ? "full-color-media" : undefined}
    />
  );
}
