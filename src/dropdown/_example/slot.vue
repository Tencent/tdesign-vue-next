<template>
  <t-space direction="vertical">
    <t-space direction="vertical">
      <h4>支持直接使用 t-dropdown-menu</h4>
      <t-dropdown :min-column-width="88" @click="handleClick">
        <t-button variant="text">下拉菜单</t-button>
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

          <t-dropdown-item :value="2">
            操作二
            <t-dropdown-menu>
              <t-dropdown-item :value="21">
                操作2-1
                <t-dropdown-menu>
                  <t-dropdown-item :value="211">操作2-1-1</t-dropdown-item>
                  <t-dropdown-item :value="211">操作2-1-2</t-dropdown-item>
                </t-dropdown-menu>
              </t-dropdown-item>
              <t-dropdown-item :value="22" @click="clickHandler"> 操作2-2 </t-dropdown-item>
            </t-dropdown-menu>
          </t-dropdown-item>

          <t-dropdown-item :value="3">操作三</t-dropdown-item>
        </t-dropdown-menu>
      </t-dropdown>
    </t-space>
    <t-space direction="vertical">
      <h4>兼容历史版本 通过 dropdown 具名插槽的使用</h4>
      <t-dropdown :min-column-width="88" @click="handleClick">
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

            <t-dropdown-item :value="2"> 操作二 </t-dropdown-item>

            <t-dropdown-item :value="3">操作三</t-dropdown-item>
          </t-dropdown-menu>
        </template>
      </t-dropdown>
    </t-space>
  </t-space>
</template>
<script setup>
const handleClick = (data, { e }) => {
  console.log(data);
  e.preventDefault();
};
</script>
