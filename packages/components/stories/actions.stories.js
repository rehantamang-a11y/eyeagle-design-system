import "../src/index.js";
import { setAttributes } from "./helpers.js";

export default { title: "EyEagle DS/Actions/Button", tags: ["autodocs"] };
const controls = {
  size: { control: "select", options: ["sm", "md", "lg"] },
  intent: { control: "select", options: ["primary", "secondary", "neutral"] },
  disabled: { control: "boolean" },
  loading: { control: "boolean" },
};
export const Primary = {
  args: { label: "Button label updated", size: "md", intent: "primary", disabled: false, loading: false },
  argTypes: controls,
  render: (args) => { const element = document.createElement("ey-button"); element.textContent = args.label; return setAttributes(element, args, ["size", "intent", "disabled", "loading"]); },
};
export const Secondary = { ...Primary, args: { ...Primary.args, label: "Secondary action", intent: "secondary" } };
export const Loading = { ...Primary, args: { ...Primary.args, loading: true } };
export const IconOnly = {
  name: "Icon Button",
  args: { label: "Open menu", size: "md", intent: "secondary" },
  argTypes: { size: controls.size, intent: controls.intent },
  render: (args) => setAttributes(document.createElement("ey-icon-button"), args, ["label", "size", "intent"]),
};
