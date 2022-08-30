<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <PrecioModal :precio="precio" :labs="labs" :apiAction="savePrecio"></PrecioModal>

  <div class="modal fade" ref="newLabModalRefProducto" id="producto_modal" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 v-if="props.item._id == null">Crear producto</h2>
          <h2 v-else>Editar producto</h2>
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
            <div class="scroll-y me-n7 pe-7" id="kt_modal_producto_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_address_header"
              data-kt-scroll-wrappers="#kt_modal_producto_scroll" data-kt-scroll-offset="300px">

              <div class="d-flex flex-column mb-7 fv-row">

                <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                  <span class="required">Nombre del Producto</span>
                  <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                    title="Specify a card holder's name"></i>
                </label>

                <Field type="text" class="form-control form-control-solid" placeholder="" name="name"
                  v-model="props.item.name" />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>

              <div class="d-flex flex-stack mb-7 fv-row">
                <div class="me-5">
                  <label class="fs-6 fw-semobold form-label">
                    Disponible
                  </label>
                  <div class="fs-7 fw-semobold text-gray-400">
                    Activar o desactivar producto
                  </div>
                </div>
                <label class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" v-model="props.item.avaiable" />
                </label>
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                  <span class="required">Categoría</span>
                  <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                    title="Specify a card holder's name"></i>
                </label>
                <select class="form-select form-select-solid select2-hidden-accessible" name="category"
                  v-model="props.item.category">
                  <option label="Selecciona una opción " value=""></option>
                  <option v-for="(item, index) in categorias" :key="index" :label="item.description" :value="item">
                  </option>
                </select>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="category" />
                  </div>
                </div>
              </div>


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


              <div class="d-flex flex-column mb-7 fv-row">

                <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                  <span class="required">Indicaciones</span>
                  <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                    title="Specify a card holder's name"></i>
                </label>

                <textarea class="form-control border-0 p-0 pe-10 resize-none min-h-25px" data-kt-autosize="true"
                  rows="4" v-model="props.item.indication" placeholder="indicación..." name="indication"></textarea>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="indication" />
                  </div>
                </div>
              </div>


              <div class="d-flex flex-column mb-7 fv-row">

                <label class="d-flex align-items-center fs-6 fw-semobold form-label mb-2">
                  <span class="required">Precios</span>
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
                      <Dropdown1 :dataExport="getDataExport()" ></Dropdown1>
                    </li>

                    <li class="nav-item" role="presentation">
                      <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
                        data-bs-toggle="modal" data-bs-target="#laboratorio_modal_precio" @click="props.setPrecio(
                          {
                            nuevo: '',
                            aseguradora: '',
                            costo: '',
                            cupon: {precio: '', folio: ''},
                            empresarial: '',
                            idLaboratorio: {nombre: '', servicioDomicilio: false, servicios: [], _id: ''},
                            inapam: '',
                            precio: '',
                          }
                        )">
                        <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                          <!-- <inline-svg src="media/icons/duotune/general/gen031.svg" /> -->
                          <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
                        </span>
                        Precio
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
                        <th class="min-w-120px">Laboratorio</th>
                        <th class="min-w-120px">$ Aseguradora</th>
                        <th class="min-w-120px">$ Empresarial</th>
                        <th class="min-w-120px">$ INAPAM</th>
                        <th class="min-w-140px">$ CUPON</th>
                        <th class="min-w-120px">Precio</th>
                        <th class="min-w-120px">Costo</th>
                        <th class="min-w-100px text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(elem, ind) in props.item.precios" :key="ind">
                        <tr>
                          <td>
                            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{
                                elem.idLaboratorio.nombre
                            }}</a>
                          </td>

                          <td>
                            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">$ {{
                                elem.aseguradora
                            }}</a>
                          </td>

                          <td>
                            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">$ {{
                                elem.empresarial
                            }}</a>
                          </td>

                          <td>
                            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">$ {{
                                elem.inapam
                            }}</a>
                          </td>

                          <td>
                            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                              Folio: {{ elem.cupon?.folio }}
                            </a>

                            <span class="text-muted fw-semobold text-muted d-block fs-7">
                              $ {{ elem.cupon?.precio }}
                            </span>
                          </td>

                          <td>
                            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">$ {{
                                elem.precio
                            }}</a>
                          </td>

                          <td>
                            <a class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">$ {{
                                elem.costo
                            }}</a>
                          </td>

                          <td class="text-end">

                            <a class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              data-bs-toggle="modal" data-bs-target="#laboratorio_modal_precio"
                              @click="props.setPrecio(elem)">
                              <span class="svg-icon svg-icon-3">
                                <inline-svg src="media/icons/duotune/art/art005.svg" />
                              </span>
                            </a>

                            <a @click="deletePrecio(elem)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                              <span class="svg-icon svg-icon-3">
                                <inline-svg src="media/icons/duotune/general/gen027.svg" />
                              </span>
                            </a>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                    <!--end::Table body-->
                  </table>
                  <!--end::Table-->
                </div>

                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="precios" />
                  </div>
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
import PrecioModal from "@/components/modals/forms/Precio.vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";

export default defineComponent({
  name: "create-producto-modal",
  components: {
    ErrorMessage,
    Field,
    Form,
    PrecioModal,
    Dropdown1
  },
  props: ['item', 'apiAction', 'categorias', 'setPrecio', 'precio', 'labs'],
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newLabModalRefProducto = ref<null | HTMLElement>(null);

    const validationSchema = Yup.object().shape({
      img: Yup.string().required().label("img"),
      avaiable: Yup.boolean().required().label("avaiable"),
      name: Yup.string().required().label("name"),
      precios: Yup.array().required().label("precios"),
      description: Yup.string().required().label("description"),
      category: Yup.string().required().label("category"),
      indication: Yup.string().required().label("indication"),
    });


    const deletePrecio = (elem) => {
      console.log("elem: " , elem);
      console.log("props.item.precios: " , props.item.precios);
      const index = props.item.precios.indexOf(elem);
      if (index > -1) {
        props.item.precios.splice(index, 1);
      }
      console.log("props.item.precios2: " , props.item.precios);
    }
    const savePrecio = (elem) => {
      props.item.precios.push(elem);
    }

    const submit = async () => {
      if (!submitButtonRef.value) {
        return;
      }

      submitButtonRef.value.disabled = true;
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      props.apiAction(props.item);

      hideModal(newLabModalRefProducto.value);

      if (submitButtonRef.value) {
        submitButtonRef.value.disabled = false;
        submitButtonRef.value?.removeAttribute("data-kt-indicator");
      }


    };
    // genera un array de jsons 
    const getDataExport = () => {
      console.log("props.item.precios: " , props.item.precios);
      if(typeof props.item['precios'] != 'undefined'){
        return props.item.precios.map((line: any) => {
          return {
            laboratorio: line.idLaboratorio.nombre,
            // creado: moment(new Date(line.date)).format("DD/MM/YYYY"),
            aseguradora: line.aseguradora,
            costo: line.costo,
            empresarial: line.empresarial,
            inapam: line.inapam,
            precio: line.precio,
            folio_cupon: (typeof line.cupon != 'undefined') ? line.cupon.folio : 'SIN DATO',
            precio_cupon: (typeof line.cupon != 'undefined') ? line.cupon.precio : 'SIN DATO',
          };
        });
      }
      return [];
    }

    return {
      validationSchema,
      submit,
      submitButtonRef,
      newLabModalRefProducto,
      props,
      savePrecio,
      deletePrecio,
      getDataExport,
    };
  },
});
</script>
