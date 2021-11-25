<template>
  <t-breadcrumb :max-item-width="'150'">
    <t-breadcrumbItem to="/vue-next/demos/breadcrumb/custom"> 页面1 </t-breadcrumbItem>
    <t-breadcrumbItem>页面2面包屑文案超长时悬浮显示文案全部信息</t-breadcrumbItem>
    <t-breadcrumbItem :max-width="'160'"> 面包屑中文案过长时可缩略显示，鼠标hover时显示全部 </t-breadcrumbItem>
  </t-breadcrumb>
</template>
