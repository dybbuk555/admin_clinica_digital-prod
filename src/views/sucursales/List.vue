<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <SucursalModal :item="state.item" :apiAction="apiAction" :laboratorios="state.laboratorios" 
    :productos="state.productos" ></SucursalModal>

  <Sucursales widget-classes="mb-5 mb-xl-8"
  :deleteItem="showAlert" :sucursales="state.sucursales" :setItem="setItem"></Sucursales>
  
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 
import { defineComponent, onMounted, reactive } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Sucursales from "@/components/widgets/tables/Sucursales.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import SucursalModal from "@/components/modals/forms/Sucursal.vue";

export default defineComponent({
  name: "sucursales-list",
  components: {
    Sucursales,
    SucursalModal
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      sucursales: [],
      productos: [],
      laboratorios: [],
      item: [],
    });

    const initTable = async () => {
      await store.dispatch(Actions.LIST_SUCURSALES, {});
      state.sucursales = store.getters.currentSucursales.sucursales;
      console.log("store.getters.currentSucursales: " , store.getters.currentSucursales);

    };
    const listLaboratorios = async () => {
      await store.dispatch(Actions.LIST_LABORATORIOS, {});
      state.laboratorios = store.getters.currentLaboratorios.laboratorios;
    };
    const listProductos = async () => {
      await store.dispatch(Actions.LIST_PRODUCTOS, {});
      state.productos = store.getters.currentProductos.products;
    };
    const setItem = async (item) => {
      console.log("item: " , item);
      state.item = item;
    };
    const apiAction = async (item) => {
      if(item.nuevo == ''){
        delete item.nuevo;

        await store.dispatch(Actions.CREATE_SUCURSAL, item);
        console.log("store.getters.CREATE_SUCURSAL: ", store.getters.getResponseSucursal); 
      }else{
        await store.dispatch(Actions.UPDATE_SUCURSAL, item);
        console.log("store.getters.UPDATE_SUCURSAL: ", store.getters.getResponseSucursal);
      }

      if (store.getters.getResponseSucursal.ok) {
        Swal.fire({
          text: "Sucursal guardada con exito",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          initTable();
        });
      }
      
    }
    
    const showAlert = (item) => {
      Swal.fire({
        title: 'AVISO',
        text: "¿Deseas borrar este registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          deleteItem(item);
          // Swal.fire('AVISO','Registro borrado con exito.', 'success')
        }
      })
    }

    const deleteItem = async (item) => {
      if(item._id != null){
        await store.dispatch(Actions.DELETE_SUCURSAL, item);
        console.log("store.getters.DELETE_SUCURSAL: ", store.getters.getResponseSucursal); 
      }

      if (store.getters.getResponseSucursal.ok) {
        Swal.fire({
          text: "Sucursal borrada con exito",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          initTable();
        });
      }
      
    }

    onMounted(async () => {
      setCurrentPageBreadcrumbs("Modulo de Sucursales", []);
      initTable();
      listLaboratorios();
      listProductos();
    });

    return {
      state,
      initTable,
      setItem,
      apiAction,
      deleteItem,
      showAlert
    };
  },
});
</script>
