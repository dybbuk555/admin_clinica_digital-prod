<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
    data-kt-menu="true"
    data-kt-element="theme-mode-menu"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3 my-0">
      <router-link
        :to="path"
        :class="{ active: themeMode === 'light' }"
        class="menu-link px-3 py-2"
        @click="setMode('light')"
      >
        <span class="menu-icon" data-kt-element="icon">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="media/icons/duotune/general/gen060.svg" />
          </span>
        </span>
        <span class="menu-title">Light</span>
      </router-link>
    </div>
    <!--end::Menu item-->
    <!--begin::Menu item-->
    <div class="menu-item px-3 my-0">
      <router-link
        :to="path"
        :class="{ active: themeMode === 'dark' }"
        class="menu-link px-3 py-2"
        @click="setMode('dark')"
      >
        <span class="menu-icon" data-kt-element="icon">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="media/icons/duotune/general/gen061.svg" />
          </span>
        </span>
        <span class="menu-title">Dark</span>
      </router-link>
    </div>
    <!--end::Menu item-->
    <!--begin::Menu item-->
    <div class="menu-item px-3 my-0">
      <router-link
        :to="path"
        :class="{ active: themeMode === 'system' }"
        class="menu-link px-3 py-2"
        @click="setMode('system')"
      >
        <span class="menu-icon" data-kt-element="icon">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="media/icons/duotune/general/gen062.svg" />
          </span>
        </span>
        <span class="menu-title">System</span>
      </router-link>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "kt-theme-switcher",
  component: {},
  setup() {
    const store = useStore();
    const route = useRoute();

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    const path = computed(() => route.path);

    const setMode = (mode: string) => {
      store.dispatch(Actions.SET_THEME_MODE_ACTION, mode);
    };

    return {
      themeMode,
      setMode,
      path,
    };
  },
});
</script>
