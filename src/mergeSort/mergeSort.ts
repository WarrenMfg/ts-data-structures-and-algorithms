export const mergeSort = (arr: number[]): number[] => {
  // base case
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
};

const merge = (arrL: number[], arrR: number[]) => {
  let leftIndex = 0;
  let rightIndex = 0;
  const result = [];

  while (leftIndex < arrL.length && rightIndex < arrR.length) {
    if (arrL[leftIndex] < arrR[rightIndex]) {
      result.push(arrL[leftIndex++]);
    } else {
      result.push(arrR[rightIndex++]);
    }
  }

  return result.concat(arrL.slice(leftIndex), arrR.slice(rightIndex));
};
