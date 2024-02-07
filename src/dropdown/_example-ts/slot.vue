<template>
  <t-space direction="vertical">
    <t-space direction="vertical">
      <h4>支持直接使用 t-dropdown-menu</h4>
      <t-dropdown :min-column-width="88" @click="clickHandler">
        <t-button variant="text">下拉菜单</t-button>
        <t-dropdown-menu>
          <t-dropdown-item :value="1">
            操作一
            <t-dropdown-menu>
              <t-dropdown-item :value="11">操作1-1</t-dropdown-item>
              <t-dropdown-item :value="12">
                操作1-2
                <t-dropdown-menu>
                  <t-dropdown-item v-for="item in operationMenu" :key="item.key" :value="item.value">{{
                    item.label
                  }}</t-dropdown-item>
                </t-dropdown-menu>
              </t-dropdown-item>
            </t-dropdown-menu>
          </t-dropdown-item>

          <t-dropdown-item :value="2">
            操作二
            <t-dropdown-menu>
              <t-dropdown-item :value="21">
                操作2-1
                <t-dropdown-menu>
                  <t-dropdown-item :value="211">操作2-1-1</t-dropdown-item>
                  <t-dropdown-item :value="212" theme="error" @click="handleClick">
                    <div><t-icon name="error-circle"></t-icon>危险操作</div>
                  </t-dropdown-item>
                </t-dropdown-menu>
              </t-dropdown-item>
              <t-dropdown-item :value="22"> 操作2-2 </t-dropdown-item>
            </t-dropdown-menu>
          </t-dropdown-item>

          <t-dropdown-item :value="3"> 操作三 </t-dropdown-item>
        </t-dropdown-menu>
      </t-dropdown>
    </t-space>
    <t-space direction="vertical">
      <h4>兼容历史版本 通过 dropdown 具名插槽的使用</h4>
      <t-dropdown :min-column-width="88" @click="clickHandler">
        <t-button variant="text">下拉菜单</t-button>
        <template #dropdown>
          <t-dropdown-menu>
            <t-dropdown-item :value="1">
              操作一
              <t-dropdown-menu>
                <t-dropdown-item :value="11">操作1-1</t-dropdown-item>
                <t-dropdown-item :value="12">
                  操作1-2
                  <t-dropdown-menu>
                    <t-dropdown-item :value="111">操作1-1-1</t-dropdown-item>
                    <t-dropdown-item :value="112">操作1-1-2</t-dropdown-item>
                  </t-dropdown-menu>
                </t-dropdown-item>
              </t-dropdown-menu>
            </t-dropdown-item>
            <t-dropdown-item :value="2">操作二 </t-dropdown-item>
            <t-dropdown-item :value="3">操作三</t-dropdown-item>
          </t-dropdown-menu>
        </template>
      </t-dropdown>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { MessagePlugin, DropdownProps, DropdownItemProps } from 'tdesign-vue-next';
const operationMenu = ref([
  {
    label: '操作一',
    value: 111,
  },
  {
    label: '操作二',
    value: 222,
  },
]);
const clickHandler: DropdownProps['onClick'] = (data) => {
  console.log(data, 'data');
  if (data.value !== 212) MessagePlugin.success(`选中【${data.value}】`);
};
const handleClick: DropdownItemProps['onClick'] = () => {
  MessagePlugin.success(`点击 操作2-1-2`);
};
</script>
