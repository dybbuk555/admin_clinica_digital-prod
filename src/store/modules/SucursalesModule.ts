// eslint-disable-next-line
/* eslint-disable */
import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class SucursalesModule extends VuexModule {
  errors = {};
  response = {};
  sucursales = [] as Array<unknown>;
  sucursaless = [] as Array<unknown>;

  get currentSucursaless(): Array<unknown> {
    return this.sucursaless;
  }
  get currentSucursales(): Array<unknown> {
    return this.sucursales;
  }
  get getErrorSucursals() {
    return this.errors;
  }
  get getResponseSucursal() {
    return this.response;
  }

  @Mutation
  [Mutations.SET_ERROR_CAT](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_SUCURSALES](sucursal) {
    this.sucursales = sucursal;
    this.errors = {};
  }
  @Mutation
  [Mutations.SET_SUCURSALESS](sucursal) {
    this.sucursaless = sucursal;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_SUCURSAL_RESPONSE](res) {
    this.response = res;
    this.errors = {};
  }

  @Action
  [Actions.LIST_SUCURSALES](form) {
    return ApiService.get("/sucursales").then(({ data }) => {
      console.log("LIST_SUCURSALSS data: " , data);
      this.context.commit(Mutations.SET_SUCURSALES, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }

  @Action
  [Actions.LIST_SUCURSALESS](form) {
    return ApiService.get("/list-sucursales").then(({ data }) => {
      console.log("LIST_SUCURSALSS data: " , data);
      this.context.commit(Mutations.SET_SUCURSALESS, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }
  
  @Action
  [Actions.CREATE_SUCURSAL](form) {
    console.log("CREATE_SUCURSAL form: " , form);
    return ApiService.post("/sucursal", form).then(({ data }) => {
      console.log("CREATE_SUCURSAL data: " , data);
      this.context.commit(Mutations.SET_SUCURSAL_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }
  
  @Action
  [Actions.UPDATE_SUCURSAL](form) {
    console.log("UPDATE_SUCURSAL form: " , form);
    return ApiService.post("/update-sucursal", form).then(({ data }) => {
      console.log("UPDATE_SUCURSAL data: " , data);
      this.context.commit(Mutations.SET_SUCURSAL_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }
  
  @Action
  [Actions.DELETE_SUCURSAL](form) {
    console.log("DELETE_SUCURSAL form: " , form);
    return ApiService.post("/delete-sucursal", form).then(({ data }) => {
      console.log("DELETE_SUCURSAL data: " , data);
      this.context.commit(Mutations.SET_SUCURSAL_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }

}
