// eslint-disable-next-line
/* eslint-disable */
import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class OrdenesModule extends VuexModule {
  errors = {};
  orden = {};
  response = {};
  ordenes = [] as Array<unknown>;
  ordenesAnio = [] as Array<unknown>;
  ordenesRecientes = [] as Array<unknown>;
  misOrdenes = [] as Array<unknown>;
  ordenesLaboratorio = [] as Array<unknown>;

  get currentOrden(): {} {
    return this.orden;
  }
  get currentOrdenes(): Array<unknown> {
    return this.ordenes;
  }
  get currentOrdenesRecientes(): Array<unknown> {
    return this.ordenesRecientes;
  }
  get currentOrdenesAnio(): Array<unknown> {
    return this.ordenesAnio;
  }
  get currentMisOrdenes(): Array<unknown> {
    return this.misOrdenes;
  }
  get currentOrdenesLaboratorio(): Array<unknown> {
    return this.ordenesLaboratorio;
  }
  get getErrorOrdenes() {
    return this.errors;
  }
  get getResponseOrden() {
    return this.response;
  }


  @Mutation
  [Mutations.SET_ORDEN_RESPONSE](res) {
    this.response = res;
    this.errors = {};
  }
  @Mutation
  [Mutations.SET_ERROR_ORDEN](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_ORDEN](orden) {
    this.orden = orden;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_ORDENES_ANIO](ordenes) {
    this.ordenesAnio = ordenes;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_ORDENES](ordenes) {
    this.ordenes = ordenes;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_ORDENES_RECIENTES](ordenes) {
    this.ordenesRecientes = ordenes;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_MIS_ORDENES](ordenes) {
    this.misOrdenes = ordenes;
    this.errors = {};
  }
  @Mutation
  [Mutations.SET_ORDENES_LABORATORIO](ordenes) {
    this.ordenesLaboratorio = ordenes;
    this.errors = {};
  }

  @Action
  [Actions.LIST_ORDENES](form) {
    return ApiService.get("/ordenes").then(({ data }) => {
      console.log("LIST_ORDENESS data: " , data);
      this.context.commit(Mutations.SET_ORDENES, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_ORDEN, response.data.errors);
    });
  }

  @Action
  [Actions.LIST_ORDENES_ANIO](anio) {
    return ApiService.get("/ordenes-anio/"+anio).then(({ data }) => {
      console.log("LIST_ORDENES_ANIO data: " , data);
      this.context.commit(Mutations.SET_ORDENES_ANIO, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_ORDEN, response.data.errors);
    });
  }

  @Action
  [Actions.LIST_ORDENES_RECIENTES](form) {
    return ApiService.get("/ordenes-recientes").then(({ data }) => {
      console.log("LIST_ORDENES_RECIENTES data: " , data);
      this.context.commit(Mutations.SET_ORDENES_RECIENTES, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_ORDEN, response.data.errors);
    });
  }

  @Action
  [Actions.LIST_MIS_ORDENES](params) {
    return ApiService.get("/mis-ordenes").then(({ data }) => {
      console.log("LIST_MIS_ORDENES data: " , data);
      this.context.commit(Mutations.SET_MIS_ORDENES, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_ORDEN, response.data.errors);
    });
  }

  @Action
  [Actions.LIST_ORDENES_LABORATORIO](params) {
    return ApiService.get("/ordenes-laboratorio").then(({ data }) => {
      console.log("LIST_ORDENES_LABORATORIO data: " , data);
      this.context.commit(Mutations.SET_ORDENES_LABORATORIO, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_ORDEN, response.data.errors);
    });
  }
  
  @Action
  [Actions.UPDATE_ORDEN](form) {
    console.log("UPDATE_ORDEN form: " , form);
    return ApiService.post("/update-orden", form).then(({ data }) => {
      console.log("UPDATE_ORDEN data: " , data);
      this.context.commit(Mutations.SET_ORDEN_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }
  
  @Action
  [Actions.CREATE_ORDEN](form) {
    console.log("CREATE_ORDEN form: " , form);
    return ApiService.post("/order", form).then(({ data }) => {
      console.log("CREATE_ORDEN data: " , data);
      this.context.commit(Mutations.SET_ORDEN_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }

  @Action
  [Actions.DELETE_ORDEN](form) {
    console.log("DELETE_ORDEN form: " , form);
    return ApiService.post("/delete-order", form).then(({ data }) => {
      console.log("DELETE_ORDEN data: " , data);
      this.context.commit(Mutations.SET_ORDEN_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }

}
