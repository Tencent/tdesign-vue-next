import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import { usePrefixClass } from '@tdesign/hooks';
import { isString } from 'lodash-es';
import { escapeRegExp } from 'lodash-es';

export interface HighlightOptionProps {
  content: string;
  keyword: string;
}

export default defineComponent({
  name: 'HighlightOption',
  props: {
    /** 联想词 */
    content: String as PropType<HighlightOptionProps['content']>,
    /** 搜索词 */
    keyword: String as PropType<HighlightOptionProps['keyword']>,
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const words = computed<{ list: string[]; keyword?: string }>(() => {
      const { content, keyword } = props;
      if (!content) return { list: [] };
      if (!isString(content) || !keyword) return { list: [content] };
      const regExp = new RegExp(escapeRegExp(keyword), 'i');
      const splitKeyword = content.match(regExp)?.[0];
      return {
        list: content.split(splitKeyword),
        keyword: splitKeyword,
      };
    });

    return () => {
      const { list, keyword } = words.value;
      return (
        <div class={`${classPrefix.value}-select-option__highlight-item`}>
          {list.map((item, index) => {
            if (!index) return item;
            return [
              <b class={`${classPrefix.value}-is-highlight`} key={item + keyword}>
                {keyword}
              </b>,
              item,
            ];
          })}
        </div>
      );
    };
  },
});
