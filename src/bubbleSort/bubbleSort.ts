export const bubbleSort = (arr: number[]) => {
  let didSwap;

  for (let i = arr.length - 1; i >= 0; i--) {
    didSwap = false;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        didSwap = true;
      }
    }

    if (!didSwap) break;
  }
};
