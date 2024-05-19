export const prefix = 't-tree';

export function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function step() {
  let fn = null;
  const pm = new Promise((resolve) => {
    fn = resolve;
  });
  pm.ready = () => {
    if (fn) fn();
  };
  return pm;
}
