import {handleCustomApiRequest} from "../Shared/ClientShared";

const URL = "http://localhost:3000/api";

function registerUser({body}) {
  return handleCustomApiRequest({
    url: `${URL}/register`,
    method: "POST",
    body,
  });
}
function iniciarSesion({body}) {
  return handleCustomApiRequest({
    url: `${URL}/login`,
    method: "POST",
    body,
  });
}
function verifyCookies() {
  return handleCustomApiRequest({
    url: `${URL}/verify`,
    method: "GET",
    withToken: true,
  });
}

export {registerUser, iniciarSesion, verifyCookies};
