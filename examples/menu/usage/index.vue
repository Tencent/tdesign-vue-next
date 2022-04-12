<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList">
    <template #default="{ configProps }">
      <div :style="{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }">
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
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';
import configList from './props.json';

const usageCode = `<template>
  <div :style="{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }">
    <t-head-menu style="marginBottom: 20px" v-bind="configProps">
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
  </div>
</template>
`;
</script>
