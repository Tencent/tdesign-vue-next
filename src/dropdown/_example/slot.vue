<template>
  <t-space>
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
</template>
<script setup>
const handleClick = (data, { e }) => {
  console.log(data);
  e.preventDefault();
};
</script>
