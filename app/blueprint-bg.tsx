const blueprintAssets = [
  { name: "gears", src: "/assets/blueprint/01-gears.webp", mobileMuted: true },
  { name: "gauge", src: "/assets/blueprint/02-gauge.webp", mobileMuted: true },
  { name: "signal", src: "/assets/blueprint/03-signal-diagram.webp", mobileMuted: true },
  { name: "axis-horizontal", src: "/assets/blueprint/04-axis-horizontal.webp", mobileMuted: false },
  { name: "axis-vertical", src: "/assets/blueprint/05-axis-vertical.webp", mobileMuted: false },
  { name: "target", src: "/assets/blueprint/06-registration-target.webp", mobileMuted: false },
  { name: "ruler", src: "/assets/blueprint/07-construction-ruler.webp", mobileMuted: false },
  { name: "dimension", src: "/assets/blueprint/08-dimension-line.webp", mobileMuted: true },
  { name: "callout", src: "/assets/blueprint/09-callout-line.webp", mobileMuted: false },
  { name: "frame", src: "/assets/blueprint/10-frame-corners.webp", mobileMuted: true },
  { name: "title-block", src: "/assets/blueprint/11-title-block.webp", mobileMuted: true }
] as const;

export default function BlueprintBg() {
  return (
    <div aria-hidden="true" className="blueprint-bg">
      {blueprintAssets.map((asset) => (
        <img
          alt=""
          className={`blueprint-bg__asset blueprint-bg__${asset.name}${
            asset.mobileMuted ? " blueprint-bg__mobile-muted" : ""
          }`}
          decoding="async"
          fetchPriority="low"
          key={asset.name}
          loading="lazy"
          src={asset.src}
        />
      ))}
    </div>
  );
}
