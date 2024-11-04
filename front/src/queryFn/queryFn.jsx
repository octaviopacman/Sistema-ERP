import {handleCustomApiRequest} from "../Shared/ClientShared";

const URL = "http://localhost:8000/api";

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
function tablesByUser(user_id, rol) {
  return handleCustomApiRequest({
    url: `${URL}/tables/${user_id}/${rol}`,
    method: "GET",
    withToken: true,
  });
}
function createTables(user_id, body) {
  return handleCustomApiRequest({
    url: `${URL}/tables/CreateTables/${user_id}`,
    method: "POST",
    body,
    withToken: true,
  });
}
function getValuesTables(tablename) {
  return handleCustomApiRequest({
    url: `${URL}/tablePetitions/${tablename}`,
    method: "GET",
    withToken: true,
  });
}
export {
  registerUser,
  iniciarSesion,
  verifyCookies,
  tablesByUser,
  createTables,
  getValuesTables,
};
