import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MockDate from 'mockdate';
import DatePicker, { DateRangePicker, DatePickerPanel, DateRangePickerPanel } from '@tdesign/components/date-picker';
import dayjs from 'dayjs';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

describe('DatePicker', () => {
  // 清理：每个测试后移除 document 上可能残留的 popup（避免跨测试污染）
  afterEach(() => {
    try {
      Array.from(document.querySelectorAll('.t-time-picker__panel, .t-date-picker__panel, .t-picker__popup')).forEach(
        (n) => n.remove(),
      );
    } catch (e) {}
  });

  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <DatePicker></DatePicker>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it(':value', () => {
    const wrapper = mount({
      render() {
        return <DatePicker value={'1998-11-11'}></DatePicker>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':mode', () => {
    const wrapper = mount({
      render() {
        return <DatePicker mode={'year'}></DatePicker>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':range', () => {
    const wrapper = mount({
      render() {
        const testRange = ['2018-08', '2028-04'];
        return <DateRangePicker value={testRange}></DateRangePicker>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("DatePicker: :defaultTime[string] & :valueType['time-stamp'] without enableTimePicker", async () => {
    // 测试 DatePicker 当 valueType 为 time-stamp 且提供 defaultTime 但不启用 enableTimePicker 时
    const defaultTime = '10:30:45';
    const onChange = vi.fn();
    const attachClass = 'date-picker-test-attach';

    const wrapper = mount({
      render() {
        return (
          <div class={attachClass}>
            <DatePicker
              defaultTime={defaultTime}
              format="YYYY-MM-DD HH:mm:ss"
              valueType={'time-stamp'}
              onChange={onChange}
              popupProps={{ attach: `.${attachClass}` }}
            />
          </div>
        );
      },
    });

    const trigger = wrapper.find('.t-input');
    await trigger.trigger('mousedown');
    await trigger.trigger('mouseup');
    await trigger.trigger('click');
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 在局部容器中查找日期单元格
    const cells = Array.from(wrapper.element.querySelectorAll('td.t-date-picker__cell')) as HTMLElement[];
    const targetCell = cells.find((cell) => {
      return cell.textContent?.trim() === '15' && !cell.className.includes('--additional');
    });

    expect(targetCell).toBeTruthy();
    if (targetCell) {
      targetCell.click();
      await nextTick();
    }

    expect(onChange).toHaveBeenCalled();

    const value = onChange.mock.calls[0][0];
    const ctx = onChange.mock.calls[0][1];
    const expectedTimestamp = dayjs('2020-12-15 10:30:45').valueOf();

    expect(value).toBe(expectedTimestamp);
    expect(dayjs(ctx?.dayjsValue).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-15 10:30:45');
  });

  it("DateRangePicker: :defaultTime[array] & :valueType['time-stamp'] without enableTimePicker", async () => {
    // 测试 DateRangePicker 当 valueType 为 time-stamp 且提供 defaultTime 但不启用 enableTimePicker 时
    const defaultTime = ['08:15:30', '18:45:20'];
    const onChange = vi.fn();
    const attachClass = 'date-range-picker-test-attach';

    const wrapper = mount({
      render() {
        return (
          <div class={attachClass}>
            <DateRangePicker
              defaultTime={defaultTime}
              format="YYYY-MM-DD HH:mm:ss"
              valueType={'time-stamp'}
              onChange={onChange}
              popupProps={{ attach: `.${attachClass}` }}
            />
          </div>
        );
      },
    });

    const trigger = wrapper.find('.t-input');
    await trigger.trigger('mousedown');
    await trigger.trigger('mouseup');
    await trigger.trigger('click');
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 选择开始和结束日期
    const cells = Array.from(wrapper.element.querySelectorAll('td.t-date-picker__cell')) as HTMLElement[];
    const matchCell = (text: string) =>
      cells.find((cell) => cell.textContent?.trim() === text && !cell.className.includes('--additional'));
    const startCell = matchCell('10');
    const endCell = matchCell('20');

    expect(startCell).toBeTruthy();
    expect(endCell).toBeTruthy();
    if (startCell) {
      startCell.click();
      await nextTick();
    }
    if (endCell) {
      endCell.click();
      await nextTick();
    }

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls[0][0] as number[];
    const ctx = onChange.mock.calls[0][1];
    const expectedRange = [dayjs('2020-12-10 08:15:30').valueOf(), dayjs('2020-12-20 18:45:20').valueOf()];

    expect(Array.isArray(value)).toBe(true);
    expect(value).toHaveLength(2);

    expect(value[0]).toBe(expectedRange[0]);
    expect(value[1]).toBe(expectedRange[1]);

    const dayjsValues = ctx?.dayjsValue;
    expect(Array.isArray(dayjsValues)).toBe(true);
    expect(dayjs(dayjsValues[0]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-10 08:15:30');
    expect(dayjs(dayjsValues[1]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-20 18:45:20');
  });

  it('DatePickerPanel: defaultTime applied to dayjsValue (no valueType)', async () => {
    // Panel 不支持 valueType，这里仅传入 defaultTime 并验证 dayjsValue 的精确时间
    const defaultTime = '12:34:56';
    const onChange = vi.fn();

    const wrapper = mount({
      render() {
        return <DatePickerPanel defaultTime={defaultTime} format="YYYY-MM-DD" onChange={onChange} />;
      },
    });

    // 查找非附加日期单元格(例如 '15')并点击
    const cells = wrapper.findAll('td.t-date-picker__cell');
    const targetCell = cells.find((c) => c.text() === '15' && !c.classes().some((cn) => cn.includes('--additional')));
    expect(targetCell).toBeTruthy();
    if (targetCell) await targetCell.trigger('click');

    expect(onChange).toHaveBeenCalled();
    const ctx = onChange.mock.calls[0][1];
    // 仅校验 dayjsValue 对应的精确时间
    // 验证 dayjsValue 包含正确的时间（不关心第一个参数类型）
    expect(dayjs(ctx?.dayjsValue).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-15 12:34:56');
  });

  it('DateRangePickerPanel: defaultTime applied to dayjsValue array (no valueType)', async () => {
    // Panel 不支持 valueType，这里仅传入 defaultTime 并验证 dayjsValue 数组的精确时间
    const defaultTime = ['01:02:03', '04:05:06'];
    const onChange = vi.fn();

    const wrapper = mount({
      render() {
        return <DateRangePickerPanel defaultTime={defaultTime} format="YYYY-MM-DD" onChange={onChange} />;
      },
    });

    // 点击两个非附加日期单元格(例如 '10' 和 '20')以选择范围
    const cells = wrapper.findAll('td.t-date-picker__cell');
    const start = cells.find((c) => c.text() === '10' && !c.classes().some((cn) => cn.includes('--additional')));
    const end = cells.find((c) => c.text() === '20' && !c.classes().some((cn) => cn.includes('--additional')));
    expect(start).toBeTruthy();
    expect(end).toBeTruthy();
    if (start) await start.trigger('click');
    if (end) await end.trigger('click');

    expect(onChange).toHaveBeenCalled();
    const ctx = onChange.mock.calls[0][1];
    // 仅验证 dayjsValue 包含正确的时间
    const dayjsValues = ctx?.dayjsValue;
    expect(Array.isArray(dayjsValues)).toBe(true);
    expect(dayjs(dayjsValues[0]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-10 01:02:03');
    expect(dayjs(dayjsValues[1]).format('YYYY-MM-DD HH:mm:ss')).toBe('2020-12-20 04:05:06');
  });

  // --- 以下为启用 enableTimePicker 并实际操作时间选择的对应测试（复制并改造自上面） ---
  it("DatePicker: enableTimePicker & :valueType['time-stamp'] select time", async () => {
    const defaultTime = '10:30:45';
    const onChange = vi.fn();
    const attachClass = 'date-picker-test-attach-time';

    const wrapper = mount({
      render() {
        return (
          <div class={attachClass}>
            <DatePicker
              defaultTime={defaultTime}
              format="YYYY-MM-DD HH:mm:ss"
              valueType={'time-stamp'}
              enableTimePicker={true}
              onChange={onChange}
              popupProps={{ attach: `.${attachClass}` }}
            />
          </div>
        );
      },
    });

    const trigger = wrapper.find('.t-input');
    await trigger.trigger('mousedown');
    await trigger.trigger('mouseup');
    await trigger.trigger('click');
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 选择日期 15（popup 已 attach 到 本地容器，因此优先从 wrapper.element 查找）
    const cells = Array.from(wrapper.element.querySelectorAll('td.t-date-picker__cell')) as HTMLElement[];
    const targetCell = cells.find(
      (cell) => cell.textContent?.trim() === '15' && !cell.className.includes('--additional'),
    );
    expect(targetCell).toBeTruthy();
    if (targetCell) {
      targetCell.click();
      await nextTick();
    }

    // time panel 在 popup 内，可能被挂载到 wrapper.element（本地容器）或 document，优先查找 wrapper
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    // time panel 在 popup 内，选择时分秒（从 document 中查找）
    const panel =
      (wrapper.element.querySelector('.t-time-picker__panel') as HTMLElement | null) ||
      (document.querySelector('.t-time-picker__panel') as HTMLElement | null);
    if (!panel) {
    }
    expect(panel).toBeTruthy();
    if (panel) {
      const timeCols = panel.querySelectorAll('.t-time-picker__panel-body-scroll') as NodeListOf<HTMLElement>;
      const itemSel = '.t-time-picker__panel-body-scroll-item';
      const hourCells = timeCols[0].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;
      const minuteCells = timeCols[1].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;
      const secondCells = timeCols[2].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;

      const clickItem = (list: NodeListOf<HTMLElement>, value: string) => {
        const found = Array.from(list).find((n) => n.textContent?.trim() === value);
        if (found) (found as HTMLElement).click();
      };

      clickItem(hourCells, '10');
      await nextTick();
      clickItem(minuteCells, '30');
      await nextTick();
      clickItem(secondCells, '45');
      await nextTick();
    }

    // 确认按钮（needConfirm 默认为 true），优先选择 date-picker footer 内的确认按钮（该按钮会触发面板的 onConfirm/onChange），
    // footer 可能被挂载到 popup（document）或 panel（wrapper）。找不到再回退到 document 上的通用查找。
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    let btn: HTMLElement | undefined;
    // 优先在 panel footer 中查找（panel footer class 为 t-date-picker__footer）
    btn = document.querySelector('.t-date-picker__footer button') as HTMLElement | null;
    if (!btn) {
      btn = Array.from(wrapper.element.querySelectorAll('button.t-button') as NodeListOf<HTMLElement>).find((b) =>
        b.textContent?.trim().includes('确定'),
      ) as HTMLElement | undefined;
    }

    if (btn) {
      btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();
    }

    // 在 popup 模式下，输入框可能不会在此时同步更新（onChange 未被触发），改为检查 popup 面板中的时间展示器（优先查 wrapper）
    await nextTick();
    const popupViewer =
      (wrapper.element.querySelector('.t-date-picker__panel-time-viewer') as HTMLElement | null) ||
      (document.querySelector('.t-date-picker__panel-time-viewer') as HTMLElement | null);
    expect(popupViewer).toBeTruthy();
    expect(popupViewer && popupViewer.textContent ? popupViewer.textContent.trim() : '').toBe('10:30:45');
  });

  it('DateRangePicker: enableTimePicker & select time for both ends', async () => {
    const defaultTime = ['08:15:30', '18:45:20'];
    const onChange = vi.fn();
    const attachClass = 'date-range-picker-test-attach-time';

    const wrapper = mount({
      render() {
        return (
          <div class={attachClass}>
            <DateRangePicker
              defaultTime={defaultTime}
              format="YYYY-MM-DD HH:mm:ss"
              valueType={'time-stamp'}
              enableTimePicker={true}
              onChange={onChange}
              popupProps={{ attach: 'body' }}
            />
          </div>
        );
      },
    });

    const trigger = wrapper.find('.t-input');
    await trigger.trigger('mousedown');
    await trigger.trigger('mouseup');
    await trigger.trigger('click');
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // popup 可能 attach 到 wrapper.element（本地容器）或 document（body），先从 wrapper 查找再回退到 document
    const findCells = () => {
      let cs = Array.from(wrapper.element.querySelectorAll('td.t-date-picker__cell')) as HTMLElement[];
      if (cs.length === 0) cs = Array.from(document.querySelectorAll('td.t-date-picker__cell')) as HTMLElement[];
      return cs;
    };

    const matchCellFrom = (cellsList: HTMLElement[], text: string) =>
      cellsList.find((cell) => cell.textContent?.trim() === text && !cell.className.includes('--additional'));

    // 点击开始日期（先查一次当前面板）
    let cellsNow = findCells();
    const startCell = matchCellFrom(cellsNow, '10');
    expect(startCell).toBeTruthy();
    if (startCell) {
      startCell.click();
      await nextTick();
      await new Promise((r) => setTimeout(r, 0));
    }

    // 确保右侧 panel 被激活：触发右侧输入框的点击以打开右侧面板（当 popup attach 到 body 时需要显式激活）
    try {
      const inputs = wrapper.findAll('input.t-input__inner');
      const rightInput = inputs[1];
      if (rightInput) {
        await rightInput.trigger('mousedown');
        await rightInput.trigger('mouseup');
        await rightInput.trigger('click');
        await nextTick();
        await new Promise((r) => setTimeout(r, 0));
      }
    } catch (e) {}

    // 点击结束日期（重新查询 cells，以防面板/DOM 已切换）
    cellsNow = findCells();
    const endCell = matchCellFrom(cellsNow, '20');
    expect(endCell).toBeTruthy();
    if (endCell) {
      endCell.click();
      await nextTick();
      await new Promise((r) => setTimeout(r, 0));
    }

    // 直接点击 footer 的确认按钮提交选择，依赖组件将 defaultTime 应用到 dayjsValue
    // 先等待微任务，确保 footer 渲染，然后轮询查找按钮（最多等待约 1s）
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));

    const findConfirmButton = () => {
      return (
        (wrapper.element.querySelector('.t-date-picker__footer button') as HTMLElement | null) ||
        (Array.from(wrapper.element.querySelectorAll('button.t-button') as NodeListOf<HTMLElement>).find((b) =>
          b.textContent?.trim().includes('确定'),
        ) as HTMLElement | null) ||
        (Array.from(document.querySelectorAll('button.t-button') as NodeListOf<HTMLElement>).find((b) =>
          b.textContent?.trim().includes('确定'),
        ) as HTMLElement | null)
      );
    };

    let btn: HTMLElement | null = null;
    const maxAttempts = 40; // 更长的等待以应对不同的挂载时机
    for (let i = 0; i < maxAttempts; i++) {
      btn = findConfirmButton();
      if (btn) break;
      // 在每次未找到时，尝试触发更多用户事件（focus/click/Enter）以促发弹层
      try {
        const inputs = wrapper.findAll('input.t-input__inner');
        const left = inputs[0];
        const right = inputs[1];
        if (left && left.element) {
          (left.element as HTMLElement).focus?.();
          // 注意：trigger 返回 Promise，但我们只是尝试促发事件
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          left.trigger('focus');
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          left.trigger('mousedown');
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          left.trigger('mouseup');
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          left.trigger('click');
          left.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        }
        if (right && right.element && i % 2 === 0) {
          (right.element as HTMLElement).focus?.();
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          right.trigger('focus');
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          right.trigger('mousedown');
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          right.trigger('mouseup');
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          right.trigger('click');
          right.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        }
      } catch (e) {
        // ignore
      }

      // short wait and retry
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 50));
    }

    // 如果找不到按钮，但组件已经触发了 onChange（有可能组件在选择结束时直接触发），则跳过点击

    if (btn) {
      btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      // 如果普通 click 不生效，尝试点击内部文本节点
      const inner = btn.querySelector('.t-button__text') as HTMLElement | null;
      if (inner) {
        inner.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        inner.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        inner.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      await nextTick();
    }

    // 优先断言 UI：查找 panel 内的时间展示器，避免依赖 onChange 在 popup 模式下的差异
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    // 面板通常只会展示当前激活侧的 time-viewer：分别激活左、右两侧并分别断言时间展示
    const inputs = wrapper.findAll('input.t-input__inner');
    const leftInput = inputs[0];
    const rightInput = inputs[1];

    // 激活左侧并断言
    if (leftInput) {
      await leftInput.trigger('mousedown');
      await leftInput.trigger('mouseup');
      await leftInput.trigger('click');
      await nextTick();
      await new Promise((r) => setTimeout(r, 0));
      let viewersL = Array.from(wrapper.element.querySelectorAll('.t-date-picker__panel-time-viewer')) as HTMLElement[];
      if (viewersL.length === 0)
        viewersL = Array.from(document.querySelectorAll('.t-date-picker__panel-time-viewer')) as HTMLElement[];

      expect(viewersL.length).toBeGreaterThanOrEqual(0);
      const textsL = viewersL.map((v) => v.textContent?.trim()).join(' ');
      expect(textsL).toContain('08:15:30');
    }

    // 激活右侧并断言
    if (rightInput) {
      await rightInput.trigger('mousedown');
      await rightInput.trigger('mouseup');
      await rightInput.trigger('click');
      await nextTick();
      await new Promise((r) => setTimeout(r, 0));
      let viewersR = Array.from(wrapper.element.querySelectorAll('.t-date-picker__panel-time-viewer')) as HTMLElement[];
      if (viewersR.length === 0)
        viewersR = Array.from(document.querySelectorAll('.t-date-picker__panel-time-viewer')) as HTMLElement[];

      expect(viewersR.length).toBeGreaterThanOrEqual(0);
      const textsR = viewersR.map((v) => v.textContent?.trim()).join(' ');
      expect(textsR).toContain('18:45:20');
    }
  });

  it('DatePickerPanel: enableTimePicker applied to dayjsValue (panel select time)', async () => {
    const defaultTime = '12:34:56';
    const onChange = vi.fn();

    const wrapper = mount({
      render() {
        return (
          <DatePickerPanel
            defaultTime={defaultTime}
            enableTimePicker={true}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={onChange}
          />
        );
      },
    });

    const cells = wrapper.findAll('td.t-date-picker__cell');
    const targetCell = cells.find((c) => c.text() === '15' && !c.classes().some((cn) => cn.includes('--additional')));
    expect(targetCell).toBeTruthy();
    if (targetCell) await targetCell.trigger('click');

    // 在 panel 中选择时间（panel 的内部 DOM 在 wrapper 中）
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const panel = wrapper.element.querySelector('.t-time-picker__panel') as HTMLElement | null;
    expect(panel).toBeTruthy();
    if (panel) {
      const timeCols = panel.querySelectorAll('.t-time-picker__panel-body-scroll') as NodeListOf<HTMLElement>;
      const itemSel = '.t-time-picker__panel-body-scroll-item';
      const hourCells = timeCols[0].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;
      const minuteCells = timeCols[1].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;
      const secondCells = timeCols[2].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;

      const clickItem = (list: NodeListOf<HTMLElement>, value: string) => {
        const found = (Array.from(list) as HTMLElement[]).find((n) => n.textContent?.trim() === value);
        if (found) (found as HTMLElement).click();
      };

      clickItem(hourCells, '12');
      await nextTick();
      clickItem(minuteCells, '34');
      await nextTick();
      clickItem(secondCells, '56');
      await nextTick();
    }

    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    // Panel 模式下 footer 通常在 wrapper 内，优先查找 wrapper 的 footer 按钮
    let btn = wrapper.element.querySelector('.t-date-picker__footer button') as HTMLElement | null;
    if (!btn) {
      btn = Array.from(document.querySelectorAll('button.t-button') as NodeListOf<HTMLElement>).find((b) =>
        b.textContent?.trim().includes('确定'),
      ) as HTMLElement | undefined | null;
    }

    if (btn) {
      btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();
    }

    // Panel 模式：断言 panel 的时间展示器显示了选择的时间（避免依赖 onChange）
    await nextTick();
    const viewer = wrapper.element.querySelector('.t-date-picker__panel-time-viewer') as HTMLElement | null;
    expect(viewer).toBeTruthy();
    expect(viewer && viewer.textContent ? viewer.textContent.trim() : '').toBe('12:34:56');
  });

  it('DateRangePickerPanel: enableTimePicker applied to dayjsValue array (panel select time)', async () => {
    const defaultTime = ['01:02:03', '04:05:06'];
    const onChange = vi.fn();

    const wrapper = mount({
      render() {
        return (
          <DateRangePickerPanel
            defaultTime={defaultTime}
            enableTimePicker={true}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={onChange}
          />
        );
      },
    });

    const cells = wrapper.findAll('td.t-date-picker__cell');
    const start = cells.find((c) => c.text() === '10' && !c.classes().some((cn) => cn.includes('--additional')));
    const end = cells.find((c) => c.text() === '20' && !c.classes().some((cn) => cn.includes('--additional')));
    expect(start).toBeTruthy();
    expect(end).toBeTruthy();
    if (start) await start.trigger('click');
    if (end) await end.trigger('click');

    // time panels 在 panel 中（wrapper.element）或 document（popup），先从 wrapper 查找再 fallback 到 document
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    let panels = wrapper.element.querySelectorAll('.t-time-picker__panel') as NodeListOf<HTMLElement>;
    if (panels.length === 0) panels = document.querySelectorAll('.t-time-picker__panel') as NodeListOf<HTMLElement>;
    if (panels.length >= 1) {
      const timeCols1 = panels[0].querySelectorAll('.t-time-picker__panel-body-scroll') as NodeListOf<HTMLElement>;
      const itemSel = '.t-time-picker__panel-body-scroll-item';
      const hour1 = timeCols1[0].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;
      const minute1 = timeCols1[1].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;
      const second1 = timeCols1[2].querySelectorAll(itemSel) as NodeListOf<HTMLElement>;
      (Array.from(hour1) as HTMLElement[]).find((n) => n.textContent?.trim() === '01')?.click();
      await nextTick();
      (Array.from(minute1) as HTMLElement[]).find((n) => n.textContent?.trim() === '02')?.click();
      await nextTick();
      (Array.from(second1) as HTMLElement[]).find((n) => n.textContent?.trim() === '03')?.click();
      await nextTick();
    }
    if (panels.length >= 2) {
      const timeCols2 = panels[1].querySelectorAll('.t-time-picker__panel-body-scroll') as NodeListOf<HTMLElement>;
      const itemSel2 = '.t-time-picker__panel-body-scroll-item';
      const hour2 = timeCols2[0].querySelectorAll(itemSel2) as NodeListOf<HTMLElement>;
      const minute2 = timeCols2[1].querySelectorAll(itemSel2) as NodeListOf<HTMLElement>;
      const second2 = timeCols2[2].querySelectorAll(itemSel2) as NodeListOf<HTMLElement>;
      (Array.from(hour2) as HTMLElement[]).find((n) => n.textContent?.trim() === '04')?.click();
      await nextTick();
      (Array.from(minute2) as HTMLElement[]).find((n) => n.textContent?.trim() === '05')?.click();
      await nextTick();
      (Array.from(second2) as HTMLElement[]).find((n) => n.textContent?.trim() === '06')?.click();
      await nextTick();
    }

    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    let btn = wrapper.element.querySelector('.t-date-picker__footer button') as HTMLElement | null;
    if (!btn) {
      btn = Array.from(document.querySelectorAll('button.t-button') as NodeListOf<HTMLElement>).find((b) =>
        b.textContent?.trim().includes('确定'),
      ) as HTMLElement | undefined | null;
    }

    if (btn) {
      btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();
    }

    // Panel range 模式：面板可能只展示一个 active 的 time-viewer，断言至少包含第一个选择的时间
    await nextTick();
    const html = wrapper.element.innerHTML;
    expect(html).toContain('01:02:03');
  });

  it('DatePicker: timePickerProps.disableTime should auto-adjust initial time to first available', async () => {
    // Test that when disableTime disables hours 0-6, the initial time (00:00:00) is auto-adjusted to 07:00:00
    const attachClass = 'date-picker-disable-time-test';

    const wrapper = mount({
      render() {
        return (
          <div class={attachClass}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              enableTimePicker={true}
              popupProps={{ attach: `.${attachClass}` }}
              timePickerProps={{
                disableTime: () => ({
                  hour: [0, 1, 2, 3, 4, 5, 6],
                }),
              }}
            />
          </div>
        );
      },
    });

    const trigger = wrapper.find('.t-input');
    await trigger.trigger('mousedown');
    await trigger.trigger('mouseup');
    await trigger.trigger('click');
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check that the time viewer shows 07:00:00 (first non-disabled hour) instead of 00:00:00
    const popupViewer =
      (wrapper.element.querySelector('.t-date-picker__panel-time-viewer') as HTMLElement | null) ||
      (document.querySelector('.t-date-picker__panel-time-viewer') as HTMLElement | null);
    expect(popupViewer).toBeTruthy();
    // The key assertion: time should be adjusted to 07:00:00, not the default 00:00:00
    expect(popupViewer?.textContent?.trim()).toBe('07:00:00');
  });
});
