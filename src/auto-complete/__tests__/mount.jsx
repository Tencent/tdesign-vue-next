import { mount } from '@vue/test-utils';

export function getNormalAutoCompleteMount(AutoComplete, props, events) {
  const options = [
    'FirstKeyword',
    {
      // 自定义选项
      label: () => <div class="custom-node">TNode SecondKeyword</div>,
      // 用于搜索的纯文本
      text: 'SecondKeyword',
    },
    'ThirdKeyword',
  ];
  return mount(<AutoComplete value="" options={options} {...props} {...events} />);
}
