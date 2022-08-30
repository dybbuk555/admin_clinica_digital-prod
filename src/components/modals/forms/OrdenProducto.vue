<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  
  <PacienteModal :paciente="props.pacienteSelected" :productos="props.productos"
    :laboratorio_id="props.sucursal.laboratorio_id" :savePaciente="savePaciente"></PacienteModal>

  <div class="modal fade" ref="newLabModalProductoRef" id="orden_modal_producto" tabindex="-1" aria-hidden="true">
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
              data-bs-target="#orden_modal_producto" >
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


<!-- descuento_select
descuento_codigo -->

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Descuento</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <select class="form-select form-select-solid select2-hidden-accessible" name="descuento_select"
                v-model="props.producto.descuento_select">
                <option label="Selecciona una opción " value=""></option>
                <option label="INAPAM" value="INAPAM"></option>
                <option label="ASEGURADORA" value="ASEGURADORA"></option>
                <option label="CÓDIGO EMPRESARIAL" value="CÓDIGO EMPRESARIAL"></option>
                <option label="CUPÓN DE DESCUENTO" value="CUPÓN DE DESCUENTO"></option>
                <option label="NINGUNO" value="NINGUNO"></option>
              </select>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="descuento_select" />
                </div>
              </div>
            </div>

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Folio descuento</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="descuento_codigo"
                v-model="props.producto.descuento_codigo" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="descuento_codigo" />
                </div>
              </div>
            </div>

            <div class="d-flex flex-column mb-7 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Cantidad</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="quantity"
                v-model="props.producto.quantity" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="quantity" />
                </div>
              </div>
            </div>
            
            <div class="d-flex flex-column mb-7 fv-row" >

              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Pacientes</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <div class="card-toolbar m-0">
                <!--begin::Tab nav-->
                <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 fw-bold" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
                      data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                      <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                        <inline-svg src="media/icons/duotune/general/gen031.svg" />
                      </span>
                      Filtros
                    </a>
                    <Dropdown1></Dropdown1>
                  </li>

                  <li class="nav-item" role="presentation">
                    <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
                      data-bs-toggle="modal" data-bs-target="#orden_modal_paciente" @click="props.setPaciente(
                        {
                          nuevo: '',
                          apellido_materno: '',
                          apellido_paterno: '',
                          correo: '',
                          estudio: '',
                          nacimiento: '',
                          nombre: '',
                          sexo: '',
                        }
                      )">
                      <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                        <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                        <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
                      </span>
                      Paciente
                    </a>
                  </li>


                </ul>

              </div>

              <div class="table-responsive">
                <!--begin::Table-->
                <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                  <!--begin::Table head-->
                  <thead>
                    <tr class="fw-bold text-muted">
                      <!-- <th class="p-0 w-50px"></th> -->
                      <th class="min-w-120px">Nombre</th>
                      <th class="min-w-120px">Apellido p</th>
                      <th class="min-w-120px">Apellido m</th>
                      <th class="min-w-120px">Correo</th>
                      <th class="min-w-100px text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(elem, ind) in props.producto.pacientes" :key="ind">
                      <tr>
                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.nombre }}
                          </a>
                        </td>

                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.apellido_paterno }}
                          </a>
                        </td>

                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.apellido_materno }}
                          </a>
                        </td>

                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.correo }}
                          </a>
                        </td>
                  

                        <td class="text-end">

                          <a class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            data-bs-toggle="modal" data-bs-target="#orden_modal_paciente" @click="props.setPaciente(elem, ind)">
                            <span class="svg-icon svg-icon-3">
                              <inline-svg src="media/icons/duotune/art/art005.svg" />
                            </span>
                          </a>

                          <a @click="deletePaciente(elem)"
                            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                            <span class="svg-icon svg-icon-3">
                              <inline-svg src="media/icons/duotune/general/gen027.svg" />
                            </span>
                          </a>
                        </td>

                      </tr>

                    </template>
                  </tbody>

                </table>

              </div>

              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="pacientes" />
                </div>
              </div>

            </div>





            <div class="text-center pt-15">

              <button ref="submitButtonRef" type="submit" class="btn btn-primary" 
              data-bs-toggle="modal"
              data-bs-target="#orden_modal" 
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
import PacienteModal from "@/components/modals/forms/Paciente.vue";

export default defineComponent({
  name: "create-laboratorio-modal",
  components: {
    ErrorMessage,
    Field,
    Form,
    PacienteModal,

  },
  props: ['producto', 'saveProducto', 'productos', 'sucursal', 'setPaciente', 'pacienteSelected', 'updatePrecio'],
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newLabModalProductoRef = ref<null | HTMLElement>(null);

    const validationSchema = Yup.object().shape({
      "nombre": Yup.string().required().label("nombre"),
      "apellido_paterno": Yup.string().required().label("apellido_paterno"),
      "apellido_materno": Yup.string().required().label("apellido_materno"),
      "correo": Yup.string().required().label("correo"),
      "estudio": Yup.string().required().label("estudio"),
      "nacimiento": Yup.string().required().label("nacimiento"),
      "sexo": Yup.string().required().label("sexo"),
    });
    
    // // instancia cupon
    // if(typeof props.producto.cupon === "undefined"){
    //   let cupon = { precio: '', folio: '' }
    //   props.producto.cupon = cupon;
    // }
    // instancia cupon
    if(typeof props.producto.descuento_select === "undefined"){
      props.producto.descuento_select = "";
    }
    

    const deletePaciente = (elem) => {
      const index = props.producto.pacientes.indexOf(elem);
      if (index > -1) {
        props.producto.pacientes.splice(index, 1);
      }
      props.producto.quantity = props.producto.pacientes.length;
      props.updatePrecio();
    }
    const savePaciente = (elem) => {
      console.log("elem: " , elem);
      console.log("props.producto.pacientes: " , props.producto.pacientes);
      console.log("props.producto: " , props.producto);
      props.producto.pacientes.push(elem);
      props.producto.quantity = props.producto.pacientes.length;
      props.updatePrecio();
    }
    

    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");
      if(props.producto.nuevo == ''){
        delete props.producto.nuevo;

        props.producto.idProduct = props.productos.find(elem => elem._id == props.producto.pacientes[0].estudio);
        props.producto.idSucursal = props.sucursal;
        let precio = getPrecio(props.producto.idProduct);
        props.producto.price = precio.precio
        props.producto.priceCost = precio.costo
        props.saveProducto(props.producto);
      }

      hideModal(newLabModalProductoRef.value);

      if (submitButtonRef.value) {
        submitButtonRef.value.disabled = false;
        submitButtonRef.value?.removeAttribute("data-kt-indicator");
      }


    };
    
    const getPrecio = (item) => {
      if(typeof item['precios'] != 'undefined'){
        let res = item.precios.find(elem => elem.idLaboratorio._id == props.sucursal.laboratorio_id);
        if(res){
          if(typeof item['descuento_select'] != 'undefined'){
            return res[item['descuento_select'].toLowerCase()];
          }
          return res;
        }
        return "";
      }
      return "";
    }

    return {
      validationSchema,
      submit,
      submitButtonRef,
      newLabModalProductoRef,
      props,
      getPrecio,
      savePaciente,
      deletePaciente,
    };
  },
});
</script>
