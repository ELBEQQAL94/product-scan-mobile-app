import { Language } from "@/enums/language";
import { I18n } from "i18n-js";
import { en } from "./en";
import { ar } from "./ar";
import { fr } from "./fr";
import { es } from "./es";
import { de } from "./de";

export const i18n = new I18n({
  en,
  ar,
  fr,
  es,
  de,
});

export const DEFAULT_LANGUAGE_APP = Language.AR;

i18n.locale = DEFAULT_LANGUAGE_APP;
