import "css/App.css";
import "css/output.css";
import Register from "app/register/Register";
import Search from "app/search/Search";
import Home from "app/home/Home";
import Signin from "auth/Signin";
import Signout from "auth/Signout";
import { Routes, Route } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
    </div>
  );
};
export default App;
