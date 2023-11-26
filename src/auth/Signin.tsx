import { useState } from "react";
import BaseFrame from "components/BaseFrame";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signin } from "api/auth";

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = String(location.state?.redirect_to || "/");

  const [inputValue, setInputValue] = useState("");
  const handleClick = async () => {
    const res = await signin(inputValue);

    // サインインできた時だけリダイレクトもとに返す。
    if (res !== 401) {
      navigate(redirectTo, {
        state: { redirect_to: "/" },
      });
    }
  };

  return (
    <BaseFrame>
      <div>
        <h1 className="text-4xl py-4 font-bold text-red-500">
          With great power comes great responsibility
        </h1>
        PASSWORD:
        <input
          type="text"
          className="border-solid border-2 border-black"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="border-solid border-2 border-black ml-4"
          onClick={handleClick}
        >
          confirm
        </button>
      </div>
    </BaseFrame>
  );
};

export default Signin;
