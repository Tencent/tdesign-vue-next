/**
 * 自定义显示列控制器，即列配置
 */
import { computed, ref, SetupContext, toRefs, h } from 'vue';
import { SettingIcon } from 'tdesign-icons-vue-next';
import intersection from 'lodash/intersection';
import Checkbox, { CheckboxGroup, CheckboxGroupValue, CheckboxOptionObj } from '../../checkbox';
import { DialogPlugin } from '../../dialog/plugin';
import { useTNodeDefault } from '../../hooks/tnode';
import { renderTitle } from './useTableHeader';
import { PrimaryTableCol, TdPrimaryTableProps } from '../type';
import { useConfig } from '../../config-provider/useConfig';

export function getColumnKeys(columns: PrimaryTableCol[], keys: string[] = []) {
  for (let i = 0, len = columns.length; i < len; i++) {
    const col = columns[i];
    col.colKey && keys.push(col.colKey);
    if (col.children?.length) {
      // eslint-disable-next-line no-param-reassign
      keys = keys.concat(getColumnKeys(col.children, [...keys]));
    }
  }
  return keys;
}

export default function useColumnController(props: TdPrimaryTableProps, context: SetupContext) {
  const renderTNode = useTNodeDefault();
  const { classPrefix: prefix } = useConfig();
  const { columns, columnController } = toRefs(props);

  const enabledColKeys = computed(() => {
    const arr = (columnController.value?.fields || [...new Set(getColumnKeys(columns.value))] || []).filter((v) => v);
    return new Set(arr);
  });

  const keys = [...new Set(getColumnKeys(columns.value))];

  // 确认后的列配置
  const displayColumnKeys = ref<CheckboxGroupValue>(keys);
  // 弹框内的多选
  const columnCheckboxKeys = ref<CheckboxGroupValue>(keys);

  const checkboxOptions = computed<CheckboxOptionObj[]>(() => getCheckboxOptions(columns.value));

  const intersectionChecked = computed(() => intersection(columnCheckboxKeys.value, [...enabledColKeys.value]));

  function getCheckboxOptions(columns: PrimaryTableCol[], arr: CheckboxOptionObj[] = []) {
    // 减少循环次数
    for (let i = 0, len = columns.length; i < len; i++) {
      const item = columns[i];
      if (item.colKey) {
        arr.push({
          label: () => renderTitle(context.slots, item, i),
          value: item.colKey,
          disabled: !enabledColKeys.value.has(item.colKey),
        });
      }
      if (item.children?.length) {
        getCheckboxOptions(item.children, arr);
      }
    }
    return arr;
  }

  const handleCheckChange = (val: CheckboxGroupValue) => {
    columnCheckboxKeys.value = val;
    const params = { columns: val };
    props.onColumnChange?.(params);
    // Vue3 ignore next linet
    context.emit('column-change', params);
  };

  const handleClickAllShowColumns = (checked: boolean) => {
    if (checked) {
      const newData = columns.value?.map((t) => t.colKey) || [];
      columnCheckboxKeys.value = newData;
      props.onColumnChange?.({ type: 'check', columns: newData });
      // Vue3 ignore next linet
      context.emit('column-change', { type: 'check', columns: newData });
    } else {
      const disabledColKeys = checkboxOptions.value.filter((t) => t.disabled).map((t) => t.value);
      columnCheckboxKeys.value = disabledColKeys;
      props.onColumnChange?.({ type: 'uncheck', columns: disabledColKeys });
      // Vue3 ignore next linet
      context.emit('column-change', { type: 'uncheck', columns: disabledColKeys });
    }
  };

  const handleToggleColumnController = () => {
    const dialogInstance = DialogPlugin.confirm({
      header: '表格列配置',
      body: () => {
        const widthMode = columnController.value?.displayType === 'fixed-width' ? 'fixed' : 'auto';
        const checkedLength = intersectionChecked.value.length;
        const isCheckedAll = checkedLength === enabledColKeys.value.size;
        const isIndeterminate = checkedLength > 0 && checkedLength < enabledColKeys.value.size;
        const defaultNode = (
          <div class={[`${prefix}-table__column-controller`, `${prefix}-table__column-controller--${widthMode}`]}>
            <div class={`${prefix}-table__column-controller-body`}>
              <p class={`${prefix}-table__column-controller-desc`}>请选择需要在表格中显示的数据列</p>
              <div class={`${prefix}-table__column-controller-block`}>
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isCheckedAll}
                  onChange={handleClickAllShowColumns}
                  {...(columnController.value?.checkboxProps || {})}
                >
                  全选
                </Checkbox>
              </div>
              <div class={`${prefix}-table__column-controller-block`}>
                <CheckboxGroup
                  options={checkboxOptions.value}
                  value={columnCheckboxKeys.value}
                  onChange={handleCheckChange}
                />
              </div>
            </div>
          </div>
        );
        return renderTNode('columnControllerContent', defaultNode);
      },
      confirmBtn: '确认',
      cancelBtn: '取消',
      width: 612,
      onConfirm: () => {
        displayColumnKeys.value = [...columnCheckboxKeys.value];
        dialogInstance.hide();
      },
      onClose: () => {
        dialogInstance.hide();
      },
      ...(columnController.value?.dialogProps || {}),
    });
  };

  const renderColumnController = () => {
    return (
      <div class={`${prefix}-table__column-controller`}>
        <t-button theme="default" variant="outline" onClick={handleToggleColumnController}>
          <SettingIcon slot="icon" />
          列配置
        </t-button>
      </div>
    );
  };

  return {
    displayColumnKeys,
    columnCheckboxKeys,
    checkboxOptions,
    renderColumnController,
  };
}
