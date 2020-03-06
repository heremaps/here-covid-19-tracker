/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

module.exports = function prepareScrapedData(d) {
  const content = d.split("try { window.getAreaStat = ")[1].split("}catch(e){}")[0]
  const parsed = JSON.parse(content)
  return parsed.map(d => {
    return {
      country: "China",
      provincestate: translateProvinceName(d.provinceName),
      confirmed: d.confirmedCount,
      recoveries: d.curedCount,
      deaths: d.deadCount,
      updated: new Date().getTime(),
    }
  })
}

function translateProvinceName(name) {
  const names = {
    '辽宁省': "Liaoning",
    '湖北省': "Hubei",
    '江苏省': "Jiangsu",
    '河南省': "Henan",
    '福建省': "Fujian",
    '海南省': "Hainan",
    '山西省': "Shanxi",
    '重庆市': "Chongqing",
    '河北省': "Hebei",
    '香港': "Hong Kong",
    '湖南省': "Hunan",
    '浙江省': "Zhejiang",
    '山东省': "Shandong",
    '内蒙古自治区': "Inner Mongolia",
    '宁夏回族自治区': "Ningxia",
    '贵州省': "Guizhou",
    '广东省': "Guangdong",
    '云南省': "Yunnan",
    '四川省': "Sichuan",
    '陕西省': "Shaanxi",
    '黑龙江省': "Heilongjiang",
    '上海市': "Shanghai",
    '天津市': "Tianjin",
    '安徽省': "Anhui",
    '新疆维吾尔自治区': "Xinjiang",
    '北京市': "Beijing",
    '甘肃省': "Gansu",
    '广西壮族自治区': "Guangxi",
    '江西省': "Jiangxi",
    '吉林省': "Jilin",
    '台湾': "Taiwan",
    '澳门': "Macau",
    '青海省': "Qinghai",
    '西藏自治区': "Tibet",
    '待明确地区': "",
  }
  return names[name] || "N/A"
}
