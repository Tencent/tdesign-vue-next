import { mount } from '@vue/test-utils';

export function getNormalAutoCompleteMount(AutoComplete, props, events) {
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

export function getOptionSlotAutoCompleteMount(AutoComplete, props, events) {
  const options = ['First', 'Second'];
  return mount(
    <AutoComplete
      value=""
      options={options}
      {...props}
      {...events}
      v-slots={{
        option: ({ option }) => <div class="custom-slot-option">{`${option.text} Keyword`}</div>,
      }}
    />,
  );
}
