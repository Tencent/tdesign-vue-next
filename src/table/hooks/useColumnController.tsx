/**
 * 自定义显示列控制器，即列配置
 */
import { computed, ref, SetupContext, toRefs, watch } from 'vue';
import { SettingIcon as TdSettingIcon } from 'tdesign-icons-vue-next';
import intersection from 'lodash/intersection';
import Checkbox, {
  CheckboxGroup,
  CheckboxGroupValue,
  CheckboxOptionObj,
  CheckboxGroupChangeContext,
} from '../../checkbox';
import { DialogPlugin } from '../../dialog/plugin';
import { renderTitle } from './useTableHeader';
import { PrimaryTableCol, TdPrimaryTableProps } from '../type';
import { useConfig } from '../../hooks/useConfig';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import useDefaultValue from '../../hooks/useDefaultValue';
import { getCurrentRowByKey } from '../utils';
import { DialogInstance } from '../../dialog';
import TButton from '../../button';

export function getColumnKeys(columns: PrimaryTableCol[], keys = new Set<string>()) {
  for (let i = 0, len = columns.length; i < len; i++) {
    const col = columns[i];
    col.colKey && keys.add(col.colKey);
    if (col.children?.length) {
      getColumnKeys(col.children, keys);
    }
  }
  return keys;
}

export default function useColumnController(props: TdPrimaryTableProps, context: SetupContext) {
  const { classPrefix, globalConfig } = useConfig('table');
  const { SettingIcon } = useGlobalIcon({ SettingIcon: TdSettingIcon });
  const { columns, columnController, displayColumns, columnControllerVisible } = toRefs(props);
  const dialogInstance = ref<DialogInstance>(null);

  const enabledColKeys = computed(() => {
    const arr = (columnController.value?.fields || [...getColumnKeys(columns.value)] || []).filter((v) => v);
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

  const checkboxOptions = computed<CheckboxOptionObj[]>(() => getCheckboxOptions(columns.value));

  const intersectionChecked = computed(() => intersection(columnCheckboxKeys.value, [...enabledColKeys.value]));

  watch([displayColumns], ([val]) => {
    columnCheckboxKeys.value = val || props.defaultDisplayColumns || keys;
  });

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

  const handleClickAllShowColumns = (checked: boolean, ctx: { e: Event }) => {
    if (checked) {
      const newData = checkboxOptions.value?.map((t) => t.value) || [];
      columnCheckboxKeys.value = newData;
      props.onColumnChange?.({ type: 'check', columns: newData, e: ctx.e });
    } else {
      const disabledColKeys = checkboxOptions.value.filter((t) => t.disabled).map((t) => t.value);
      columnCheckboxKeys.value = disabledColKeys;
      props.onColumnChange?.({ type: 'uncheck', columns: disabledColKeys, e: ctx.e });
    }
  };

  const handleToggleColumnController = () => {
    dialogInstance.value = DialogPlugin.confirm({
      header: globalConfig.value.columnConfigTitleText,
      body: () => {
        const widthMode = columnController.value?.displayType === 'fixed-width' ? 'fixed' : 'auto';
        const checkedLength = intersectionChecked.value.length;
        const isCheckedAll = checkedLength === enabledColKeys.value.size;
        const isIndeterminate = checkedLength > 0 && checkedLength < enabledColKeys.value.size;
        const defaultNode = (
          <div
            class={[
              `${classPrefix.value}-table__column-controller`,
              `${classPrefix.value}-table__column-controller--${widthMode}`,
            ]}
          >
            <div class={`${classPrefix.value}-table__column-controller-body`}>
              {/* 请选择需要在表格中显示的数据列 */}
              <p class={`${classPrefix.value}-table__column-controller-desc`}>
                {globalConfig.value.columnConfigDescriptionText}
              </p>
              <div class={`${classPrefix.value}-table__column-controller-block`}>
                <Checkbox indeterminate={isIndeterminate} checked={isCheckedAll} onChange={handleClickAllShowColumns}>
                  {globalConfig.value.selectAllText}
                </Checkbox>
              </div>
              <div class={`${classPrefix.value}-table__column-controller-block`}>
                <CheckboxGroup
                  options={checkboxOptions.value}
                  {...(columnController.value?.checkboxProps || {})}
                  value={columnCheckboxKeys.value}
                  onChange={handleCheckChange}
                />
              </div>
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
          props.onColumnControllerVisibleChange?.(false, { trigger: 'cancel' });
          context.emit('update:columnControllerVisible', false);
        }
      },
      onClose: () => {
        // 此处逻辑不要随意改动，涉及到 内置列配置按钮 和 不包含列配置按钮等场景
        if (columnControllerVisible.value === undefined) {
          dialogInstance.value.hide();
        } else {
          props.onColumnControllerVisibleChange?.(false, { trigger: 'confirm' });
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
      if (visible === undefined) return;
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
    if (isColumnController && columnController.value.hideTriggerButton) return null;
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
        ></TButton>
      </div>
    );
  };

  return {
    tDisplayColumns,
    columnCheckboxKeys,
    checkboxOptions,
    renderColumnController,
  };
}
