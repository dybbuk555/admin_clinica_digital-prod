<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Productos</span>

        <!-- <span class="text-muted mt-1 fw-semobold fs-7">Over 500 orders</span> -->
      </h3>


      <div class="card-toolbar m-0"  v-if="state.rol != 'CLIENTE'">
        
        <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 fw-bold" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
              data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
              <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                <inline-svg src="media/icons/duotune/general/gen031.svg" />
              </span>
              Opciones
            </a>
            <Dropdown1 :dataExport="getDataExport()" ></Dropdown1>
          </li>

        </ul>
        
      </div>

    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        
          <Datatable
            :header="tableHeader" :data="items"
            :items-per-page="15" :items-per-page-dropdown-enabled="false"
          >

            <template v-slot:icono="{ row: item }">
                  <div class="symbol symbol-50px me-2">
                    <span :class="`bg-light-primary`" class="symbol-label">
                      <span :class="`svg-icon-primary`" class="svg-icon svg-icon-2x">
                        <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                      </span>
                    </span>
                  </div>
            
            </template>

            <template v-slot:nombre="{ row: item }">
                  <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ item.idProduct.name }}</a>

                  <span class="text-muted fw-semobold text-muted d-block fs-7">{{ item.price }}</span>
            
            </template>

            <template v-slot:cantidad="{ row: item }">
                  <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ item.quantity }}</a>
            
            </template>

            <template v-slot:descuento="{ row: item }">
                  <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ item.descuento_select }}</a>

                  <span class="text-muted fw-semobold text-muted d-block fs-7">{{ item.descuento_codigo }}</span>
            
            </template>

          </Datatable>

      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 13-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, ref, computed, watch, onBeforeMount, reactive, onMounted } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    Dropdown1,
    Datatable,
  },
  props: ['widgetClasses', 'items'],
  setup(props) {
    // genera un array de jsons 
    const getDataExport = () => {
      if(props.items.length > 0){
        console.log("props.items:: " , props.items);
        return props.items.map((line: any) => {

          return {
            prodcuto: line.idProduct.name,
            precio: line.price,
            cantidad: line.quantity,
            descuento: line.descuento_select,
            codigo_descuento: line.descuento_codigo,
          };
        });
      }
      return [];
    }

    const tableHeader = ref([
      {
        columnName: "_",
        columnLabel: "icono",
        sortEnabled: true,
      },
      {
        columnName: "Nombre",
        columnLabel: "nombre",
        sortEnabled: true,
      },
      {
        columnName: "Cantidad",
        columnLabel: "cantidad",
        sortEnabled: true,
      },
      {
        columnName: "Descuento",
        columnLabel: "descuento",
        sortEnabled: false,
      },
    ]);
    
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      rol: "",
    });
    onBeforeMount(() => {
      state.rol = store.getters.currentRol;
    });


    return {
      props,
      getDataExport,
      tableHeader,
      state

    };
  },
});
</script>
