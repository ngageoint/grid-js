import { TreeSet } from 'tstl';
import { BaseGrid } from './BaseGrid';

/**
 * Zoom Level Matching Grids
 *
 * @author osbornb
 * @param <T>
 *            grid type
 */
export class BaseZoomGrids<T extends BaseGrid> implements Iterable<T> {
  /**
   * Zoom level
   */
  private readonly zoom: number;

  /**
   * Grids
   */
  protected readonly grids = new TreeSet<T>();

  /**
   * Constructor
   *
   * @param zoom
   *            zoom level
   */
  constructor(zoom: number) {
    this.zoom = zoom;
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
    return this.grids.push(grid) > 0;
  }

  /**
   * Remove the grid
   *
   * @param grid
   *            grid
   * @return true if removed
   */
  public removeGrid(grid: T): boolean {
    return this.grids.erase(grid) > 0;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.grids.begin();
  }
}
