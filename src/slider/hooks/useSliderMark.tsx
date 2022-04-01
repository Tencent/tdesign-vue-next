import { computed, VNode } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { SliderMarks } from '../type';
import { TNode } from '../../common';
import log from '../../_common/js/log/log';
import { getStopStyle } from '../util/common';

interface MarkItem {
  point: number;
  position: number;
  mark: string | number | TNode<{ value: number }>;
}

interface useSliderMarkProps {
  max: number;
  min: number;
  marks: number[] | SliderMarks;
  vertical: boolean;
  prefixName: string;
}

/**
 * 聚合管理刻度值渲染逻辑
 */
export const useSliderMark = (
  max: number,
  min: number,
  marks: number[] | SliderMarks,
  isVertical: boolean,
  prefixName: string,
) => {
  const name = prefixName;
  const markList = computed(() => {
    if (!marks) {
      return [];
    }
    const legalMarks: Array<MarkItem> = [];
    if (Array.isArray(marks)) {
      const marksList = cloneDeep(marks).sort((a, b) => a - b);
      const maxLimit = Math.max(...marksList, max);
      const minLimit = Math.min(...marksList, min);
      if (minLimit < min) {
        log.errorOnce('TSlider', 'marks min value should >= props min');
      }
      if (maxLimit > max) {
        log.errorOnce('TSlider', 'marks max value should <= props max');
      }
      marksList.forEach((item) => {
        legalMarks.push({
          point: item,
          position: ((item - minLimit) / (maxLimit - minLimit)) * 100,
          mark: item,
        });
      });
    } else {
      Object.keys(marks)
        .map(parseFloat)
        .sort((a, b) => a - b)
        .filter((point) => point <= max && point >= min)
        .forEach((point) => {
          const item: MarkItem = {
            point,
            position: ((point - min) * 100) / (max - min),
            mark: marks[point],
          };
          legalMarks.push(item);
        });
    }
    return legalMarks;
  });

  const renderMask = (onChangeFn?: (point: number) => void): VNode => {
    if (markList.value.length) {
      return (
        <div>
          <div>
            {markList.value.map((item, index) => (
              <div
                class={`${name}__stop ${name}__mark-stop`}
                style={getStopStyle(item.position, isVertical)}
                key={index}
              />
            ))}
          </div>
          <div class={`${name}__mark`}>
            {markList.value.map((item, key) => (
              <t-slider-mark
                mark={item.mark}
                point={item.point}
                key={key}
                style={getStopStyle(item.position, isVertical)}
                on-change-value={onChangeFn}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  return renderMask;
};
