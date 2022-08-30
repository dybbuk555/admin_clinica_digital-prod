<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{ props.titulo != null ? props.titulo : 'Ultimas ordenes'}}</span>
        <!-- <span class="text-muted mt-1 fw-semobold fs-7">
          More than 400 new products
        </span> -->
      </h3>
      
      <!-- {{ props.titulo != null ? props.titulo : 'Ultimas ordenes'}} -->
      <div class="card-toolbar m-0">
        <!--begin::Tab nav-->
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
        <!--end::Tab nav-->
      </div>

    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-3">
      <div class="tab-content">
        <!--begin::Tap pane-->
        <div class="tab-pane fade active show" id="kt_table_widget_5_tab_1">
          <!--begin::Table container-->
          <div class="table-responsive">

          <Datatable
            :header="tableHeader" :data="ordenes"
            :items-per-page="15" :items-per-page-dropdown-enabled="false"
          >
            <template v-slot:icono="{ row: item }">
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img src="media/svg/brand-logos/plurk.svg" class="h-50 align-self-center" alt="" />
                      </span>
                    </div>
            
            </template>

            <template v-slot:nombre="{ row: item }">
                    <a href="#" class="text-dark fw-bold text-hover-primary mb-1 fs-6">{{ item._id.substr(-7) }}</a>
                    <span class="text-muted fw-semobold d-block">{{ moment(new Date(item.fecha)).format("DD/MM/YYYY") }}</span>
            
            </template>

            <template v-slot:cliente="{ row: item }">
                    {{ item['idUser'] != null ? item.idUser.nombre : '' }} {{ item['idUser'] != null ? item.idUser.apellido : '' }}
            
            </template>

            <template v-slot:estatus="{ row: item }">
                    <span v-if="item.paidOut" class="badge badge-light-success">PAGADO</span>
                    <span v-else class="badge badge-light-danger">PENDIENTE</span>
            
            </template>

            <template v-slot:acciones="{ row: item }">
                    <a @click="props.setOrden(item)" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                      <span class="svg-icon svg-icon-2">
                        <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                      </span>
                    </a>
            
            </template>

          </Datatable>
            
          </div>
          
        </div>
        
      </div>
    </div>
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import moment from 'moment'
import Clientes from "@/components/widgets/tables/Clientes.vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "kt-widget-5",
  components: {
    Clientes,
    Dropdown1,
    Datatable,
  },
  props: ['widgetClasses', 'ordenes', 'setOrden', 'titulo'],
  setup(props) {
    const store = useStore();
    const state = reactive({
      rol: "",
    });
    onMounted(async () => {
      state.rol = store.getters.currentRol;
    });

    // genera un array de jsons 
    const getDataExport = () => {
      if(props.ordenes.length > 0){
        return props.ordenes.map((line: any) => {
          let usuario = "";
          if(line['idUser'] != null ){
            usuario = line.idUser.nombre + " " + line.idUser.apellido;
          }
          return {
            folio: line._id.substr(-7),
            cita: moment(new Date(line.fecha)).format("DD/MM/YYYY"),
            usuario: usuario,
            estatus: line.paidOut ? 'PAGADO' : 'PENDIENTE',
          };
        });
      }
      return [];
    }
    const tableHeader = ref([
      {
        columnName: "icono",
        columnLabel: "icono",
        sortEnabled: true,
      },
      {
        columnName: "Nombre",
        columnLabel: "nombre",
        sortEnabled: true,
      },
      {
        columnName: "Cliente",
        columnLabel: "cliente",
        sortEnabled: true,
      },
      {
        columnName: "Estatus",
        columnLabel: "estatus",
        sortEnabled: true,
      },
      {
        columnName: "Acciones",
        columnLabel: "acciones",
        sortEnabled: false,
      },
    ]);


    return {
      // checkedRows,
      moment,
      props,
      getDataExport,
      tableHeader,
      state
    };
  },
});
</script>
