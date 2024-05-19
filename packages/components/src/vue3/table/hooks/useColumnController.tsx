/**
 * 自定义显示列控制器，即列配置
 */
import type { SetupContext } from '@td/adapter-vue';
import { computed, h, ref, toRefs, watch } from '@td/adapter-vue';
import { SettingIcon as TdSettingIcon } from 'tdesign-icons-vue-next';
// import { intersection } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { useConfig, useDefaultValue, useGlobalIcon, useTNodeJSX } from '@td/adapter-hooks';
import type { PrimaryTableCol, TdPrimaryTableProps } from '@td/intel/components/table/type';
import { DialogPlugin, Button as TButton } from '@td/component';
import type { DialogInstance } from '@td/intel/components/dialog/type';
import type { CheckboxGroupChangeContext, CheckboxGroupValue, CheckboxOptionObj } from '@td/intel/components/checkbox/type';
import { getCurrentRowByKey } from '../utils';
import ColumnCheckboxGroup from '../column-checkbox-group';
import { renderTitle } from './useTableHeader';

export function getColumnKeys(columns: PrimaryTableCol[], keys = new Set<string>()) {
  for (let i = 0, len = columns.length; i < len; i++) {
    const col = columns[i];
    if (col.children?.length) {
      getColumnKeys(col.children, keys);
    } else {
      col.colKey && keys.add(col.colKey);
    }
  }
  return keys;
}

interface CheckboxGroupOptionsType {
  options: CheckboxOptionObj[];
  label: string;
  value?: string | number;
}

