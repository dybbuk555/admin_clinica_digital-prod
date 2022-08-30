<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Ordenes</span>

        <!-- <span class="text-muted mt-1 fw-semobold fs-7">Over 500 orders</span> -->
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
            <Dropdown1 :dataExport="getDataExport()"></Dropdown1>
          </li>

          <li class="nav-item" role="presentation">
            <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
              data-bs-toggle="modal" data-bs-target="#orden_modal" @click="props.setOrdenEdit(
                {
                  nuevo: '',
                  fecha: '',
                  idUser: {
                    apellido: '',
                    celular: '',
                    codigoPais: 52,
                    email: '',
                    fechaCreacion: new Date(),
                    google: false,
                    nombre: '',
                    role: 'CLIENTE',
                    state: true,
                  },
                  orderPrice: '',
                  paidOut: true,
                  products: [],
                }
              ); props.listSucursales();">
              <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Orden
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


        <Datatable :header="tableHeader" :data="ordenes" :items-per-page="15" :items-per-page-dropdown-enabled="false">

          <template v-slot:ID_Cita="{ row: item }">
            <a @click="props.setOrden(item)" class="text-dark fw-bold text-hover-primary fs-6">{{ item._id.substr(-7)
            }}</a>

          </template>

          <template v-slot:Fecha_Creacio="{ row: item }">
            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ moment(new
                Date(item.fecha)).format("DD/MM/YYYY")
            }}</a>

          </template>

          <template v-slot:Fecha_Servicio="{ row: item }">
            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ moment(new
                Date(item.fecha)).format("DD/MM/YYYY")
            }}</a>

          </template>

          <template v-slot:cliente="{ row: item }">
            <a href="#" class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
              {{ item['idUser'] != null ? item.idUser.nombre : '' }} {{ item['idUser'] != null ? item.idUser.apellido :
                  ''
              }}
            </a>

          </template>

          <template v-slot:Tipo_Servicio="{ row: item }">
            <a @click="props.setOrden(item)" class="text-dark fw-bold text-hover-primary fs-6">Ambulancia</a>

          </template>

          <template v-slot:Tipo_Ambulancia="{ row: item }">
            <a @click="props.setOrden(item)" class="text-dark fw-bold text-hover-primary fs-6">Autobús</a>

          </template>

          <template v-slot:Total="{ row: item }">
            <a href="#" class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ item.products.length }}</a>

          </template>

          <template v-slot:Ganancia="{ row: item }">
            <a href="#" class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ item.products.length }}</a>

          </template>

          <template v-slot:Estatus_Servicio="{ row: item }">
            <span v-if="item.paidOut" class="badge badge-light-success">DISPONIBLE</span>
            <span v-else class="badge badge-light-danger">DESHABILITAR</span>

          </template>

          <template v-slot:Estatus_Pago="{ row: item }">
            <span v-if="item.paidOut" class="badge badge-light-success">PAGADO</span>
            <span v-else class="badge badge-light-danger">PENDIENTE</span>

          </template>

          <template v-slot:acciones="{ row: item }">
            <a @click="props.setOrden(item)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
              <!--begin::Svg Icon | path: -->
              <span class="svg-icon svg-icon-2">
                <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
              </span>
              <!--end::Svg Icon-->
            </a>

            <a data-bs-toggle="modal" data-bs-target="#orden_modal" @click="props.setOrdenEdit(item)"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/art/art005.svg" />
              </span>
            </a>

            <a @click="props.deleteItem(item)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
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
  <!--end::Tables Widget 13-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import moment from 'moment'
import { defineComponent, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    Dropdown2,
    Datatable,
  },
  props: ['setOrden', 'widgetClasses', 'ordenes', 'setOrdenEdit', 'deleteItem', 'listSucursales', 'rol', 'user'],
  setup(props) {
    // const checkedRows = ref([]);
    // genera un array de jsons 
    const getDataExport = () => {
      if (props.ordenes.length > 0) {
        return props.ordenes.map((line: any) => {
          let usuario = "";
          if (line['idUser'] != null) {
            usuario = line.idUser.nombre + " " + line.idUser.apellido;
          }
          return {
            folio: line._id.substr(-7),
            creado: moment(new Date(line.date)).format("DD/MM/YYYY"),
            cita: moment(new Date(line.fecha)).format("DD/MM/YYYY"),
            total: line.orderPrice,
            estatus: line.paidOut ? 'PAGADO' : 'PENDIENTE',
            usuario: usuario,
            cant_productos: line.products.length,
          };
        });
      }
      return [];
    }

    const tableHeader = ref([
      {
        columnName: "ID_Cita",
        columnLabel: "ID_Cita",
        sortEnabled: true,
      },
      {
        columnName: "Fecha_Creacio",
        columnLabel: "Fecha_Creacio",
        sortEnabled: true,
      },
      {
        columnName: "Fecha_Servicio",
        columnLabel: "Fecha_Servicio",
        sortEnabled: true,
      },
      {
        columnName: "Cliente",
        columnLabel: "cliente",
        sortEnabled: true,
      },
      {
        columnName: "Tipo_Servicio",
        columnLabel: "Tipo_Servicio",
        sortEnabled: true,
      },
      {
        columnName: "Tipo_Ambulancia",
        columnLabel: "Tipo_Ambulancia",
        sortEnabled: true,
      },
      {
        columnName: "Estatus_Servicio",
        columnLabel: "Estatus_Servicio",
        sortEnabled: true,
      },
      {
        columnName: "Total",
        columnLabel: "Total",
        sortEnabled: true,
      },
      {
        columnName: "Ganancia",
        columnLabel: "Ganancia",
        sortEnabled: true,
      },
      {
        columnName: "Estatus_Pago",
        columnLabel: "Estatus_Pago",
        sortEnabled: true,
      },
      {
        columnName: "Acciones",
        columnLabel: "acciones",
        sortEnabled: false,
      },
    ]);
    return {
      moment,
      props,
      getDataExport,
      tableHeader
    };
  },
});
</script>
