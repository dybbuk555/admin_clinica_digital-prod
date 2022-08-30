// eslint-disable-next-line
/* eslint-disable */ 
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";

const routes: Array<any> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/welcome",
        name: "welcome",
        role: ['ADMIN', 'CALL_CENTER'],
        component: () => import("@/views/Welcome.vue"),
      },
      {
        path: "/ambulance",
        name: "ambulance",
        role: ['ADMIN', 'CALL_CENTER'],
        component: () => import("@/views/Ambulance.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        role: ['ADMIN', 'CALL_CENTER'],
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/ordenes",
        name: "ordenes-table",
        role: ['ADMIN', 'CALL_CENTER'],
        component: () => import("@/views/ordenes/List.vue"),
      },
      {
        path: "/clientes",
        name: "clientes-table",
        role: ['ADMIN', 'CALL_CENTER'],
        component: () => import("@/views/clientes/List.vue"),
      },
      {
        path: "/laboratorios",
        name: "laboratorios-table",
        role: ['ADMIN'],
        component: () => import("@/views/laboratorios/List.vue"),
      },
      {
        path: "/sucursales",
        name: "sucursales-table",
        role: ['ADMIN'],
        component: () => import("@/views/sucursales/List.vue"),
      },
      {
        path: "/productos",
        name: "productos-table",
        role: ['ADMIN'],
        component: () => import("@/views/productos/List.vue"),
      },
      {
        path: "/orden",
        name: "orden-view",
        role: ['USER_ROLE', 'ADMIN', 'CALL_CENTER', 'CLIENTE', 'LABORATORIO', '', null, undefined],
        component: () => import("@/views/orden/Index.vue"),
      },
      {
        path: "/categorias",
        name: "categorias-table",
        role: ['ADMIN'],
        component: () => import("@/views/categorias/List.vue"),
      },
      {
        path: "/",
        name: "laboratorios",
        component: () => import("@/components/page-layouts/Perfil.vue"),
        children: [
          {
            path: "mis-ordenes",
            name: "mis-ordenes",
            role: ['ADMIN', 'LABORATORIO', 'CALL_CENTER'],
            component: () =>
            import("@/views/laboratorio/MisOrdenes.vue"),
          },
        ],
      },
      {
        path: "/perfil",
        name: "perfil",
        component: () => import("@/components/page-layouts/Perfil.vue"),
        children: [
          {
            path: "mis-ordenes",
            name: "profile-mis-ordenes",
            role: ['ADMIN', 'CLIENTE'],
            component: () =>
              import("@/views/perfil/MisOrdenes.vue"),
          },
        ],
      },
      {
        path: "/ambulancias",
        name: "ambulancias-table",
        role: ['ADMIN'],
        component: () => import("@/views/ambulancias/List.vue"),
      },
      {
        path: "/ordenes-ambulancias",
        name: "ordenes-ambulancias-table",
        role: ['ADMIN', 'CALL_CENTER'],
        component: () => import("@/views/ordenes-ambulancias/List.vue"),
      },
      {
        path: "/metricas",
        name: "metricas-table",
        role: ['ADMIN'],
        component: () => import("@/views/metricas/List.vue"),
      },
      
      // {
      //   path: "/crafted/pages/profile",
      //   name: "profile",
      //   component: () => import("@/components/page-layouts/Profile.vue"),
      //   children: [
      //     {
      //       path: "overview",
      //       name: "profile-overview",
      //       component: () =>
      //         import("@/views/crafted/pages/profile/Overview.vue"),
      //     },
      //     {
      //       path: "projects",
      //       name: "profile-projects",
      //       component: () =>
      //         import("@/views/crafted/pages/profile/Projects.vue"),
      //     },
      //     {
      //       path: "campaigns",
      //       name: "profile-campaigns",
      //       component: () =>
      //         import("@/views/crafted/pages/profile/Campaigns.vue"),
      //     },
      //     {
      //       path: "documents",
      //       name: "profile-documents",
      //       component: () =>
      //         import("@/views/crafted/pages/profile/Documents.vue"),
      //     },
      //     {
      //       path: "connections",
      //       name: "profile-connections",
      //       component: () =>
      //         import("@/views/crafted/pages/profile/Connections.vue"),
      //     },
      //     {
      //       path: "activity",
      //       name: "profile-activity",
      //       component: () =>
      //         import("@/views/crafted/pages/profile/Activity.vue"),
      //     },
      //   ],
      // },






      

      



      // {
      //   path: "/builder",
      //   name: "builder",
      //   component: () => import("@/views/Builder.vue"),
      // },
      // {
      //   path: "/crafted/pages/wizards/horizontal",
      //   name: "horizontal-wizard",
      //   component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
      // },
      // {
      //   path: "/crafted/pages/wizards/vertical",
      //   name: "vertical-wizard",
      //   component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
      // },
      // {
      //   path: "/crafted/account",
      //   name: "account",
      //   component: () => import("@/views/crafted/account/Account.vue"),
      //   children: [
      //     {
      //       path: "overview",
      //       name: "account-overview",
      //       component: () => import("@/views/crafted/account/Overview.vue"),
      //     },
      //     {
      //       path: "settings",
      //       name: "account-settings",
      //       component: () => import("@/views/crafted/account/Settings.vue"),
      //     },
      //   ],
      // },
      // {
      //   path: "/apps/customers/getting-started",
      //   name: "apps-customers-getting-started",
      //   component: () => import("@/views/apps/customers/GettingStarted.vue"),
      // },
      // {
      //   path: "/apps/customers/customers-listing",
      //   name: "apps-customers-listing",
      //   component: () => import("@/views/apps/customers/CustomersListing.vue"),
      // },
      // {
      //   path: "/apps/customers/customer-details",
      //   name: "apps-customers-details",
      //   component: () => import("@/views/apps/customers/CustomerDetails.vue"),
      // },
      // {
      //   path: "/apps/subscriptions/getting-started",
      //   name: "apps-subscriptions-getting-started",
      //   component: () =>
      //     import("@/views/apps/subscriptions/GettingStarted.vue"),
      // },
      // {
      //   path: "/apps/subscriptions/subscription-list",
      //   name: "apps-subscriptions-subscription-list",
      //   component: () =>
      //     import("@/views/apps/subscriptions/SubscriptionList.vue"),
      // },
      // {
      //   path: "/apps/subscriptions/add-subscription",
      //   name: "apps-subscriptions-add-subscription",
      //   component: () =>
      //     import("@/views/apps/subscriptions/AddSubscription.vue"),
      // },
      // {
      //   path: "/apps/subscriptions/view-subscription",
      //   name: "apps-subscriptions-view-subscription",
      //   component: () =>
      //     import("@/views/apps/subscriptions/ViewSubscription.vue"),
      // },
      // {
      //   path: "/apps/calendar",
      //   name: "apps-calendar",
      //   component: () => import("@/views/apps/Calendar.vue"),
      // },
      // {
      //   path: "/apps/chat/private-chat",
      //   name: "apps-private-chat",
      //   component: () => import("@/views/apps/chat/Chat.vue"),
      // },
      // {
      //   path: "/apps/chat/group-chat",
      //   name: "apps-group-chat",
      //   component: () => import("@/views/apps/chat/Chat.vue"),
      // },
      // {
      //   path: "/apps/chat/drawer-chat",
      //   name: "apps-drawer-chat",
      //   component: () => import("@/views/apps/chat/DrawerChat.vue"),
      // },
      // {
      //   path: "/crafted/modals/general/invite-friends",
      //   name: "modals-general-invite-friends",
      //   component: () =>
      //     import("@/views/crafted/modals/general/InviteFriends.vue"),
      // },
      // {
      //   path: "/crafted/modals/general/view-user",
      //   name: "modals-general-view-user",
      //   component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
      // },
      // {
      //   path: "/crafted/modals/general/upgrade-plan",
      //   name: "modals-general-upgrade-plan",
      //   component: () =>
      //     import("@/views/crafted/modals/general/UpgradePlan.vue"),
      // },
      // {
      //   path: "/crafted/modals/general/share-and-earn",
      //   name: "modals-general-share-and-earn",
      //   component: () =>
      //     import("@/views/crafted/modals/general/ShareAndEarn.vue"),
      // },
      // {
      //   path: "/crafted/modals/forms/new-target",
      //   name: "modals-forms-new-target",
      //   component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
      // },
      // {
      //   path: "/crafted/modals/forms/new-card",
      //   name: "modals-forms-new-card",
      //   component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
      // },
      // {
      //   path: "/crafted/modals/forms/new-address",
      //   name: "modals-forms-new-address",
      //   component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
      // },
      // {
      //   path: "/crafted/modals/forms/create-api-key",
      //   name: "modals-forms-create-api-key",
      //   component: () =>
      //     import("@/views/crafted/modals/forms/CreateApiKey.vue"),
      // },
      // {
      //   path: "/crafted/modals/wizards/two-factor-auth",
      //   name: "modals-wizards-two-factor-auth",
      //   component: () =>
      //     import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
      // },
      // {
      //   path: "/crafted/modals/wizards/create-app",
      //   name: "modals-wizards-create-app",
      //   component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
      // },
      // {
      //   path: "/crafted/modals/wizards/create-account",
      //   name: "modals-wizards-create-account",
      //   component: () =>
      //     import("@/views/crafted/modals/wizards/CreateAccount.vue"),
      // },
      // {
      //   path: "/crafted/widgets/lists",
      //   name: "widgets-list",
      //   component: () => import("@/views/crafted/widgets/Lists.vue"),
      // },
      // {
      //   path: "/crafted/widgets/statistics",
      //   name: "widgets-statistics",
      //   component: () => import("@/views/crafted/widgets/Statistics.vue"),
      // },
      // {
      //   path: "/crafted/widgets/charts",
      //   name: "widgets-charts",
      //   component: () => import("@/views/crafted/widgets/Charts.vue"),
      // },
      // {
      //   path: "/crafted/widgets/mixed",
      //   name: "widgets-mixed",
      //   component: () => import("@/views/crafted/widgets/Mixed.vue"),
      // },
      // {
      //   path: "/crafted/widgets/tables",
      //   name: "widgets-tables",
      //   component: () => import("@/views/crafted/widgets/Tables.vue"),
      // },
      // {
      //   path: "/crafted/widgets/feeds",
      //   name: "widgets-feeds",
      //   component: () => import("@/views/crafted/widgets/Feeds.vue"),
      // },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        role: ['USER_ROLE', 'ADMIN', 'CALL_CENTER', 'CLIENTE', 'LABORATORIO', '', null, undefined],
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      // {
      //   path: "/sign-up",
      //   name: "sign-up",
      //   component: () =>
      //     import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      // },
      // {
      //   path: "/password-reset",
      //   name: "password-reset",
      //   component: () =>
      //     import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      // },
    ],
  },
  // {
  //   path: "/multi-step-sign-up",
  //   name: "multi-step-sign-up",
  //   component: () =>
  //     import("@/views/crafted/authentication/MultiStepSignUp.vue"),
  // },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    role: ['USER_ROLE', 'ADMIN', 'CALL_CENTER', 'CLIENTE', 'LABORATORIO', '', null, undefined],
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    role: ['USER_ROLE', 'ADMIN', 'CALL_CENTER', 'CLIENTE', 'LABORATORIO', '', null, undefined],
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);
  // // revisa el token este vigente
  // store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });

  let res = to.matched[0].children.find(elem => {
    if(typeof elem['children'] != 'undefined'){
      return elem['children'].find(item => item['name'] == to.name && item['role'].includes(store.getters.currentRol))
    }else if(typeof elem['name'] != 'undefined'){
      return elem['name'] == to.name && elem['role'].includes(store.getters.currentRol)
    }
  });
  // console.log("to.name: " , to.name);
  // console.log("res: " , res);
  // console.log("store.getters.currentRol: " , store.getters.currentRol);
  // console.log("store.getters.currentRouter: " , store.getters.currentRouter);
  if(typeof res != 'undefined'){
    next();
  }else{
    if(store.getters.isUserAuthenticated){
      // next();
      router.push({ name: store.getters.currentRouter[store.getters.currentRol] });
    }else{
      next();
    }
  }

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
