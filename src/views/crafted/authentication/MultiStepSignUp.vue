<template>
  <!--begin::Authentication - Multi-steps-->
  <div
    class="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column"
    ref="wizardRef"
    id="kt_create_account_stepper"
  >
    <!--begin::Aside-->
    <div
      class="d-flex flex-column flex-lg-row-auto w-xl-500px bg-lighten shadow-sm"
    >
      <!--begin::Wrapper-->
      <div
        class="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-500px scroll-y"
      >
        <!--begin::Header-->
        <div
          class="d-flex flex-row-fluid flex-column flex-center p-10 pt-lg-20"
        >
          <!--begin::Logo-->
          <router-link to="/dashboard" class="mb-10 mb-lg-20">
            <img alt="Logo" src="media/logos/default.svg" class="h-40px" />
          </router-link>
          <!--end::Logo-->

          <!--begin::Nav-->
          <div class="stepper-nav">
            <!--begin::Step 1-->
            <div class="stepper-item current" data-kt-stepper-element="nav">
              <!--begin::Line-->
              <div class="stepper-line w-40px"></div>
              <!--end::Line-->

              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">1</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Account Type</h3>

                <div class="stepper-desc fw-semobold">
                  Setup Your Account Details
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 1-->

            <!--begin::Step 2-->
            <div class="stepper-item" data-kt-stepper-element="nav">
              <!--begin::Line-->
              <div class="stepper-line w-40px"></div>
              <!--end::Line-->

              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">2</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Account Settings</h3>
                <div class="stepper-desc fw-semobold">
                  Setup Your Account Settings
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 2-->

            <!--begin::Step 3-->
            <div class="stepper-item" data-kt-stepper-element="nav">
              <!--begin::Line-->
              <div class="stepper-line w-40px"></div>
              <!--end::Line-->

              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">3</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Business Info</h3>
                <div class="stepper-desc fw-semobold">
                  Your Business Related Info
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 3-->

            <!--begin::Step 4-->
            <div class="stepper-item" data-kt-stepper-element="nav">
              <!--begin::Line-->
              <div class="stepper-line w-40px"></div>
              <!--end::Line-->

              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">4</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Billing Details</h3>
                <div class="stepper-desc fw-semobold">
                  Set Your Payment Methods
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 4-->

            <!--begin::Step 5-->
            <div class="stepper-item" data-kt-stepper-element="nav">
              <!--begin::Line-->
              <div class="stepper-line w-40px"></div>
              <!--end::Line-->

              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">5</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">Completed</h3>
                <div class="stepper-desc fw-semobold">Woah, we are here</div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 5-->
          </div>
          <!--end::Nav-->
        </div>
        <!--end::Header-->

        <!--begin::Illustration-->
        <div
          class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-150px min-h-lg-300px"
          :style="{ backgroundImage: `url(${getIllustrationsPath('16.png')})` }"
        ></div>
        <!--end::Illustration-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

    <!--begin::Body-->
    <div class="d-flex flex-column flex-lg-row-fluid py-10">
      <!--begin::Content-->
      <div class="d-flex flex-center flex-column flex-column-fluid">
        <!--begin::Wrapper-->
        <div class="w-lg-700px p-10 p-lg-15 mx-auto">
          <!--begin::Form-->
          <form
            class="my-auto pb-5"
            novalidate="novalidate"
            id="kt_create_account_form"
            @submit="handleStep"
          >
            <!--begin::Step 1-->
            <div class="current" data-kt-stepper-element="content">
              <Step1 />
            </div>
            <!--end::Step 1-->

            <!--begin::Step 2-->
            <div class="" data-kt-stepper-element="content">
              <Step2 />
            </div>
            <!--end::Step 2-->

            <!--begin::Step 3-->
            <div class="" data-kt-stepper-element="content">
              <Step3 />
            </div>
            <!--end::Step 3-->

            <!--begin::Step 4-->
            <div class="" data-kt-stepper-element="content">
              <Step4 />
            </div>
            <!--end::Step 4-->

            <!--begin::Step 5-->
            <div class="" data-kt-stepper-element="content">
              <Step5 />
            </div>
            <!--end::Step 5-->

            <!--begin::Actions-->
            <div class="d-flex flex-stack pt-15">
              <!--begin::Wrapper-->
              <div class="mr-2">
                <button
                  type="button"
                  class="btn btn-lg btn-light-primary me-3"
                  data-kt-stepper-action="previous"
                  @click="previousStep"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                  </span>
                  Back
                </button>
              </div>
              <!--end::Wrapper-->

              <!--begin::Wrapper-->
              <div>
                <button
                  type="button"
                  class="btn btn-lg btn-primary me-3"
                  data-kt-stepper-action="submit"
                  v-if="currentStepIndex === totalSteps - 1"
                  @click="formSubmit()"
                >
                  <span class="indicator-label">
                    Submit
                    <span class="svg-icon svg-icon-3 ms-2 me-0">
                      <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                    </span>
                  </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>

                <button v-else type="submit" class="btn btn-lg btn-primary">
                  Continue
                  <span class="svg-icon svg-icon-4 ms-1 me-0">
                    <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </button>
              </div>
              <!--end::Wrapper-->
            </div>
            <!--end::Actions-->
          </form>
          <!--end::Form-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Content-->

      <!--begin::Footer-->
      <div class="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
        <!--begin::Links-->
        <div class="d-flex flex-center fw-semobold fs-6">
          <a href="#" class="text-muted text-hover-primary px-2" target="_blank"
            >About</a
          >

          <a href="#" class="text-muted text-hover-primary px-2" target="_blank"
            >Support</a
          >

          <a href="#" class="text-muted text-hover-primary px-2" target="_blank"
            >Purchase</a
          >
        </div>
        <!--end::Links-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Authentication - Multi-steps-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { getIllustrationsPath } from "@/core/helpers/assets";
