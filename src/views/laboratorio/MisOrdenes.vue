<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->


  <!--begin::Timeline-->
  <div class="card">
    <!--begin::Card head-->
    <div class="card-header card-header-stretch">
      <!--begin::Title-->
      <div class="card-title d-flex align-items-center">
        <span class="svg-icon svg-icon-1 svg-icon-primary me-3 lh-0">
          <inline-svg src="media/icons/duotune/general/gen014.svg" />
        </span>

        <h3 class="fw-bold m-0 text-gray-800">Ordenes</h3>
      </div>
      <!--end::Title-->

      <!--begin::Toolbar-->
      <!-- <div class="card-toolbar m-0">
        <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 fw-bold" role="tablist">
          <li class="nav-item" role="presentation">
            <a id="kt_mis_ordenes_tab" class="nav-link justify-content-center text-active-gray-800 active"
              data-bs-toggle="tab" role="tab" href="#kt_mis_ordenes">
              Today
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a id="kt_activity_week_tab" class="nav-link justify-content-center text-active-gray-800"
              data-bs-toggle="tab" role="tab" href="#kt_activity_week">
              Week
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a id="kt_activity_month_tab" class="nav-link justify-content-center text-active-gray-800"
              data-bs-toggle="tab" role="tab" href="#kt_activity_month">
              Month
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a id="kt_activity_year_tab"
              class="nav-link justify-content-center text-active-gray-800 text-hover-gray-800" data-bs-toggle="tab"
              role="tab" href="#kt_activity_year">
              2021
            </a>
          </li>
        </ul>
      </div> -->
      <!--end::Toolbar-->
    </div>
    
    <div class="card-body">
      <div class="tab-content">
        <div id="kt_mis_ordenes" class="card-body p-0 tab-pane fade show active" role="tabpanel"
          aria-labelledby="kt_mis_ordenes_tab">
          
          <!-- <div class="timeline"> -->
            <OrdenesLaboratorio
              :titulo="''"
              widget-classes="card-xxl-stretch mb-5 mb-xxl-8"
              :ordenes="state.ordenes"
              :setOrden="setOrden"
            ></OrdenesLaboratorio>
            
            <!-- <KTActivityItem1></KTActivityItem1>
            <KTActivityItem2></KTActivityItem2>
            <KTActivityItem3></KTActivityItem3>
            <KTActivityItem4></KTActivityItem4>
            <KTActivityItem5></KTActivityItem5>
            <KTActivityItem6></KTActivityItem6>
            <KTActivityItem7></KTActivityItem7>
            <KTActivityItem8></KTActivityItem8> -->
          <!-- </div> -->
        </div>
        
        <!-- <div id="kt_activity_week" class="card-body p-0 tab-pane fade show" role="tabpanel"
          aria-labelledby="kt_activity_week_tab">
          <div class="timeline">
            <KTActivityItem2></KTActivityItem2>
            <KTActivityItem3></KTActivityItem3>
            <KTActivityItem4></KTActivityItem4>
            <KTActivityItem5></KTActivityItem5>
            <KTActivityItem6></KTActivityItem6>
          </div>
        </div>
        

        <div id="kt_activity_month" class="card-body p-0 tab-pane fade show" role="tabpanel"
          aria-labelledby="kt_activity_month_tab">
          <div class="timeline">
            <KTActivityItem5></KTActivityItem5>
            <KTActivityItem6></KTActivityItem6>
            <KTActivityItem8></KTActivityItem8>
            <KTActivityItem2></KTActivityItem2>
            <KTActivityItem3></KTActivityItem3>
            <KTActivityItem4></KTActivityItem4>
          </div>
        </div>
        
        <div id="kt_activity_year" class="card-body p-0 tab-pane fade show" role="tabpanel"
          aria-labelledby="kt_activity_year_tab">
          <div class="timeline">
            <KTActivityItem3></KTActivityItem3>
            <KTActivityItem4></KTActivityItem4>
            <KTActivityItem5></KTActivityItem5>
            <KTActivityItem6></KTActivityItem6>
          </div>
        </div> -->
        

      </div>
      
    </div>
    
  </div>
  
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */

import OrdenesLaboratorio from "@/components/widgets/tables/OrdenesLaboratorio.vue";
import { defineComponent, onMounted, reactive } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "perfil-activity",
  components: {
    OrdenesLaboratorio,
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
    });

    onMounted(async () => {
      await store.dispatch(Actions.LIST_ORDENES_LABORATORIO, {});
      state.ordenes = store.getters.currentOrdenesLaboratorio.ordenes;
      console.log("currentOrdenesLaboratorio: " , store.getters.currentOrdenesLaboratorio);
      console.log("state: " , state);

      const [errorName] = Object.keys(store.getters.getErrorOrdenes);
      const error = store.getters.getErrorOrdenes[errorName];
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
