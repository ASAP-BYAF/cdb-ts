import { fetcher } from "./fetcher";

export const getTaskByTitle = async (title: string) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/task_by_title`;
  const data = {
    method: "POST",
    body: JSON.stringify({
      title: title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const getTaskAll = async () => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/tasks`;
  const data = { method: "GET" };
  const res = await fetcher(url, data);
  return res;
};

export const addTask = async (title: string) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/tasks`;
  const data = {
    method: "POST",
    body: JSON.stringify({
      title: title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const updateTask = async (id: number, title: string) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/tasks/${id}`;
  const data = {
    method: "PUT",
    body: JSON.stringify({
      title: title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const deleteTaskById = async (task_id: number) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/tasks/${task_id}`;
  const data = { method: "DELETE" };
  const res = await fetcher(url, data);
  return res;
};
