import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";

const makeDirectories = async (fn) => {
  const n = fn.lastIndexOf("/");
  if (n > 0) {
    await Deno.mkdir(fn.substring(0, n), { recursive: true });
  }
};

const copy = async (dst, src) => {
  const b = await Deno.readFile(src);
  await makeDirectories(dst);
  await Deno.writeFile(dst, b);
};

const copyWithUTF8 = async (dst, src) => {
  const b = await Deno.readFile(src);
  const s = SJIS.decode(b);
  const s2 = s.replace(/encoding=\"Shift_JIS\"/i, 'encoding="UTF-8"');
  await makeDirectories(dst);
  await Deno.writeTextFile(dst, s2);
};

//const path = "/Volumes/10 31 2022/"; // No.1, 2
//const path = "/Volumes/11 08 2022/"; // No.3
const path = "/Volumes/11 10 2022/"; // No.8

//const list = JSON.parse(await Deno.readTextFile("list.json"));
const list = await dir2array(path);

let cnt = 0;
for (const f of list) {
  if (!f.toUpperCase().endsWith(".XML") && !f.toUpperCase().endsWith(".DTD")) {
    continue;
  }
  const makeDestPath = (f) => {
    const ss = f.split("/");
    ss.splice(2, 2); // cut 日本語名、BORING
    ss.splice(0, 1); // cut No.?
    return ss.join("/");
  };
  const dst = "data/" + makeDestPath(f).toUpperCase();
  const src = path + f;
  if (f.toUpperCase().endsWith(".XML")) {
    await copyWithUTF8(dst, src);
  } else {
    await copy(dst, src);
  }
  console.log(dst);
  cnt++;
}
console.log(cnt);
// No.1 4646files 110MB
// No.2 
