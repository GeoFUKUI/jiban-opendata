import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { writeData } from "https://js.sabae.cc/writeData.js";

const path = "../data/";
const list = await dir2array(path);

const data = [];
const types = {};
for (const fn of list) {
  const n = fn.lastIndexOf(".");
  const type = n >= 0 ? fn.substring(n + 1) : "";
  if (type == "DS_Store") {
    continue;
  }
  const file = await Deno.stat("../data/" + fn);
  data.push({
    name: fn,
    type,
    size: file.size,
  });
  if (types[type] === undefined) {
    types[type] = 1;
  } else {
    types[type]++;
  }
}

console.log(data.length);
console.log(types);
await writeData("../filelist", data);
