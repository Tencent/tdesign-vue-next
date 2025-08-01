<template>
  <t-tooltip content="在新窗口打开">
    <div class="action-online" @click="onNewWindow">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="bpwjump">
          <path id="stroke1" d="M9 4L4 4L4 20L20 20L20 15" stroke-linecap="square" stroke-width="2" stroke="#000" />
          <path
            id="stroke2"
            d="M19.25 4.75L12 12M14 4H20L20 10"
            stroke-linecap="square"
            stroke-width="2"
            stroke="#000"
          />
        </g>
      </svg>
    </div>
  </t-tooltip>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewWindow',
  props: {
    demoName: String,
  },
  setup(props) {
    const onNewWindow = () => {
      const url = window.location.origin + '/chat/demos/chat/' + props.demoName;
      window.open(url, '_blank');
    };
    return {
      onNewWindow,
    };
  },
});
</script>
