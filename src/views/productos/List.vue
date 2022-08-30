<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <ProductoModal :item="state.item" :apiAction="apiAction" :categorias="state.categorias"
    :setPrecio="setPrecio" :precio="state.precioSelected" :labs="state.labs"  ></ProductoModal>

  <Productos widget-classes="mb-5 mb-xl-8" :productos="state.productos"
  :deleteItem="showAlert" :setItem="setItem"></Productos>

</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 
import { defineComponent, onMounted, reactive } from "vue";
import ProductoModal from "@/components/modals/forms/Producto.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Productos from "@/components/widgets/tables/Productos.vue";

export default defineComponent({
  name: "productos-list",
  components: {
    Productos,
    ProductoModal
  },
  setup() {
    const store = useStore();

    const state = reactive({
      item: [],
      productos: [],
      categorias: [],
      precioSelected: {},
      labs: [],
    });

    const listLaboratorios = async () => {
      await store.dispatch(Actions.LIST_LABORATORIOS, {});
      state.labs = store.getters.currentLaboratorios.laboratorios;
    }
    const listCategorias = async () => {
      await store.dispatch(Actions.LIST_CATEGORIAS, {});
      state.categorias = store.getters.currentCategorias.categories;

    };
    const setPrecio = async (item) => {
      console.log("item SELECTED: " , item);
      let cupon = { precio: '', folio: '' }
      if(typeof item.cupon === "undefined"){
        item.cupon = cupon;
      }else if(item.cupon === ""){
        item.cupon = cupon;
      }

      state.precioSelected = item;
    };
    const initTable = async () => {
      await store.dispatch(Actions.LIST_PRODUCTOS, {});
      state.productos = store.getters.currentProductos.products;

    };
    const setItem = async (item) => {
      state.item = item;
    };
    const apiAction = async (item) => {
      console.log("item: " , item);
      if(item._id == null){
        await store.dispatch(Actions.CREATE_PRODUCTO, item);
        console.log("store.getters.CREATE_PRODUCTO: ", store.getters.getResponseProducto); 
      }else{
        await store.dispatch(Actions.UPDATE_PRODUCTO, item);
        console.log("store.getters.UPDATE_PRODUCTO: ", store.getters.getResponseProducto);
      }

      if (store.getters.getResponseProducto.ok) {
        Swal.fire({
          text: "Producto guardado con exito",
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
        await store.dispatch(Actions.DELETE_PRODUCTO, item);
        console.log("store.getters.DELETE_PRODUCTO: ", store.getters.getResponseProducto); 
      }

      if (store.getters.getResponseProducto.ok) {
        Swal.fire({
          text: "Producto borrado con exito",
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
      setCurrentPageBreadcrumbs("Modulo de Productos", []);
      listCategorias();
      listLaboratorios();
      initTable();
    });

    return {
      state,
      initTable,
      setItem,
      apiAction,
      deleteItem,
      setPrecio,
      showAlert
    };
  },
});
</script>
