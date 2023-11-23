import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirm } from "api/auth";

const useAuthGuard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const confirmSignin = async () => {
      const res = await confirm();

      // サインインが確認できなかった時はサインイン画面にリダイレクト
      if (res === 401) {
        const currentPath = window.location.pathname;

        navigate("/signin", {
          state: { redirect_to: currentPath },
        });
      }
    };

    confirmSignin();
  }, [navigate]);
};

export default useAuthGuard;
