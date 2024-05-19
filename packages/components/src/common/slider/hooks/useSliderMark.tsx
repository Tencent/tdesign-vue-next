import type { Ref, VNode } from '@td/adapter-vue';
import { computed } from '@td/adapter-vue';
import { cloneDeep, isArray } from 'lodash-es';

import type { SliderMarks } from '@td/intel/components/slider/type';
import type { TNode } from '@td/shared/interface';
import log from '@td/shared/_common/js/log/log';
import { getStopStyle } from '../util/common';
import TSliderMark from '../slider-mark';

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
export function useSliderMark(config: Ref<useSliderMarkProps>) {
  const name = config.value.prefixName;
  const markList = computed(() => {
    const markProps = config.value;
    if (!markProps.marks) {
      return [];
    }
    const legalMarks: Array<MarkItem> = [];
    if (isArray(markProps.marks)) {
      const marksList = cloneDeep(markProps.marks).sort((a, b) => a - b);
      const maxLimit = Math.max(...marksList, markProps.max);
      const minLimit = Math.min(...marksList, markProps.min);
      if (minLimit < markProps.min) {
        log.errorOnce('TSlider', 'marks min value should >= props min');
      }
      if (maxLimit > markProps.max) {
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
      Object.keys(markProps.marks)
        .map(Number.parseFloat)
        .sort((a, b) => a - b)
        .filter(point => point <= markProps.max && point >= markProps.min)
        .forEach((point) => {
          const item: MarkItem = {
            point,
            position: ((point - markProps.min) * 100) / (markProps.max - markProps.min),
            mark: markProps.marks[point],
          };
          legalMarks.push(item);
        });
    }
    return legalMarks;
  });

  const renderMask = (onChangeFn?: (point: number) => void): VNode => {
    if (!markList.value.length) {
      return null;
    }

    return (
      <div>
        <div class={`${name}__stops`}>
          {markList.value.map((item, index) => {
            if (item.position === 0 || item.position === 100) {
              return null;
            }
            return (
              <div
                class={`${name}__stop ${name}__mark-stop`}
                style={getStopStyle(item.position, config.value.vertical)}
                key={index}
              />
            );
          })}
        </div>
        <div class={`${name}__mark`}>
          {markList.value.map((item, key) => (
            <TSliderMark
              mark={item.mark as any}
              point={item.point}
              key={key}
              style={getStopStyle(item.position, config.value.vertical)}
              onClickMarkPoint={onChangeFn}
            />
          ))}
        </div>
      </div>
    );
  };

  return renderMask;
}
