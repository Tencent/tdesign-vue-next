export const prefix = 't-tree';

export function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
