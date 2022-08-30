<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-dark">Pacientes</span>
        <!-- <span class="text-muted mt-1 fw-semobold fs-7">Pending 10 tasks</span> -->
      </h3>
      

      <div class="card-toolbar m-0"  v-if="state.rol != 'CLIENTE'">
        
        <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 fw-bold" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
              data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
              <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                <inline-svg src="media/icons/duotune/general/gen031.svg" />
              </span>
              Filtros
            </a>
            <Dropdown1></Dropdown1>
          </li>

        </ul>
        
      </div>
      
    </div>
    
    <div class="card-body pt-5">
      <template v-for="(item, index) in props.items" :key="index">
        <div :class="{ 'mb-7': items.length - 1 !== index }" class="d-flex align-items-center">
          <div class="symbol symbol-50px me-5">
            <span :class="`bg-light-${item.color}`" class="symbol-label">
              <span :class="`svg-icon-${item.color}`" class="svg-icon svg-icon-2x">
                <inline-svg :src="'media/icons/duotune/general/gen049.svg'" />
              </span>
            </span>
          </div>

          <div class="d-flex flex-column">

            <a class="text-dark text-hover-primary fs-6 fw-bold">
              {{ item.nombre }} {{ item.apellido_paterno }} {{ item.apellido_materno }}

              <span class="text-muted fw-semobold">
                {{ item.sexo }}
              </span>
            </a>
            
            <a class="text-dark text-hover-primary fs-6 fw-bold">
              {{ moment(new Date(item.nacimiento)).format("DD/MM/YYYY") }}

              <span class="text-muted fw-semobold">
                {{ item.correo }}
              </span>
            </a>
            
            <!-- <span class="text-muted fw-semobold">
              {{ item.producto.name }}
            </span> -->
            <a class="text-dark text-hover-primary fs-6 fw-bold">
              {{ item.producto.name }}
            </a>


          </div>
          
        </div>
        
      </template>
    </div>
    
  </div>
  <!--end::List Widget 1-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, ref, computed, watch, onBeforeMount, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import moment from 'moment'

export default defineComponent({
  name: "kt-widget-1",
  components: {
    Dropdown1,
  },
  props: ['widgetClasses', 'items'],
  setup(props) {

    // genera un array de jsons 
    const getDataExport = () => {
      console.log("props.items: " , props.items);
      return props.items.map((line: any) => {
        return {
          folio: line._id.substr(-7),
          cita: moment(new Date(line.fecha)).format("DD/MM/YYYY"),
          usuario: line.idUser.nombre + " " + line.idUser.apellido,
          estatus: line.paidOut ? 'PAGADO' : 'PENDIENTE',
        };
      });
    }
    
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      rol: "",
    });
    onBeforeMount(() => {
      state.rol = store.getters.currentRol;
    });


    return {
      moment,
      props,
      state,
      getDataExport,
    };
  },
});
</script>
