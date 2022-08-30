<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  

  <div class="card" :class="widgetClasses">
    <div class="card-header align-items-center border-0 mt-4">
      <h3 class="card-title align-items-start flex-column">
        <span class="fw-bold mb-2 text-dark">Actividades</span>
        <span class="text-muted fw-semobold fs-7">{{ getOrdenes().length }} Ordenes</span>
      </h3>

      <!-- <div class="card-toolbar">
        <button class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          type="button" data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end" >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen024.svg" />
          </span>
        </button>
        <Dropdown1></Dropdown1>
      </div> -->

    </div>
    
    <div class="card-body pt-5">
      
      <div class="timeline-label">
        
        <div class="timeline-item" v-for="(item, index) in getOrdenes()" :key="index">
          
          <div class="timeline-label fw-bold text-gray-800 fs-6">
            {{ moment(new Date(item.date)).format("h:mm a") }}
          </div>
          <div class="timeline-badge">
            <i v-if="item.paidOut" class="fa fa-genderless text-success fs-1"></i>
            <i v-else class="fa fa-genderless text-warning fs-1"></i>
          </div>
          <!-- <div class="fw-mormal timeline-content text-muted ps-3"> -->
          <!-- <div class="timeline-content fw-semobold text-gray-800 ps-3"> -->
          <div class="timeline-content d-flex">
            <span class="fw-bold text-gray-800 ps-3">
              Orden creada {{ moment(new Date(item.date)).format("DD/MM/YYYY") }} &nbsp;
            </span>
            <a @click="props.setOrden(item)"  class="text-primary">{{ item._id.substr(-7) }}</a>
          </div>

          <!-- <div class="timeline-badge">
            <i class="fa fa-genderless text-success fs-1"></i>
          </div> -->

          <!-- <div class="timeline-content d-flex">
            <span class="fw-bold text-gray-800 ps-3">AEOL meeting</span>
          </div>
          
          <div class="timeline-content fw-semobold text-gray-800 ps-3">
            New order placed <a href="#" class="text-primary">#XF-2356</a>.
          </div> -->

          
        </div>
        
      </div>
      
    </div>
    
  </div>
  
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */ 

import { defineComponent, reactive } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { useRouter } from "vue-router";
import moment from 'moment'

export default defineComponent({
  name: "kt-widget-5",
  props: ['widgetClasses', 'ordenes', 'setOrden'],
  components: {
    Dropdown1,
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      
    });
    const getOrdenes = () => {
      return props.ordenes.slice(Math.max(props.ordenes.length - 10, 1))
    }
    

    return {
      getOrdenes,
      router,
      moment,
      props,
      state
    };
  },

});
</script>
