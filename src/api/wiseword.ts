import { fetcher } from "./fetcher";

type WisewordBase = {
  phrase: string;
  task_id: number;
  file_id: number;
};

type WisewordCreate = WisewordBase;

// export const getTaskByTitle = async (title: string) => {
//   const url = `${process.env.REACT_APP_DB_API_HOST}/task_by_title`;
//   const data = {
//     method: "POST",
//     body: JSON.stringify({
//       title: title,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   };
//   const res = await fetcher(url, data);
//   return res;
// };

export const getWisewordAll = async () => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/wisewords_all`;
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

// export const deleteTaskById = async (task_id: number) => {
//   const url = `${process.env.REACT_APP_DB_API_HOST}/tasks/${task_id}`;
//   const data = { method: "DELETE" };
//   const res = await fetcher(url, data);
//   return res;
// };
