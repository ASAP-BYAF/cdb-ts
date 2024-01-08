import "css/App.css";
import "css/output.css";
import Search from "app/search/Search";
import Signin from "auth/Signin";
import Signout from "auth/Signout";
import { Routes, Route } from "react-router-dom";
import Register from "app/register/Register";
import Wiseword from "app/wiseword/Wiseword";
import File from "app/file/File";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wiseword" element={<Wiseword />} />
        <Route path="/file" element={<File />} />
        <Route path="/admin" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
    </div>
  );
};
export default App;
