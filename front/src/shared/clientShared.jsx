import Cookies from "js-cookie";

export const handleCustomApiRequest = async ({
  url,
  method,
  body,
  withToken,
}) => {
  const cookie = Cookies.get();
  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Request-Headers": "Content-Type",
    "Access-Control-Request-Method": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  };
  if (withToken) {
    headers.Authorization = `Bearer ${cookie.token}`;
  }
  const fetching = await fetch(url, {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  const response = await fetching.json();
  return response;
};
