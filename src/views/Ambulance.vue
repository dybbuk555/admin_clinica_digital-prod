<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  
  <div class="row gy-5 g-xl-8" >

    <div class="col-xxl-4">
      <MixedWidget15
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
      ></MixedWidget15>
    </div>

    <div class="col-xxl-4" v-if="state.rol == 'ADMIN'">
      <Actividades :ordenes="state.ordenes"
        :setOrden="setOrden"
        widget-classes="card-xxl-stretch mb-5 mb-xl-10"
      ></Actividades>
    </div>

    <div class="col-xxl-4" v-if="state.rol == 'ADMIN'">
      <MixedWidget7
        widget-classes="card-xxl-stretch-50 mb-5 mb-xl-8"
        chart-color="primary"
        chart-height="150"
      ></MixedWidget7>
      <Ventas
        widget-classes="card-xxl-stretch-50 mb-5 mb-xl-8"
        chart-color="primary"
        chart-height="168" :ordenes="state.ordenesAnio"
      ></Ventas>
    </div>

  <!-- </div>


  <div class="row g-5 gx-xxl-8"> -->
    <div :class="state.rol != 'ADMIN' ? 'col-xxl-8' : 'col-xxl-12'" >
      <UltimasOrdenes
        widget-classes="card-xxl-stretch mb-5 mb-xxl-8"
        :ordenes="state.ordenes"
        :setOrden="setOrden"
      ></UltimasOrdenes>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 
import { defineComponent, onMounted, reactive } from "vue";
import UltimasOrdenes from "@/components/widgets/tables/Widget5.vue";
import Actividades from "@/components/widgets/lists/Actividades.vue";
import MixedWidget15 from "@/components/widgets/mixed/Widget15.vue";
import MixedWidget7 from "@/components/widgets/mixed/Widget7.vue";
import Ventas from "@/components/widgets/mixed/Ventas.vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "main-dashboard",
  components: {
    UltimasOrdenes,
    Actividades,
    MixedWidget15,
    MixedWidget7,
    Ventas,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const setOrden = async (item) => {
      await store.commit(Mutations.SET_ORDEN, item);
      router.push({ name: "orden-view" });
    }

    const state = reactive({
      ordenes: [],
      ordenesAnio: [],
      rol: "",
    });

    onMounted(async () => {
      setCurrentPageTitle("Dashboard");
      
      await store.dispatch(Actions.LIST_ORDENES_RECIENTES, {});
      state.ordenes = store.getters.currentOrdenesRecientes.ordenes;
      
      await store.dispatch(Actions.LIST_ORDENES_ANIO, "2022");
      state.ordenesAnio = store.getters.currentOrdenesAnio.ordenes;

      state.rol = store.getters.currentRol;
      console.log("state: " , state);

      const [errorName] = Object.keys(store.getters.getErrors);
      const error = store.getters.getErrors[errorName];
      if (error){
        Swal.fire({
          text: error[0],
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }
    });

    return {
      state,
      setOrden,
    };

  },
});
</script>
