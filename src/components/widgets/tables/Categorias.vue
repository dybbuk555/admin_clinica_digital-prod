<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <!--begin::Tables Widget 12-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Categorias</span>

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
              data-bs-toggle="modal" data-bs-target="#categoria_modal" id="kt_toolbar_primary_button" @click="props.setItem(
                {
                  description: '',
                  _id: null,
                }
              )">
              <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Categoria
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
            :header="tableHeader" :data="categorias"
            :items-per-page="15" :items-per-page-dropdown-enabled="false"
          >

            <template v-slot:descripcion="{ row: item }">
                  <div class="d-flex align-items-center">

                    <div class="symbol symbol-50px me-2" @click="props.setItem(item)" data-bs-toggle="modal"
                      data-bs-target="#laboratorio_modal">
                      <span :class="`bg-light-primary`" class="symbol-label">
                        <span :class="`svg-icon-primary`" class="svg-icon svg-icon-2x">
                          <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                        </span>
                      </span>
                    </div>

                    <div class="d-flex justify-content-start flex-column" @click="props.setItem(item)">
                      <a class="text-dark fw-bold text-hover-primary mb-1 fs-6">{{ item.description }}</a>
                    </div>
                  </div>
            </template>

            <template v-slot:acciones="{ row: item }">
                  <a @click="props.setItem(item)" data-bs-toggle="modal" data-bs-target="#categoria_modal"
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
  props: ['widgetClasses', 'categorias', 'setItem', 'deleteItem'],
  setup(props) {
    // genera un array de jsons 
    const getDataExport = () => {
      // console.log("props.categorias: " , props.categorias);
      return props.categorias;
      // return props.categorias.map((line: any) => {
      //   return {
      //     descripcion: line.description,
      //   };
      // });
    }
    const tableHeader = ref([
      {
        columnName: "Descripción",
        columnLabel: "descripcion",
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
