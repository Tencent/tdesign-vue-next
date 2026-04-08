<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #menu="{ configProps }"
      ><div :style="{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }">
        <t-menu v-bind="configProps">
          <t-menu-item value="0">
            <template #icon>
              <t-icon name="app" />
            </template>
            仪表盘
          </t-menu-item>

          <t-submenu value="1" title="资源列表">
            <template #icon>
              <t-icon name="code" />
            </template>
            <t-menu-item value="1-1" disabled>
              <span>菜单二</span>
            </t-menu-item>
          </t-submenu>
          <t-submenu value="2" title="调度平台">
            <template #icon>
              <t-icon name="file" />
            </template>
            <t-submenu value="2-1" title="二级菜单-1">
              <t-menu-item value="3-1">三级菜单-1</t-menu-item>
              <t-menu-item value="3-2">三级菜单-2</t-menu-item>
              <t-menu-item value="3-3">三级菜单-3</t-menu-item>
            </t-submenu>
            <t-menu-item value="2-2">
              <span>二级菜单-2</span>
            </t-menu-item>
          </t-submenu>
        </t-menu>
      </div></template
    >
    <template #headMenu="{ configProps }"
      ><div :style="{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }">
        <t-head-menu style="marginbottom: 20px" v-bind="configProps">
          <template #logo>
            <img src="https://www.tencent.com/img/index/menu_logo_hover.png" width="136" />
          </template>
          <t-menu-item value="0">
            <span>菜单1</span>
          </t-menu-item>
          <t-menu-item value="1">
            <span>菜单2</span>
          </t-menu-item>
        </t-head-menu>
      </div></template
    >
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [
  { label: 'menu', value: 'menu' },
  { label: 'headMenu', value: 'headMenu' },
];

const usageCodeMap = {
  menu: '\n        <div :style="{ padding: \'24px\', background: \'var(--bg-color-page)\', borderRadius: \'3px\' }">\n          <t-menu v-bind="configProps">\n            <t-menu-item value="0">\n              <template #icon>\n                <t-icon name="app" />\n              </template>\n              仪表盘\n            </t-menu-item>\n      \n            <t-submenu value="1" title="资源列表">\n              <template #icon>\n                <t-icon name="code" />\n              </template>\n              <t-menu-item value="1-1" disabled>\n                <span>菜单二</span>\n              </t-menu-item>\n            </t-submenu>\n            <t-submenu value="2" title="调度平台">\n              <template #icon>\n                <t-icon name="file" />\n              </template>\n              <t-submenu value="2-1" title="二级菜单-1">\n                <t-menu-item value="3-1">三级菜单-1</t-menu-item>\n                <t-menu-item value="3-2">三级菜单-2</t-menu-item>\n                <t-menu-item value="3-3">三级菜单-3</t-menu-item>\n              </t-submenu>\n              <t-menu-item value="2-2">\n                <span>二级菜单-2</span>\n              </t-menu-item>\n            </t-submenu>\n          </t-menu>\n        </div>\n      ',
  headMenu:
    '\n        <div :style="{ padding: \'24px\', background: \'var(--bg-color-page)\', borderRadius: \'3px\' }">\n          <t-head-menu style="marginBottom: 20px" v-bind="configProps">\n            <template #logo>\n              <img src="https://www.tencent.com/img/index/menu_logo_hover.png" width="136" />\n            </template>\n            <t-menu-item value="0">\n              <span>菜单1</span>\n            </t-menu-item>\n            <t-menu-item value="1">\n              <span>菜单2</span>\n            </t-menu-item>\n          </t-head-menu>\n        </div>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
