import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import ClientesModule from "@/store/modules/ClientesModule";
import CategoriasModule from "@/store/modules/CategoriasModule";
import LaboratoriosModule from "@/store/modules/LaboratoriosModule";
import OrdenesModule from "@/store/modules/OrdenesModule";
import SucursalesModule from "@/store/modules/SucursalesModule";
import ProductosModule from "@/store/modules/ProductosModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import ThemeModeModule from "@/store/modules/ThemeModeModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    ThemeModeModule,
    ClientesModule,
    LaboratoriosModule,
    OrdenesModule,
    ProductosModule,
    CategoriasModule,
    SucursalesModule,
  },
});

export default store;
