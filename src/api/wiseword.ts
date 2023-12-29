import { fetcher } from "./fetcher";

export type WisewordGet = {
  id: number;
  phrase: string;
  title: string;
  vol_num: number;
  file_num: number;
};

export type WisewordCreate = {
  phrase: string;
  task_id: number;
  file_id: number;
};

export const getWisewordAll = async () => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/wisewords_all`;
  const data = { method: "GET" };
  const res = await fetcher(url, data);
  return res;
};

export const getWisewordByFileId = async (
  file_id: number
): Promise<WisewordGet[]> => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/wisewords_by_file_id/${file_id}`;
  const data = { method: "GET" };
  const res = await fetcher(url, data);
  return res;
};

export const createWiseword = async (props: WisewordCreate) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/wiseword_create`;
  const data = {
    method: "POST",
    body: JSON.stringify(props),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const updateWiseword = async (id: number, props: WisewordCreate) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/wiseword_update/${id}`;
  const data = {
    method: "PUT",
    body: JSON.stringify(props),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const deleteWisewordById = async (wiseword_id: number) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/wiseword_delete/${wiseword_id}`;
  const data = { method: "DELETE" };
  const res = await fetcher(url, data);
  return res;
};
