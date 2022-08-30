<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <!--begin::Tables Widget 12-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Clientes</span>

        <!-- <span class="text-muted mt-1 fw-semobold fs-7"
          >Over 500 new members</span
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
              data-bs-toggle="modal" data-bs-target="#cliente_modal" id="kt_toolbar_primary_button"
              @click="props.setItem(
                {
                  apellido: '',
                  codigoPais: 52,
                  email: '',
                  // fechaCreacion: '',
                  google: false,
                  nombre: '',
                  role: '',
                  state: true,
                  _id: null,
                  celular: '',
                  password: '',
                }
              )">
              <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Cliente
            </a>
          </li>


        </ul>
        <!--end::Tab nav-->
      </div>


    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        
        
          <Datatable
            :header="tableHeader" :data="clientes"
            :items-per-page="15" :items-per-page-dropdown-enabled="false"
          >

            <template v-slot:nombre="{ row: item }">
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-50px me-5">
                      <span class="symbol-label bg-light">
                        <img
                          :src="'media/svg/avatars/001-boy.svg'"
                          class="h-75 align-self-end"
                          alt=""
                        />
                      </span>
                    </div>

                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                        >{{ item.nombre }} {{ item.apellido }}</a
                      >
                      <span
                        class="text-muted fw-semobold text-muted d-block fs-7"
                        >{{ item.email }}</span
                      >
                    </div>
                  </div>
            </template>

            <template v-slot:rol="{ row: item }">
                  <a
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.role }}</a
                  >
            </template>

            <template v-slot:decha="{ row: item }">
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7 mt-1"
                    >{{ moment(new Date(item.fechaCreacion)).format("DD/MM/YYYY") }}</span
                  >
            </template>

            <template v-slot:estatus="{ row: item }">
                    <span v-if="item.state" class="badge badge-light-success">ACTIVO</span>
                    <span v-else class="badge badge-light-danger">DESACTIVADO</span>
            </template>

            <template v-slot:acciones="{ row: item }">
                  

                <a @click="props.setItem(item)" data-bs-toggle="modal" data-bs-target="#cliente_modal"
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
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 12-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 
import { defineComponent, ref } from "vue";
import moment from 'moment'
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    Dropdown1,
    Datatable,
  },
  props: ['widgetClasses', 'clientes', 'setItem', 'deleteItem'],
  setup(props) {

    // genera un array de jsons 
    const getDataExport = () => {
      // console.log("props.clientes: " , props.clientes);
      return props.clientes.map((line: any) => {
        return {
          correo: line.email,
          creado: moment(new Date(line.fechaCreacion)).format("DD/MM/YYYY"),
          usuario: line.nombre + " " + line.apellido,
          rol: line.role,
          estatus: line.state ? 'ACTIVO' : 'DESACTIVADO',
        };
      });
    }

    const tableHeader = ref([
      {
        columnName: "Nombre",
        columnLabel: "nombre",
        sortEnabled: true,
      },
      {
        columnName: "Rol",
        columnLabel: "rol",
        sortEnabled: true,
      },
      {
        columnName: "Fecha de creación",
        columnLabel: "decha",
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
      props,
      moment,
      getDataExport,
      tableHeader
    };
  },
});
</script>
