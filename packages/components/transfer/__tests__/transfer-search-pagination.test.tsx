import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Transfer from '@tdesign/components/transfer';

const DATA = [
  { label: 'Alice', value: '1' },
  { label: 'Bob', value: '2' },
  { label: 'Carol', value: '3' },
  { label: 'David', value: '4' },
];

const flush = async () => {
  await nextTick();
  await new Promise((r) => setTimeout(r, 20));
  await nextTick();
};

describe('Transfer search with pagination (issue #7054)', () => {
  it('returns to a valid page when the filter shrinks the result set', async () => {
    const wrapper = mount(Transfer, {
      props: {
        data: DATA,
        search: true,
        pagination: { pageSize: 2 },
      },
    });
    await flush();

    const sourceList = () => wrapper.findAll('.t-transfer__list')[0];
    const sourceLabels = () =>
      sourceList()
        .findAll('.t-transfer__list-item')
        .map((n) => n.text());

    // 第一页：Alice / Bob
    expect(sourceLabels()).toEqual(['Alice', 'Bob']);

    // 翻到第二页：Carol / David
    const nextBtn = sourceList().findAll('.t-pagination__btn').at(-1);
    expect(nextBtn).toBeTruthy();
    await nextBtn.trigger('click');
    await flush();
    expect(sourceLabels()).toEqual(['Carol', 'David']);

    // 在第 2 页搜索 Alice：筛选后只有 1 条，总页数变成 1，
    // 页码必须自动回到第 1 页并显示 Alice
    const searchInput = sourceList().find('.t-input__inner');
    await searchInput.setValue('Alice');
    await flush();
    await flush();
    await flush();

    const labels = sourceLabels();
    // eslint-disable-next-line no-console
    console.log('LABELS after search:', JSON.stringify(labels));

    expect(labels).toEqual(['Alice']);

    // 分页器不应留在第 2 页：筛选后总共只有 1 页
    const paginationText = sourceList().find('.t-pagination').text();
    // eslint-disable-next-line no-console
    console.log('PAGINATION TEXT:', JSON.stringify(paginationText));
    expect(paginationText).toContain('1');
    expect(paginationText).not.toContain('2');
  });
});
