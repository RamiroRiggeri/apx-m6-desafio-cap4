import { state } from "../state";

type Message = {
  from: string;
  message: string;
};
class Chat extends HTMLElement {
  connectedCallback() {
    state.subscribe(() => {
      const currState = state.getState();
      this.messages = currState.messages;
      this.render();
    });
    this.render();
  }
  addListeners() {
    const form = this.querySelector(".submit-message");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      state.pushMessage(target["new-message"].value);
    });
  }
  messages: Message[] = [];
  render() {
    this.innerHTML = `
    <div>
      <h2>Chat Page</h2>
      <div class="messages">
        ${this.messages
          .map((msg) => {
            return `<div class="message">${msg.from}:${msg.message}</div>`;
          })
          .join("")}
      </div>
      <form class="submit-message">
        <input type="text" name="new-message">
        <button>Enviar</button>
      </form>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("chat-page", Chat);
