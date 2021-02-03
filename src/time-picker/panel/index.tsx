import Vue, { VueConstructor } from 'vue';
import moment from 'moment';
import { createPopper } from '@popperjs/core';
import { TimePickerPanelInstance, TimePickerPanelColInstance } from '../type';
import { componentName, EPickerCols } from '../constant';
import { panelProps } from './props';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import panelCol from './panelCol';
import TButton from '../../button';


const name = `${componentName}-panel`;

export default (Vue as VueConstructor<TimePickerPanelInstance>).extend({
  name,
  data() {
    return {
      panel: null,
      resizeSensor: null,
    };
  },
  components: {
    panelCol,
  },
  props: panelProps(),
  computed: {
    sectioncomponentName() {
      return `${name}-section`;
    },
    classNames() {
      return this.rangePicker ? [
        name,
        this.sectioncomponentName,
      ] : [name];
    },
    value() {
      return this.moment.map(el => el || moment());
    },
    rangePicker() {
      return this.value.length > 1;
    },
    formatField() {
      const match = this.format.match(/(a\s+|A\s+)?(h+|H+)?:?(m+)?:?(s+)?(\s+a|A)?/);
      const [, startAChart, hour, minute, second, endAChart] = match;
      return {
        startAChart, hour, minute, second, endAChart,
      };
    },
    cols() {
      if (!this.formatField) [EPickerCols.hour, EPickerCols.minute, EPickerCols.second];
      const { startAChart, hour, minute, second, endAChart } = this.formatField;
      const res = [];
      startAChart && res.push(EPickerCols.zh);
      hour && res.push(EPickerCols.hour);
      minute && res.push(EPickerCols.minute);
      second && res.push(EPickerCols.second);
      endAChart && res.push(EPickerCols.en);
      return res;
    },
  },
  watch: {
    isShowPanel(val: boolean) {
      this.switchPanel(val);
      if (val) {
        const panelCol0 = this.$refs.panelCol_0 as TimePickerPanelColInstance;
        const panelCol1 = this.$refs.panelCol_1 as TimePickerPanelColInstance;
        this.$nextTick(() => {
          panelCol0 && panelCol0.initTimeScrollPos();
          panelCol1 && panelCol1.initTimeScrollPos();
        });
      }
    },
  },
  mounted() {
    this.$emit('dom', this.$el);
  },
  methods: {
    scrollToTime(colIndex: number, col: EPickerCols, time: number | string, behavior: ScrollBehavior) {
      const scroller = this.$refs[`panelCol_${colIndex}`] as TimePickerPanelColInstance;
      scroller && scroller.scrollToTime(col, time, behavior);
    },
    updatePanel(): void {
      if (this.panel) {
        this.panel.update();
      } else {
        this.createPanel();
      }
    },
    switchPanel(val: boolean): void {
      if (this.disabled) {
        return;
      }
      if (val) {
        this.updatePanel();
      }
      this.$emit('visible-change', val);
    },
    createPanel(): void {
      const overlayContainer = document.body;
      overlayContainer.appendChild(this.$refs.panel as Element);

      if (this.panel && this.panel.destroy) {
        this.panel.destroy();
      }
      this.panel = createPopper(this.refDom, this.$refs.panel as HTMLElement, {
        placement: 'bottom-start',
        onFirstUpdate: () => {
          this.$nextTick(() => {
            this.updatePanel();
          });
        },
      });
      this.resizeSensor = new ResizeSensor(this.refDom, this.panel.update);
    },
    destroyPanel() {
      this.panel?.destroy();
    },
    renderFooter() {
      const confirmAction = this.confirmBtnClick.bind(this);
      return <div class={`${this.sectioncomponentName}__footer`}>
        {
          this.rangePicker || <TButton theme="default" onClick={this.nowAction}>此刻</TButton>
        }
        <TButton class={`${this.sectioncomponentName}__footer-button`}  onClick={confirmAction}>确定</TButton>
      </div>;
    },
    renderHeader(index: number) {
      let time;
      if (this.cols.includes(EPickerCols.zh)) {
        // 凌晨/早上/上午/下午/晚上
        time = moment(this.value[index]).locale('zh-cn')
          .format(this.format)
          .replace(/(凌晨|早上)/, '上午')
          .replace(/(晚上)/, '下午');
      } else {
        time = moment(this.value[index]).locale('en')
          .format(this.format);
      }
      return <div class={`${name}__header`}>
        {
          time
        }
      </div>;
    },
    renderBody() {
      return <div class={`${this.sectioncomponentName}__body`}>
        {
          this.renderSinglePicker(0)
        }
        {
          this.rangePicker
          && <div class={`${name}__gap`}>
            <div class={`${name}__gap-top`}>
              至
            </div>
          </div>
        }
        {
          this.rangePicker && this.renderSinglePicker(1)
        }
    </div>;
    },
    renderSinglePicker(index: number) {
      const val = this.value[index];
      const ref = `panelCol_${index}`;
      return <div class={`${name}`}>
        {this.renderHeader(index)}
        <panel-col
          ref={ref}
          value={val}
          range={this.range}
          cols={this.cols}
          steps={this.steps}
          hideDisabledTime={this.hideDisabledTime}
          disableTime={this.disableTime}
          format={this.format}
          ontime-pick={(col: EPickerCols, time: string|number) => this.handleTimePick(col, time, index)}>
        </panel-col>
      </div>;
    },
    confirmBtnClick() {
      this.$emit('sure');
    },
    nowAction() {
      this.$emit('now-action');
    },
    /**
     * 时间 item 点击选择处理函数
     * @param col 选择的哪一列 上午/下午 hour minute second am/pm
     * @param time 选择的时间 如果col是：上午/下午或者am/pm 则time是 string，如果是hour或minute或second则time是 number
     * @param isEnd 是否是结束时间
     */
    handleTimePick(col: EPickerCols, time: string|number, index: number) {
      this.$emit('time-pick', col, time, index, this.value[index]);
    },
  },
  render() {
    const { classNames } = this;
    return <transition name={`${name}_animation`}>
      <div
          class={`${classNames.join(' ')} ${name}__container`}
          ref="panel"
          v-show={this.isShowPanel}
          >
          {this.renderBody()}
          {this.renderFooter()}
      </div>
    </transition>;
  },
});
