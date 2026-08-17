// SVG statique de confiance : une seule chaîne évite à React de sérialiser
// chaque graduation et chaque denture séparément dans le payload RSC.
const blueprintMarkup = `
  <defs>
    <g id="bp-gear-large"><circle r="134" stroke-dasharray="12 11.4" stroke-linecap="butt" stroke-width="20"/><circle r="124"/></g>
    <g id="bp-gear-medium"><circle r="101" stroke-dasharray="11 11.7" stroke-linecap="butt" stroke-width="18"/><circle r="92"/></g>
    <g id="bp-gear-small"><circle r="64" stroke-dasharray="9 9.3" stroke-linecap="butt" stroke-width="12"/><circle r="58"/></g>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
    <path d="M130 512H1310M720 116V936" opacity=".5" stroke="rgba(21,18,14,.1)" stroke-dasharray="26 7 5 7" stroke-width="1"/>
    <g opacity=".55" stroke="rgba(21,18,14,.1)" stroke-width="1"><circle cx="720" cy="512" r="5"/><path d="M704 512H736M720 496V528"/></g>
    <path class="blueprint-bg__mobile-muted" d="M100 126V100H126M1314 100H1340V126M100 898V924H126M1314 924H1340V898" opacity=".6" stroke="rgba(21,18,14,.1)" stroke-width="1"/>

    <g opacity=".8" stroke="rgba(21,18,14,.11)"><path d="M500 190H930M628 190L930 132M560 185V195M700 185V195M772 185V195M844 185V195"/><circle cx="500" cy="190" r="4.5"/><circle cx="628" cy="190" r="4.5"/><circle cx="930" cy="190" r="4.5"/><circle cx="930" cy="132" r="4.5"/><circle cx="930" cy="132" r="9" opacity=".6"/></g>

    <g class="blueprint-bg__mobile-muted" opacity=".85" stroke="rgba(21,18,14,.11)" transform="translate(1150 218)">
      <path d="M-105.66 61A122 122 0 1 1 105.66 61"/>
      <path d="M-72.75 42A84 84 0 1 1 72.75 42" opacity=".6"/>
      <path d="M-105.66 61A122 122 0 1 1 105.66 61" pathLength="24" stroke-dasharray=".08 .92" stroke-linecap="butt" stroke-width="11" opacity=".35"/>
      <path d="M-105.66 61A122 122 0 1 1 105.66 61" pathLength="8" stroke-dasharray=".1 .9" stroke-linecap="butt" stroke-width="15" opacity=".5"/>
      <path d="M-14.86 13.38L72.83-65.57" stroke-width="1.4"/><circle r="7"/><circle r="2.5" opacity=".7"/>
    </g>

    <g class="blueprint-bg__mobile-muted" opacity=".9" stroke="rgba(21,18,14,.12)" transform="translate(270 795) rotate(-4)"><use href="#bp-gear-large"/><circle r="112"/><circle r="63"/><circle r="22"/><circle r="134" opacity=".45" stroke-dasharray="5 9" stroke-width=".9"/><path d="M-96 0H96M0-96V96M-68-68L68 68M-68 68L68-68"/></g>
    <g opacity=".88" stroke="rgba(21,18,14,.115)" transform="translate(473 672) rotate(7)"><use href="#bp-gear-medium"/><circle r="77"/><circle r="36"/><circle r="12"/><circle r="101" opacity=".45" stroke-dasharray="5 9" stroke-width=".9"/><path d="M-68 0H68M0-68V68"/></g>
    <g opacity=".85" stroke="rgba(21,18,14,.11)" transform="translate(608 767) rotate(12)"><use href="#bp-gear-small"/><circle r="45"/><circle r="18"/><circle r="64" opacity=".45" stroke-dasharray="5 9" stroke-width=".9"/><path d="M-39 0H39M0-39V39"/></g>

    <path class="blueprint-bg__mobile-muted" d="M258 661H138M258 929H138M148 661V929M143 673L148 661 153 673M143 917L148 929 153 917" opacity=".55" stroke="rgba(21,18,14,.1)" stroke-width="1"/>
    <g opacity=".55" stroke="rgba(21,18,14,.1)" stroke-width="1"><path d="M527 594L570 552H612"/><circle cx="527" cy="594" r="2.5"/></g>
    <g class="blueprint-bg__mobile-muted" opacity=".7" stroke="rgba(21,18,14,.1)"><circle cx="400" cy="235" r="56"/><path d="M356 258H368V238H382V258H396V238H410V258H424V238H438M356 270A96 96 0 0 1 444 258M392 289L306 640" stroke-width="1"/><circle cx="306" cy="640" r="3"/></g>
    <g class="blueprint-bg__mobile-muted" opacity=".7" stroke="rgba(21,18,14,.11)"><rect height="108" width="192" x="1160" y="790"/><path d="M1160 820H1352M1160 856H1352M1258 790V856M1172 805H1230M1268 805H1330M1172 838H1214M1268 838H1312M1172 877H1246" stroke-width="1"/></g>
  </g>`;

export default function BlueprintBg() {
  return (
    <svg
      aria-hidden="true"
      className="blueprint-bg"
      dangerouslySetInnerHTML={{ __html: blueprintMarkup }}
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 1024"
    />
  );
}
