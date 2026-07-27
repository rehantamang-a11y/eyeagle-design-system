import "../src/index.js";

export default { title: "EyEagle DS/Surfaces", tags: ["autodocs"] };
export const Card = {
  name: "Card / Default",
  render: () => { const element = document.createElement("ey-card"); element.innerHTML = `<h3 slot="title">Bathroom assessment</h3><p>We look at the room, the routine, and the right support for your loved one.</p><ey-status-badge intent="success">Ready to review</ey-status-badge>`; return element; },
};
