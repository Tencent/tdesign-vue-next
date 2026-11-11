import { defineComponent, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Table from '../index';
import { PrimaryTableCol } from '../type';

const flush = async () => {
  await nextTick();
  await new Promise((r) => setTimeout(r, 30));
  await nextTick();
};

describe('Table keepEditMode document click (issue #6802)', () => {
  it('does not validate when clicking blank area without editableRowKeys', async () => {
    const validateFn = vi.fn((val: any) =>
      val ? Promise.resolve(true) : Promise.resolve({ result: false, message: 'required' }),
    );

    const data = ref([{ id: 1, name: '' }]);

    const columns: PrimaryTableCol[] = [
      {
        colKey: 'name',
        title: 'Name',
        edit: {
          component: defineComponent({
            props: { value: [String, Number] as any, onChange: Function as any },
            setup(props, { expose }) {
              expose({ focus: () => {} });
              return () => <input class="cell-input" value={props.value as string} />;
            },
          }),
          keepEditMode: true,
          rules: [{ validator: validateFn }],
          props: {},
        },
      },
    ];

    mount({
      render() {
        return (
          <Table
            data={data.value}
            columns={columns}
            rowKey="id"
            // 故意不传 editableRowKeys
          />
        );
      },
    });

    await flush();

    const before = validateFn.mock.calls.length;

    // 点击页面空白处
    document.body.click();
    await flush();
    await flush();

    const after = validateFn.mock.calls.length;
    // eslint-disable-next-line no-console
    console.log('VALIDATE-CALLS before/after:', before, after);

    expect(after).toBe(before);
  });
});
