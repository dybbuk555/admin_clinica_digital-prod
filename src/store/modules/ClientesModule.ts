// eslint-disable-next-line
/* eslint-disable */
import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class ClientesModule extends VuexModule {
  errors = {};
  response = {};
  clientes = [] as Array<unknown>;

  get currentClientes(): Array<unknown> {
    return this.clientes;
  }
  get getErrorClientes() {
    return this.errors;
  }
  get getResponseCliente() {
    return this.response;
  }

  @Mutation
  [Mutations.SET_ERROR_CLIENT](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_CLIENTES](cliente) {
    this.clientes = cliente;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_CLIENTE_RESPONSE](res) {
    this.response = res;
    this.errors = {};
  }

  @Action
  [Actions.LIST_CLIENTES](form) {
    return ApiService.get("/users").then(({ data }) => {
      console.log("LIST_CLIENTESS data: " , data);
      this.context.commit(Mutations.SET_CLIENTES, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CLIENT, response.data.errors);
    });
  }
  
  @Action
  [Actions.CREATE_CLIENTE](form) {
    console.log("CREATE_CLIENTE form: " , form);
    return ApiService.post("/user", form).then(({ data }) => {
      console.log("CREATE_CLIENTE data: " , data);
      this.context.commit(Mutations.SET_CLIENTE_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CLIENT, response.data.errors);
    });
  }
  
  @Action
  [Actions.UPDATE_CLIENTE](form) {
    console.log("UPDATE_CLIENTE form: " , form);
    return ApiService.post("/update-user", form).then(({ data }) => {
      console.log("UPDATE_CLIENTE data: " , data);
      this.context.commit(Mutations.SET_CLIENTE_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CLIENT, response.data.errors);
    });
  }
  
  @Action
  [Actions.DELETE_CLIENTE](form) {
    console.log("DELETE_CLIENTE form: " , form);
    return ApiService.post("/delete-user", form).then(({ data }) => {
      console.log("DELETE_CLIENTE data: " , data);
      this.context.commit(Mutations.SET_CLIENTE_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CLIENT, response.data.errors);
    });
  }

}
