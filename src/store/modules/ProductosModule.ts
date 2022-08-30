// eslint-disable-next-line
/* eslint-disable */
import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class ProductosModule extends VuexModule {
  errors = {};
  response = {};
  productos = [] as Array<unknown>;
  productosByIdSucursal = [] as Array<unknown>;
  categorys = [] as Array<unknown>;
  
  get currentProductos(): Array<unknown> {
    return this.productos;
  }
  get currentProductosByIdSucursal(): Array<unknown> {
    return this.productosByIdSucursal;
  }
  get currentCategorias(): Array<unknown> {
    return this.categorys;
  }
  get getErrorProductos() {
    return this.errors;
  }
  get getResponseProducto() {
    return this.response;
  }

  @Mutation
  [Mutations.SET_ERROR_PRODUCT](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_PRODUCTO_RESPONSE](res) {
    this.response = res;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_PRODUCTOS](productos) {
    this.productos = productos;
    this.errors = {};
  }
  @Mutation
  [Mutations.SET_PRODUCTOS_BY_ID_SUCURSAL](productos) {
    this.productosByIdSucursal = productos;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_CATEGORIAS](categorys) {
    this.categorys = categorys;
    this.errors = {};
  }
  
  @Action
  [Actions.LIST_CATEGORIAS](form) {
    return ApiService.get("/category").then(({ data }) => {
      this.context.commit(Mutations.SET_CATEGORIAS, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_PRODUCT, response.data.errors);
    });
  }
  
  @Action
  [Actions.LIST_PRODUCTOS](form) {
    return ApiService.get("/products").then(({ data }) => {
      this.context.commit(Mutations.SET_PRODUCTOS, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_PRODUCT, response.data.errors);
    });
  }
  @Action
  [Actions.LIST_PRODUCTOS_BY_ID_SUCURSAL](form) {
    return ApiService.get("/list-products-by-idsucursal/" + form).then(({ data }) => {
      this.context.commit(Mutations.SET_PRODUCTOS_BY_ID_SUCURSAL, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_PRODUCT, response.data.errors);
    });
  }
  
  @Action
  [Actions.CREATE_PRODUCTO](form) {
    console.log("CREATE_PRODUCTO form: " , form);
    return ApiService.post("/products", form).then(({ data }) => {
      console.log("CREATE_PRODUCTO data: " , data);
      this.context.commit(Mutations.SET_PRODUCTO_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_PRODUCT, response.data.errors);
    });
  }
  
  @Action
  [Actions.UPDATE_PRODUCTO](form) {
    console.log("UPDATE_PRODUCTO form: " , form);
    return ApiService.post("/update-producto", form).then(({ data }) => {
      console.log("UPDATE_PRODUCTO data: " , data);
      this.context.commit(Mutations.SET_PRODUCTO_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_PRODUCT, response.data.errors);
    });
  }
  
  @Action
  [Actions.DELETE_PRODUCTO](form) {
    console.log("DELETE_PRODUCTO form: " , form);
    return ApiService.post("/delete-producto", form).then(({ data }) => {
      console.log("DELETE_PRODUCTO data: " , data);
      this.context.commit(Mutations.SET_PRODUCTO_RESPONSE, data);
    }).catch(({ response }) => {
      this.context.commit(Mutations.SET_ERROR_PRODUCT, response.data.errors);
    });
  }

}
