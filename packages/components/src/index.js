const shared = `:host{font-family:var(--ey-font-family-sans,"Plus Jakarta Sans",sans-serif);color:var(--ey-color-text-default,#262626)}*,*::before,*::after{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}[hidden]{display:none!important}`;
const size = (v) => ["sm", "md", "lg"].includes(v) ? v : "md";

class EyElement extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  adopt(markup, css = "") { this.shadowRoot.innerHTML = `<style>${shared}${css}</style>${markup}`; }
}

const buttonCss = `.button{display:inline-flex;align-items:center;justify-content:center;gap:var(--ey-space-8);min-height:var(--ey-size-control-md);padding:var(--ey-space-12) var(--ey-space-20);border:1px solid transparent;border-radius:var(--ey-radius-full);font-size:var(--ey-type-button-medium-font-size);line-height:var(--ey-type-button-medium-line-height);font-weight:var(--ey-type-button-medium-font-weight);letter-spacing:var(--ey-type-button-medium-letter-spacing);transition:opacity var(--ey-motion-duration-fast) var(--ey-motion-easing-standard),box-shadow var(--ey-motion-duration-fast) var(--ey-motion-easing-standard)}.button.sm{min-height:var(--ey-size-control-sm);padding:var(--ey-space-8) var(--ey-space-16);font-size:var(--ey-type-body-small-font-size);line-height:var(--ey-type-body-small-line-height)}.button.lg{min-height:var(--ey-size-control-lg);padding:var(--ey-space-16) var(--ey-space-24)}.button.primary{background:var(--ey-color-bg-brand);color:var(--ey-color-text-inverse)}.button.secondary{background:var(--ey-color-bg-default);color:var(--ey-color-text-default);border-color:var(--ey-color-border-subtle)}.button.neutral{background:var(--ey-color-bg-warm);color:var(--ey-color-text-default)}.button:focus-visible{outline:2px solid var(--ey-color-border-focus);outline-offset:3px}.button:hover:not(:disabled){box-shadow:var(--ey-elevation-soft)}.button:disabled{cursor:not-allowed;opacity:var(--ey-opacity-disabled)}`;

class EyButton extends EyElement {
  static observedAttributes = ["intent", "size", "disabled", "loading"];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() { const intent=["primary","secondary","neutral"].includes(this.getAttribute("intent"))?this.getAttribute("intent"):"primary"; const busy=this.hasAttribute("loading"); this.adopt(`<button class="button ${intent} ${size(this.getAttribute("size"))}" type="button" ${busy||this.hasAttribute("disabled")?"disabled":""} aria-busy="${busy}"><slot>${busy?"Loading":"Button"}</slot></button>`,buttonCss); }
}

class EyIconButton extends EyElement {
  static observedAttributes = ["intent", "size", "disabled", "loading", "label"];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() { const intent=["primary","secondary","neutral"].includes(this.getAttribute("intent"))?this.getAttribute("intent"):"primary"; const busy=this.hasAttribute("loading"); const label=this.getAttribute("label")||this.getAttribute("aria-label")||"Icon button"; this.adopt(`<button class="button ${intent} ${size(this.getAttribute("size"))}" type="button" aria-label="${label}" ${busy||this.hasAttribute("disabled")?"disabled":""} aria-busy="${busy}"><slot>•</slot></button>`,`${buttonCss}.button{width:var(--ey-size-control-md);padding:0}.button.sm{width:var(--ey-size-control-sm)}.button.lg{width:var(--ey-size-control-lg)}`); }
}

