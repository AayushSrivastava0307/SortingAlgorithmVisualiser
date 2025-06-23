
export function getSelectionSortAnimations(array) {
  const animations = [];
  const aux = array.slice(); // create a working copy of the array
  const n = aux.length;

  // outer loop for each position in the array
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i; // assume current position has the minimum element

    // inner loop to find the actual minimum in remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      // highlight the elements being compared (current element and current minimum)
      animations.push([j, minIdx]);
      // revert the color after comparison
      animations.push([j, minIdx]);
      // maintain consistent timing with dummy height updates
      animations.push([j, aux[j]]);
      animations.push([minIdx, aux[minIdx]]);

      // if we found a new minimum, update the minimum index
      if (aux[j] < aux[minIdx]) {
        minIdx = j;
      }
    }

    // if we found a different minimum, perform the swap
    if (minIdx !== i) {
      // highlight the elements being swapped
      animations.push([i, minIdx]);
      animations.push([i, minIdx]);
      
      // perform the swap in the auxiliary array
      const temp = aux[i];
      aux[i] = aux[minIdx];
      aux[minIdx] = temp;
      
      // animate the height updates after swapping
      animations.push([i, aux[i]]);
      animations.push([minIdx, aux[minIdx]]);
    }
  }
  return animations;
}