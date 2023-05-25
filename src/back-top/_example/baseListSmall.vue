<template>
  <div style="position: relative; height: 280px">
    <t-list class="baseListSmall-container" style="position: relative; height: 100%; overflow-y: scroll">
      <t-list-item v-for="index in 15" :key="index">列表内容{{ index }}</t-list-item>
    </t-list>
    <t-back-top
      container=".baseListSmall-container"
      :visible-height="0"
      style="position: absolute"
      :offset="['24px', '80px']"
      :duration="2000"
    ></t-back-top>
  </div>
</template>
