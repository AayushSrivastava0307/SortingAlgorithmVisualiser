
export function getQuickSortAnimations(array) {
    const animations = [];
    const aux = array.slice(); // create a working copy of the array

    // main recursive quick sort function
    function quickSort(left, right) {
        if (left < right) {
            // partition the array and get the pivot index
            const pivotIndex = partition(left, right);
            // recursively sort elements before and after partition
            quickSort(left, pivotIndex - 1);
            quickSort(pivotIndex + 1, right);
        }
    }

    // partition function that places the pivot in correct position
    function partition(left, right) {
        const pivot = aux[right]; // choose rightmost element as pivot
        let i = left; // index of smaller element

        for (let j = left; j < right; j++) {
            // highlight the elements being compared (current element and pivot)
            animations.push([j, right]);
            // revert the color after comparison
            animations.push([j, right]);
            // maintain consistent timing with dummy height updates
            animations.push([j, aux[j]]);
            animations.push([right, aux[right]]);

            // if current element is smaller than the pivot
            if (aux[j] < pivot) {
                // swap elements at i and j
                [aux[i], aux[j]] = [aux[j], aux[i]];
                // animate the swap: highlight and update heights
                animations.push([i, j]);
                animations.push([i, j]);
                animations.push([i, aux[i]]);
                animations.push([j, aux[j]]);
                i++; // increment index of smaller element
            }
        }

        // move pivot to its correct position
        // highlight the final pivot placement
        animations.push([i, right]);
        animations.push([i, right]);
        // perform the swap in auxiliary array
        [aux[i], aux[right]] = [aux[right], aux[i]];
        // animate the height updates after pivot placement
        animations.push([i, aux[i]]);
        animations.push([right, aux[right]]);

        return i; // return the pivot index
    }

    // start the sorting process on the entire array
    quickSort(0, aux.length - 1);
    return animations;
}