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
            
            <table class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
              <thead>
                <tr class="border-0">
                  <th class="p-0 w-50px"></th>
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-140px"></th>
                  <th class="p-0 min-w-140px"></th>
                  <th class="p-0 min-w-110px"></th>
                  <th class="p-0 min-w-50px"></th>
                </tr>
              </thead>
              
              <tbody>
                <tr v-for="(item, index) in ordenes" :key="index">
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img src="media/svg/brand-logos/plurk.svg" class="h-50 align-self-center" alt="" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a href="#" class="text-dark fw-bold text-hover-primary mb-1 fs-6">{{ item._id.substr(-7) }}</a>
                    <span class="text-muted fw-semobold d-block">{{ moment(new Date(item.fecha)).format("DD/MM/YYYY") }}</span>
                  </td>
                  
                  <td>
                    <a href="#" class="text-dark fw-bold text-hover-primary mb-1 fs-6">
                      {{ item.products.length > 0 ? item.products[0].idSucursal.nombre : '---'}}
                    </a>
                    <!-- <span class="text-muted fw-semobold d-block">
                      {{ item.products.length > 0 ? item.products[0].idSucursal.laboratorio_id : '---'}}
                    </span> -->
                  </td>
                  
                  <td class="text-end text-muted fw-semobold">
                    {{ item['tipo_orden'] != null ? item.tipo_orden : '' }}
                  </td>

                  <td class="text-end text-muted fw-semobold">
                    {{ item['idUser'] != null ? item.idUser.nombre : '' }} {{ item['idUser'] != null ? item.idUser.apellido : '' }}
                  </td>
                  <td class="text-end">
                    <span v-if="item.paidOut" class="badge badge-light-success">PAGADO</span>
                    <span v-else class="badge badge-light-danger">PENDIENTE</span>
                  </td>
                  <td class="text-end">
                    <a @click="props.setOrden(item)" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                      <span class="svg-icon svg-icon-2">
                        <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                      </span>
                    </a>
                  </td>
                </tr>

              </tbody>
            </table>
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
import { defineComponent } from "vue";
import moment from 'moment'
import Clientes from "@/components/widgets/tables/Clientes.vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";

export default defineComponent({
  name: "kt-widget-5",
  components: {
    Clientes,
    Dropdown1,
  },
  props: ['widgetClasses', 'ordenes', 'setOrden', 'titulo'],
  setup(props) {

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

    return {
      // checkedRows,
      moment,
      props,
      getDataExport,
    };
  },
});
</script>
