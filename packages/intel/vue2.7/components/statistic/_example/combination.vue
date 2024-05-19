<template>
  <t-space :size="100" breakLine>
    <t-space align="center">
      <t-icon name="chart" class="icon" />
      <t-statistic title="Total Assets" :value="82.76" unit="%" trend="increase" trendPlacement="right" />
    </t-space>

    <t-space align="center">
      <t-statistic title="Total Assets" :value="52.18" unit="%" trend="decrease" />
      <t-icon name="internet" class="icon" style="border-radius: 50%" />
    </t-space>

    <t-card title="Yesterday traffic" header-bordered hover-shadow>
      <t-space :separator="separator">
        <t-statistic title="Voice duration" :value="789" unit="minute" extra="the day before 9%" />
        <t-statistic title="Total number of voice DAUs" :value="188" color="red">
          <template #extra>
            <t-space direction="vertical" :size="0">
              <span>
                the day before
                <t-icon name="arrow-up" style="color: #d54941" />
                9%
              </span>
              <span>
                last week
                <t-icon name="arrow-down" style="color: #2ba471" />
                9%
              </span>
            </t-space>
          </template>
        </t-statistic>
        <t-statistic title="Total Assets" :value="52.18" unit="%" trend="decrease" color="green" />
      </t-space>
    </t-card>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      separator: () => <t-divider layout="vertical" style="height:100%" />,
    };
  },
};
</script>
<style>
.icon {
  font-size: 32px;
  color: var(--td-brand-color);
  background: var(--td-brand-color-light);
  border-radius: var(--td-radius-medium);
  padding: 12px;
}
</style>
