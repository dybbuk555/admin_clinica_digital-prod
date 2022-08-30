<template>
  <!-- eslint-disable -->
  <!-- /* eslint-disable */ -->

  <OrdenModal :rol="state.rol" :item="state.orden" :apiAction="apiAction" :setSucursal="setSucursal"
    :sucursal="state.sucursal" :setProducto="setProducto" :updatePrecio="updatePrecio" :sucursales="state.sucursales">
  </OrdenModal>

  <OrdenProductoModal :pacienteSelected="state.pacienteSelected" :producto="state.productoSelected"
    :productos="state.productos" :sucursal="state.sucursal" :saveProducto="saveProducto" :updatePrecio="updatePrecio"
    :setPaciente="setPaciente"></OrdenProductoModal>


  <Ordenes widget-classes="mb-5 mb-xl-8" :ordenes="state.ordenes" :listSucursales="listSucursales" :setOrden="setOrden"
    :setOrdenEdit="setOrdenEdit" :deleteItem="showAlert" :rol="state.rol" :user="state.user"></Ordenes>
</template>

<script lang="ts">
// eslint-disable-next-line
/* eslint-disable */
import { defineComponent, onMounted, reactive } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Ordenes from "@/components/widgets/tables/Ordenes.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import OrdenModal from "@/components/modals/forms/Reagendar.vue";
import OrdenProductoModal from "@/components/modals/forms/OrdenProducto.vue";

export default defineComponent({
  name: "ordenes-list",
  components: { Ordenes, OrdenModal, OrdenProductoModal },
  setup() {
    const store = useStore();
    const router = useRouter();

    const setOrden = async (item) => {
      console.log("item: ", item);
      await store.commit(Mutations.SET_ORDEN, item);
      router.push({ name: "orden-view" });
    }

    let pacientes: any[] = []
    const state = reactive({
      ordenes: [],
      user: {},
      rol: "",

      orden: {
        orderPrice: 0,
        products: pacientes,
      },
      pacientes: pacientes,
      productos: [],
      sucursales: [],
      sucursal: { _id: '', laboratorio_id: '' },
      pacienteSelected: {},
      // pacienteSelectedIndex: {},
      productoSelected: {},
    });

    const saveProducto = (producto: any) => {
      state.orden.products.push(producto);
      console.log("producto: ", producto);
      console.log("state.orden: ", state.orden);
      updatePrecio();
    }

    const showAlert = (item) => {
      Swal.fire({
        title: 'AVISO',
        text: "¿Deseas borrar este registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          deleteItem(item);
          // Swal.fire('AVISO','Registro borrado con exito.', 'success')
        }
      })
    }

    const updatePrecio = () => {
      let total = 0;
      state.orden.products.forEach(element => {
        total = total + (element.quantity * element.price);
      });
      state.orden.orderPrice = total;
      console.log("total: ", total);
      console.log("state.orden.orderPrice: ", state.orden.orderPrice);
      console.log("state.orden.products: ", state.orden.products);
      console.log("ACTULZIAR PRECIo");
    }
    const setSucursal = async (item) => {
      state.sucursal = item;
      listProductosByIdSucursal(state.sucursal._id);
    }
    const setOrdenEdit = async (item) => {
      if (item['products'].length > 0) {
        state.sucursal = item['products'][0].idSucursal;
        listProductosByIdSucursal(state.sucursal._id);
      }
      console.log("ORDEN SELECCIONADA: ", item);
      state.orden = item;
      // await store.commit(Mutations.SET_ORDEN, item);
    }
    const setProducto = async (item) => {
      console.log("ESTUDIO SELECCIONADO: ", item);
      state.productoSelected = item;
    };
    const setPaciente = async (item, index) => {
      console.log("PACIENTE SELECCIONADO: ", item);
      // state.pacienteSelectedIndex = index;
      state.pacienteSelected = item;
    };
    const apiAction = async (item) => {
      console.log("item: ", item);
      if (item.nuevo == '') {
        // delete item.nuevo

        await store.dispatch(Actions.CREATE_ORDEN, item);
        console.log("store.getters.CREATE_ORDEN: ", store.getters.getResponseOrden);
      } else {
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
          initTable();
        });
      }

    }
    const deleteItem = async (item) => {
      if (item._id != null) {
        await store.dispatch(Actions.DELETE_ORDEN, item);
        console.log("store.getters.DELETE_ORDEN: ", store.getters.getResponseOrden);
      }

      if (store.getters.getResponseOrden.ok) {
        Swal.fire({
          text: "ORDEN borrada con exito",
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
    const listProductosByIdSucursal = async (sucursalid) => {
      await store.dispatch(Actions.LIST_PRODUCTOS_BY_ID_SUCURSAL, sucursalid);
      state.productos = store.getters.currentProductosByIdSucursal.products;
      console.log("productos: ", store.getters.currentProductosByIdSucursal.products);
    }
    const listSucursales = async () => {
      await store.dispatch(Actions.LIST_SUCURSALES, {});
      state.sucursales = store.getters.currentSucursales.sucursales;
      console.log("store.getters.currentSucursales.sucursales: ", store.getters.currentSucursales.sucursales);

    };

    const initTable = async () => {
      await store.dispatch(Actions.LIST_ORDENES, {});
      state.ordenes = store.getters.currentOrdenes.ordenes;
    }



    onMounted(async () => {
      setCurrentPageBreadcrumbs("Modulo de Ordenes", []);
      initTable();
      state.rol = store.getters.currentRol;
      console.log("state: ", state);
      state.user = store.getters.currentUser;

      const [errorName] = Object.keys(store.getters.getErrors);
      const error = store.getters.getErrors[errorName];
      if (error) {
        Swal.fire({
          text: error[0],
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }

    });

    return {
      state,
      setOrden,
      setSucursal,
      setOrdenEdit,
      setProducto,
      setPaciente,
      apiAction,
      deleteItem,
      saveProducto,
      updatePrecio,
      listSucursales,
      showAlert
    };

  },
});
</script>
