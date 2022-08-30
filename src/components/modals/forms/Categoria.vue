<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <div class="modal fade" ref="newLabModalRef" id="categoria_modal" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 v-if="props.item._id == null">Crear categoria</h2>
          <h2 v-else>Editar categoria</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <!--begin::Form-->
          <Form id="kt_modal_new_card_form" class="form" @submit="submit" :validation-schema="validationSchema">
          

            <div class="d-flex flex-column mb-7 fv-row">

              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Descripción</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <textarea class="form-control border-0 p-0 pe-10 resize-none min-h-25px" data-kt-autosize="true"
                rows="6" v-model="props.item.description" placeholder="descripción..." name="description"></textarea>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="description" />
                </div>
              </div>
            </div>



            <div class="text-center pt-15">
              <!-- <button type="reset" id="kt_modal_new_card_cancel" class="btn btn-light me-3">
                Cancelar
              </button> -->

              <button ref="submitButtonRef" type="submit" id="kt_modal_new_card_submit" class="btn btn-primary"
                @click="submit()">
                <span class="indicator-label"> Guardar </span>
                <span class="indicator-progress">
                  Cargando...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </Form>
          <!--end::Form-->
        </div>
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import * as Yup from "yup";

export default defineComponent({
  name: "create-categoria-modal",
  components: {
    ErrorMessage,
    Field,
    Form,

  },
  props: ['item', 'apiAction'],
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newLabModalRef = ref<null | HTMLElement>(null);

    const validationSchema = Yup.object().shape({
      nombre: Yup.string().required().label("nombre"),
      servicioDomicilio: Yup.boolean().required().label("servicioDomicilio"),
    });

    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      props.apiAction(props.item);

      hideModal(newLabModalRef.value);

      if (submitButtonRef.value) {
        submitButtonRef.value.disabled = false;
        submitButtonRef.value?.removeAttribute("data-kt-indicator");
      }


    };

    return {
      validationSchema,
      submit,
      submitButtonRef,
      newLabModalRef,
      props,
    };
  },
});
</script>
