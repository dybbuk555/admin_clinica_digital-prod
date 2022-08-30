<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <ClienteModal :item="state.item" :apiAction="apiAction" ></ClienteModal>

  <Clientes widget-classes="mb-5 mb-xl-8"
  :deleteItem="showAlert" :clientes="state.clientes" :setItem="setItem"></Clientes>
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 
import { defineComponent, onMounted, reactive } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Clientes from "@/components/widgets/tables/Clientes.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import ClienteModal from "@/components/modals/forms/Cliente.vue";

export default defineComponent({
  name: "clientes-list",
  components: {
    Clientes,
    ClienteModal
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      clientes: [],
      item: [],
    });

    const initTable = async () => {
      await store.dispatch(Actions.LIST_CLIENTES, {});
      state.clientes = store.getters.currentClientes.users;
      console.log("state: " , state);

    };
    const setItem = async (item) => {
      state.item = item;
    };
    const apiAction = async (item) => {
      console.log("item: " , item);
      if(item._id == null){
        await store.dispatch(Actions.CREATE_CLIENTE, item);
        console.log("store.getters.CREATE_CLIENTE: ", store.getters.getResponseCliente); 
      }else{
        await store.dispatch(Actions.UPDATE_CLIENTE, item);
        console.log("store.getters.UPDATE_CLIENTE: ", store.getters.getResponseCliente);
      }

      if (store.getters.getResponseCliente.ok) {
        Swal.fire({
          text: "Cliente guardado con exito",
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
        await store.dispatch(Actions.DELETE_CLIENTE, item);
        console.log("store.getters.DELETE_CLIENTE: ", store.getters.getResponseCliente); 
      }

      if (store.getters.getResponseCliente.ok) {
        Swal.fire({
          text: "Cliente borrado con exito",
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
      setCurrentPageBreadcrumbs("Modulo de Clientes", []);
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
