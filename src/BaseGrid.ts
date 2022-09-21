import { Color } from '@ngageoint/color-js/dist/Color';
import { GridStyle } from './GridStyle';
import { Labeler } from './Labeler';

/**
 * Base Grid
 * 
 * @author osbornb
 */
export class BaseGrid {

	/**
	 * Enabled grid
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
	 * Minimum zoom level override for drawing grid lines
	 */
	private linesMinZoom?: number = undefined;

	/**
	 * Maximum zoom level override for drawing grid lines
	 */
	private linesMaxZoom?: number = undefined;

	/**
	 * Grid line style
	 */
	private style: GridStyle = new GridStyle(undefined, 0);

	/**
	 * Grid labeler
	 */
	private labeler?: Labeler = undefined;

	/**
	 * Constructor
	 */
	constructor() {

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
	public setEnabled(enabled: boolean): void {
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
		return this.maxZoom != undefined;
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
		return zoom >= this.minZoom && (this.maxZoom == undefined || zoom <= this.maxZoom);
	}

	/**
	 * Get the minimum zoom level for drawing grid lines
	 * 
	 * @return minimum zoom level
	 */
	public getLinesMinZoom(): number {
		return this.linesMinZoom != undefined ? this.linesMinZoom : this.getMinZoom();
	}

	/**
	 * Has a minimum zoom level override for drawing grid lines
	 * 
	 * @return true if has a minimum, false if not overridden
	 */
	public hasLinesMinZoom(): boolean {
		return this.linesMinZoom != null;
	}

	/**
	 * Set the minimum level override for drawing grid lines
	 * 
	 * @param linesMinZoom
	 *            minimum zoom level or undefined to remove
	 */
	public setLinesMinZoom(linesMinZoom?: number): void {
		this.linesMinZoom = linesMinZoom;
	}

	/**
	 * Get the maximum zoom level for drawing grid lines
	 * 
	 * @return maximum zoom level
	 */
	public getLinesMaxZoom(): number | undefined {
		return this.linesMaxZoom != undefined ? this.linesMaxZoom : this.getMaxZoom();
	}

	/**
	 * Has a maximum zoom level override for drawing grid lines
	 * 
	 * @return true if has a maximum, false if not overridden
	 */
	public hasLinesMaxZoom(): boolean {
		return this.linesMaxZoom != undefined;
	}

	/**
	 * Set the maximum level override for drawing grid lines
	 * 
	 * @param linesMaxZoom
	 *            maximum zoom level or undefined to remove
	 */
	public setLinesMaxZoom(linesMaxZoom?: number): void {
		this.linesMaxZoom = linesMaxZoom;
	}

	/**
	 * Is the zoom level within the grid lines zoom range
	 * 
	 * @param zoom
	 *            zoom level
	 * @return true if within range
	 */
	public isLinesWithin(zoom: number): boolean {
		return (this.linesMinZoom == null || zoom >= this.linesMinZoom)
			&& (this.linesMaxZoom == null || zoom <= this.linesMaxZoom);
	}

	/**
	 * Get the grid line style
	 * 
	 * @return grid line style
	 */
	public getStyle(): GridStyle | undefined {
		return this.style;
	}

	/**
	 * Set the grid line style
	 * 
	 * @param style
	 *            grid line style
	 */
	public setStyle(style?: GridStyle): void {
		this.style = style != undefined ? style : new GridStyle(undefined, 0);
	}

	/**
	 * Get the grid line color
	 * 
	 * @return grid line color
	 */
	public getColor(): Color | undefined {
		let color: Color | undefined = undefined;
		if (this.getStyle()) {
			color = this.getStyle()!.getColor();
		}
		return color
	}

	/**
	 * Set the grid line color
	 * 
	 * @param color
	 *            grid line color
	 */
	public setColor(color?: Color): void {
		if (this.getStyle()) {
			this.getStyle()!.setColor(color);
		}
	}

	/**
	 * Get the grid line width
	 * 
	 * @return grid line width
	 */
	public getWidth(): number {
		let number = 0;
		if (this.getStyle()) {
			number = this.getStyle()!.getWidth();
		}
		return number;
	}

	/**
	 * Set the grid line width
	 * 
	 * @param width
	 *            grid line width
	 */
	public setWidth(width: number): void {
		if (this.getStyle()) {
			this.getStyle()!.setWidth(width);
		}
	}

	/**
	 * Get the grid labeler
	 * 
	 * @return grid labeler
	 */
	public getLabeler(): Labeler | undefined {
		return this.labeler;
	}

	/**
	 * Has a grid labeler
	 * 
	 * @return true if has a grid labeler
	 */
	public hasLabeler(): boolean {
		return this.labeler != undefined;
	}

	/**
	 * Set the grid labeler
	 * 
	 * @param labeler
	 *            grid labeler
	 */
	public setLabeler(labeler: Labeler): void {
		this.labeler = labeler;
	}

	/**
	 * Is labeler zoom level within the grid zoom range
	 * 
	 * @param zoom
	 *            zoom level
	 * @return true if within range
	 */
	public isLabelerWithin(zoom: number): boolean {
		return this.hasLabeler() && this.labeler!.isEnabled() && this.labeler!.isWithin(zoom);
	}

	/**
	 * Get the label grid edge buffer
	 * 
	 * @return label buffer (greater than or equal to 0.0 and less than 0.5)
	 */
	public getLabelBuffer(): number {
		return this.hasLabeler() ? this.labeler!.getBuffer() : 0.0;
	}

}
