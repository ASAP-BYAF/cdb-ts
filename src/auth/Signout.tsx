import BaseFrame from "components/BaseFrame";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signout } from "api/auth";

const Signout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = String(location.state?.redirect_to || "/");

  const handleClick = async () => {
    const res = await signout();

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
        <h1 className="text-4xl py-4 font-bold text-red-500">Signout</h1>
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

export default Signout;
