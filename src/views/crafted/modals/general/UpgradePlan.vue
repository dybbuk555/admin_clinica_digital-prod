<template>
  <KTModalCard
    title="Upgrade Plan Modal Example"
    description="Click on the below buttons to launch <br/>a upgrade plan example."
    :image="getIllustrationsPath('8.png')"
    button-text="Upgrade Plan"
    modal-id="kt_modal_upgrade_plan"
  ></KTModalCard>
  <KTUpgradePlanModal></KTUpgradePlanModal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import KTModalCard from "@/components/cards/Card.vue";
import KTUpgradePlanModal from "@/components/modals/general/UpgradePlanModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { getIllustrationsPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "upgrade-plan",
  components: {
    KTModalCard,
    KTUpgradePlanModal,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Upgrade Plan", ["Modals", "General"]);
    });

    return {
      getIllustrationsPath,
    };
  },
});
</script>
