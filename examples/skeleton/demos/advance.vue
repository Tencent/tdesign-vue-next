<template>
  <div class="t-skeleton-demo">
    <section class="t-skeleton-demo-card">
      <div class="header">网页（使用 rowCol）</div>
      <div class="content">
        <t-skeleton :row-coll="rowCol"></t-skeleton>
      </div>
    </section>

    <section class="t-skeleton-demo-card">
      <div class="header">列表（组合使用）</div>
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

<script lang="jsx">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      rowCol: [
        [1, 1, 1].map(() => ({ type: 'rect', content: 'image', width: '33%', height: '180px' })),
        [
          { type: 'circle', size: '50px' },
          { type: 'rect', margin: '20px 0', width: '80%', height: '30px' },
          { type: 'rect', marginLeft: '20px', width: '80px', height: '30px', content: '确定' },
        ],
        1,
        1,
        { type: 'text', width: '70%', margin: '0 0 16px 0' },
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
      ],
    };
  },
});
</script>

<style scoped lang="less">
.t-skeleton-demo {
  width: 100%;
  &-card {
    margin: 16px;
    border: 1px solid #eee;
    .header {
      padding: 16px;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 16px;
    }
  }

  &-list {
    > li {
      list-style: none;
      padding: 16px 0;
      .avatar {
        display: inline-block;
        margin-right: 20px;
      }
      .paragraph {
        display: inline-block;
        width: 80%;
      }
    }
  }
}

.row-col-content {
  width: 100%;
  text-align: center;
  &__header {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  &__content {
    padding: 10px;
    height: 200px;
  }
}
</style>
