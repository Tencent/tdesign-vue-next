<template>
  <div class="tdesign-demo-block-column">
    <div style="display: flex; align-items: center; flex-wrap: wrap">
      <div style="width: 33.33%">
        <t-timeline>
          <t-timeline-item>
            事件的标题
            <template #description> 事件的简要描述 </template>
            <template #timestamp> 2022-05-01 </template>
          </t-timeline-item>
          <t-timeline-item>
            事件的标题
            <template #description> 事件的简要描述 </template>
            <template #timestamp> 2022-05-01 </template>
          </t-timeline-item>
          <t-timeline-item>
            事件的标题
            <template #description> 事件的简要描述 </template>
            <template #timestamp> 2022-05-01 </template>
          </t-timeline-item>
        </t-timeline>
      </div>
      <div style="width: 33.33%">
        <t-timeline>
          <t-timeline-item>
            2022-05-01
            <template #description> 事件的标题 </template>
            <template #timestamp> 事件的简要描述 </template>
          </t-timeline-item>
          <t-timeline-item>
            2022-05-01
            <template #description> 事件的标题 </template>
            <template #timestamp> 事件的简要描述 </template>
          </t-timeline-item>
          <t-timeline-item>
            2022-05-01
            <template #description> 事件的标题 </template>
            <template #timestamp> 事件的简要描述 </template>
          </t-timeline-item>
        </t-timeline>
      </div>
      <div style="width: 33.33%">
        <t-timeline>
          <t-timeline-item>
            2022-05-01
            <template #description>
              事件的简要描述的内容较多，无法全部显示... <span style="color: blue">展开</span>
            </template>
            <template #timestamp> 事件的标题 </template>
          </t-timeline-item>
          <t-timeline-item>
            2022-05-01
            <template #description>
              事件的简要描述的内容较多，无法全部显示时，可 将溢出的内容折叠，点击可展开显示全部内容。
              <div style="color: blue; text-align: right">收起</div>
            </template>
            <template #timestamp> 事件的标题 </template>
          </t-timeline-item>
          <t-timeline-item>
            事件的标题
            <template #description> 事件的简要描述 </template>
            <template #timestamp> 2022-05-01 </template>
          </t-timeline-item>
        </t-timeline>
      </div>
      <div style="width: 33.33%">
        <t-timeline>
          <t-timeline-item>
            2022-05-01
            <template #timestamp>
              <div style="display: flex; align-items: center">
                <div style="width: 40px; height: 40px; margin-right: 10px; border-radius: 10px; background: #eee"></div>
                <div>事件的标题2</div>
              </div>
            </template>
          </t-timeline-item>
          <t-timeline-item>
            2022-05-01
            <template #timestamp>
              <div style="display: flex; align-items: center">
                <div style="width: 40px; height: 40px; margin-right: 10px; border-radius: 10px; background: #eee"></div>
                <div>事件的标题2</div>
              </div>
            </template>
          </t-timeline-item>
          <t-timeline-item>
            2022-05-01
            <template #timestamp>
              <div style="display: flex; align-items: center">
                <div style="width: 40px; height: 40px; margin-right: 10px; border-radius: 10px; background: #eee"></div>
                <div>事件的标题2</div>
              </div>
            </template>
          </t-timeline-item>
        </t-timeline>
      </div>
    </div>
  </div>
</template>

<script lang="jsx" setup></script>

<style lang="less"></style>
