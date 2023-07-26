class PriorityQueue<Element> {
  /**
   * Priority queue implementation that uses a heap.
   * The Element generic is the type of the elements stored in the heap and the type of elements in the PriorityQueue.comperationFun().
   */
  private heap: Element[] = [];
  constructor(
    private comperationFun: (el1: Element, el2: Element) => number,
    elements?: Element[]
  ) {
    if (elements !== undefined) {
      this.insertElements(elements);
    }
  }

  private swap(idx1: number, idx2: number): void {
    const temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  }
  private boubleUp(currIdx: number): void {
    if (this.heap.length <= 1) {
      return;
    }
    let parentIdx = PriorityQueue.parentIdx(currIdx); // is null if currIdx is the idx of the root element
    while (parentIdx !== null) {
      if (this.isElementsInOrder(currIdx, parentIdx)) {
        break;
      }
      this.swap(currIdx, parentIdx);
      currIdx = parentIdx;
      parentIdx = PriorityQueue.parentIdx(currIdx);
    }
  }
  private boubleDown(currIdx: number): void {
    if (this.heap.length <= 1) {
      return;
    }
    const { lChildIdx, rChildIdx } = PriorityQueue;
    while (true) {
      const leftChildIdx = lChildIdx(currIdx);
      if (
        leftChildIdx < this.length &&
        !this.isElementsInOrder(leftChildIdx, currIdx)
      ) {
        this.swap(leftChildIdx, currIdx);
        currIdx = leftChildIdx;
        continue;
      }
      const rightChildIdx = rChildIdx(currIdx);
      if (
        rightChildIdx < this.length &&
        !this.isElementsInOrder(rightChildIdx, currIdx)
      ) {
        this.swap(rightChildIdx, currIdx);
        currIdx = rightChildIdx;
        continue;
      }
      break;
    }
  }
  private isElementsInOrder(idx1: number, idx2: number): boolean {
    return this.comperationFun(this.at(idx1), this.at(idx2)) >= 0;
  }
  private insertElements(elements: Element[]): void {
    for (const element of elements) {
      this.insert(element);
    }
  }
  public poll(): Element | null {
    /**
     * Removes the first (root) element of the priority queue heap and returns it.
     * Runs in time complexity: O(log(n))
     * @returns an element of the Element type provided when priority queue was created with the 'new' keyword
     */
    return this.removeAt(0);
  }
  public removeAt(idx: number): Element | null {
    /**
     * Removes the element that currently sits on the provided index of the priority queue heap and returns it.
     * Runs in time complexity: O(log(n))
     * @param idx index of the element that will be removed.
     * @returns an element of the Element type provided when priority queue was created with the 'new' keyword.
     */
    // time: O(log(n)) becouse boubleDown works in O(log(n))
    if (idx < 0 || idx >= this.length) {
      throw new Error(
        `Provided index (param 'idx') is not a valid index. idx = ${idx} is < 0 or >= heap.length`
      );
    }
    const lastElIdx = this.length - 1;
    if (idx === lastElIdx) {
      return this.pop();
    }
    this.swap(idx, lastElIdx);
    const removedEl = this.pop();
    this.boubleDown(idx);
    return removedEl;
  }
  public at(idx: number): Element {
    /**
     * The zero-based index of the desired code unit. A negative index will count back from the last item.
     * @param idx index of the element that will be returned or the number of the element counting from the back if is a negative number.
     * @returns an element at provided index or at index counting from the back if the index is a negative number.
     */
    if (idx < 0) {
      return this.heap[this.length + idx];
    }
    return this.heap[idx];
  }
  public pop(): Element | null {
    /**
     * Removes the last element from an array and returns it. If the array is empty, null is returned and the array is not modified.
     */
    const el = this.heap.pop();
    return el === undefined ? null : el;
  }
  public insert(element: Element): void {
    /**
     * Appends new elements to the end of an heap and moves it to a correct spot in the heap.
     */
    this.heap.push(element);
    const startIdx = this.length - 1;
    this.boubleUp(startIdx);
  }
  public removeEl(element: Element): boolean {
    /**
     * Finds an index of the element provided as a parameter and removes it from the priority queue heap.
     * time: O(n + log(n)) -> O(n)
     * @returns a boolean value indicating if the element was found.
     */
    for (let idx = 0; idx < this.length; idx++) {
      if (this.at(idx) === element) {
        this.removeAt(idx);
        return true;
      }
    }
    return false;
  }
  // public displayInConsole() {
  //   let str = "";
  //   let howMany = 1;
  //   for (let i=0 ; i<this.heap.length ; i++) {
  //     for (let j=0 ; j<howMany ; j++) {
  //       str += JSON.stringify(this.heap[i]);
  //       i++;
  //     }
  //     str += ";\n";
  //     i--;
  //     howMany *= 2;
  //   }
  //   console.log(str);
  // }
  public isEmpty(): boolean {
    return this.length === 0;
  }

  get length(): number {
    return this.heap.length;
  }
  public getHeap(): Element[] {
    return this.heap;
  }
  public setComperationFun(
    comperationFun: (el1: Element, el2: Element) => number
  ): void {
    /**
     * Sets a new comperation function provided as the parameter and reorders the heap to satisfy the new order.
     * Time: O(n + log(n)) -> O(n)
     * @returns a boolean value indicating if the element was found.
     */
    this.comperationFun = comperationFun;
    const temp = [...this.heap];
    this.heap = [];
    this.insertElements(temp);
  }

  static isElRoot(idx: number): boolean {
    return idx === 0;
  }
  static parentIdx(idx: number): null | number {
    // returns null if there is no parent index
    if (PriorityQueue.isElRoot(idx)) {
      return null;
    }
    return Math.ceil(idx / 2) - 1;
  }
  static lChildIdx(idx: number): number {
    return idx * 2 + 1;
  }
  static rChildIdx(idx: number): number {
    return idx * 2 + 2;
  }
}

export default PriorityQueue;
