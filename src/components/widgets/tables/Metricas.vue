<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <!--begin::Table Widget 8-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Report Metricas</span>
        <!-- <span class="text-muted mt-1 fw-semobold fs-7"
          >More than 100 new orders</span
        > -->
      </h3>


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

          <li class="nav-item" role="presentation">
            <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
              data-bs-toggle="modal" data-bs-target="#sucursal_modal" id="kt_toolbar_primary_button"
              @click="props.setItem(
                {
                  closedDays: '',
                  direccion: '',
                  estado: '',
                  estudios: [],
                  horario: '',
                  horarioMuestras: '',
                  laboratorio_id: '',
                  nombre: '',
                  servicioDomicilio: false,
                  ubicacion: { lat: 23.743943, long: -99.146791 },
                  nuevo: '',
                }
              )">
              <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Reportes Metricas
            </a>
          </li>


        </ul>
        <!--end::Tab nav-->
      </div>

    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">

      <div class="table-responsive">
        
          <Datatable
            :header="tableHeader" :data="listSucursales()"
            :items-per-page="15" :items-per-page-dropdown-enabled="false"
          >

            <template v-slot:icon="{ row: item }">
            
                <div class="symbol symbol-50px me-2" @click="props.setItem(item)" data-bs-toggle="modal"
                  data-bs-target="#sucursal_modal">
                  <span :class="`bg-light-primary`" class="symbol-label">
                    <span :class="`svg-icon-primary`" class="svg-icon svg-icon-2x">
                      <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                    </span>
                  </span>
                </div>
            </template>

            <template v-slot:nombre="{ row: item }">
            
                <a @click="props.setItem(item)" class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                  data-bs-toggle="modal" data-bs-target="#sucursal_modal">{{ item.nombre }}</a>
                <span class="text-muted fw-semobold d-block fs-7">
                  Servicio domicilio:
                  <span v-if="item.servicioDomicilio" class="badge badge-light-success">SI</span>
                  <span v-else class="badge badge-light-danger">NO</span>
                </span>
            </template>

            <template v-slot:acciones="{ row: item }">
            
                <!-- <a href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/general/gen019.svg" />
                  </span>
                </a> -->

                <a @click="props.setItem(item)" data-bs-toggle="modal" data-bs-target="#sucursal_modal"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </a>

                <a @click="props.deleteItem(item)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/general/gen027.svg" />
                  </span>
                </a>
            </template>

          </Datatable>


      </div>

    </div>
    <!--end::Body-->
  </div>
  <!--end::Tables Widget 8-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { paginate } from "@/core/helpers/paginacion";
import { defineComponent, ref, reactive } from "vue";
import moment from 'moment'

import Datatable from "@/components/kt-datatable/KTDataTable.vue";
export default defineComponent({
  name: "kt-widget-8",
  components: {
    Dropdown1,
    Datatable,
  },
  props: ['widgetClasses', 'sucursales', 'setItem', 'deleteItem'],
  setup(props) {
    const state = reactive({
      pagina: 0,
    });
    const tableHeader = ref([
      {
        columnName: "icon",
        columnLabel: "icon",
        sortEnabled: false,
      },
      {
        columnName: "Nombre",
        columnLabel: "nombre",
        sortEnabled: true,
      },
      {
        columnName: "Acciones",
        columnLabel: "acciones",
        sortEnabled: false,
      },
    ]);

    const listSucursales = () => {
      // let res = paginate(props.sucursales, 15);
      // return res[state.pagina];
      return props.sucursales;
    }
    // genera un array de jsons 
    const getDataExport = () => {
      console.log("props.sucursales: " , props.sucursales);
      return props.sucursales.map((line: any) => {
        return {
          dia_cerrado: line.closedDays,
          estado: line.estado,
          direccion: line.direccion,
          nombre: line.nombre,
          horario: line.horario,
          horarioMuestras: line.horarioMuestras,
          estudios: line.estudios.length,
          domicilio: line.servicioDomicilio ? 'SI' : 'NO',
        };
      });
    }

    return {
      props,
      getDataExport,
      listSucursales,
      tableHeader
    };
  },
});
</script>
