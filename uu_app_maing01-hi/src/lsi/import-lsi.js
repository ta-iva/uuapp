import { Utils } from "uu5g05";
import lsiEn from "./en.json";
import lsiCs from "./cs.json";

const libraryCode = process.env.NAME;

const importLsi = (lang) => import(`./${lang}.json`);
importLsi.libraryCode = libraryCode;

//Utils.Lsi.setDefaultLsi(libraryCode, { en: lsiEn });
Utils.Lsi.setDefaultLsi(libraryCode, { cs: lsiCs });

export default importLsi;
