import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { writeData } from "https://js.sabae.cc/writeData.js";
import { XML } from "https://js.sabae.cc/XML.js";
import { dms2d } from "https://js.sabae.cc/dms2d.js";

const path = "../data/";
const list = await dir2array(path);

const data = [];
for (const fn of list) {
  const n = fn.lastIndexOf(".");
  const type = n >= 0 ? fn.substring(n + 1) : "";
  if (type != "XML") {
    continue;
  }
  const file = await Deno.stat("../data/" + fn);
  const sxml = await Deno.readTextFile("../data/" + fn);
  const xml = XML.toJSON(sxml);
  if (!xml.ボーリング情報) {
    continue;
  }
  const pos = xml.ボーリング情報.標題情報.経度緯度情報;
  if (!pos) {
    continue;
  }
  
  const c = (name) => pos[name]["#text"];
  const lat = dms2d(c("緯度_度"), c("緯度_分"), c("緯度_秒"));
  const lng = dms2d(c("経度_度"), c("経度_分"), c("経度_秒"));
  const name = xml.ボーリング情報.標題情報.調査基本情報.調査名["#text"];
  const bname = xml.ボーリング情報.標題情報.調査基本情報.ボーリング名["#text"];
  const startday = xml.ボーリング情報.標題情報.調査期間.調査期間_開始年月日["#text"];
  const endday = xml.ボーリング情報.標題情報.調査期間.調査期間_終了年月日["#text"];

  data.push({
    url: "https://geofukui.github.io/jiban-opendata/data/" + fn,
    size: file.size,
    startday,
    endday,
    bname,
    lat,
    lng,
    name,
  });
}

console.log(data.length);
await writeData("../boring", data);
