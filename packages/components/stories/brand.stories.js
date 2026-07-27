import darkLockup from "../../assets/logos/eyeagle-lockup-dark.png";
import darkWordmark from "../../assets/logos/eyeagle-wordmark-dark.png";
import lightLockup from "../../assets/logos/eyeagle-lockup-light.png";
import lightWordmark from "../../assets/logos/eyeagle-wordmark-light.png";

export default {
  title: "EyEagle DS/Brand/Logos",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

const logo = (src, alt) => `<img src="${src}" alt="${alt}" style="display:block;max-width:100%;height:auto;object-fit:contain;" />`;

const gallery = () => {
  const element = document.createElement("div");
  element.style.cssText = "display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;width:min(100%,960px);margin:0 auto;";
  element.innerHTML = `
    <figure style="display:grid;gap:12px;margin:0;padding:32px;border:1px solid #e4e4e4;border-radius:16px;background:#fff;">
      ${logo(darkWordmark, "EyEagle wordmark for light backgrounds")}
      <figcaption style="font:14px/20px sans-serif;color:#525252;">Wordmark / Dark</figcaption>
    </figure>
    <figure style="display:grid;gap:12px;margin:0;padding:32px;border:1px solid #e4e4e4;border-radius:16px;background:#111827;">
      ${logo(lightWordmark, "EyEagle wordmark for dark backgrounds")}
      <figcaption style="font:14px/20px sans-serif;color:#fff;">Wordmark / Light</figcaption>
    </figure>
    <figure style="display:grid;gap:12px;margin:0;padding:32px;border:1px solid #e4e4e4;border-radius:16px;background:#fff;">
      ${logo(darkLockup, "EyEagle lockup with mission line for light backgrounds")}
      <figcaption style="font:14px/20px sans-serif;color:#525252;">Lockup / Dark</figcaption>
    </figure>
    <figure style="display:grid;gap:12px;margin:0;padding:32px;border:1px solid #e4e4e4;border-radius:16px;background:#111827;">
      ${logo(lightLockup, "EyEagle lockup with mission line for dark backgrounds")}
      <figcaption style="font:14px/20px sans-serif;color:#fff;">Lockup / Light</figcaption>
    </figure>
  `;
  return element;
};

export const Gallery = { name: "Logo Gallery", render: gallery };
