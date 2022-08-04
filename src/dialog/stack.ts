const data: number[] = [];

const push = (value: number) => {
  data.push(value);
};

const pop = () => {
  data.pop();
};

export const stack = {
  push,
  pop,
  get top() {
    return data[data.length - 1];
  },
};
