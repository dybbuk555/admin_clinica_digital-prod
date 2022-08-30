<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />

  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid">
    <div id="kt_wrapper" class="wrapper d-flex flex-column flex-row-fluid">
      <!-- <KTHeader :title="pageTitle" /> -->

      <!-- begin:: Content Head -->
      <KTToolbar v-if="subheaderDisplay" :breadcrumbs="breadcrumbs" :title="pageTitle" />
      <!-- end:: Content Head -->

      <!-- begin:: Content -->
      <div id="kt_content" class="d-flex flex-column-fluid align-items-start" :class="{
        'container-fluid': contentWidthFluid,
        'container-fluid': !contentWidthFluid,
      }">
        <!-- begin:: Aside Left -->
        <KTAside v-if="asideEnabled" :lightLogo="themeLightLogo" :darkLogo="themeDarkLogo" />
        <!-- end:: Aside Left -->
        <!-- begin:: Content Body -->
        <div class="content flex-row-fluid">
          <router-view />
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <KTFooter />
    </div>
  </div>
  <!-- end:: Body -->
  <KTScrollTop />
  <KTMessengerDrawer />
  <KTUserMenu />
  <KTCreateApp />
  <KTInviteFriendsModal />

  <!-- <KTToolbarButtons />
  <KTDemosDrawer />
  <KTHelpDrawer /> -->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, computed, onMounted, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import KTAside from "@/layout/aside/Aside.vue";
// import KTHeader from "@/layout/header/Header.vue";
import KTFooter from "@/layout/footer/Footer.vue";
import HtmlClass from "@/core/services/LayoutService";
import KTToolbar from "@/layout/toolbar/Toolbar.vue";
import KTScrollTop from "@/layout/extras/ScrollTop.vue";
import KTUserMenu from "@/layout/header/partials/ActivityDrawer.vue";
import KTLoader from "@/components/Loader.vue";
import KTCreateApp from "@/components/modals/wizards/create-app-modal/CreateAppModal.vue";
import KTInviteFriendsModal from "@/components/modals/general/InviteFriendsModal.vue";
import KTToolbarButtons from "@/layout/extras/ToolbarButtons.vue";
import KTDemosDrawer from "@/layout/extras/DemosDrawer.vue";
import KTHelpDrawer from "@/layout/extras/HelpDrawer.vue";
import KTMessengerDrawer from "@/layout/extras/MessengerDrawer.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { MenuComponent } from "@/assets/ts/components";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import { removeModalBackdrop } from "@/core/helpers/dom";
import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from "@/core/helpers/config";

export default defineComponent({
  name: "master-layout",
  components: {
    KTAside,
    // KTHeader,
    KTFooter,
    KTToolbar,
    KTScrollTop,
    KTCreateApp,
    KTInviteFriendsModal,
    KTUserMenu,
    KTToolbarButtons,
    KTDemosDrawer,
    KTHelpDrawer,
    KTMessengerDrawer,
    KTLoader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // show page loading
    store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");

    // initialize html element classes
    HtmlClass.init();

    const pageTitle = computed(() => {
      return store.getters.pageTitle;
    });

    const breadcrumbs = computed(() => {
      return store.getters.pageBreadcrumbPath;
    });

    onMounted(() => {
      //check if current user is authenticated
      if (!store.getters.isUserAuthenticated) {
        router.push({ name: "sign-in" });
      }

      nextTick(() => {
        reinitializeComponents();
      });
      // Simulate the delay page loading
      setTimeout(() => {
        // Remove page loader after some time
        store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
      }, 500);
    });

    watch(
      () => route.path,
      () => {
        MenuComponent.hideDropdowns(undefined);

        // check if current user is authenticated
        if (!store.getters.isUserAuthenticated) {
          router.push({ name: "sign-in" });
        }

        removeModalBackdrop();
        nextTick(() => {
          reinitializeComponents();
        });
      }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      pageTitle,
      breadcrumbs,
      themeLightLogo,
      themeDarkLogo,
    };
  },
});
</script>
