import { fetcher } from "./fetcher.js";

type SigninRetProps = { message: string } | number;
type SignoutRetProps = { message: string } | number;
type ConfirmRetProps = { message: string } | number;

export const signin = async (pass: string): Promise<SigninRetProps> => {
  const url = `${process.env.REACT_APP_AUTH_API_HOST}/signin`;
  const data = {
    method: "POST",
    body: JSON.stringify({
      password: pass,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  };
  const res = await fetcher(url, data);
  return res;
};

export const confirm = async (): Promise<ConfirmRetProps> => {
  const url = `${process.env.REACT_APP_AUTH_API_HOST}/confirm`;
  const data = {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  };
  const res = await fetcher(url, data);
  return res;
};

export const signout = async (): Promise<SignoutRetProps> => {
  const url = `${process.env.REACT_APP_AUTH_API_HOST}/signout`;
  const data = {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  };
  const res = await fetcher(url, data);
  return res;
};
