<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-250px fs-6"
    data-kt-menu="true">

    <div class="menu-item px-5">
      <a @click="salir" class="menu-link text-danger px-5">Salir</a>
    </div>

  </div>
  
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "dropdown-3",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const salir = () => {
      store.dispatch(Actions.LOGOUT)
      .then(() => router.push({ name: "sign-in" }));
    }
    return {
      salir,
    }
  },
});
</script>
