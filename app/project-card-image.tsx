import Image from "next/image";

type ProjectCardImageProps = {
  src: string;
  alt: string;
  preload?: boolean;
};

// Image serveur uniquement : Next génère un srcset adapté au viewport sans
// ajouter de JavaScript côté client. La qualité 65 reste nette sous le filtre
// éditorial des cartes et réduit le transfert mesuré par PageSpeed.
export default function ProjectCardImage({ src, alt, preload = false }: ProjectCardImageProps) {
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
    />
  );
}
