const getDigit = (num: number, pos: number) => {
  return Math.floor(Math.abs(num) / Math.pow(10, pos)) % 10;
};

const digitCount = (num: number) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

// get max number of digits among the numbers (i.e. 4550 --> 4 digits, 359 --> 3 digits)
const mostDigits = (arr: number[]) => {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, digitCount(arr[i]));
  }
  return max;
};

export const radixSort = (arr: number[]): number[] => {
  let max = mostDigits(arr);
  let buckets: number[][];

  for (let i = 0; i < max; i++) {
    buckets = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      buckets[getDigit(arr[j], i)].push(arr[j]);
    }

    arr = buckets.flat();
  }

  return arr;
};
