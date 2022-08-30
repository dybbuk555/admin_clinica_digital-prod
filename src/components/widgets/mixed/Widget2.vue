<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->


  <div class="card card-xxl-stretch">
    <!--begin::Header-->
    <div :class="`bg-${widgetColor}`" class="card-header border-0 py-5">
      <h3 class="card-title fw-bold text-white">Menú</h3>
      <div class="card-toolbar">
        <button
          type="button"
          @click="salir" 
          :class="`btn-active-color-${widgetColor}`"
          class="btn btn-sm btn-icon btn-color-white btn-active-white border-0 me-n3"
        >
          <span class="svg-icon svg-icon-2"> Salir
            <!-- <inline-svg src="media/icons/duotune/general/gen024.svg" /> -->
          </span>
        </button>
        
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        :class="`bg-${widgetColor}`"
        class="mixed-widget-2-chart card-rounded-bottom"
        :options="chart"
        :series="series"
        height="200"
        type="area"
      ></apexchart>
      <!--end::Chart-->
      <!--begin::Stats-->
      <div class="card-p mt-n20 position-relative">
        <!--begin::Row-->
        <div class="row m-0" >
          <div class="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7" v-if="state.rol == 'ADMIN'">
            <router-link to="/categorias" class="text-warning fw-semobold fs-6 mt-2">
            <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
              <inline-svg src="media/icons/duotune/general/gen032.svg" />
            </span>
            Categorías
            </router-link>
            <!-- <a href="#" class="text-warning fw-semobold fs-6"> Categorías </a> -->
          </div>
          <div class="col bg-light-primary px-6 py-8 rounded-2 mb-7">
            <router-link to="/clientes" class="text-primary fw-semobold fs-6 mt-2">
            <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            Clientes
            </router-link>
            <!-- <a href="#" class="text-primary fw-semobold fs-6"> Clientes </a> -->
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-danger px-6 py-8 rounded-2 me-7">
            <router-link to="/ordenes" class="text-danger fw-semobold fs-6 mt-2">
              <span class="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
              </span>
              Ordenes
            </router-link>
              <!-- <a href="#" class="text-danger fw-semobold fs-6 mt-2">
                Ordenes
              </a> -->
          </div>
          <div class="col bg-light-success px-6 py-8 rounded-2" v-if="state.rol == 'ADMIN'">
            <router-link to="/sucursales" class="text-success fw-semobold fs-6 mt-2">
            <span class="svg-icon svg-icon-3x svg-icon-success d-block my-2">
              <inline-svg src="media/icons/duotune/communication/com010.svg" />
            </span>
            Sucursales
            </router-link>
            <!-- <a href="#" class="text-success fw-semobold fs-6 mt-2">
              Sucursales
            </a> -->
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0 mt-8" v-if="state.rol == 'ADMIN'">
          <div class="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
            <router-link to="/laboratorios" class="text-warning fw-semobold fs-6 mt-2">
              <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <inline-svg src="media/icons/duotune/general/gen032.svg" />
              </span>
              Laboratorios
            </router-link>
            <!-- <a href="#" class="text-warning fw-semobold fs-6"> Menu5 </a> -->
          </div>
          <div class="col bg-light-primary px-6 py-8 rounded-2 mb-7" v-if="state.rol == 'ADMIN'">
            <router-link to="/productos" class="text-primary fw-semobold fs-6 mt-2">
              <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
              </span>
              Productos
            </router-link>
            <!-- <a href="#" class="text-primary fw-semobold fs-6"> Productos </a> -->
          </div>
        </div>
        <!--end::Row-->
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, ref, computed, watch, onBeforeMount, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { ApexOptions } from "apexcharts";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import VueApexCharts from "vue3-apexcharts";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "widget-1",
  components: {
    Dropdown3,
  },
  props: {
    widgetClasses: String,
    widgetColor: String,
    strokeColor: String,
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      rol: "",
    });
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useStore();

    const series = ref([
      {
        name: "Net Profit",
        data: [30, 45, 32, 70, 40, 40, 40],
      },
    ]);

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(props.widgetColor, props.strokeColor));
      state.rol = store.getters.currentRol;
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(props.widgetColor, props.strokeColor));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    const salir = () => {
      store.dispatch(Actions.LOGOUT)
      .then(() => router.push({ name: "sign-in" }));
    }
    return {
      chart,
      salir,
      series,
      chartRef,
      state,
    };
  },
});

const chartOptions = (widgetColor, strokeColor): ApexOptions => {
  const labelColor = getCSSVariableValue("--kt-gray-500");
  const borderColor = getCSSVariableValue("--kt-gray-200");
  const color = getCSSVariableValue(`--kt-${widgetColor}`);

  return {
    chart: {
      fontFamily: "inherit",
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 0,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [strokeColor],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val + " thousands";
        },
      },
      marker: {
        show: false,
      },
    },
    markers: {
      colors: [color],
      strokeColors: [strokeColor],
      strokeWidth: 3,
    },
  };
};
</script>
