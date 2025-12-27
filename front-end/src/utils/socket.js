import io from "socket.io-client" //for frontend connections
export const createSocketConnection =()=>{
return io("http://localhost:3000")
}