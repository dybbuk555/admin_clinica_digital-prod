<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <div class="row gy-5 g-xl-8">
    <h1 class="col-12 text-white card-title text-center mb-5 pb-5">Bienvenidos a CreaSalud</h1>
    <div class="col-12 my-5 py-5"></div>
    <h5 class="col-12 text-white card-title text-center my-5 py-5">
      Seleccione el servicio que desea consultar
    </h5>
    <div class="col-12 my-5 py-5"></div>
    <div class="col-12 d-flex justify-content-around align-items-center m-0 mt-5 pt-5">
      <div class="shadow-lg bg-light-primary px-6 py-8 rounded-2 me-7 mb-7">
        <router-link to="/dashboard" class="text-primary fw-semobold fs-6 mt-2">
          <span class="svg-icon svg-icon-3x svg-icon-primary my-2">
            <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
          </span>
          CLINICA DIGITAL
        </router-link>
      </div>
      <div class="shadow-lg bg-light-success px-6 py-8 rounded-2 mb-7">
        <router-link to="/ambulance" class="text-success fw-semobold fs-6 mt-2">
          <span class="svg-icon svg-icon-3x my-2">
            <inline-svg src="media/icons/duotune/general/gen063.svg" />
          </span>
          AMBULANCIAS
        </router-link>
        <!-- <a href="#" class="text-primary fw-semobold fs-6"> Clientes </a> -->
      </div>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "welcome",
  components: {},
  setup() {
    onMounted (() => {
      setCurrentPageTitle("");
    });
  }
});
</script>