class EyNavBar extends EyElement {
  static observedAttributes = ["scrolled"];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() { this.adopt(`<header class="nav ${this.hasAttribute("scrolled")?"scrolled":""}"><a class="brand" href="/"><slot name="brand">EyEagle</slot></a><nav><slot name="links"></slot></nav><div class="actions"><slot name="cta"></slot><button class="menu" type="button" aria-label="Open menu"><slot name="menu">☰</slot></button></div></header>`,`.nav{display:flex;align-items:center;gap:var(--ey-space-24);min-height:var(--ey-size-control-lg);padding:var(--ey-space-12) var(--ey-space-24);border-radius:var(--ey-radius-lg);background:transparent}.nav.scrolled{background:var(--ey-color-bg-default);box-shadow:var(--ey-elevation-nav)}.brand{color:inherit;text-decoration:none;font-weight:var(--ey-font-weight-semibold)}nav{display:flex;justify-content:center;gap:var(--ey-space-24);flex:1}nav ::slotted(a){color:inherit;text-decoration:none}.actions{display:flex;align-items:center;gap:var(--ey-space-12)}.menu{display:none;border:0;background:none;font-size:1.25rem}.nav:not(.scrolled){color:var(--ey-color-text-inverse)}@media(max-width:48rem){.nav{padding:var(--ey-space-12) var(--ey-space-16)}nav,.actions ::slotted([slot=cta]){display:none}.menu{display:inline-flex;align-items:center;justify-content:center;min-width:var(--ey-size-touch-min);min-height:var(--ey-size-touch-min)}}`); }
}

