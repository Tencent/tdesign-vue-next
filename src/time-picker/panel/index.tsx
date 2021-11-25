import { defineComponent, nextTick } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import mixins from '../../utils/mixins';
import getLocalReceiverMixins from '../../locale/local-receiver';
import { TimePickerPanelColInstance } from '../interface';
import { COMPONENT_NAME, EPickerCols } from '../constant';
import { panelProps } from './props';
import PanelCol from './panel-col';
import TButton from '../../button/button';

const name = `${COMPONENT_NAME}-panel`;

dayjs.extend(customParseFormat);

export default defineComponent({
  ...mixins(getLocalReceiverMixins('timePicker')),
  name,
  components: {
    PanelCol,
    TButton,
  },
  props: panelProps(),

  emits: ['sure', 'now-action', 'time-pick'],
  data() {
    return {
      panel: null,
      isSetup: false,
    };
  },
  computed: {
    sectionComponentName() {
      return `${name}-section`;
    },
    classNames() {
      return this.rangePicker ? [name, this.sectionComponentName] : [name];
    },
    colValues() {
      return this.value.map((el) => el || dayjs());
    },
    rangePicker() {
      return this.colValues.length > 1;
    },
    formatField() {
      const match = this.format.match(/(a\s+|A\s+)?(h+|H+)?:?(m+)?:?(s+)?(\s+a|A)?/);
      const [, startAChart, hour, minute, second, endAChart] = match;
      return {
        startAChart,
        hour,
        minute,
        second,
        endAChart,
      };
    },
    cols() {
      if (!this.formatField) {
        return [EPickerCols.hour, EPickerCols.minute, EPickerCols.second];
      }
      const { startAChart, hour, minute, second, endAChart } = this.formatField;
      const res = [];
      startAChart && res.push(EPickerCols.meridiem);
      hour && res.push(EPickerCols.hour);
      minute && res.push(EPickerCols.minute);
      second && res.push(EPickerCols.second);
      endAChart && res.push(EPickerCols.meridiem);
      return res;
    },
    localeMeridiems() {
      return [this.locale.anteMeridiem, this.locale.postMeridiem];
    },
  },
  watch: {
    isShowPanel: {
      handler(val: boolean) {
        if (val) {
          this.panelColUpdate();
        }
      },
      immediate: true,
    },
  },
  methods: {
    panelColUpdate() {
      nextTick(() => {
        const panelCol0 = this.$refs.panelCol_0 as TimePickerPanelColInstance;
        const panelCol1 = this.$refs.panelCol_1 as TimePickerPanelColInstance;
        panelCol0 && panelCol0.updateTimeScrollPos();
        panelCol1 && panelCol1.updateTimeScrollPos();
      });
    },
    // eslint-disable-next-line no-undef
    scrollToTime(colIndex: number, col: EPickerCols, time: number | string, behavior: ScrollBehavior) {
      const scroller = this.$refs[`panelCol_${colIndex}`] as TimePickerPanelColInstance;
      scroller && scroller.scrollToTime(col, time, behavior);
    },
    renderFooter() {
      const confirmAction = this.confirmBtnClick.bind(this);
      return (
        <div class={`${this.sectionComponentName}__footer`}>
          {/* 样式设置为row-reverse 这样不用特地为确定写个绝对布局 */}
          <t-button theme="primary" variant="base" onClick={confirmAction}>
            {this.t(this.locale.confirm)}
          </t-button>
          {this.rangePicker || (
            <t-button theme="primary" variant="text" onClick={this.nowAction}>
              {this.t(this.locale.nowtime)}
            </t-button>
          )}
        </div>
      );
    },

    renderBody() {
      return (
        <div class={`${this.sectionComponentName}__body`}>
          {this.renderSinglePicker(0)}
          {this.rangePicker && this.renderSinglePicker(1)}
        </div>
      );
    },
    renderSinglePicker(index: number) {
      const val = this.colValues[index];
      const ref = `panelCol_${index}`;
      return (
        <panel-col
          ref={ref}
          value={val}
          cols={this.cols}
          steps={this.steps}
          hideDisabledTime={this.hideDisabledTime}
          disableTime={this.disableTime}
          format={this.format}
          onTimePick={(col: EPickerCols, time: string | number) => this.handleTimePick(col, time, index)}
          localeMeridiems={this.localeMeridiems}
        />
      );
    },
    confirmBtnClick() {
      this.$emit('sure');
    },
    nowAction() {
      this.$emit('now-action');
      this.panelColUpdate();
    },
    /**
     * 时间 item 点击选择处理函数
     * @param col 选择的哪一列 上午/下午 hour minute second am/pm
     * @param time 选择的时间 如果col是：上午/下午或者am/pm 则time是 string，如果是hour或minute或second则time是 number
     * @param index
     */
    handleTimePick(col: EPickerCols, time: string | number, index: number) {
      this.$emit('time-pick', col, time, index, this.colValues[index]);
    },
  },
  render() {
    const { isFooterDisplay, classNames } = this;
    return (
      <div class={classNames}>
        {this.renderBody()}
        {isFooterDisplay ? this.renderFooter() : null}
      </div>
    );
  },
});
