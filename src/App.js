import "./App.css";
import "./output.css";
import RefineRadio from "./RefineRadio";
import Search from "search/Search";
import Home from "./Home";
import Signin from "auth/Signin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<RefineRadio />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}
export default App;
