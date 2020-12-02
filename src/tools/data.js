import store from "../store";
export function Appdata(data) {
  var Appdata = JSON.parse(data)
  store.dispatch("SAVE_APPDATA", Appdata);
}