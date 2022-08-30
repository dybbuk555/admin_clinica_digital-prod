<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div class="topbar d-flex align-items-stretch flex-shrink-0">
      <!--begin::Search-->
      <div class="d-flex align-items-stretch ms-1 ms-lg-3">
        <KTSearch></KTSearch>
      </div>
      <!--end::Search-->

      <!--begin::Activities-->
      <div class="d-flex align-items-center ms-1 ms-lg-3">
        <!--begin::drawer toggle-->
        <div
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          id="kt_activities_toggle"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/general/gen032.svg" />
          </span>
        </div>
        <!--end::drawer toggle-->
      </div>
      <!--end::Activities-->

      <!--begin::Quick links-->
      <div class="d-flex align-items-center ms-1 ms-lg-3">
        <!--begin::Menu-->
        <div
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="click"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="bottom"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/general/gen025.svg" />
          </span>
        </div>
        <KTQuickLinksMenu></KTQuickLinksMenu>
        <!--end::Menu-->
      </div>
      <!--end::Quick links-->

      <!--begin::Chat-->
      <div class="d-flex align-items-center ms-1 ms-lg-3">
        <!--begin::Menu wrapper-->
        <div
          class="btn btn-icon btn-active-light-primary btn-custom position-relative w-30px h-30px w-md-40px h-md-40px"
          id="kt_drawer_chat_toggle"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/communication/com012.svg" />
          </span>

          <span
            class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"
          >
          </span>
        </div>
        <!--end::Menu wrapper-->
      </div>
      <!--end::Chat-->

      <!--begin::Notifications-->
      <div class="d-flex align-items-center ms-1 ms-lg-3">
        <!--begin::Menu-->
        <div
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="click"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="bottom"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/general/gen022.svg" />
          </span>
        </div>
        <KTNotificationsMenu></KTNotificationsMenu>
        <!--end::Menu-->
      </div>
      <!--end::Notifications-->

      <!--begin::Theme mode-->
      <div class="d-flex align-items-center ms-1 ms-lg-3">
        <!--begin::Menu toggle-->
        <a
          href="#"
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <span class="svg-icon theme-light-show svg-icon-1">
            <inline-svg src="media/icons/duotune/general/gen060.svg" />
          </span>
          <span class="svg-icon theme-dark-show svg-icon-1">
            <inline-svg src="media/icons/duotune/general/gen061.svg" />
          </span>
        </a>
        <!--begin::Menu toggle-->
        <KTThemeModeSwitcher></KTThemeModeSwitcher>
      </div>
      <!--end::Theme mode-->

      <!--begin::User-->
      <div
        class="d-flex align-items-center me-n3 ms-1 ms-lg-3"
        id="kt_header_user_menu_toggle"
      >
        <!--begin::Menu-->
        <div
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="click"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="bottom"
        >
          <img
            src="media/avatars/300-2.jpg"
            alt="metronic"
            class="h-25px w-25px rounded"
          />
        </div>
        <KTUserMenu></KTUserMenu>
        <!--end::Menu-->
      </div>
      <!--end::User -->
    </div>
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTSearch from "@/layout/header/partials/Search.vue";
import KTNotificationsMenu from "@/layout/header/partials/NotificationsMenu.vue";
import KTQuickLinksMenu from "@/layout/header/partials/QuickLinksMenu.vue";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";
import KTThemeModeSwitcher from "@/layout/theme-mode/ThemeModeSwitcher.vue";

export default defineComponent({
  name: "layout-topbar",
  components: {
    KTNotificationsMenu,
    KTQuickLinksMenu,
    KTUserMenu,
    KTSearch,
    KTThemeModeSwitcher,
  },
});
</script>
