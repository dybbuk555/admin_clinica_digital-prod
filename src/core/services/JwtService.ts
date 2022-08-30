// eslint-disable-next-line
/* eslint-disable */ 
const ID_TOKEN_KEY = "token" as string;
const ID_ROL_KEY = "role" as string;
const ID_EMAIL_KEY = "email" as string;
const ID_NOMBRE_KEY = "nombre" as string;
const ID_APELLIDO_KEY = "apellido" as string;
const ID_STATE_KEY = "state" as string;
const ID_GOOGLE_KEY = "google" as string;
const ID_CODIGO_PAIS_KEY = "codigoPais" as string;
const ID_FECHA_CREACION_KEY = "fechaCreacion" as string;
const ID_USER_ID_KEY = "_id" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};



export const getRol = (): string | null => {
  return window.localStorage.getItem(ID_ROL_KEY);
};
export const saveRol = (rol: string): void => {
  window.localStorage.setItem(ID_ROL_KEY, rol);
};
export const destroyRol = (): void => {
  window.localStorage.removeItem(ID_ROL_KEY);
};

export const getUser = () => {
  return {
    email: window.localStorage.getItem(ID_EMAIL_KEY),
    nombre: window.localStorage.getItem(ID_NOMBRE_KEY),
    apellido: window.localStorage.getItem(ID_APELLIDO_KEY),
    state: window.localStorage.getItem(ID_STATE_KEY),
    google: window.localStorage.getItem(ID_GOOGLE_KEY),
    codigoPais: window.localStorage.getItem(ID_CODIGO_PAIS_KEY),
    fechaCreacion: window.localStorage.getItem(ID_FECHA_CREACION_KEY),
    _id: window.localStorage.getItem(ID_USER_ID_KEY),
  }
};
export const saveUser = (user): void => {
  window.localStorage.setItem(ID_EMAIL_KEY, user.email);
  window.localStorage.setItem(ID_NOMBRE_KEY, user.nombre);
  window.localStorage.setItem(ID_APELLIDO_KEY, user.apellido);
  window.localStorage.setItem(ID_STATE_KEY, user.state);
  window.localStorage.setItem(ID_GOOGLE_KEY, user.google);
  window.localStorage.setItem(ID_CODIGO_PAIS_KEY, user.codigoPais);
  window.localStorage.setItem(ID_FECHA_CREACION_KEY, user.fechaCreacion);
  window.localStorage.setItem(ID_USER_ID_KEY, user._id);
};
export const destroyUser = (): void => {
  window.localStorage.removeItem(ID_EMAIL_KEY);
  window.localStorage.removeItem(ID_NOMBRE_KEY);
  window.localStorage.removeItem(ID_APELLIDO_KEY);
  window.localStorage.removeItem(ID_STATE_KEY);
  window.localStorage.removeItem(ID_GOOGLE_KEY);
  window.localStorage.removeItem(ID_CODIGO_PAIS_KEY);
  window.localStorage.removeItem(ID_FECHA_CREACION_KEY);
  window.localStorage.removeItem(ID_USER_ID_KEY);
};

export default { getToken, saveToken, destroyToken, 
  getRol, saveRol, destroyRol,
  getUser, saveUser, destroyUser };
