import { mount } from '@vue/test-utils';
import { AutoComplete } from '@tdesign/components';
import { TdAutoCompleteProps } from '@tdesign/components/auto-complete/type';

export function getNormalAutoCompleteMount(props: TdAutoCompleteProps = {}, events = {}) {
  // 5 different options
  const options = [
    'FirstKeyword',
    {
      // 自定义选项
      label: () => <div class="custom-node">TNode SecondKeyword</div>,
      // 用于搜索的纯文本
      text: 'SecondKeyword',
    },
    'ThirdKeyword',
    {
      label: 'READONLY_KEYWORD',
    },
    {
      text: 'DISABLED_KEYWORD',
    },
  ];
  return mount(<AutoComplete value="" options={options} {...props} {...events} />);
}

export function getOptionSlotAutoCompleteMount(props: TdAutoCompleteProps = {}, events = {}) {
  const options = ['First', 'Second'];
  return mount(
    <AutoComplete
      value=""
      options={options}
      {...props}
      {...events}
      v-slots={{
        option: ({ option }: { option: { text: string } }) => (
          <div class="custom-slot-option">{`${option.text} Keyword`}</div>
        ),
      }}
    />,
  );
}
