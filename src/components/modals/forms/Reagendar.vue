<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <div class="modal fade" ref="newLabModalPacienteRef" id="orden_modal" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 v-if="props.item.nuevo == ''">Crear Orden</h2>
          <h2 v-else>Editar Orden</h2>
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

             
            <div class="d-flex flex-column mb-7 fv-row"  v-if="props.item._id == null">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Sucursal</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <select data-control="select2" data-hide-search="true" name="sucursal"
                class="form-select form-select-white form-select-sm fw-bold"
                v-model="state.sucursal" @change="props.setSucursal(state.sucursal)">
                <option label="Selecciona una opción " value=""></option>
                <option v-for="(item, index) in props.sucursales" :key="index"
                  :label="item.nombre" :value="item">
                </option>
              </select>
            </div>


            <div class="d-flex flex-column mb-7 fv-row" v-if="props.rol == 'ADMIN' || props.rol == 'CALL_CENTER'">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Precio</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <label class="form-control form-control-solid">
                {{ props.item.orderPrice }}
              </label>


            </div>

            <div class="d-flex flex-column mb-7 fv-row" v-if="props.rol == 'ADMIN' || props.rol == 'CLIENTE' || props.rol == 'CALL_CENTER'">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Fecha de cita</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>

              <Datepicker v-model="props.item.fecha" :disabledWeekDays="getDayDisable()"
              :minDate="getMinDate()" locale="es" name="fecha" />


              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="fecha" />
                </div>
              </div>
            </div>
            



            <div class="d-flex flex-column mb-7 fv-row" v-if="props.item.nuevo == ''">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Nombre del usuario</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="idUser.nombre"
                v-model="props.item.idUser.nombre" />
            </div>
            <div class="d-flex flex-column mb-7 fv-row" v-if="props.item.nuevo == ''">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Apellidos del usuario</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="idUser.apellido"
                v-model="props.item.idUser.apellido" />
            </div>
            <div class="d-flex flex-column mb-7 fv-row" v-if="props.item.nuevo == ''">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Celular del usuario</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="idUser.celular"
                v-model="props.item.idUser.celular" />
            </div>
            <div class="d-flex flex-column mb-7 fv-row" v-if="props.item.nuevo == ''">
              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Correo del usuario</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <Field type="text" class="form-control form-control-solid" name="idUser.email"
                v-model="props.item.idUser.email" />
            </div>
            
            

            <div class="d-flex flex-column mb-7 fv-row"  v-if="props.rol == 'ADMIN' || props.rol == 'CALL_CENTER'">

              <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                <span class="required">Productos</span>
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
                      data-bs-toggle="modal" data-bs-target="#orden_modal_producto" @click="props.setProducto(
                        {
                          descuento_codigo: '',
                          idProduct: {},
                          idSucursal: {},
                          isgift: false,
                          pacientes: [],
                          price: '',
                          priceCost: '',
                          quantity: 0,
                          nuevo: '',
                        }
                      )">
                      <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                        <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                        <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
                      </span>
                      Producto
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
                      <th class="min-w-120px">Precio</th>
                      <th class="min-w-120px">Cantidad</th>
                      <th class="min-w-120px">Pacientes</th>
                      <th class="min-w-100px text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(elem, ind) in getPacientes()" :key="ind">
                      <tr>
                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.idProduct.name }}
                          </a>
                        </td>

                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.price }}
                          </a>
                        </td>

                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.quantity }}
                          </a>
                        </td>

                        <td>
                          <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ elem.pacientes.length }}
                          </a>
                        </td>
                  

                        <td class="text-end">

                          <a class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            data-bs-toggle="modal" data-bs-target="#orden_modal_producto" @click="props.setProducto(elem)">
                            <span class="svg-icon svg-icon-3">
                              <inline-svg src="media/icons/duotune/art/art005.svg" />
                            </span>
                          </a>

                          <a @click="deleteProducto(elem)"
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
                  <ErrorMessage name="products" />
                </div>
              </div>

            </div>



            <!--begin::Actions-->
            <div class="text-center pt-15">

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
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  name: "create-laboratorio-modal",
  components: {
    ErrorMessage,
    Field,
    Form,
    Datepicker
  },
  props: ['item', 'apiAction', 'setProducto', 'rol', 'deleteProducto', 'updatePrecio', 'sucursales', 'setSucursal'],
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newLabModalPacienteRef = ref<null | HTMLElement>(null);

    const getPacientes = () => {
      return props.item.products;
      // if (typeof props.item['products'] != 'undefined') {
      //   if (props.item.products.length > 0) {
      //     return props.item.products[0].pacientes
      //   }
      //   return [];
      // }
      // return [];
    }

    const validationSchema = Yup.object().shape({
      fecha: Yup.string().required().label("fecha"),
      products: Yup.boolean().required().label("products"),
    });
    
    const state = reactive({
      sucursal: {},
    });

    const getDayDisable = () => {
      let dias = {
        'Domingo': 0,
        'Lunes': 1,
        'Martes': 2,
        'Miercoles': 3,
        'Jueves': 4,
        'Viernes': 5,
        'Sabado': 6,
      }
      console.log("dias: " , dias);
      
      if(props.item.products.length > 0){
        console.log("props.item.products[0].idSucursal['closedDays']: " , props.item.products[0].idSucursal['closedDays']);
        return [dias[props.item.products[0].idSucursal['closedDays']]];
      }
      return [];
    }
    
    
    // onMounted(async () => {
    //   state.sucursal = props.item.products[0].idSucursal;
    //   console.log("idSucursal: " , props.item.products[0].idSucursal);
    // });

    const deleteProducto = (elem) => {
      const index = props.item.products.indexOf(elem);
      if (index > -1) {
        props.item.products.splice(index, 1);
      }
      props.updatePrecio();
    }

    const getMinDate = () => {
      var fecha = new Date();
      if(!(props.item.nuevo == '')){
        fecha.setDate(fecha.getDate() + 2);
      }
      return fecha;
    }

    const submit = async () => {
      console.log("submit(): ");
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      props.apiAction(props.item);

      hideModal(newLabModalPacienteRef.value);

      if (submitButtonRef.value) {
        submitButtonRef.value.disabled = false;
        submitButtonRef.value?.removeAttribute("data-kt-indicator");
      }


    };

    return {
      validationSchema,
      submit,
      submitButtonRef,
      newLabModalPacienteRef,
      props,
      deleteProducto,
      getPacientes,
      state,
      getMinDate,
      getDayDisable,
    };
  },
});
</script>
