<template>
  <!--begin::Header-->
  <div
    id="kt_header"
    class="header align-items-stretch"
    :data-kt-sticky="isHeaderSticky"
    data-kt-sticky-name="header"
    data-kt-sticky-offset="{default: '200px', lg: '300px'}"
  >
    <!--begin::Container-->
    <div
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
      class="d-flex align-items-center"
    >
      <!--begin::Aside mobile toggle-->
      <div
        class="d-flex topbar align-items-center d-lg-none ms-n2 me-3"
        title="Show aside menu"
      >
        <div
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          id="kt_header_menu_mobile_toggle"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/abstract/abs015.svg" />
          </span>
        </div>
      </div>
      <!--end::Aside mobile toggle-->

      <!--begin::Mobile logo-->
      <div class="header-logo me-5 me-md-10 flex-grow-1 flex-lg-grow-0">
        <router-link to="/dashboard">
          <img
            alt="Logo"
            src="media/logos/demo2.png"
            class="logo-default h-25px"
          />
          <img
            alt="Logo"
            src="media/logos/demo2-sticky.png"
            class="logo-sticky h-25px"
          />
        </router-link>
      </div>
      <!--end::Mobile logo-->

      <!--begin::Wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
      >
        <!--begin::Navbar-->
        <div class="d-flex align-items-stretch" id="kt_header_nav">
          <KTMenu></KTMenu>
        </div>
        <!--end::Navbar-->

        <!--begin::Topbar-->
        <div class="d-flex align-items-stretch flex-shrink-0">
          <KTTopbar></KTTopbar>
        </div>
        <!--end::Topbar-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import KTTopbar from "@/layout/header/Topbar.vue";
import KTMenu from "@/layout/header/Menu.vue";

import {
  headerWidthFluid,
  headerFixed,
  headerFixedOnMobile,
  headerLeft,
  asideDisplay,
} from "@/core/helpers/config";

export default defineComponent({
  name: "KTHeader",
  props: {
    title: String,
  },
  components: {
    KTTopbar,
    KTMenu,
  },
  setup() {
    const isHeaderSticky = computed(() => {
      if (window.innerWidth > 768) {
        return headerFixed.value;
      } else {
        return headerFixedOnMobile.value;
      }
    });

    return {
      headerWidthFluid,
      headerLeft,
      asideDisplay,
      isHeaderSticky,
    };
  },
});
</script>
