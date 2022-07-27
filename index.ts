import * as express from "express";
import { firestore, firebase } from "./db";
import { json } from "body-parser";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";

const app = express();
const port = 3045;

app.use(json());
app.use(cors());

app.post("/messages", function (req, res) {
  const chatroomRef = firebase.ref("/chatrooms/general/messages");
  chatroomRef.push(req.body, () => {
    res.json("ok");
  });
});

app.listen(port, () => {
  console.log(`escuchando puerto ${port}`);
});
