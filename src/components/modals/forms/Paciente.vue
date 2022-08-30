<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <div class="modal fade" ref="newLabModalRef" id="orden_modal_paciente" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 v-if="props.paciente.nuevo == ''">Agregar paciente</h2>
          <h2 v-else>Editar paciente</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div class="btn btn-sm btn-icon btn-active-color-primary" 
              data-bs-toggle="modal"
              data-bs-target="#orden_modal" >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <!--begin::Form-->
          <Form id="kt_modal_paciente_form1" class="form" @submit="submit" :validation-schema="validationSchema">

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Nombre</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="nombre"
                v-model="props.paciente.nombre" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nombre" />
                </div>
              </div>
            </div>
            
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Apellido paterno</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="apellido_paterno"
                v-model="props.paciente.apellido_paterno" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="apellido_paterno" />
                </div>
              </div>
            </div>
            
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Apellido materno</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="apellido_materno"
                v-model="props.paciente.apellido_materno" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="apellido_materno" />
                </div>
              </div>
            </div>
            
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Correo</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="correo"
                v-model="props.paciente.correo" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="correo" />
                </div>
              </div>
            </div>
             
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Estudio</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <select class="form-select form-select-solid select2-hidden-accessible" name="estudio"
                v-model="props.paciente.estudio">
                <option label="Selecciona una opción " value=""></option>
                <option v-for="(item, index) in props.productos" :key="index"
                  :label="item.name + ' | ' + getPrecio(item)" :value="item._id">
                </option>
              </select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="estudio" />
                </div>
              </div>
            </div>

            

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Fecha de nacimiento</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <!--begin::Datepicker-->
              <el-form-item prop="dueDate">
                <el-date-picker v-model="props.paciente.nacimiento" placeholder="Selecciona una fecha para la cita"
                  name="dueDate" />
              </el-form-item>
              <!--end::Datepicker-->

              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nacimiento" />
                </div>
              </div>
            </div>

            
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Sexo</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <select class="form-select form-select-solid select2-hidden-accessible" name="sexo"
                v-model="props.paciente.sexo">
                <option label="Selecciona una opción" value=""></option>
                <option label="Femenino" value="Femenino"></option>
                <option label="Masculino" value="Masculino"></option>
                <!-- <option v-for="(item, index) in props.labs" :key="index" :label="item.nombre" :value="item"> -->
                <!-- </option> -->
              </select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="sexo" />
                </div>
              </div>
            </div>


            <div class="text-center pt-15">

              <button ref="submitButtonRef" type="submit" class="btn btn-primary" 
              data-bs-toggle="modal"
              data-bs-target="#orden_modal_producto" 
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
  props: ['paciente', 'savePaciente', 'productos', 'laboratorio_id'],
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newLabModalRef = ref<null | HTMLElement>(null);

    const validationSchema = Yup.object().shape({
      "nombre": Yup.string().required().label("nombre"),
      "apellido_paterno": Yup.string().required().label("apellido_paterno"),
      "apellido_materno": Yup.string().required().label("apellido_materno"),
      "correo": Yup.string().required().label("correo"),
      "estudio": Yup.string().required().label("estudio"),
      "nacimiento": Yup.string().required().label("nacimiento"),
      "sexo": Yup.string().required().label("sexo"),
    });
    
    // instancia cupon
    if(typeof props.paciente.cupon === "undefined"){
      let cupon = { precio: '', folio: '' }
      props.paciente.cupon = cupon;
    }

    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      if(props.paciente.nuevo == ''){
        delete props.paciente.nuevo;
        props.savePaciente(props.paciente);
      }

      hideModal(newLabModalRef.value);

      if (submitButtonRef.value) {
        submitButtonRef.value.disabled = false;
        submitButtonRef.value?.removeAttribute("data-kt-indicator");
      }


    };
    const getPrecio = (item) => {
      if(typeof item['precios'] != 'undefined'){
        let res = item.precios.find(elem => elem.idLaboratorio._id == props.laboratorio_id);
        if(res){
          if(typeof item['descuento_select'] != 'undefined'){
            return res[item['descuento_select'].toLowerCase()];
          }
          return res.precio;
        }
        return "";
      }
      return "";
    }

    return {
      validationSchema,
      submit,
      submitButtonRef,
      newLabModalRef,
      props,
      getPrecio,
    };
  },
});
</script>
