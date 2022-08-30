<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <div class="modal fade" ref="newLabModalRef" id="sucursal_modal_producto" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 v-if="props.producto.nuevo == ''">Agregar producto</h2>
          <h2 v-else>Editar producto</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div class="btn btn-sm btn-icon btn-active-color-primary" 
              data-bs-toggle="modal"
              data-bs-target="#sucursal_modal" >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <!--begin::Form-->
          <Form id="kt_modal_producto_form" class="form" @submit="submit" :validation-schema="validationSchema">
            
            
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Producto</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <select class="form-select form-select-solid select2-hidden-accessible" name="category"
                v-model="props.producto.estudio_id">
                <option label="Selecciona una opción " value=""></option>
                <option v-for="(item, index) in props.productos" :key="index" :label="item.name" :value="item">
                </option>
              </select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="category" />
                </div>
              </div>
            </div>



            <div class="text-center pt-15">
              <!-- <button type="submit" class="btn btn-light me-3" 
              data-bs-toggle="modal"
              data-bs-target="#sucursal_modal" >
                Cancelar
              </button> -->

              <button ref="submitButtonRef" type="submit" class="btn btn-primary" 
              data-bs-toggle="modal"
              data-bs-target="#sucursal_modal" 
                @click="submit()">
                <span class="indicator-label"> Guardar </span>
                <span class="indicator-progress">
                  Cargando...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            
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
  name: "create-laboratorio-modal",
  components: {
    ErrorMessage,
    Field,
    Form,

  },
  props: ['producto', 'saveProducto', 'productos'],
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newLabModalRef = ref<null | HTMLElement>(null);

    const validationSchema = Yup.object().shape({
      "precio": Yup.string().required().label("precio"),
      "costo": Yup.string().required().label("costo"),
    });
    
    // instancia cupon
    if(typeof props.producto.cupon === "undefined"){
      let cupon = { precio: '', folio: '' }
      props.producto.cupon = cupon;
    }

    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      if(props.producto.nuevo == ''){
        delete props.producto.nuevo;
        props.saveProducto(props.producto);
      }

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
