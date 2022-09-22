import { Color } from '@ngageoint/color-js';

/**
 * Grid Line Style
 *
 * @author osbornb
 */
export class GridStyle {
  /**
   * Grid line color
   */
  private color?: Color = undefined;

  /**
   * Grid line width
   */
  private width: number = 0;

  /**
   * Create a new style
   *
   * @param color
   *            color
   * @param width
   *            width
   * @return style
   */
  public static style(color: Color | undefined, width: number): GridStyle {
    return new GridStyle(color, width);
  }

  /**
   * Constructor
   *
   * @param color
   *            color
   * @param width
   *            width
   */
  constructor(color: Color | undefined, width: number) {
    this.color = color;
    this.width = width;
  }

  /**
   * Get the grid line color
   *
   * @return grid line color
   */
  public getColor(): Color | undefined {
    return this.color;
  }

  /**
   * Set the grid line color
   *
   * @param color
   *            grid line color
   */
  public setColor(color?: Color): void {
    this.color = color;
  }

  /**
   * Get the grid line width
   *
   * @return grid line width
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * Set the grid line width
   *
   * @param width
   *            grid line width
   */
  public setWidth(width: number): void {
    this.width = width;
  }
}
