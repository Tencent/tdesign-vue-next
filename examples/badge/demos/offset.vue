<template>
  <div>
    <t-badge count="2">
      <div class="badge-block" />
    </t-badge>

    <t-badge
      count="2"
      :offset="[10, 10]"
    >
      <div class="badge-block" />
    </t-badge>

    <t-badge
      count="2"
      :offset="[-10, 10]"
    >
      <div class="badge-block" />
    </t-badge>

    <t-badge
      count="2"
      :offset="[-10, -10]"
    >
      <div class="badge-block" />
    </t-badge>

    <t-badge
      count="2"
      :offset="[10, -10]"
    >
      <div class="badge-block" />
    </t-badge>
  </div>
</template>
<script></script>

<style>
.badge-block {
  width: 40px;
  height: 40px;
  background: #EEEEEE;
  border: 1px solid #DCDCDC;
  box-sizing: border-box;
  border-radius: 3px;
}

.badge-block + .badge-block {
  margin-left: 24px;
}

.badge-block + div {
  margin-top: 8px;
}
</style>
