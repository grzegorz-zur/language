"use strict";

class Language extends CustomEvent {

 static ID = "language";
 code;
 translations;

 constructor(code, translations) {
  super(Language.ID, { detail: { code, translations } });
 }

}
 
async function language(code) {
 const response = await fetch(`${code}.json`);
 const translations = await response.json();
 const event = new Language(code, translations);
 document.dispatchEvent(event);
}

class Selector extends HTMLElement {

 id;

 constructor() {
  super();
  const shadow = this.attachShadow({ mode: "open" });
  const style = document.querySelector("#style").cloneNode(true);
  shadow.appendChild(style);
  const content = document.querySelector("#language-selector").content.cloneNode(true);
  content.querySelector("select").addEventListener("change", (event) => this.select(event));
  shadow.appendChild(content);
  document.addEventListener(Language.ID, (event) => this.language(event));
 }

 select(event) {
  language(event.target.value);
 }

 language(event) {
  this.shadowRoot.querySelector("select").value = event.detail.code;
  this.shadowRoot.querySelectorAll("[data-translation]").forEach(
   (node) => {
    const key = node.attributes["data-translation"].value;
    const translation = event.detail.translations[key];
    node.textContent = translation;
   }
  );
 }

}

customElements.define("language-selector", Selector);

function init() {
 language("en");
}

window.addEventListener("load", init);
