class Selector extends HTMLElement {

 static ID = 0;
 
 id;

 constructor() {
  super();
  this.id = ++Selector.ID;
  console.log(this.id);
  const content = document.querySelector("#lang-selector").content.cloneNode(true);
  content.querySelector("select").addEventListener("change", (event) => this.select(event));
  document.addEventListener("lang-change", (event) => this.change(event));
  document.addEventListener("lang-changed", (event) => this.changed(event));
  const style = document.querySelector("#style").cloneNode(true);
  const shadow = this.attachShadow({ mode: "open" });
  shadow.appendChild(style);
  shadow.appendChild(content);
 }

 select(event) {
  console.log(this.id, "select");
  const change = new CustomEvent("lang-change", { detail: { id: this.id, value: event.target.value } });
  change.lang = event.target.value;
  document.dispatchEvent(change);
 }

 change(event) {
  console.log(this.id, "change", event.detail);
  this.shadowRoot.querySelector("select").value = event.detail.value;
 }

 changed(event) {
  console.log(this.id, "changed", event.detail);
 }

}

customElements.define("lang-selector", Selector);
