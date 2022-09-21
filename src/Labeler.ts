import { Color } from '@ngageoint/color-js/dist/Color';

/**
 * Grid Labeler
 *
 * @author osbornb
 */
export abstract class Labeler {
  /**
   * Enabled labeler
   */
  private enabled: boolean = false;

  /**
   * Minimum zoom level
   */
  private minZoom: number = 0;

  /**
   * Maximum zoom level
   */
  private maxZoom?: number = undefined;

  /**
   * Label color
   */
  private color?: Color = undefined;

  /**
   * Label text size
   */
  private textSize: number = 0;

  /**
   * Grid edge buffer (greater than or equal to 0.0 and less than 0.5)
   */
  private buffer: number = 0;

  /**
   * Constructor
   *
   * @param enabled
   *            enabled labeler
   * @param minZoom
   *            minimum zoom
   * @param maxZoom
   *            maximum zoom
   * @param color
   *            label color
   * @param textSize
   *            label text size
   * @param buffer
   *            grid edge buffer (greater than or equal to 0.0 and less than
   *            0.5)
   */
  constructor(
    enabled: boolean,
    minZoom: number,
    maxZoom: number | undefined,
    color: Color | undefined,
    textSize: number,
    buffer: number,
  ) {
    this.enabled = enabled;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
    this.color = color;
    this.textSize = textSize;
    this.buffer = buffer;
  }

  /**
   * Is the grid enabled
   *
   * @return enabled flag
   */
  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Set the enabled flag
   *
   * @param enabled
   *            enabled flag
   */
  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  /**
   * Get the minimum zoom level
   *
   * @return minimum zoom level
   */
  public getMinZoom(): number {
    return this.minZoom;
  }

  /**
   * Set the minimum zoom level
   *
   * @param minZoom
   *            minimum zoom level
   */
  public setMinZoom(minZoom: number): void {
    this.minZoom = minZoom;
  }

  /**
   * Get the maximum zoom level
   *
   * @return maximum zoom level
   */
  public getMaxZoom(): number | undefined {
    return this.maxZoom;
  }

  /**
   * Has a maximum zoom level
   *
   * @return true if has a maximum, false if unbounded
   */
  public hasMaxZoom(): boolean {
    return this.maxZoom != null;
  }

  /**
   * Set the maximum zoom level
   *
   * @param maxZoom
   *            maximum zoom level
   */
  public setMaxZoom(maxZoom?: number): void {
    this.maxZoom = maxZoom;
  }

  /**
   * Is the zoom level within the grid zoom range
   *
   * @param zoom
   *            zoom level
   * @return true if within range
   */
  public isWithin(zoom: number): boolean {
    return zoom >= this.minZoom && (this.maxZoom === undefined || zoom <= this.maxZoom);
  }

  /**
   * Get the label color
   *
   * @return label color
   */
  public getColor(): Color | undefined {
    return this.color;
  }

  /**
   * Set the label color
   *
   * @param color
   *            label color
   */
  public setColor(color?: Color): void {
    this.color = color;
  }

  /**
   * Get the label text size
   *
   * @return label text size
   */
  public getTextSize(): number {
    return this.textSize;
  }

  /**
   * Set the label text size
   *
   * @param textSize
   *            label text size
   */
  public setTextSize(textSize: number): void {
    this.textSize = textSize;
  }

  /**
   * Get the grid edge buffer
   *
   * @return buffer (greater than or equal to 0.0 and less than 0.5)
   */
  public getBuffer(): number {
    return this.buffer;
  }

  /**
   * Set the grid edge buffer
   *
   * @param buffer
   *            buffer (greater than or equal to 0.0 and less than 0.5)
   */
  public setBuffer(buffer: number): void {
    if (buffer < 0.0 || buffer >= 0.5) {
      throw new Error('Grid edge buffer must be >= 0 and < 0.5. buffer: ' + buffer);
    }
    this.buffer = buffer;
  }
}
