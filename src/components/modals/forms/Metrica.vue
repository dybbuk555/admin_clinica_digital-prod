<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <SucursalProductoModal :producto="state.producto" :saveProducto="saveProducto" :productos="props.productos">
  </SucursalProductoModal>


  <div class="modal fade" ref="newLabModalRef" id="sucursal_modal" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 v-if="props.item.nuevo == ''">Crear Report Metricas</h2>
          <h2 v-else>Editar sucursal</h2>
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
                <span class="required">Nombre</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <Field type="text" class="form-control form-control-solid" name="nombre" v-model="props.item.nombre" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nombre" />
                </div>
              </div>
            </div>

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Estado</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <Field type="text" class="form-control form-control-solid" name="estado" v-model="props.item.estado" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="estado" />
                </div>
              </div>
            </div>

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Horario</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <Field type="text" class="form-control form-control-solid" name="horario" v-model="props.item.horario" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="horario" />
                </div>
              </div>
            </div>

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Dia cerrado</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <select data-control="select2" data-hide-search="true" name="sucursal"
                class="form-select form-select-white form-select-sm fw-bold" v-model="props.item.closedDays">
                <option label="Selecciona una opción " value=""></option>
                <option label="Lunes" value="Lunes"></option>
                <option label="Martes" value="Martes"></option>
                <option label="Miercoles" value="Miercoles"></option>
                <option label="Jueves" value="Jueves"></option>
                <option label="Viernes" value="Vienres"></option>
                <option label="Sabado" value="Sabado"></option>
                <option label="Domingo" value="Domingo"></option>
              </select>
            </div>

            <!--begin::Actions-->
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
import SucursalProductoModal from "@/components/modals/forms/SucursalProducto.vue";

export default defineComponent({
  name: "create-sucursal-modal",
  components: {
    ErrorMessage,
    Field,
    Form,
    SucursalProductoModal,
  },
  props: ['item', 'apiAction', 'laboratorios', 'productos'],
  setup(props) {

    // instancia ubicacion
    if (typeof props.item.ubicacion == "undefined") {
      let ubi = { lat: 23.743943, long: -99.146791 }
      // let ubi = { lat: '', long: '' }
      props.item.ubicacion = ubi;
    }

    const state = reactive({
      producto: {},
      
      zoom: 15,
      center: { lat: 23.743943, lng: -99.146791 },

    });

    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newLabModalRef = ref<null | HTMLElement>(null);

    const validationSchema = Yup.object().shape({
      nombre: Yup.string().required().label("nombre"),
      servicioDomicilio: Yup.boolean().required().label("servicioDomicilio"),
    });

    const getPrecio = (item) => {
      return item.precios.find(el => el.idLaboratorio == props.item.laboratorio_id);
    }
    const showLocation = (evt) => {
      let ress = evt.latLng.toJSON();
      console.log("evt1: " , ress);
      
      let ubi = { lat: ress.lat, long: ress.lng }
      props.item.ubicacion = ubi;

    }

    const setProducto = (elem) => {
      console.log("elem: ", elem);
      state.producto = elem;
    }
    const saveProducto = (elem) => {
      props.item.estudios.push(elem);
    }
    const deleteProducto = (elem) => {
      const index = props.item.estudios.indexOf(elem);
      if (index > -1) {
        props.item.estudios.splice(index, 1);
      }
    }

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
      deleteProducto,
      getPrecio,
      setProducto,
      saveProducto,
      state,
      showLocation,
    };
  },
});
</script>
