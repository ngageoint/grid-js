import { Bounds } from './features/Bounds';
import { Point } from './features/Point';

/**
 * Grid Label
 */
export class Label {
  /**
   * Name
   */
  private name?: string;

  /**
   * Center point
   */
  private center?: Point;

  /**
   * Bounds
   */
  private bounds?: Bounds;

  /**
   * Constructor
   *
   * @param name
   *            name
   * @param center
   *            center point
   * @param bounds
   *            bounds
   */
  constructor(name: string, center: Point, bounds: Bounds) {
    this.name = name;
    this.center = center;
    this.bounds = bounds;
  }

  /**
   * Get the name
   *
   * @return name
   */
  public getName(): string | undefined {
    return this.name;
  }

  /**
   * Set the name
   *
   * @param name
   *            name
   */
  public setName(name?: string): void {
    this.name = name;
  }

  /**
   * Get the center point
   *
   * @return center point
   */
  public getCenter(): Point | undefined {
    return this.center;
  }

  /**
   * Set the center point
   *
   * @param center
   *            center point
   */
  public setCenter(center?: Point): void {
    this.center = center;
  }

  /**
   * Get the bounds
   *
   * @return bounds
   */
  public getBounds(): Bounds | undefined {
    return this.bounds;
  }

  /**
   * Set the bounds
   *
   * @param bounds
   *            bounds
   */
  public setBounds(bounds?: Bounds): void {
    this.bounds = bounds;
  }
}