class EyMobileMenu extends EyElement {
  static observedAttributes = ["open"];
  connectedCallback() { this.render(); this.addEventListener("keydown", this.onKey); }
  disconnectedCallback() { this.removeEventListener("keydown", this.onKey); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  onKey = (event) => { if (event.key === "Escape") this.removeAttribute("open"); };
  render() { this.adopt(`<aside class="menu" ${this.hasAttribute("open")?"":"hidden"} role="dialog" aria-label="Menu"><button class="close" type="button" aria-label="Close menu">×</button><nav><slot></slot></nav></aside>`,`.menu{display:grid;gap:var(--ey-space-24);padding:var(--ey-space-24);border-radius:var(--ey-radius-lg);background:var(--ey-color-bg-dark);color:var(--ey-color-text-inverse);box-shadow:var(--ey-elevation-raised)}.close{justify-self:end;min-width:var(--ey-size-touch-min);min-height:var(--ey-size-touch-min);border:0;background:transparent;color:inherit;font-size:1.5rem}.menu nav{display:grid;gap:var(--ey-space-16)}.menu nav ::slotted(a){color:inherit;text-decoration:none}`); this.shadowRoot.querySelector(".close")?.addEventListener("click",()=>this.removeAttribute("open")); }
}

class EyTextInput extends EyElement {
  static observedAttributes = ["label", "name", "value", "help", "error", "disabled", "required", "size"];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() { const label=this.getAttribute("label")||"Label", id=this.getAttribute("name")||"input", error=this.getAttribute("error"), help=error||this.getAttribute("help")||""; this.adopt(`<label class="field ${size(this.getAttribute("size"))}" for="${id}"><span class="label">${label}${this.hasAttribute("required")?" *":""}</span><input id="${id}" name="${id}" value="${this.getAttribute("value")||""}" ${this.hasAttribute("disabled")?"disabled":""} ${error?"aria-invalid=\"true\"":""} ${help?`aria-describedby="${id}-help"`:""}/>${help?`<span id="${id}-help" class="help">${help}</span>`:""}</label>`,`.field{display:grid;gap:var(--ey-space-8)}.label{font-size:var(--ey-type-label-default-font-size);line-height:var(--ey-type-label-default-line-height);font-weight:var(--ey-type-label-default-font-weight);letter-spacing:var(--ey-type-label-default-letter-spacing)}input{width:100%;min-height:var(--ey-size-control-md);padding:var(--ey-space-12) var(--ey-space-16);border:1px solid var(--ey-color-border-input);border-radius:var(--ey-radius-sm);background:var(--ey-color-bg-default);color:var(--ey-color-text-default)}input:focus-visible{outline:2px solid var(--ey-color-border-focus);outline-offset:2px}.field.sm input{min-height:var(--ey-size-control-sm)}.field.lg input{min-height:var(--ey-size-control-lg)}.help{font-size:var(--ey-type-body-small-font-size);color:${error?"var(--ey-color-status-error)":"var(--ey-color-text-subtle)"}}`); }
}

class EySelect extends EyElement {
  static observedAttributes = ["label", "name", "options", "error", "disabled", "required", "size"];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() { const label=this.getAttribute("label")||"Select", id=this.getAttribute("name")||"select", error=this.getAttribute("error"), options=(this.getAttribute("options")||"Choose an option").split("|"); this.adopt(`<label class="field ${size(this.getAttribute("size"))}" for="${id}"><span class="label">${label}${this.hasAttribute("required")?" *":""}</span><select id="${id}" name="${id}" ${this.hasAttribute("disabled")?"disabled":""} ${error?"aria-invalid=\"true\"":""}>${options.map(option=>`<option>${option}</option>`).join("")}</select>${error?`<span class="help">${error}</span>`:""}</label>`,`.field{display:grid;gap:var(--ey-space-8)}.label{font-size:var(--ey-type-label-default-font-size);font-weight:var(--ey-type-label-default-font-weight);letter-spacing:var(--ey-type-label-default-letter-spacing)}select{width:100%;min-height:var(--ey-size-control-md);padding:var(--ey-space-12) var(--ey-space-16);border:1px solid var(--ey-color-border-input);border-radius:var(--ey-radius-sm);background:var(--ey-color-bg-default);color:var(--ey-color-text-default)}select:focus-visible{outline:2px solid var(--ey-color-border-focus);outline-offset:2px}.field.sm select{min-height:var(--ey-size-control-sm)}.field.lg select{min-height:var(--ey-size-control-lg)}.help{font-size:var(--ey-type-body-small-font-size);color:var(--ey-color-status-error)}`); }
}

class EyCard extends EyElement { connectedCallback(){this.adopt(`<article class="card"><slot name="title"></slot><slot></slot></article>`,`.card{display:grid;gap:var(--ey-space-stack-md);padding:var(--ey-space-24);border:1px solid var(--ey-color-border-subtle);border-radius:var(--ey-radius-lg);background:var(--ey-color-bg-default);box-shadow:var(--ey-elevation-card)}`);} }
class EyStatusBadge extends EyElement { static observedAttributes=["intent","size"]; connectedCallback(){this.render()} attributeChangedCallback(){this.render()} render(){const intent=["neutral","brand","success","warning","error"].includes(this.getAttribute("intent"))?this.getAttribute("intent"):"neutral"; this.adopt(`<span class="badge ${intent} ${size(this.getAttribute("size"))}" role="status"><slot>${intent}</slot></span>`,`.badge{display:inline-flex;align-items:center;min-height:1.75rem;padding:var(--ey-space-4) var(--ey-space-12);border-radius:var(--ey-radius-full);background:var(--ey-color-bg-warm);color:var(--ey-color-text-default);font-size:var(--ey-type-body-small-font-size);line-height:var(--ey-type-body-small-line-height)}.badge.md{min-height:2rem}.badge.brand{background:var(--ey-color-bg-brand);color:var(--ey-color-text-inverse)}.badge.success{color:var(--ey-color-status-success)}.badge.warning{color:#8a5a00}.badge.error{color:var(--ey-color-status-error)}`);}}

customElements.define("ey-button", EyButton); customElements.define("ey-icon-button", EyIconButton); customElements.define("ey-nav-bar", EyNavBar); customElements.define("ey-mobile-menu", EyMobileMenu); customElements.define("ey-text-input", EyTextInput); customElements.define("ey-select", EySelect); customElements.define("ey-card", EyCard); customElements.define("ey-status-badge", EyStatusBadge);
export { EyButton, EyIconButton, EyNavBar, EyMobileMenu, EyTextInput, EySelect, EyCard, EyStatusBadge };
