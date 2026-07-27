import "../src/index.js";
import { setAttributes } from "./helpers.js";

export default { title: "EyEagle DS/Navigation", tags: ["autodocs"] };
export const NavigationBar = {
  name: "Navigation Bar / Scrolled",
  args: { scrolled: true },
  argTypes: { scrolled: { control: "boolean" } },
  render: (args) => { const element = document.createElement("ey-nav-bar"); element.innerHTML = `<span slot="brand">Brand name</span><a slot="links" href="#link-one">Navigation link</a><a slot="links" href="#link-two">Navigation link</a><a slot="links" href="#link-three">Navigation link</a><ey-button slot="cta" size="sm">Button label</ey-button>`; return setAttributes(element, args, ["scrolled"]); },
};
export const MobileMenu = {
  name: "Mobile Menu / Open",
  args: { open: true },
  argTypes: { open: { control: "boolean" } },
  render: (args) => { const element = document.createElement("ey-mobile-menu"); element.innerHTML = `<a href="#how-it-works">How it works</a><a href="#assessment">Bathroom assessment</a><a href="#app">App</a><a href="#about">About</a>`; return setAttributes(element, args, ["open"]); },
};
