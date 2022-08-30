<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-lg-row">
    <!--begin::Content-->
    <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
      <!--begin::Form-->
      <form class="form" action="#" id="kt_subscriptions_create_new">
        <Customer></Customer>

        <Products></Products>

        <PaymentMethod></PaymentMethod>

        <!--        <Advanced></Advanced>-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->

    <!--begin::Sidebar-->
    <div
      class="flex-column flex-lg-row-auto w-100 w-lg-250px w-xl-300px mb-10 order-1 order-lg-2"
    >
      <Summary></Summary>
    </div>
    <!--end::Sidebar-->
  </div>
  <!--end::Layout-->

  <!--begin::Modals-->
  <NewCardModal></NewCardModal>
  <CreateAccountModal></CreateAccountModal>
  <!--end::Modals-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Customer from "@/components/subscriptions/add/Customer.vue";
import Products from "@/components/subscriptions/add/Products.vue";
import PaymentMethod from "@/components/subscriptions/add/PaymentMethod.vue";
import Summary from "@/components/subscriptions/add/Summary.vue";
import NewCardModal from "@/components/modals/forms/NewCardModal.vue";
import CreateAccountModal from "@/components/modals/wizards/CreateAccountModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "kt-add-subscription",
  components: {
    Summary,
    Customer,
    Products,
    PaymentMethod,
    NewCardModal,
    CreateAccountModal,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Add Subscription", ["Apps", "Subscriptions"]);
    });

    return {};
  },
});
</script>
