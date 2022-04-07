<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="renderCode" :config-list="configList">
    <template #default="data">
      <component :is="renderComp(data)" />
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { compile } from 'vue/dist/vue.esm-bundler.js';

import { CodeIcon, AppIcon, FileIcon } from 'tdesign-icons-vue';

import configList from './props.json';
const renderCode = `
          const defaultProps = {
            :style: { marginBottom: '20px' },
            logo: <img src="https://www.tencent.com/img/index/menu_logo_hover.png" width="136" />,
          };
          
            <div :style="{{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }}">
              <t-head-menu {...defaultProps} __pointerProps__>
                <t-menu-item value="0">
                  <span>菜单1</span>
                </t-menu-item>
                <t-menu-item value="1">
                  <span>菜单2</span>
                </t-menu-item>
              </t-head-menu>

              <t-menu __pointerProps__>
                <t-menu-item value="0" icon={<t-appIcon />}>
                  仪表盘
                </t-menu-item>
                <t-menu-sub value="1" title={<span>资源列表</span>} icon={<t-codeIcon />}>
                  <t-menu-item value="1-1" disabled>
                    <span>菜单二</span>
                  </t-menu-item>
                </t-menu-sub>
                <t-menu-sub value="2" title={<span>调度平台</span>} icon={<t-fileIcon />}>
                  <t-menu-sub value="2-1" title="二级菜单-1">
                    <t-menu-item value="3-1">三级菜单-1</t-menu-item>
                    <t-menu-item value="3-2">三级菜单-2</t-menu-item>
                    <t-menu-item value="3-3">三级菜单-3</t-menu-item>
                  </t-menu-sub>
                  <t-menu-item value="2-2">
                    <span>二级菜单-2</span>
                  </t-menu-item>
                </t-menu-sub>
              </t-menu>
            </div>
          `;

const renderComp = (data) => {
  return data?.usageCode ? compile(data.usageCode) : null;
};
</script>
