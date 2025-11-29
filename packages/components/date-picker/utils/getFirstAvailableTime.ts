import { isFunction } from 'lodash-es';

type DisableTimeResult = Partial<{
  hour: Array<number>;
  minute: Array<number>;
  second: Array<number>;
  millisecond: Array<number>;
}>;

type DisableTimeFunction = (h: number, m: number, s: number, ms: number) => DisableTimeResult | undefined;

/**
 * Find the first available time that is not disabled
 * @param currentTime - Current time string in format like "HH:mm:ss"
 * @param timeFormat - Time format string (e.g., "HH:mm:ss")
 * @param disableTime - Function to check if a time is disabled
 * @returns The first available time string, or the original time if all times are valid
 */
export function getFirstAvailableTime(
  currentTime: string,
  timeFormat: string,
  disableTime?: DisableTimeFunction,
): string {
  if (!isFunction(disableTime)) {
    return currentTime;
  }

  // Parse current time
  const timeParts = currentTime.split(':').map((p) => parseInt(p, 10) || 0);
  const [currentHour = 0, currentMinute = 0, currentSecond = 0] = timeParts;

  // Check if current time is disabled
  const disabledResult = disableTime(currentHour, currentMinute, currentSecond, 0);
  if (!disabledResult) {
    return currentTime;
  }

  const disabledHours = disabledResult.hour || [];
  const disabledMinutes = disabledResult.minute || [];
  const disabledSeconds = disabledResult.second || [];

  // Check if current time is valid
  const isCurrentHourDisabled = disabledHours.includes(currentHour);
  const isCurrentMinuteDisabled = disabledMinutes.includes(currentMinute);
  const isCurrentSecondDisabled = disabledSeconds.includes(currentSecond);

  if (!isCurrentHourDisabled && !isCurrentMinuteDisabled && !isCurrentSecondDisabled) {
    return currentTime;
  }

  // Find first available hour
  let availableHour = currentHour;
  if (isCurrentHourDisabled) {
    for (let h = 0; h < 24; h++) {
      // Check if this hour is disabled
      const hourResult = disableTime(h, 0, 0, 0);
      const hourDisabled = hourResult?.hour || [];
      if (!hourDisabled.includes(h)) {
        availableHour = h;
        break;
      }
    }
  }

  // Find first available minute for the available hour
  let availableMinute = isCurrentHourDisabled ? 0 : currentMinute;
  const minuteResult = disableTime(availableHour, availableMinute, 0, 0);
  const minuteDisabled = minuteResult?.minute || [];
  if (minuteDisabled.includes(availableMinute)) {
    for (let m = 0; m < 60; m++) {
      const mResult = disableTime(availableHour, m, 0, 0);
      const mDisabled = mResult?.minute || [];
      if (!mDisabled.includes(m)) {
        availableMinute = m;
        break;
      }
    }
  }

  // Find first available second for the available hour and minute
  let availableSecond = isCurrentHourDisabled || isCurrentMinuteDisabled ? 0 : currentSecond;
  const secondResult = disableTime(availableHour, availableMinute, availableSecond, 0);
  const secondDisabled = secondResult?.second || [];
  if (secondDisabled.includes(availableSecond)) {
    for (let s = 0; s < 60; s++) {
      const sResult = disableTime(availableHour, availableMinute, s, 0);
      const sDisabled = sResult?.second || [];
      if (!sDisabled.includes(s)) {
        availableSecond = s;
        break;
      }
    }
  }

  // Format the result based on the time format
  const formatTimeStr = (h: number, m: number, s: number, format: string): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');

    // Determine which parts to include based on format
    const hasHour = /H/.test(format);
    const hasMinute = /m/.test(format);
    const hasSecond = /s/.test(format);

    const parts: string[] = [];
    if (hasHour) parts.push(pad(h));
    if (hasMinute) parts.push(pad(m));
    if (hasSecond) parts.push(pad(s));

    return parts.join(':');
  };

  return formatTimeStr(availableHour, availableMinute, availableSecond, timeFormat);
}
