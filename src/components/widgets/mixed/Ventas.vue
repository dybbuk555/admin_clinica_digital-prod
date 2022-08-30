<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  
  <!--begin::Mixed Widget 10-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div
      class="card-body p-0 d-flex justify-content-between flex-column overflow-hidden"
    >
      <!--begin::Hidden-->
      <div class="d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3">
        <div class="me-2">
          <span class="fw-bold text-gray-800 d-block fs-3">Ventas</span>

          <!-- <span class="text-gray-400 fw-semobold">Oct 8 - Oct 26 21</span> -->
        </div>

        <div class="fw-bold fs-3" :class="`text-${chartColor}`">$ {{props.ordenes['total'].toLocaleString('es-MX')}} MXN</div>
      </div>
      <!--end::Hidden-->

      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        class="mixed-widget-10-chart"
        :options="chart"
        :series="series"
        type="bar"
        :height="chartHeight"
      ></apexchart>
      <!--end::Chart-->
    </div>
  </div>
  <!--end::Mixed Widget 10-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 

import { defineComponent, ref, onBeforeMount, computed, watch } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import VueApexCharts from "vue3-apexcharts";
import { ApexOptions } from "apexcharts";
import { useStore } from "vuex";

export default defineComponent({
  name: "widget-12",
  props: ['widgetClasses', 'chartColor', 'chartHeight', 'ordenes'],
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const color = ref(props.chartColor);
    let chart: ApexOptions = {};
    const store = useStore();

    const series = ref([
      {
        name: "Pagadas",
        data: props.ordenes['pagadas'],
      },
      {
        name: "Pendientes",
        data: props.ordenes['pendientes'],
      },
    ]);

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(color.value, props.chartHeight));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(color.value, props.chartHeight));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef,
      refreshChart,
      props,
    };
  },
});

const chartOptions = (color, chartHeight): ApexOptions => {
  const labelColor = getCSSVariableValue("--kt-gray-500");
  const borderColor = getCSSVariableValue("--kt-gray-200");
  const secondaryColor = getCSSVariableValue("--kt-gray-300");
  const baseColor = getCSSVariableValue(`--kt-${color}`);

  return {
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: chartHeight,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    fill: {
      type: "solid",
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
          return val + " ordenes";
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
};
</script>
