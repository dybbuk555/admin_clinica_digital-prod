<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Ambulancias</span>

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
              Filtros
            </a>
            <Dropdown1></Dropdown1>
          </li>

          <li class="nav-item" role="presentation">
            <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
              data-bs-toggle="modal" data-bs-target="#producto_modal" @click="props.setItem(
                {
                  avaiable: true,
                  category: {},
                  description: '',
                  img: '',
                  indication: '',
                  name: '',
                  precios: [],
                  stock: 0,
                }
              )">
              <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Ambulancia
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
            :header="tableHeader" :data="productos"
            :items-per-page="15" :items-per-page-dropdown-enabled="false"
          >

            <template v-slot:icono="{ row: item }">
                  <div class="symbol symbol-50px me-2" @click="props.setItem(item)" data-bs-toggle="modal"
                    data-bs-target="#producto_modal">
                    <span :class="`bg-light-primary`" class="symbol-label">
                      <span :class="`svg-icon-primary`" class="svg-icon svg-icon-2x">
                        <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                      </span>
                    </span>
                  </div>
            
            </template>

            <template v-slot:nombre="{ row: item }">
                  <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6" @click="props.setItem(item)"
                    data-bs-toggle="modal" data-bs-target="#producto_modal">{{ item.name }}</a>

                  <span class="text-muted fw-semobold text-muted d-block fs-7" @click="props.setItem(item)"
                    data-bs-toggle="modal" data-bs-target="#producto_modal">{{ item.name }}</span>
            
            </template>

            <template v-slot:categoria="{ row: item }">
                  <a href="#" class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{
                      item.category.description
                  }}</a>
            
            </template>

            <template v-slot:estatus="{ row: item }">
                  <span v-if="item.avaiable" class="badge-light-success badge">Disponible</span>
                  <span v-else class="badge-light-danger badge">No Disponible</span>
            
            </template>

            <template v-slot:acciones="{ row: item }">

                  <a @click="props.setItem(item)" data-bs-toggle="modal" data-bs-target="#producto_modal"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/art/art005.svg" />
                    </span>
                  </a>

                  <a @click="props.deleteItem(item)"  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
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
import { defineComponent, ref } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "kt-widget-12",
  components: {
    Dropdown1,
    Datatable,
  },
  props: ['widgetClasses', 'productos', 'setItem', 'deleteItem'],
  setup(props) {
    
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
      tableHeader

    };
  },
});
</script>
