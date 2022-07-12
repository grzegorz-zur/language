let translations = {};

class LanguageChange extends CustomEvent {

 static ID = "language-change";
  
 code;

 constructor(code) {
  super(LanguageChange.ID, { detail: { code } });
 }

}
 
async function language(code) {
 const response = await fetch(`${code}.json`);
 translations = await response.json();
 document.dispatchEvent(new LanguageChange(code));
} 

class Selector extends HTMLElement {

 static ID = 0;
 
 id;

 constructor() {
  super();
  this.id = ++Selector.ID;
  console.log(this.id);
  const content = document.querySelector("#lang-selector").content.cloneNode(true);
  content.querySelector("select").addEventListener("change", (event) => this.select(event));
  document.addEventListener(LanguageChange.ID, (event) => this.change(event));
  const style = document.querySelector("#style").cloneNode(true);
  const shadow = this.attachShadow({ mode: "open" });
  shadow.appendChild(style);
  shadow.appendChild(content);
 }

 select(event) {
  console.log(this.id, "select");
  language(event.target.value);
 }

 change(event) {
  console.log(this.id, "change", event.detail);
  this.shadowRoot.querySelector("select").value = event.detail.code;
 }

}

customElements.define("lang-selector", Selector);
