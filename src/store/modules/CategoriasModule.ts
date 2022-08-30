// eslint-disable-next-line
/* eslint-disable */
import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class CategoriasModule extends VuexModule {
  errors = {};
  response = {};
  categorias = [] as Array<unknown>;

  get currentCategoriass(): Array<unknown> {
    return this.categorias;
  }
  get getErrorCategorias() {
    return this.errors;
  }
  get getResponseCategoria() {
    return this.response;
  }

  @Mutation
  [Mutations.SET_ERROR_CAT](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_CATEGORIAS](categoria) {
    this.categorias = categoria;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_CATEGORIA_RESPONSE](res) {
    this.response = res;
    this.errors = {};
  }

  @Action
  [Actions.LIST_CATEGORIAS](form) {
    return ApiService.get("/category").then(({ data }) => {
      console.log("LIST_CATEGORIASS data: " , data);
      this.context.commit(Mutations.SET_CATEGORIAS, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }
  
  @Action
  [Actions.CREATE_CATEGORIA](form) {
    console.log("CREATE_CATEGORIA form: " , form);
    return ApiService.post("/category", form).then(({ data }) => {
      console.log("CREATE_CATEGORIA data: " , data);
      this.context.commit(Mutations.SET_CATEGORIA_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }
  
  @Action
  [Actions.UPDATE_CATEGORIA](form) {
    console.log("UPDATE_CATEGORIA form: " , form);
    return ApiService.post("/update-category", form).then(({ data }) => {
      console.log("UPDATE_CATEGORIA data: " , data);
      this.context.commit(Mutations.SET_CATEGORIA_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }
  
  @Action
  [Actions.DELETE_CATEGORIA](form) {
    console.log("DELETE_CATEGORIA form: " , form);
    return ApiService.post("/delete-category", form).then(({ data }) => {
      console.log("DELETE_CATEGORIA data: " , data);
      this.context.commit(Mutations.SET_CATEGORIA_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_CAT, response.data.errors);
    });
  }

}
