<template>
  <t-space>
    <t-sticky-tool
      :style="{ position: 'relative', overflow: 'hidden' }"
      type="compact"
      :offset="[-500, -24]"
      @click="handleClick"
      @hover="handleHover"
    >
      <t-sticky-item :icon="renderChatIcon" popup="chat"> </t-sticky-item>
      <t-sticky-item :icon="renderAddIcon" popup="add"> </t-sticky-item>
      <t-sticky-item
        :icon="renderQrIcon"
        :popup="renderPopup"
        :popup-props="{ overlayInnerStyle: { padding: '4px', height: '128px' } }"
      >
      </t-sticky-item>
    </t-sticky-tool>
  </t-space>
</template>

<script lang="tsx" setup>
import { StickyItemProps, StickyToolProps } from 'tdesign-vue-next';
import { ChatIcon, AddIcon, QrcodeIcon } from 'tdesign-icons-vue-next';
const renderChatIcon: StickyItemProps['icon'] = () => {
  return <ChatIcon />;
};
const renderAddIcon: StickyItemProps['icon'] = () => {
  return <AddIcon />;
};
const renderQrIcon: StickyItemProps['icon'] = () => {
  return <QrcodeIcon />;
};
const renderPopup: StickyItemProps['popup'] = () => {
  return <img alt="TDesign Logo" width="120" height="120" src="https://tdesign.gtimg.com/site/site.jpg" />;
};
const handleClick: StickyToolProps['onClick'] = (context) => {
  console.log('click', context);
};
const handleHover: StickyToolProps['onHover'] = (context) => {
  console.log('hover', context);
};
</script>