export default function useColumnController(props: TdPrimaryTableProps, context: SetupContext) {
  const { classPrefix, globalConfig } = useConfig('table', props.locale);
  const { SettingIcon } = useGlobalIcon({ SettingIcon: TdSettingIcon });
  const { columns, columnController, displayColumns, columnControllerVisible } = toRefs(props);
  const dialogInstance = ref<DialogInstance>(null);
  const renderTNodeJSX = useTNodeJSX();

  const enabledColKeys = computed(() => {
    const arr = (columnController.value?.fields || [...getColumnKeys(columns.value)] || []).filter(v => v);
    return new Set(arr);
  });

  const keys = [...getColumnKeys(columns.value)];

  // 确认后的列配置
  const [tDisplayColumns, setTDisplayColumns] = useDefaultValue(
    displayColumns,
    props.defaultDisplayColumns || keys,
    props.onDisplayColumnsChange,
    'displayColumns',
  );
  // 弹框内的多选
  const columnCheckboxKeys = ref<CheckboxGroupValue>(displayColumns.value || props.defaultDisplayColumns || keys);

  const checkboxGroupList = computed<CheckboxGroupOptionsType[]>(() => {
    if (columnController.value?.groupColumns?.length) {
      return getCheckboxGroupOptions(columns.value);
    }
    const oneItem: CheckboxGroupOptionsType = {
      label: globalConfig.value.selectAllText,
      options: getCheckboxOptions(columns.value),
    };
    return [oneItem];
  });

  // const intersectionChecked = computed(() => intersection(columnCheckboxKeys.value, [...enabledColKeys.value]));

  watch([displayColumns], ([val]) => {
    columnCheckboxKeys.value = val || props.defaultDisplayColumns || keys;
  });

  function getOneColumnItem(column: PrimaryTableCol, i: number) {
    return {
      label: () => renderTitle(context.slots, column, i),
      value: column.colKey,
      disabled: !enabledColKeys.value.has(column.colKey),
    };
  }

  // 列配置分组
  function getCheckboxGroupOptions(columns: PrimaryTableCol[]) {
    const groupColumns = columnController.value?.groupColumns;
    if (!groupColumns?.length) {
      return [];
    }
    const groupList: CheckboxGroupOptionsType[] = [];
    const loop = (columns: PrimaryTableCol[]) => {
      for (let i = 0, len = columns.length; i < len; i++) {
        const column = columns[i];
        const oneItem = getOneColumnItem(column, i);
        for (let j = 0, len1 = groupColumns.length; j < len1; j++) {
          const groupInfo = groupColumns[j];
          if (!groupInfo.columns.includes(column.colKey)) {
            continue;
          }
          if (groupList[j]?.options?.length) {
            groupList[j].options.push(oneItem);
          } else {
            groupList[j] = { ...groupColumns[j], options: [oneItem] };
          }
        }
        if (column.children?.length) {
          loop(column.children);
        }
      }
    };
    loop(columns);
    return groupList;
  }

  function getCheckboxOptions(columns: PrimaryTableCol[], arr: CheckboxOptionObj[] = []) {
    if (columnController.value?.groupColumns?.length) {
      return [];
    }
    for (let i = 0, len = columns.length; i < len; i++) {
      const item = columns[i];
      if (item.children?.length) {
        getCheckboxOptions(item.children, arr);
      } else {
        // 只把叶子列提供出去进行配置
        if (item.colKey) {
          arr.push(getOneColumnItem(item, i));
        }
      }
    }
    return arr;
  }

  const handleCheckChange = (val: CheckboxGroupValue, ctx: CheckboxGroupChangeContext) => {
    columnCheckboxKeys.value = val;
    const params = {
      columns: val,
      type: ctx.type,
      currentColumn: getCurrentRowByKey(columns.value, String(ctx.current)),
      e: ctx.e,
    };
    props.onColumnChange?.(params);
  };

  // 暂时不删除，万一后面需要整体的全选
  // const handleClickAllShowColumns = (checked: boolean, ctx: { e: Event }) => {
  //   if (checked) {
  //     const newData = checkboxOptions.value?.map((t) => t.value) || [];
  //     columnCheckboxKeys.value = newData;
  //     props.onColumnChange?.({ type: 'check', columns: newData, e: ctx.e });
  //   } else {
  //     const disabledColKeys = checkboxOptions.value.filter((t) => t.disabled).map((t) => t.value);
  //     columnCheckboxKeys.value = disabledColKeys;
  //     props.onColumnChange?.({ type: 'uncheck', columns: disabledColKeys, e: ctx.e });
  //   }
  // };

  const handleToggleColumnController = () => {
    if (dialogInstance.value) {
      dialogInstance.value.show();
      return;
    }
    dialogInstance.value = DialogPlugin.confirm({
      header: globalConfig.value.columnConfigTitleText,
      body: () => {
        const widthMode = columnController.value?.displayType === 'fixed-width' ? 'fixed' : 'auto';
        // const checkedLength = intersectionChecked.value.length;
        // const isCheckedAll = checkedLength === enabledColKeys.value.size;
        // const isIndeterminate = checkedLength > 0 && checkedLength < enabledColKeys.value.size;
        const { columnControllerTopContent, columnControllerBottomContent } = columnController.value || {};
        const defaultNode = (
          <div
            class={[
              `${classPrefix.value}-table__column-controller`,
              `${classPrefix.value}-table__column-controller--${widthMode}`,
            ]}
          >
            <div class={`${classPrefix.value}-table__column-controller-body`}>
              {isFunction(columnControllerTopContent)
                ? columnControllerTopContent(h)
                : renderTNodeJSX('columnControllerTopContent')}
              {/* 请选择需要在表格中显示的数据列 */}
              {globalConfig.value.columnConfigDescriptionText && (
                <p class={`${classPrefix.value}-table__column-controller-desc`}>
                  {globalConfig.value.columnConfigDescriptionText}
                </p>
              )}
              {checkboxGroupList.value.map((group, index) => {
                const uniqueKey = columnController.value?.groupColumns?.length
                  ? String(group.value || index)
                  : undefined;
                return (
                  <ColumnCheckboxGroup
                    key={group.value || index}
                    uniqueKey={uniqueKey}
                    value={columnCheckboxKeys.value}
                    label={group.label}
                    options={group.options}
                    onChange={handleCheckChange}
                    checkboxProps={columnController.value?.checkboxProps}
                  />
                );
              })}

              {isFunction(columnControllerBottomContent)
                ? columnControllerBottomContent(h)
                : renderTNodeJSX('columnControllerBottomContent')}
            </div>
          </div>
        );
        return defaultNode;
      },
      confirmBtn: globalConfig.value.confirmText,
      cancelBtn: globalConfig.value.cancelText,
      width: 612,
      onConfirm: () => {
        setTDisplayColumns([...columnCheckboxKeys.value]);
        // 此处逻辑不要随意改动，涉及到 内置列配置按钮 和 不包含列配置按钮等场景
        if (columnControllerVisible.value === undefined) {
          dialogInstance.value.hide();
        } else {
          props.onColumnControllerVisibleChange?.(false, { trigger: 'confirm' });
          context.emit('update:columnControllerVisible', false);
        }
      },
      onClose: () => {
        // 此处逻辑不要随意改动，涉及到 内置列配置按钮 和 不包含列配置按钮等场景
        if (columnControllerVisible.value === undefined) {
          dialogInstance.value.hide();
        } else {
          props.onColumnControllerVisibleChange?.(false, { trigger: 'cancel' });
          context.emit('update:columnControllerVisible', false);
        }
      },
      ...(columnController.value?.dialogProps || {}),
    });
  };

  // columnControllerVisible 一般应用于不包含列配置按钮的场景，有外部直接控制弹框的显示或隐藏
  watch(
    [columnControllerVisible],
    ([visible]) => {
      if (visible === undefined) {
        return;
      }
      if (dialogInstance.value) {
        visible ? dialogInstance.value.show() : dialogInstance.value.hide();
      } else {
        visible && handleToggleColumnController();
      }
    },
    { immediate: true },
  );

  const renderColumnController = () => {
    const isColumnController = !!(columnController.value && Object.keys(columnController.value).length);
    const placement = isColumnController ? columnController.value.placement || 'top-right' : '';
    if (isColumnController && columnController.value.hideTriggerButton) {
      return null;
    }
    const classes = [
      `${classPrefix.value}-table__column-controller-trigger`,
      { [`${classPrefix.value}-align-${placement}`]: !!placement },
    ];
    return (
      <div class={classes}>
        <TButton
          theme="default"
          variant="outline"
          onClick={handleToggleColumnController}
          content={globalConfig.value.columnConfigButtonText}
          v-slots={{
            icon: () => <SettingIcon />,
          }}
          {...props.columnController?.buttonProps}
        >
        </TButton>
      </div>
    );
  };

  return {
    tDisplayColumns,
    columnCheckboxKeys,
    renderColumnController,
  };
}
