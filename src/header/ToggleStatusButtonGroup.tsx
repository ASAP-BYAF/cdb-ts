import { useState } from "react";
import ToggleStatusButton from "./ToggleStatusButton";
import { confirm } from "api/auth";

const ToggleStatusButtonGroup = (): JSX.Element => {
  type Status = "" | "in" | "out";
  const [signinFlag, setSigninFlag]: [
    Status,
    React.Dispatch<React.SetStateAction<Status>>
  ] = useState<Status>("");

  const confirmSignin = async () => {
    const res = await confirm();

    // サインインが確認できなかった時はサインイン画面にリダイレクト
    if (res === 401) {
      setSigninFlag("out");
    } else {
      setSigninFlag("in");
    }
  };

  confirmSignin();

  return (
    <>
      {signinFlag === "" ? (
        <ToggleStatusButton link="/" label="Now Loading..." />
      ) : undefined}
      {signinFlag === "in" ? (
        <ToggleStatusButton link="/signout" label="サインアウト" />
      ) : undefined}
      {signinFlag === "out" ? (
        <ToggleStatusButton link="/signin" label="サインイン" />
      ) : undefined}
    </>
  );
};

export default ToggleStatusButtonGroup;
