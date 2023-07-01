import { defineComponent, h } from 'vue';
import props from './description-item-props';
import { TdDescriptionsProps } from './type';
import './style';
import { useTNodeJSX } from '../hooks/tnode';
import { useCommonClassName } from '../hooks/useConfig';

export default defineComponent({
  name: 'TDescriptionsItem',
  props,
  setup(props, { attrs, slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const labelContent = renderTNodeJSX('label');
    const { SIZE } = useCommonClassName();
    return () =>
      h(
        'tr',
        {
          class: ['t-descriptions-item', attrs.labelAlign === 'top' ? 't-descriptions-item-label-top' : ''],
          style: { width: `calc(100%/ ${(attrs.columns as TdDescriptionsProps['columns']) / (props.span ?? 1)})` },
        },
        [
          h(
            'td',
            {
              class: [
                't-descriptions-item-label',
                SIZE.value[attrs.size as TdDescriptionsProps['size']],
                attrs.labelAlign === 'right' ? 't-descriptions-item-label-right' : null,
                attrs.labelAlign === 'left' ? 't-descriptions-item-label-left' : null,
              ],
              style: { flex: `1 1 0%` },
            },
            [
              labelContent,
              (attrs.colon as TdDescriptionsProps['colon'])
                ? h('span', { class: 't-descriptions-item-label-colon' }, '：')
                : null,
            ],
          ),
          h(
            'td',
            {
              class: [
                't-descriptions-item-content',
                SIZE.value[attrs.size as TdDescriptionsProps['size']],
                (attrs.contentAlign as TdDescriptionsProps['contentAlign']) === 'center'
                  ? 't-descriptions-item-content-align-center'
                  : null,
              ],
              style: { flex: `${props.span * 2 - 1} 1 0%` },
            },
            slots.default(),
          ),
        ],
      );
  },
});
