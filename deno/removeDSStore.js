import { dir2array } from "https://js.sabae.cc/dir2array.js";

const path = "../data/";
const list = await dir2array(path);

let cnt = 0;
for (const fn of list) {
  const n = fn.lastIndexOf(".");
  const type = n >= 0 ? fn.substring(n + 1) : "";
  if (type == "DS_Store") {
    await Deno.remove("../data/" + fn);
    console.log("remove", fn);
    cnt++;
    continue;
  }
}

console.log(cnt, "files removed");
