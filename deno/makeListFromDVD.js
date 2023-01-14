import { dir2array } from "https://js.sabae.cc/dir2array.js";

const path = "/Volumes/10 31 2022/";
const list = await dir2array(path);
console.log(list);
console.log(list.length);
await Deno.writeTextFile("list.json", JSON.stringify(list, null, 2));
/*
console.log(list.length);
for (const f of list) {
  const a = await Deno.readTextFile(path + f);
  await Deno.writeTextFile(f, a);
  console.log(f);
}
*/
