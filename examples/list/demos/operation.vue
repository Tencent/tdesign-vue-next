<template>
  <div>
    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
        <template #action>
          <span>
            <t-button variant="text">操作1</t-button>
            <t-button variant="text">操作2</t-button>
            <t-button variant="text">操作3</t-button>
          </span>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
        <template #action>
          <span>
            <t-button variant="text">操作1</t-button>
            <t-button variant="text">操作2</t-button>
            <t-button variant="text">操作3</t-button>
          </span>
        </template>
      </t-list-item>
    </t-list>

    <div style="margin-bottom: 16px" />

    <t-list :split="true">
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
        <template #action>
          <t-button variant="text" shape="square">
            <edit-icon />
          </t-button>
          <t-button variant="text" shape="square">
            <download-icon />
          </t-button>
        </template>
      </t-list-item>
      <t-list-item>
        <t-list-item-meta
          :image="avatarUrl"
          title="列表主内容"
          description="列表内容列表内容"
        />
        <template #action>
          <t-button variant="text" shape="square">
            <edit-icon />
          </t-button>
          <t-button variant="text" shape="square">
            <download-icon />
          </t-button>
        </template>
      </t-list-item>
    </t-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import EditIcon from '@tencent/tdesign-vue-next/icon/edit';
import DownloadIcon from '@tencent/tdesign-vue-next/icon/download';

export default defineComponent({
  components: { EditIcon, DownloadIcon },
  setup() {
    return {
      avatarUrl: 'https://tdesign.gtimg.com/list-icon.png',
    };
  },
});
</script>
