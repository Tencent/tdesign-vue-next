<template>
  <div class="t-skeleton-demo">
    <section class="t-skeleton-demo-card">
      <div class="header">组合成网页效果</div>
      <div class="content">
        <t-skeleton :row-col="rowCol"></t-skeleton>
      </div>
    </section>

    <section class="t-skeleton-demo-card">
      <div class="header">组合成列表效果</div>
      <div class="content">
        <ul class="t-skeleton-demo-list">
          <li v-for="i in 3" :key="i">
            <t-skeleton class="avatar" theme="avatar"></t-skeleton>
            <t-skeleton class="paragraph" theme="paragraph"></t-skeleton>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="tsx" setup>
import { SkeletonProps } from 'tdesign-vue-next';
const rowCol: SkeletonProps['rowCol'] = [
  [1, 1, 1].map(() => ({
    type: 'rect',
    content: 'image',
    width: '33%',
    height: '180px',
  })),
  [
    {
      type: 'circle',
      size: '50px',
    },
    {
      type: 'rect',
      margin: '20px 0',
      width: '80%',
      height: '30px',
    },
    {
      type: 'rect',
      marginLeft: '20px',
      width: '80px',
      height: '30px',
      content: '确定',
    },
  ],
  1,
  1,
  {
    type: 'text',
    width: '70%',
    margin: '0 0 16px 0',
  },
  {
    type: 'rect',
    width: '100%',
    height: '300px',
    content: () => (
      <div class="row-col-content">
        <h3 class="row-col-content__header">标题</h3>
        <section class="row-col-content__content"> 内容</section>
      </div>
    ),
  },
];
</script>

<style lang="less" scoped>
.t-skeleton-demo {
  width: 100%;
  &-list {
    > li {
      display: flex;
      align-items: center;
      padding: 16px 0;
      .avatar {
        display: inline-block;
        line-height: 68px;
        margin-right: 16px;
      }
      .paragraph {
        display: inline-block;
        width: 90%;
      }
    }
  }
}
</style>
