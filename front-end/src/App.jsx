import { BrowserRouter, Routes,Route } from "react-router-dom";
import Navabar from "./Navabar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import {Provider} from "react-redux"
import appStore from "./utils/appStore";
import Feed from "./Feed";
import Connections from "./Connections";
import Request from "./Request";
import Premium from "./Premium";
import Chat from "./Chat";
function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/connections" element={<Connections/>}/>
         <Route path="/requests" element={<Request/>}/>
         <Route path="/premium" element={<Premium/>}/>
         <Route path="/chat/:targetUserId" element={<Chat/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
