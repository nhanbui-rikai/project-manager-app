import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/lib/locales/en.json");
    };
  }
}
