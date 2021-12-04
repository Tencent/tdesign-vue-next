import { defineComponent, VNode } from 'vue';
import { BulletpointIcon } from 'tdesign-icons-vue-next';
import Button from '../../../button';
import Dialog from '../../../dialog';
import Checkbox from '../../../checkbox';
import CheckboxGroup from '../../../checkbox/group';
import primaryTableProps from '../../primary-table-props';
import { TdPrimaryTableProps } from '../../type';
import { prefix } from '../../../config';

const content = '自定义列';
export default defineComponent({
  name: `${prefix}-primary-show-columns`,
  components: {
    Button,
    BulletpointIcon,
    Dialog,
    Checkbox,
    CheckboxGroup,
  },
  props: {
    columns: primaryTableProps.columns,
    showColumns: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showColumnKeys: this.columns.map(({ colKey }) => colKey), // dialog 确定后才重新赋值
      showColumnCheckboxKeys: this.columns.map(({ colKey }) => colKey), // 多选框状态
      isShowColumnsDlg: false,
    };
  },
  computed: {
    showColumnCheckboxOpts(): Record<string, any>[] {
      return this.columns
        .filter(({ colKey, title }) => colKey && title) // 去空
        .map(({ colKey, title }) => ({
          label: title,
          value: colKey,
        }));
    },
    isAllShowColumns(): boolean {
      return this.showColumnCheckboxOpts.every(({ value }: Record<string, any>) =>
        this.showColumnCheckboxKeys.includes(value),
      );
    },
    isSomeShowColumns(): boolean {
      return (
        !this.isAllShowColumns &&
        this.showColumnCheckboxOpts.some(({ value }: Record<string, any>) =>
          this.showColumnCheckboxKeys.includes(value),
        )
      );
    },
  },
  watch: {
    columns: {
      deep: true,
      handler() {
        this.updateColumns();
      },
    },
  },
  methods: {
    getShowColumns(columns: TdPrimaryTableProps['columns']): TdPrimaryTableProps['columns'] {
      return columns.filter(
        ({ colKey }) =>
          this.showColumnKeys.includes(colKey) ||
          !this.showColumnCheckboxOpts.map(({ value }: Record<string, any>) => value).includes(colKey),
      );
    },

    renderShowColumnsDlgFooter(): VNode {
      return (
        <div>
          <Button variant="base" theme="primary" onClick={this.handleConfirmShowColumnsDlg}>
            确定
          </Button>
          <Button onClick={this.handleConfirmShowColumnsDlg}>取消</Button>
        </div>
      );
    },
    renderShowColumnsDlg(): VNode {
      return (
        <Dialog header={content} footer={this.renderShowColumnsDlgFooter} visible={this.isShowColumnsDlg}>
          <div slot="body">
            <div>
              <Checkbox
                indeterminate={this.isSomeShowColumns}
                checked={this.isAllShowColumns}
                onChange={this.handleClickAllShowColumns}
              >
                全选
              </Checkbox>
            </div>
            <CheckboxGroup options={this.showColumnCheckboxOpts} vModel={this.showColumnCheckboxKeys} />
          </div>
        </Dialog>
      );
    },
    renderShowColumns(): VNode {
      return (
        <div>
          <div>
            <Button icon={() => <BulletpointIcon />} onClick={() => (this.isShowColumnsDlg = true)}>
              {content}
            </Button>
          </div>
          {this.renderShowColumnsDlg()}
        </div>
      );
    },

    handleClickAllShowColumns(): void {
      this.showColumnCheckboxKeys = this.isAllShowColumns
        ? []
        : this.showColumnCheckboxOpts.map(({ value }: Record<string, any>) => value);
    },
    handleConfirmShowColumnsDlg(): void {
      this.showColumnKeys = [...this.showColumnCheckboxKeys];
      this.handleCancelShowColumnsDlg();
    },
    handleCancelShowColumnsDlg(): void {
      this.isShowColumnsDlg = false;
    },
    updateColumns(): void {
      this.showColumnKeys = this.columns.map(({ colKey }) => colKey);
      this.showColumnCheckboxKeys = this.columns.map(({ colKey }) => colKey);
    },
  },
});
