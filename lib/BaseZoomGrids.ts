import { TreeSet } from 'tstl';
import { BaseGrid } from './BaseGrid';

/**
 * Zoom Level Matching Grids
 *
 * @param <T>
 *            grid type
 */
export class BaseZoomGrids<T extends BaseGrid> implements IterableIterator<T> {
  /**
   * Zoom level
   */
  private readonly zoom: number;

  /**
   * Grids
   */
  protected readonly grids = new TreeSet<T>();

  private beginIterator: TreeSet.Iterator<T>;

  /**
   * Constructor
   *
   * @param zoom
   *            zoom level
   */
  constructor(zoom: number) {
    this.zoom = zoom;
    this.beginIterator = this.grids.begin();
  }

  /**
   * Get the zoom level
   *
   * @return zoom level
   */
  public getZoom(): number {
    return this.zoom;
  }

  /**
   * Get the grids within the zoom level
   *
   * @return grids
   */
  public getGrids(): TreeSet<T> {
    return this.grids;
  }

  /**
   * Get the number of grids
   *
   * @return number of grids
   */
  public numGrids(): number {
    return this.grids.size();
  }

  /**
   * Determine if the zoom level has grids
   *
   * @return true if has grids
   */
  public hasGrids(): boolean {
    return !this.grids.empty();
  }

  /**
   * Add a grid
   *
   * @param grid
   *            grid
   * @return true if added
   */
  public addGrid(grid: T): boolean {
    const result = this.grids.push(grid) > 0;
    this.reset();
    return result;
  }

  /**
   * Remove the grid
   *
   * @param grid
   *            grid
   * @return true if removed
   */
  public removeGrid(grid: T): boolean {
    const result = this.grids.erase(grid) > 0;
    this.reset();
    return result;
  }

  public next(): IteratorResult<T> {
    if (!this.beginIterator.equals(this.grids.end())) {
      const result = this.beginIterator.value;
      this.beginIterator = this.beginIterator.next();
      return {
        done: false,
        value: result,
      };
    } else {
      return {
        done: true,
        value: undefined,
      };
    }
  }

  public reset(): void {
    this.beginIterator = this.grids.begin();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}
