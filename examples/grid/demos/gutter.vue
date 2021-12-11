<template>
  <div class="tdesign-demo-item--grid">
    <!-- 只指定水平 gutter，垂直默认为0 -->
    <span>水平 gutter 为固定值</span>
    <t-row :gutter="16">
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <!-- 水平 gutter 为响应式 -->
    <span>水平 gutter 为响应式</span>
    <t-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 }">
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <!-- 指定水平和垂直 gutter，注：垂直 gutter 只在同一个row组件下面的col组件之间生效 -->
    <span>水平和垂直 gutter 均为固定值</span>
    <t-row :gutter="[16, 24]">
      <t-col v-for="i in 8" :key="i" :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <!-- 水平 gutter 响应式，垂直 gutter 固定值-->
    <span>水平 gutter 响应式，垂直 gutter 固定值</span>
    <t-row :gutter="[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 }, 24]">
      <t-col v-for="i in 8" :key="i" :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <!-- 水平和垂直 gutter 均为响应式 -->
    <span>水平和垂直 gutter 均为响应式</span>
    <t-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 },
        { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 },
      ]"
    >
      <t-col v-for="i in 8" :key="i" :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>
  </div>
</template>
