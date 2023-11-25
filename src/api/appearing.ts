import { fetcher } from "./fetcher";

export const getAppearingAll = async () => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/appearings`;
  const data = { method: "GET" };
  const res = await fetcher(url, data);
  return res;
};
export const getAppearingWithFileId = async (file_id: number) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/appearing_with_file_id/${file_id}`;
  const data = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const addAppearing = async (
  file_id: number,
  task_id: number,
  appearing_detail_id: number
) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/appearing_create`;
  const data = {
    method: "POST",
    body: JSON.stringify({
      file_id: file_id,
      task_id: task_id,
      appearing_detail_id: appearing_detail_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const updateAppearing = async (
  file_id: number,
  task_id: number,
  appearing_detail_id: number
) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/appearing_update`;
  const data = {
    method: "PUT",
    body: JSON.stringify({
      file_id: file_id,
      task_id: task_id,
      appearing_detail_id: appearing_detail_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const deleteAppearing = async (file_id: number, task_id: number) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/appearing_delete`;
  const data = {
    method: "DELETE",
    body: JSON.stringify({
      file_id: file_id,
      task_id: task_id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};
