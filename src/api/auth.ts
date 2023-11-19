import { fetcher } from "./fetcher.js";

type SigninRetProps = { message: string } | number;
type ConfirmRetProps = { message: string } | number;

export const signin = async (pass: string): Promise<SigninRetProps> => {
  const url = `http://localhost:8000/auth/signin`;
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
  const url = `http://localhost:8000/auth/confirm`;
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
