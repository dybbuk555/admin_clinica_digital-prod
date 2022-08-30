<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <LaboratorioModal :item="state.item" :apiAction="apiAction" ></LaboratorioModal>

  <Laboratorios widget-classes="mb-5 mb-xl-8"
  :deleteItem="showAlert" :labs="state.labs" :setItem="setItem"></Laboratorios>
  
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 
import { defineComponent, onMounted, reactive } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Laboratorios from "@/components/widgets/tables/Laboratorios.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import LaboratorioModal from "@/components/modals/forms/Laboratorio.vue";

export default defineComponent({
  name: "Laboratorios-list",
  components: {
    Laboratorios,
    LaboratorioModal
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      labs: [],
      item: [],
    });

    const initTable = async () => {
      await store.dispatch(Actions.LIST_LABORATORIOS, {});
      state.labs = store.getters.currentLaboratorios.laboratorios;
      console.log("state: " , state);

    };
    const setItem = async (item) => {
      state.item = item;
    };
    const apiAction = async (item) => {
      console.log("item: " , item);
      if(item._id == null){
        await store.dispatch(Actions.CREATE_LABORATORIO, item);
        console.log("store.getters.CREATE_LABORATORIO: ", store.getters.getResponseLaboratorio); 
      }else{
        await store.dispatch(Actions.UPDATE_LABORATORIO, item);
        console.log("store.getters.UPDATE_LABORATORIO: ", store.getters.getResponseLaboratorio);
      }

      if (store.getters.getResponseLaboratorio.ok) {
        Swal.fire({
          text: "Laboratorio guardado con exito",
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
        await store.dispatch(Actions.DELETE_LABORATORIO, item);
        console.log("store.getters.DELETE_LABORATORIO: ", store.getters.getResponseLaboratorio); 
      }

      if (store.getters.getResponseLaboratorio.ok) {
        Swal.fire({
          text: "Laboratorio borrado con exito",
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
      setCurrentPageBreadcrumbs("Modulo de Laboratorios", []);
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
