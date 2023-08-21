class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = {
      title: "",
      content: "",
    };
  }

  static get observedAttributes() {
    return ["title", "content"];
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section>
        <h2>${this.data.title}</h2>
        <div>
          <p>${this.data.content}</p>
        </div>
      </section>
    `;
    return template;
  }

  render() {
    this.shadowRoot.innerHTML = ''; // Limpiar contenido existente
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'title':
        this.data.title = newVal;
        this.render(); // Volver a renderizar para actualizar el título
        break;
      case 'content':
        this.data.content = newVal;
        this.render(); // No es necesario volver a renderizar el contenido, pero podrías hacerlo si es necesario
        break;
      default:
        console.warn("error on attributeChangeCallBack");
    }
  }
}

customElements.define("super-card", Card);
