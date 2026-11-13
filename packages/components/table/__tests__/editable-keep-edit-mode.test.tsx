// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Input } from '@tdesign/components/input';
import { PrimaryTable } from '@tdesign/components/table';

describe('editable cell keepEditMode', () => {
  it('keeps the committed value when clicking outside after blur (issue #6923)', async () => {
    const rowData = [
      { id: 1, price: 5500 },
      { id: 2, price: 5500 },
    ];
    const edited = [];

    const columns = [
      { colKey: 'id', title: 'ID' },
      {
        colKey: 'price',
        title: 'price',
        edit: {
          component: Input,
          keepEditMode: true,
          defaultEditable: true,
          abortEditOnEvent: ['onBlur'],
          onEdited: (ctx) => {
            edited.push({ trigger: ctx.trigger, price: ctx.newRowData.price });
            // 业务侧把结果写回数据源
            Object.assign(ctx.row, ctx.newRowData);
          },
        },
      },
    ];

    const wrapper = mount({
      render() {
        return <PrimaryTable rowKey="id" data={rowData} columns={columns}></PrimaryTable>;
      },
    });

    await nextTick();

    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(2);

    await inputs[0].setValue('111');
    await inputs[0].trigger('blur');
    await nextTick();

    expect(rowData[0].price).toBe('111');
    expect(edited.some((e) => e.trigger === 'onBlur' && e.price === '111')).toBe(true);

    edited.length = 0;

    // 点击页面空白处
    document.body.click();
    await nextTick();

    // 已经通过 onBlur 提交的单元格，不应再被 document 事件用旧值覆盖
    edited
      .filter((e) => e.trigger === 'document')
      .forEach((e) => {
        expect(e.price).toBe('111');
      });

    expect(rowData[0].price).toBe('111');

    wrapper.unmount();
  });
});
