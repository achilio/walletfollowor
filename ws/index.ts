import { WebSocketServer } from "ws";
import { createServer } from "http";
import Transaction from "./src/transaction";

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    console.log(
      `Received message => ${message} from ${req.socket.remoteAddress}`
    );
    ws.send(`Hello, you sent -> ${message}`);
  });
  ws.send("Hello! Message From Server!!");
});

setInterval(() => {
  wss.clients.forEach((client) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const randomTo =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const randomTransaction = {
      from: "0x0000000000000000000000000000000000000000",
      to: randomTo,
      value: Math.random() * 20,
      date: new Date(),
      id: randomId,
    };
    client.send(JSON.stringify(randomTransaction));
  });
}, 2000);

server.listen(8080);