import Step1 from "@/components/wizard/steps/Step1.vue";
import Step2 from "@/components/wizard/steps/Step2.vue";
import Step3 from "@/components/wizard/steps/Step3.vue";
import Step4 from "@/components/wizard/steps/Step4.vue";
import Step5 from "@/components/wizard/steps/Step5.vue";
import { StepperComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import * as Yup from "yup";
import { useForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

interface IStep1 {
  accountType: string;
}

interface IStep2 {
  accountTeamSize: string;
  accountName: string;
  accountPlan: string;
}

interface IStep3 {
  businessName: string;
  businessDescriptor: string;
  businessType: string;
  businessDescription: string;
  businessEmail: string;
}

interface IStep4 {
  nameOnCard: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  saveCard: string;
}

interface CreateAccount extends IStep1, IStep2, IStep3, IStep4 {}

export default defineComponent({
  name: "multi-step-sign-up",
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
  },
  setup() {
    const store = useStore();
    const _stepperObj = ref<StepperComponent | null>(null);
    const wizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    const formData = ref<CreateAccount>({
      accountType: "personal",
      accountTeamSize: "50+",
      accountName: "",
      accountPlan: "1",
      businessName: "Keenthemes Inc.",
      businessDescriptor: "KEENTHEMES",
      businessType: "1",
      businessDescription: "",
      businessEmail: "corp@support.com",
      nameOnCard: "Max Doe",
      cardNumber: "4111 1111 1111 1111",
      cardExpiryMonth: "1",
      cardExpiryYear: "2",
      cardCvv: "123",
      saveCard: "1",
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        wizardRef.value as HTMLElement
      );

      store.dispatch(Actions.ADD_BODY_CLASSNAME, "bg-body");
      setCurrentPageBreadcrumbs("Horizontal", ["Pages", "Wizards"]);
    });

    onUnmounted(() => {
      store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "bg-body");
    });

    const createAccountSchema = [
      Yup.object({
        accountType: Yup.string().required().label("Account Type"),
      }),
      Yup.object({
        accountName: Yup.string().required().label("Account Name"),
      }),
      Yup.object({
        businessName: Yup.string().required().label("Business Name"),
        businessDescriptor: Yup.string()
          .required()
          .label("Shortened Descriptor"),
        businessType: Yup.string().required().label("Corporation Type"),
        businessEmail: Yup.string().required().label("Contact Email"),
      }),
      Yup.object({
        nameOnCard: Yup.string().required().label("Name On Card"),
        cardNumber: Yup.string().required().label("Card Number"),
        cardExpiryMonth: Yup.string().required().label("Expiration Month"),
        cardExpiryYear: Yup.string().required().label("Expiration Year"),
        cardCvv: Yup.string().required().label("CVV"),
      }),
    ];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<
      IStep1 | IStep2 | IStep3 | IStep4
    >({
      validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    resetForm({
      values: {
        ...formData.value,
      },
    });

    const handleStep = handleSubmit((values) => {
      formData.value = {
        ...formData.value,
        ...values,
      };

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = () => {
      Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-semobold btn-light-primary",
        },
      }).then(() => {
        window.location.reload();
      });
    };

    return {
      wizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getIllustrationsPath,
    };
  },
});
</script>
