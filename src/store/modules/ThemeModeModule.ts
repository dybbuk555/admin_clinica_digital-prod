import { Action, Mutation, Module, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { ThemeModeComponent } from "@/assets/ts/layout";

interface StoreInfo {
  mode: "light" | "dark" | "system";
}

const themeModeLSKey = "kt_theme_mode_value";
const themeMenuModeLSKey = "kt_theme_mode_menu";

@Module
export default class ThemeModeModule extends VuexModule implements StoreInfo {
  mode: "light" | "dark" | "system" = localStorage.getItem(themeModeLSKey)
    ? (localStorage.getItem(themeModeLSKey) as "light" | "dark" | "system")
    : "system";

  /**
   * Get theme mode string light/dark/system
   * @returns object
   */
  get getThemeMode(): string {
    return this.mode;
  }

  @Mutation
  [Mutations.SET_THEME_MODE_MUTATION](payload) {
    this.mode = payload;
  }

  @Action
  [Actions.SET_THEME_MODE_ACTION](payload) {
    localStorage.setItem(themeModeLSKey, payload);
    localStorage.setItem(themeMenuModeLSKey, payload);
    document.documentElement.setAttribute("data-theme", payload);
    ThemeModeComponent.init();
    this.context.commit(Mutations.SET_THEME_MODE_MUTATION, payload);
  }
}
