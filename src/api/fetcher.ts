export const fetcher = async (resource: string, data: RequestInit) => {
  const res = await fetch(resource, data);
  const resJson = await res.json();
  if (!res.ok) {
    const error = new Error(
      resJson.detail ?? "API リクエスト中にエラーが発生しました。"
    );

    console.error(error);
    resJson && alert(resJson.detail);

    return res.status;
  } else {
    return resJson;
  }
};
