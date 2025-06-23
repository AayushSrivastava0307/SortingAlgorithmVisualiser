import React from 'react';
import { getMergeSortAnimations } from './Algorithms/MergeSort'; 
import { getQuickSortAnimations } from './Algorithms/QuickSort'; 
import { getHeapSortAnimations } from './Algorithms/HeapSort';   
import { getBubbleSortAnimations } from './Algorithms/BubbleSort'; 
import { getSelectionSortAnimations } from './Algorithms/SelectionSort'; 
import './SortingVisualiser.css'; 

// this constant sets the animation speed in milliseconds
const ANIMATION_SPEED_MS = 1;
// this constant represents how many bars will be displayed
const NUMBER_OF_ARRAY_BARS = 300;
// this is the default color for the bars
const PRIMARY_COLOR = '#ffffff';
// this is the color used to highlight bars during comparisons
const SECONDARY_COLOR = 'red';

export default class SortingVisualiser extends React.Component {
  constructor(props) {
    super(props);
    // this state holds the array, chosen algorithm, and whether array is sorted
    this.state = {
      array: [],
      algorithm: '',
      isSorted: false,
    };
    // this binds the handleAlgorithmChange to the component instance
    this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
    // this array will track all scheduled timeouts
    this.timeoutIds = [];
  }

  componentDidMount() {
    // this generates the initial array when component mounts
    this.resetArray();
  }

  clearAllTimeouts() {
    // clears any scheduled timeouts so ongoing sorts can be canceled
    for (const id of this.timeoutIds) {
      clearTimeout(id);
    }
    this.timeoutIds = [];
  }

  resetArray() {
    // stop any ongoing sorts by clearing timeouts
    this.clearAllTimeouts();

    // reset all bar colors to primary color
    const allBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < allBars.length; i++) {
      allBars[i].style.backgroundColor = PRIMARY_COLOR;
    }

    // generate a fresh array of random heights
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 700));
    }
    // update the state to hold the new array and reset sorted state
    this.setState({ array: newArray, algorithm: '', isSorted: false });
  }

  handleAlgorithmChange(e) {
    // this updates our chosen algorithm in state
    this.setState({ algorithm: e.target.value });
  }

  sortArray() {
    // this decides which sort function to call based on chosen algorithm
    const { algorithm } = this.state;
    switch (algorithm) {
      case 'merge':
        this.mergeSort();
        break;
      case 'quick':
        this.quickSort();
        break;
      case 'heap':
        this.heapSort();
        break;
      case 'bubble':
        this.bubbleSort();
        break;
      case 'selection':
        this.selectionSort();
        break;
      default:
        break;
    }
  }

  addTimeout(callback, delay) {
    // this pushes any scheduled callback into our timeoutIds so we can clear it later
    const id = setTimeout(callback, delay);
    this.timeoutIds.push(id);
  }

  mergeSort() {
    // retrieve all animations from mergesort function
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        // animation steps for changing bar colors
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        this.addTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // animation steps for changing bar heights
        this.addTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // once done, mark array as sorted
    const totalTime = animations.length * ANIMATION_SPEED_MS;
    this.addTimeout(() => this.setState({ isSorted: true }), totalTime);
  }

  quickSort() {
    // retrieve all animations from quicksort function
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        // color change animation
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        this.addTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // height swap animation
        this.addTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // once done, mark array as sorted
    const totalTime = animations.length * ANIMATION_SPEED_MS;
    this.addTimeout(() => this.setState({ isSorted: true }), totalTime);
  }

  heapSort() {
    // retrieve all animations from heapsort function
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        // color change animation
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        this.addTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // height swap animation
        this.addTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // once done, mark array as sorted
    const totalTime = animations.length * ANIMATION_SPEED_MS;
    this.addTimeout(() => this.setState({ isSorted: true }), totalTime);
  }

  bubbleSort() {
    // retrieve all animations from bubblesort function
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        // color change animation
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        this.addTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // height swap animation
        this.addTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // once done, mark array as sorted
    const totalTime = animations.length * ANIMATION_SPEED_MS;
    this.addTimeout(() => this.setState({ isSorted: true }), totalTime);
  }

  selectionSort() {
    // retrieve all animations from selectionsort function
    const animations = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        // color change animation
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        this.addTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // height swap animation
        this.addTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // once done, mark array as sorted
    const totalTime = animations.length * ANIMATION_SPEED_MS;
    this.addTimeout(() => this.setState({ isSorted: true }), totalTime);
  }

  render() {
    // destructure the current state
    const { array, algorithm, isSorted } = this.state;

    return (
      <div className="array-container">
        {/* display the bars in the bars-container */}
        <div className="bars-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>

        {/* choose algorithm and trigger sorting or a new array */}
        <div className="button-container">
          <select
            value={algorithm}
            onChange={this.handleAlgorithmChange}
            disabled={isSorted}
          >
            <option value="" disabled>
              Choose Sorting Algorithm
            </option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="heap">Heap Sort</option>
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
          </select>
          <button
            onClick={() => this.sortArray()}
            disabled={!algorithm || isSorted}
          >
            Sort!
          </button>
          <button onClick={() => this.resetArray()}>
            GenerateNewArray/Stop
          </button>
        </div>
      </div>
    );
  }
}

// this utility function creates a random integer in range [min, max]
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}