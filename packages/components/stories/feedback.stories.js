import "../src/index.js";
import { setAttributes } from "./helpers.js";

export default {
  title: "EyEagle DS/Feedback",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export const StatusBadge = {
  name: "Status Badge / Success",
  args: { label: "Assessment complete", size: "md", intent: "success" },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] }, intent: { control: "select", options: ["neutral", "brand", "success", "warning", "error"] } },
  render: (args) => { const element = document.createElement("ey-status-badge"); element.textContent = args.label; return setAttributes(element, args, ["size", "intent"]); },
};
