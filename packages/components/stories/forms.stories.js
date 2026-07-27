import "../src/index.js";
import { setAttributes } from "./helpers.js";

export default { title: "EyEagle DS/Forms", tags: ["autodocs"] };
export const TextInput = {
  name: "Text Input / Default",
  args: { label: "Email address", name: "email", value: "", help: "We will use this to contact you." },
  render: (args) => setAttributes(document.createElement("ey-text-input"), args, ["label", "name", "value", "help"]),
};
export const TextInputError = { ...TextInput, name: "Text Input / Error", args: { ...TextInput.args, error: "Enter a valid email address.", help: "" }, render: (args) => setAttributes(document.createElement("ey-text-input"), args, ["label", "name", "value", "error"]) };
export const Select = {
  name: "Select / Default",
  args: { label: "Preferred contact method", name: "contact", options: "Choose one|Phone|Email|App", required: true },
  render: (args) => setAttributes(document.createElement("ey-select"), args, ["label", "name", "options", "required"]),
};
