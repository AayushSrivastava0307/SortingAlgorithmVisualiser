
export function getHeapSortAnimations(array) {
    const animations = [];
    const aux = array.slice(); // create a copy to work with
    const n = aux.length;

    // helper function to maintain the heap property
    function heapify(heapSize, i) {
        let largest = i; // initialize largest as root
        const left = 2 * i + 1; // left child index
        const right = 2 * i + 2; // right child index

        // compare with left child
        if (left < heapSize) {
            // these pushes change the color to highlight comparison
            animations.push([i, left]);
            animations.push([i, left]);
            // these dummy updates maintain consistent timing
            animations.push([i, aux[i]]);
            animations.push([left, aux[left]]);
            
            if (aux[left] > aux[largest]) {
                largest = left;
            }
        }

        // compare with right child
        if (right < heapSize) {
            // highlight comparison between largest and right child
            animations.push([largest, right]);
            animations.push([largest, right]);
            // dummy height updates
            animations.push([largest, aux[largest]]);
            animations.push([right, aux[right]]);
            
            if (aux[right] > aux[largest]) {
                largest = right;
            }
        }

        // if largest is not the root, swap and continue heapifying
        if (largest !== i) {
            // perform the swap in the auxiliary array
            const temp = aux[i];
            aux[i] = aux[largest];
            aux[largest] = temp;
            
            // animate the swap: highlight and update heights
            animations.push([i, largest]);
            animations.push([i, largest]);
            animations.push([i, aux[i]]);
            animations.push([largest, aux[largest]]);
            
            // recursively heapify the affected subtree
            heapify(heapSize, largest);
        }
    }

    // build max heap (rearrange array)
    // start from the last non-leaf node and work backwards
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // extract elements one by one from the heap
    for (let end = n - 1; end > 0; end--) {
        // move current root (max) to end
        // highlight the swap between root and end
        animations.push([0, end]);
        animations.push([0, end]);
        
        // perform the swap in auxiliary array
        const temp = aux[0];
        aux[0] = aux[end];
        aux[end] = temp;
        
        // update heights in animation
        animations.push([0, aux[0]]);
        animations.push([end, aux[end]]);
        
        // call heapify on the reduced heap
        heapify(end, 0);
    }

    return animations;
}