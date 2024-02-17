import { fetcher } from "./fetcher";

export const getFileById = async (vol: number, file: number) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/file_name_by_vol_file`;
  const data = {
    method: "POST",
    body: JSON.stringify({
      vol_num: vol,
      file_num: file,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const addFile = async (
  vol_num: number,
  file_num: number,
  file_name: string
) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/file_create`;
  const data = {
    method: "POST",
    body: JSON.stringify({
      vol_num: vol_num,
      file_num: file_num,
      file_name: file_name,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const updateFile = async (
  file_id: number,
  vol_num: number,
  file_num: number,
  file_name: string
) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/file_update/${file_id}`;
  const data = {
    method: "PUT",
    body: JSON.stringify({
      vol_num: vol_num,
      file_num: file_num,
      file_name: file_name,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};

export const getPreviousFileId = async (fileId: number) => {
  const url = `${process.env.REACT_APP_DB_API_HOST}/previous_file_id/${fileId}`;
  const data = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const res = await fetcher(url, data);
  return res;
};
