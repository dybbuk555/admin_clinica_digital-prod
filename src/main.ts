// eslint-disable-next-line
/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import  VueGoogleMaps from '@fawmi/vue-google-maps'
/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import "@/core/plugins/prismjs";
import "bootstrap";

const app = createApp(App);

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAOi-WtQK9ALZiLwzyNf_9lnuZVE3IfNqc',
    },
})

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueSweetalert2);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.mount("#app");
