<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->
  <ReagendarModal :rol="state.rol" :item="state.orden" :apiAction="apiAction"
   :setProducto="setProducto" :updatePrecio="updatePrecio" ></ReagendarModal>
    
  <OrdenProductoModal :pacienteSelected="state.pacienteSelected" :producto="state.productoSelected" :productos="state.productos"
    :sucursal="state.sucursal" :saveProducto="saveProducto"
    :updatePrecio="updatePrecio" :setPaciente="setPaciente"></OrdenProductoModal>


  <div class="row gy-10 gx-xl-10">
    
    <div class="col-xl-6">
      <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div class="card-header cursor-pointer">
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Datos del Cliente</h3>
          </div>
        </div>

        <div class="card-body p-9">
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Nombre</label>

            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">{{ state.orden?.idUser?.nombre }}</span>
            </div>
          </div>

          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Apellidos</label>

            <div class="col-lg-8 fv-row">
              <span class="fw-bold fs-6 text-dark">{{ state.orden?.idUser?.apellido }}</span>
            </div>
          </div>

          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">
              Correo
            </label>

            <div class="col-lg-8 d-flex align-items-center">
              <span class="fw-bold fs-6 me-2">{{ state.orden?.idUser?.email }}</span>
            </div>
          </div>

          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">
              Teléfono
            </label>

            <div class="col-lg-8 d-flex align-items-center">
              <span class="fw-bold fs-6 me-2">{{ state.orden?.idUser?.celular }}</span>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="col-xl-6">
      <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div class="card-header cursor-pointer">
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Datos de la Orden</h3>
          </div>
        </div>

        <div class="card-body p-9">
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Fecha creada</label>

            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">
                {{ moment(new Date(state.orden?.date)).format("DD/MM/YYYY") }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Fecha de la cita</label>

            <div class="col-lg-4">
              <span class="fw-bold fs-6 text-dark ">
                {{ moment(new Date(state.orden?.fecha)).format("DD/MM/YYYY") }}</span>

            </div>
            <div class="col-lg-4">
              <a v-if="validateDay(state.orden['fecha'])"
                data-bs-toggle="modal" data-bs-target="#orden_modal" class="btn btn-sm btn-primary ml-7 pl-7">Reagendar</a>

            </div>
          </div>


          <div class="row mb-7" v-if="state.rol != 'LABORATORIO' || state.rol != 'ADMIN'">
            <label class="col-lg-4 fw-semobold text-muted">
              Estatus
            </label>
            <div class="col-lg-8 d-flex align-items-center">
              <span v-if="state.orden?.paidOut" class="badge badge-success">
                Pagado
              </span>
              <span v-else class="badge badge-danger">
                Pendiente
              </span>
            </div>
          </div>

          <div class="row mb-7" v-if="state.rol != 'LABORATORIO' || state.rol == 'ADMIN'">
            <label class="col-lg-4 fw-semobold text-muted">Precio</label>

            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">$ {{ state.orden?.orderPrice?.toLocaleString('es-MX') }} MXN</span>
            </div>
          </div>

        </div>

      </div>
    </div>
    
    <div class="col-xl-12">
      <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div class="card-header cursor-pointer">
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Datos de la Surcursal</h3>
          </div>
        </div>

        <div class="card-body p-9">
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Nombre</label>
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">
                {{ state.sucursal?.nombre }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Dirección</label>
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">
                {{ state.sucursal?.direccion }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Horario</label>
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">
                {{ state.sucursal?.horario }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Horario de muestras</label>
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">
                {{ state.sucursal?.horarioMuestras }}</span>
            </div>
          </div>
          <div class="row mb-7">
            <label class="col-lg-4 fw-semobold text-muted">Estado</label>
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-dark">
                {{ state.sucursal?.estado }}</span>
            </div>
          </div>

        </div>

      </div>
    </div>



  </div>

  <div class="row gy-10 gx-xl-10">
    <div class="col-xl-6">
      <ProductosOrden :items="state.orden?.products" widget-classes="mb-5 mb-xl-8"></ProductosOrden>
    </div>

    <div class="col-xl-6">
      <Pacientes :items="state.pacientes" widget-classes="card-xxl-stretch mb-5 mb-xl-10'"></Pacientes>
    </div>
  </div>

</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, onMounted, reactive } from "vue";
import KTChartWidget1 from "@/components/widgets/charts/Widget1.vue";
import KTListWidget5 from "@/components/widgets/lists/Widget5.vue";
import KTTableWidget5 from "@/components/widgets/tables/Widget5.vue";
import Pacientes from "@/components/widgets/lists/Pacientes.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ProductosOrden from "@/components/widgets/tables/ProductosOrden.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from 'moment'
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ReagendarModal from "@/components/modals/forms/Reagendar.vue";
import PacienteModal from "@/components/modals/forms/Paciente.vue";
import OrdenProductoModal from "@/components/modals/forms/OrdenProducto.vue";

export default defineComponent({
  name: "orden-overview",
  components: {
    KTChartWidget1,
    KTListWidget5,
    KTTableWidget5,
    Pacientes,
    ProductosOrden,
    ReagendarModal,
    PacienteModal,
    OrdenProductoModal
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    let pacientes: any[] = []
    const state = reactive({
      orden: {
        fecha: '',
        orderPrice: 0,
        products: pacientes,
      },
      pacientes: pacientes,
      productos: [],
      sucursal: {_id:'', laboratorio_id:''},
      rol: "",
      pacienteSelected: {},
      productoSelected: {},
    });
    const setProducto = async (item) => {
      console.log("ESTUDIO SELECCIONADO: " , item);
      state.productoSelected = item;
    };
    
    const updatePrecio = () => {
      let total = 0;
      state.orden.products.forEach(element => {
        total = total + (element.quantity * element.price);
      });
      state.orden.orderPrice = total;
    }
    const setPaciente = async (item, index) => {
      console.log("PACIENTE SELECCIONADO: " , item);
      // state.pacienteSelectedIndex = index;
      state.pacienteSelected = item;
    };

    const validateDay = (_cita: string) => {
      let hoy = new Date();
      hoy.setDate(hoy.getDate() + 1);
      let cita = new Date(_cita);
      console.log('CITA > HOY', (cita > hoy));
      return (state.rol == 'CLIENTE' || state.rol == 'ADMIN' || state.rol == 'CALL_CENTER') && cita > hoy;
    }
    const saveProducto = (producto: any) => {
      state.orden.products.push(producto);
      console.log("producto: " , producto);
      console.log("state.orden: " , state.orden);
      updatePrecio();
    }

    const apiAction = async (item) => {
      console.log("item: " , item);
      if(item._id == null){
        await store.dispatch(Actions.CREATE_ORDEN, item);
        console.log("store.getters.CREATE_ORDEN: ", store.getters.getResponseOrden); 
      }else{
        await store.dispatch(Actions.UPDATE_ORDEN, item);
        console.log("store.getters.UPDATE_ORDEN: ", store.getters.getResponseOrden);
      }

      if (store.getters.getResponseOrden.ok) {
        Swal.fire({
          text: "Orden actualizada",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          
        });
      }
      
    }
    const listProductosByIdSucrisal = async (sucursalid) => {
      await store.dispatch(Actions.LIST_PRODUCTOS_BY_ID_SUCURSAL, sucursalid);
      state.productos = store.getters.currentProductosByIdSucursal.products;
      console.log("productos: " , store.getters.currentProductosByIdSucursal.products);
    }

    onMounted(async () => {
      setCurrentPageBreadcrumbs("Orden seleccionada", []);
      state.orden = store.getters.currentOrden;
      state.rol = store.getters.currentRol;
      if (typeof store.getters.currentOrden.idUser === "undefined") {
        router.push({ name: store.getters.currentRouter[store.getters.currentRol] });
      }
      store.getters.currentOrden.products.forEach(element => {
        let producto = element.idProduct
        state.sucursal = element.idSucursal ?? {};
        element.pacientes.forEach(elem => {
          state.pacientes.push({ ...elem, producto: producto });
        });
      });
      if(state.sucursal){
        listProductosByIdSucrisal(state.sucursal._id);
      }
    });

    return {
      state,
      apiAction,
      moment,
      validateDay,
      setProducto,
      saveProducto,
      updatePrecio,
      setPaciente,
    };
  },
});
</script>
