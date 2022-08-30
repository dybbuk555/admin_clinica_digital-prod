// eslint-disable-next-line
/* eslint-disable */

import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  api_token: string;
}


@Module
export default class AuthModule extends VuexModule {
  errors = {};
  // user = {} as User;
  user = JwtService.getUser() != null ? JwtService.getUser() : {
    email: "",
    nombre: "",
    apellido: "",
    state: "",
    google: "",
    codigoPais: "",
    fechaCreacion: "",
    _id: "",
  };
  isAuthenticated = !!JwtService.getToken();
  rol = JwtService.getRol() != null ? JwtService.getRol() : '';

  rutas = {
    'ADMIN': 'welcome',
    'CALL_CENTER': 'welcome',
    'CLIENTE': 'profile-mis-ordenes',
    'LABORATORIO': 'mis-ordenes',
  };

  /**
   * Get current user object
   * @returns User
   */
  get currentRouter() {
    return this.rutas;
  }
  get currentUser() {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  get currentRol() {
    return this.rol;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_AUTH](data) {
    console.log("data: ", data);
    this.isAuthenticated = true;
    this.user = data.user;
    this.errors = {};
    this.rol = data.user.role;
    JwtService.saveRol(data.user.role);
    JwtService.saveToken(data.token);
    JwtService.saveUser(data.user);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }


  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {
      email: "",
      nombre: "",
      apellido: "",
      state: "",
      google: "",
      codigoPais: "",
      fechaCreacion: "",
      _id: ""};
    this.errors = [];
    JwtService.destroyRol();
    JwtService.destroyToken();
    JwtService.destroyUser();
  }

  @Action
  [Actions.LOGIN](credentials) {
    return ApiService.post("login", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post("forgot_password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.VERIFY_AUTH](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          this.context.commit(Mutations.PURGE_AUTH);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
