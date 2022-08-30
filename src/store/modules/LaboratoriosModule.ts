// eslint-disable-next-line
/* eslint-disable */
import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class LaboratoriosModule extends VuexModule {
  errors = {};
  response = {};
  laboratorios = [] as Array<unknown>;

  get currentLaboratorios(): Array<unknown> {
    return this.laboratorios;
  }
  get getErrorLaboratorios() {
    return this.errors;
  }
  get getResponseLaboratorio() {
    return this.response;
  }

  @Mutation
  [Mutations.SET_ERROR_LAB](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_LABORATORIOS](laboratorio) {
    this.laboratorios = laboratorio;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_LABORATORIO_RESPONSE](res) {
    this.response = res;
    this.errors = {};
  }

  @Action
  [Actions.LIST_LABORATORIOS](form) {
    return ApiService.get("/laboratorios").then(({ data }) => {
      console.log("LIST_LABORATORIOSS data: " , data);
      this.context.commit(Mutations.SET_LABORATORIOS, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_LAB, response.data.errors);
    });
  }
  
  @Action
  [Actions.CREATE_LABORATORIO](form) {
    console.log("CREATE_LABORATORIO form: " , form);
    return ApiService.post("/laboratorio", form).then(({ data }) => {
      console.log("CREATE_LABORATORIO data: " , data);
      this.context.commit(Mutations.SET_LABORATORIO_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_LAB, response.data.errors);
    });
  }
  
  @Action
  [Actions.UPDATE_LABORATORIO](form) {
    console.log("UPDATE_LABORATORIO form: " , form);
    return ApiService.post("/update-laboratorio", form).then(({ data }) => {
      console.log("UPDATE_LABORATORIO data: " , data);
      this.context.commit(Mutations.SET_LABORATORIO_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_LAB, response.data.errors);
    });
  }
  
  @Action
  [Actions.DELETE_LABORATORIO](form) {
    console.log("DELETE_LABORATORIO form: " , form);
    return ApiService.post("/delete-laboratorio", form).then(({ data }) => {
      console.log("DELETE_LABORATORIO data: " , data);
      this.context.commit(Mutations.SET_LABORATORIO_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_LAB, response.data.errors);
    });
  }

}
