import { mockDelay } from '@test/utils';
import { afterEach } from 'vitest';
import {
  Table, BaseTable, PrimaryTable, EnhancedTable,
} from '@/src/table/index.ts';
import { getAjaxDataTableMount, getLocalDataTableMount, getSwitchPaginationTableMount } from './mount';

// 4 类表格组件同时测试
const TABLES = [Table, BaseTable, PrimaryTable, EnhancedTable];

TABLES.forEach((TTable) => {
  describe(TTable.name, () => {
    describe('ajax data pagination: data.length = pageSize', () => {
      afterEach(() => {
        document.querySelector('.t-popup')?.remove();
        document.querySelector('.t-table')?.remove();
      });

      it('toggle pagination show', async () => {
        const wrapper = getSwitchPaginationTableMount(TTable);
        expect(wrapper.find('.t-table__pagination').exists()).toBeFalsy();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(38);
        await wrapper.find('.toggle-pagination input[type=checkbox]').setChecked(true);
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.t-table__pagination').exists()).toBeTruthy();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(5);
        await wrapper.find('.toggle-pagination input[type=checkbox]').setChecked(false);
        expect(wrapper.find('.t-table__pagination').exists()).toBeFalsy();
      });

      it('pagination props change', async () => {
        const wrapper = getAjaxDataTableMount(TTable);

        const firstSerialNumberClass = '.t-table tbody tr td:first-child';
        const firstInstanceColClass = '.t-table tbody tr td.custom-instance-class-name';
        expect(wrapper.find('.t-table__pagination').exists()).toBeTruthy();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(5);
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('1');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance10_5');

        await wrapper.find('.next-page').trigger('click');
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance20_5');

        await wrapper.find('.next-page').trigger('click');
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance30_5');

        await wrapper.find('.prev-page').trigger('click');
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance20_5');

        await wrapper.find('.change-page-size').trigger('click');
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance20_10');
      });

      it('pagination inner change', async () => {
        const wrapper = getAjaxDataTableMount(TTable);

        const firstSerialNumberClass = '.t-table tbody tr td:first-child';
        const firstInstanceColClass = '.t-table tbody tr td.custom-instance-class-name';
        expect(wrapper.find('.t-table__pagination').exists()).toBeTruthy();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(5);
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('1');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance10_5');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(2)').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance20_5');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(3)').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance30_5');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(2)').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance20_5');

        await wrapper.find('.t-pagination__select .t-select-input > .t-input__wrap').trigger('click');
        document.querySelector('.t-select__list li.t-select-option:nth-child(2)').click();
        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(10);
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance20_10');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(3)').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('21');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance30_10');
      });
    });

    describe('local data pagination: data.length > pageSize ', () => {
      afterEach(() => {
        document.querySelector('.t-popup')?.remove();
        document.querySelector('.t-table')?.remove();
      });

      it('pagination props change', async () => {
        const wrapper = getLocalDataTableMount(TTable);

        const firstSerialNumberClass = '.t-table tbody tr td:first-child';
        const firstInstanceColClass = '.t-table tbody tr td.custom-instance-class-name';
        expect(wrapper.find('.t-table__pagination').exists()).toBeTruthy();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(5);
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('1');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance0');

        await wrapper.find('.next-page').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance5');

        await wrapper.find('.next-page').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance10');

        await wrapper.find('.prev-page').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance5');

        await wrapper.find('.change-page-size').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance10');
      });

      it('pagination inner change', async () => {
        const wrapper = getLocalDataTableMount(TTable);

        const firstSerialNumberClass = '.t-table tbody tr td:first-child';
        const firstInstanceColClass = '.t-table tbody tr td.custom-instance-class-name';
        expect(wrapper.find('.t-table__pagination').exists()).toBeTruthy();
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(5);
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('1');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance0');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(2)').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance5');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(3)').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance10');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(2)').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('6');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance5');

        await wrapper.find('.t-pagination__select .t-select-input > .t-input__wrap').trigger('click');
        await wrapper.vm.$nextTick();
        document.querySelector('.t-select__list li.t-select-option:nth-child(2)').click();
        await mockDelay(60);
        expect(wrapper.findAll('.t-table tbody tr').length).toBe(10);
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('11');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance10');

        await wrapper.find('.t-pagination__pager .t-pagination__number:nth-child(3)').trigger('click');
        expect(wrapper.find(firstSerialNumberClass).element.innerHTML).toBe('21');
        expect(wrapper.find(firstInstanceColClass).element.innerHTML).toBe('Instance20');
      });
    });
  });
});
