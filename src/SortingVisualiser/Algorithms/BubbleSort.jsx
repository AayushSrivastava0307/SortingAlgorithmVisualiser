
export function getBubbleSortAnimations(array) {
    const animations = [];
    const aux = array.slice(); // create a working copy of the array
    const n = aux.length;

    // outer loop for each pass through the array
    for (let i = 0; i < n - 1; i++) {
        // inner loop for comparing adjacent elements
        for (let j = 0; j < n - i - 1; j++) {
            // highlight the current pair being compared (change color)
            animations.push([j, j + 1]);
            // revert the color after comparison
            animations.push([j, j + 1]);

            // compare adjacent elements
            if (aux[j] > aux[j + 1]) {
                // swap needed - perform the swap in auxiliary array
                const temp = aux[j];
                aux[j] = aux[j + 1];
                aux[j + 1] = temp;

                // animate the swap by updating heights
                animations.push([j, aux[j]]);
                animations.push([j + 1, aux[j + 1]]);
            } else {
                // no swap needed, but push dummy height updates
                // to maintain consistent timing with swap cases
                animations.push([j, aux[j]]);
                animations.push([j + 1, aux[j + 1]]);
            }
        }
    }
    return animations;
}