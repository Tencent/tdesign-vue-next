<template>
  <t-space :size="100" break-line>
    <t-space align="center">
      <t-icon name="chart" class="icon" />
      <t-statistic title="Total Assets" :value="82.76" unit="%" trend="increase" trend-placement="right" />
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
              <t-space align="center" :size="7">
                <div style="width: 120px">the day before</div>
                <t-icon
                  name="arrow-triangle-up-filled"
                  style="color: #d54941; font-size: var(--td-font-size-body-large)"
                />
                <div>9%</div>
              </t-space>

              <t-space align="center" :size="7">
                <div style="width: 120px">last week</div>
                <t-icon
                  name="arrow-triangle-down-filled"
                  style="color: #2ba471; font-size: var(--td-font-size-body-large)"
                />
                <div>9%</div>
              </t-space>
            </t-space>
          </template>
        </t-statistic>
        <t-statistic title="Total Assets" :value="52.18" unit="%" trend="decrease" color="green" />
      </t-space>
    </t-card>
  </t-space>
</template>

<script lang="tsx" setup>
import { SpaceProps } from 'tdesign-vue-next';
const separator: SpaceProps['separator'] = () => <t-divider layout="vertical" style="height:100%" />;
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
