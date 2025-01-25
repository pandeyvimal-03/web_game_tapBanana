import { io } from "socket.io-client";
import { getStorage} from "../utils";
import constant from "../constant";

const socket = io(process.env.REACT_APP_BASE_URL, {
    auth: {
      token: `Bearer ${getStorage(constant.keys.token)}`, 
    },
    transports: ["websocket"], // Ensure WebSocket connection
  });
  
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });
  
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
  
  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });
  
  export default socket;
