export const quickSort = (arr: number[], start = 0, end = arr.length) => {
  if (start < end) {
    const pivotIndex = pivot(arr, start, end);
    quickSort(arr, start, pivotIndex);
    quickSort(arr, pivotIndex + 1, end);
  }
};

const pivot = (arr: number[], start: number, end: number) => {
  let swapIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < arr[start]) {
      swapIndex++;
      if (i !== start) {
        [arr[swapIndex], arr[i]] = [arr[i], arr[swapIndex]];
      }
    }
  }

  if (start !== swapIndex) {
    [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]];
  }
  return swapIndex;
};
