// <script></script>
class Modal extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.
    this.attachShadow({mode: "open"})
    this.modalContainer = document.createElement("div");
    this.modalBtnId = null;
    this.counter = 0
  }
  static get observedAttributes() {
    return ["button-modal"];
  }

  toggleModal() {
    const dataShow = this.getAttribute("data-show");
    const isShow = dataShow === "true" ? true : false;
    if(isShow) {
      this.classList.add("d-none");
      this.classList.remove("d-block");
      this.setAttribute("data-show", "false");
      console.log("cerrar");
    }else {
      this.setAttribute("data-show", "true");
      this.classList.remove("d-none");
      this.classList.add("d-block");
      console.log("abrir");
    }
  }
  next() {
    const card = document.querySelector("super-card#card-one");
    console.log("card");
    this.counter = this.counter + 1;
    console.log(this.counter)
    card.setAttribute("title", `cambio el titulo ${this.counter}`)
  }
  render() {
    this.classList.add("d-none");
    
    this.modalContainer.classList.add("modalContainer");

    this.modalContainer.innerHTML = /* html */` 
      <div class="modalContainer__content">
        <div class="modalContainer__content__close">
          <button id="toggleModalBtn">
          </button>
        </div>
        <slot></slot>
        <button id="siguiente">
          siguiente
        </button>
      </div>
    `
    return this.modalContainer;
  }
  getStyles() {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "../styles/styles.css";
    this.shadowRoot.appendChild(styleLink);
  }
  connectedCallback() {
    this.getStyles();
    console.log(this.modalBtnId)
    this.shadowRoot.appendChild(this.render())
    this.setAttribute("data-show", "false"); 
    const outModalBtn = document.querySelector(`#${this.modalBtnId}`);
    outModalBtn.addEventListener("click", () => {
      this.toggleModal()
    })
    this.modalContainer.addEventListener("click", (event) => {
      if(event.target.id === "toggleModalBtn") {
        this.toggleModal()
      }
      if(event.target.id === "siguiente") {
        this.next();
      }
    })

  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    
    switch (attrName) {
      case 'button-modal':
        this.modalBtnId = newVal
        break;
      default:
        console.warn("error on attributeChangeCallBack")
    }
  }
  disconnectedCallback() {
  }

}

window.customElements.define('super-modal', Modal);