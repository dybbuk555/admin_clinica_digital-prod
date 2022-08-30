<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <CategoriaModal :item="state.item" :apiAction="apiAction" ></CategoriaModal>

  <Categorias widget-classes="mb-5 mb-xl-8"
  :deleteItem="showAlert" :categorias="state.categorias" :setItem="setItem"></Categorias>
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 
import { defineComponent, onMounted, reactive } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Categorias from "@/components/widgets/tables/Categorias.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import CategoriaModal from "@/components/modals/forms/Categoria.vue";

export default defineComponent({
  name: "categorias-list",
  components: {
    Categorias,
    CategoriaModal
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      categorias: [],
      item: [],
    });

    const initTable = async () => {
      await store.dispatch(Actions.LIST_CATEGORIAS, {});
      state.categorias = store.getters.currentCategoriass.categories;
      console.log("state: " , state);

    };
    const setItem = async (item) => {
      state.item = item;
    };
    const apiAction = async (item) => {
      console.log("item: " , item);
      if(item._id == null){
        await store.dispatch(Actions.CREATE_CATEGORIA, item);
        console.log("store.getters.CREATE_CATEGORIA: ", store.getters.getResponseCategoria); 
      }else{
        await store.dispatch(Actions.UPDATE_CATEGORIA, item);
        console.log("store.getters.UPDATE_CATEGORIA: ", store.getters.getResponseCategoria);
      }

      if (store.getters.getResponseCategoria.ok) {
        Swal.fire({
          text: "Categoria guardado con exito",
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
        await store.dispatch(Actions.DELETE_CATEGORIA, item);
        console.log("store.getters.DELETE_CATEGORIA: ", store.getters.getResponseCategoria); 
      }

      if (store.getters.getResponseCategoria.ok) {
        Swal.fire({
          text: "Categoria borrado con exito",
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
      setCurrentPageBreadcrumbs("Modulo de Categorias", []);
      initTable();
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
