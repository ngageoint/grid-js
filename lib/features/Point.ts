import { Point as MilPoint } from "@ngageoint/simple-features-js"
import { GridUtils } from "../GridUtils";
import { GridTile } from "../tile/GridTile";
import { Pixel } from "../tile/Pixel";
import { Bounds } from "./Bounds";
import { Unit } from "./Unit";

/**
 * Point
 * 
 * @author osbornb
 */
export class Point extends MilPoint {

	/**
	 * Serial Version UID
	 */
	private static readonly serialVersionUID = 1;

	/**
	 * Unit
	 */
	private unit?: Unit = undefined;

	/**
	 * Create a point
	 * 
	 * @param longitude
	 *            longitude
	 * @param latitude
	 *            latitude
	 * @param unit
	 *            unit; if null, it will use the default degree unit
	 * @return point
	 */
	public static point(longitude: number, latitude: number, unit?: Unit): Point {
		let point: Point;
		if (unit) {
			point = new Point(longitude, latitude, unit);
		} else {
			point = this.degrees(longitude, latitude);
		}
		return point;
	}

	/**
	 * Create a point in degrees
	 * 
	 * @param longitude
	 *            longitude in degrees
	 * @param latitude
	 *            latitude in degrees
	 * @return point in degrees
	 */
	public static degrees(longitude: number, latitude: number): Point {
		return Point.point(longitude, latitude, Unit.DEGREE);
	}

	/**
	 * Create a point in meters
	 * 
	 * @param longitude
	 *            longitude in meters
	 * @param latitude
	 *            latitude in meters
	 * @return point in meters
	 */
	public static meters(longitude: number, latitude: number): Point {
		return Point.point(longitude, latitude, Unit.METER);
	}

	/**
	 * Create a point from a coordinate in a unit to another unit
	 * 
	 * @param fromUnit
	 *            unit of provided coordinate
	 * @param longitude
	 *            longitude
	 * @param latitude
	 *            latitude
	 * @param toUnit
	 *            desired unit
	 * @return point in unit
	 */
	public static toUnit(fromUnit: Unit, longitude: number, latitude: number,
		toUnit: Unit): Point {
		return GridUtils.toUnit(fromUnit, longitude, latitude, toUnit);
	}

	/**
	 * Create a point from a coordinate in an opposite unit to another unit
	 * 
	 * @param longitude
	 *            longitude
	 * @param latitude
	 *            latitude
	 * @param unit
	 *            desired unit
	 * @return point in unit
	 */
	public static toUnitInverse(longitude: number, latitude: number, unit: Unit): Point {
		return GridUtils.toUnitOpposite(longitude, latitude, unit);
	}

	/**
	 * Create a point converting the degrees coordinate to meters
	 * 
	 * @param longitude
	 *            longitude in degrees
	 * @param latitude
	 *            latitude in degrees
	 * @return point in meters
	 */
	public static degreesToMeters(longitude: number, latitude: number): Point {
		return Point.toUnit(Unit.DEGREE, longitude, latitude, Unit.METER);
	}

	/**
	 * Create a point converting the meters coordinate to degrees
	 * 
	 * @param longitude
	 *            longitude in meters
	 * @param latitude
	 *            latitude in meters
	 * @return point in degrees
	 */
	public static metersToDegrees(longitude: number, latitude: number): Point {
		return Point.toUnit(Unit.METER, longitude, latitude, Unit.DEGREE);
	}

	/**
	 * Create a point
	 * 
	 * @param point
	 *            point to copy
	 * @param unit
	 *            unit
	 * @return point
	 */
	public static pointFromPoint(point: MilPoint, unit?: Unit): Point {
		let newPoint = new Point(point);
		newPoint.unit = unit;
		return newPoint;
	}

	/**
	 * Get the longitude
	 * 
	 * @return longitude
	 */
	public getLongitude(): number {
		return super.x;
	}

	/**
	 * Set the longitude
	 * 
	 * @param longitude
	 *            longitude
	 */
	public setLongitude(longitude: number): void {
		super.x = longitude;
	}

	/**
	 * Get the latitude
	 * 
	 * @return latitude
	 */
	public getLatitude(): number {
		return super.y;
	}

	/**
	 * Set the latitude
	 * 
	 * @param latitude
	 *            latitude
	 */
	public setLatitude(latitude: number): void {
		super.y = latitude;
	}

	/**
	 * Get the unit
	 * 
	 * @return unit
	 */
	public getUnit(): Unit | undefined {
		return this.unit;
	}

	/**
	 * Set the unit
	 * 
	 * @param unit
	 *            unit
	 */
	public setUnit(unit?: Unit): void {
		this.unit = unit;
	}

	/**
	 * Is in the provided unit type
	 * 
	 * @param unit
	 *            unit
	 * @return true if in the unit
	 */
	public isUnit(unit?: Unit): boolean {
		return this.unit == unit;
	}

	/**
	 * Is this point in degrees
	 * 
	 * @return true if degrees
	 */
	public isDegrees(): boolean {
		return this.isUnit(Unit.DEGREE);
	}

	/**
	 * Is this point in meters
	 * 
	 * @return true if meters
	 */
	public isMeters(): boolean {
		return this.isUnit(Unit.METER);
	}

	/**
	 * Convert to the unit
	 * 
	 * @param unit
	 *            unit
	 * @return point in units, same point if equal units
	 */
	public toUnit(unit: Unit): Point {
		let newPoint: Point;
		if (this.isUnit(unit)) {
			newPoint = this;
		} else {
			newPoint = GridUtils.toUnit(this.unit!, this.getLongitude(), this.getLatitude(),
				unit);
		}
		return newPoint;
	}

	/**
	 * Convert to degrees
	 * 
	 * @return point in degrees, same point if already in degrees
	 */
	public toDegrees(): Point {
		return this.toUnit(Unit.DEGREE);
	}

	/**
	 * Convert to meters
	 * 
	 * @return point in meters, same point if already in meters
	 */
	public toMeters(): Point {
		return this.toUnit(Unit.METER);
	}

	/**
	 * Get the pixel where the point fits into tile
	 * 
	 * @param tile
	 *            tile
	 * @return pixel
	 */
	public getPixelFromTile(tile: GridTile): Pixel {
		return this.getPixel(tile.getWidth(), tile.getHeight(), tile.getBounds()!);
	}

	/**
	 * Get the pixel where the point fits into the bounds
	 * 
	 * @param width
	 *            width
	 * @param height
	 *            height
	 * @param bounds
	 *            bounds
	 * @return pixel
	 */
	public getPixel(width: number, height: number, bounds: Bounds): Pixel {
		return GridUtils.getPixel(width, height, bounds, this);
	}

	/**
	 * Copy the point
	 * 
	 * @return point copy
	 */
	public copy(): Point {
		return new Point(this);
	}

	/**
	 * {@inheritDoc}
	 */
	public equals(other: Point): boolean {
		if (this == other)
			return true;
		if (!super.equals(other))
			return false;
		if (!(other instanceof Point))
			return false;
		
		if (this.unit != other.getUnit())
			return false;
		return true;
	}

}
