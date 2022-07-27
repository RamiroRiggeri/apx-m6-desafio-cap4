import { firebaseConfig, app, rtdb } from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import map from "lodash/map";
const API_BASE_URL = "http://localhost:3045";

type Message = {
  from: string;
  message: string;
};

const state = {
  data: {
    nombre: "",
    messages: "",
  },
  listeners: [],
  init() {
    const currState = this.getState();
    const chatroomRef = ref(rtdb, "/chatrooms/general");
    onValue(chatroomRef, (snapshot) => {
      const messagesFromServer = snapshot.val();
      if (messagesFromServer !== null) {
        const messagesList = map(messagesFromServer.messages);
        currState.messages = messagesList;
        this.setState(currState);
      }
    });
  },
  getState() {
    return this.data;
  },
  setNombre(nombre: string) {
    const currState = this.getState();
    currState.nombre = nombre;
    this.setState(currState);
  },
  pushMessage(message: string) {
    const nombreDelState = this.data.nombre;
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: nombreDelState,
        message: message,
      }),
    });
  },
  setState(newState) {
    this.data = newState;
    for (const callback of this.listeners) {
      callback();
    }
    console.log("cambió el state", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
