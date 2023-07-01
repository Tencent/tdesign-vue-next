import { defineComponent, h } from 'vue';
import props from './props';

import './style';

export default defineComponent({
  name: 'TDescriptions',
  props,
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'table',
        {
          class: 't-descriptions',
        },
        h(
          'tbody',
          {
            class: [
              props.layout === 'horizontal' ? 't-descriptions-horizontal' : null,
              props.bordered ? 't-descriptions-border' : null,
            ],
          },
          slots.default().map((item) =>
            h(item, {
              size: props.size,
              columns: props.columns ?? 1,
              labelAlign: props.labelAlign,
              contentAlign: props.contentAlign,
              bordered: props.bordered,
              colon: props.colon,
            }),
          ),
        ),
      );
  },
});
