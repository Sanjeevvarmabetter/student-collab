import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import NotFound from "./pages/components/NotFound";
import Profile from "./pages/Profile";
import GroupCard from "./pages/Groups";
import Forgot from "./pages/Forgot";
import Todo from "./pages/Todo";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/groups" element={<GroupCard/>} /> */}
        <Route path="/forgotpass" element={<Forgot/>} />
        <Route path="/todo" element={<Todo/>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;