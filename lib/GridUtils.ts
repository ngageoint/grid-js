import { GeometryConstants, GeometryUtils, Point as MilPoint } from '@ngageoint/simple-features-js';
import { Bounds } from './features/Bounds';
import { Line } from './features/Line';
import { Point } from './features/Point';
import { Unit } from './features/Unit';
import { GridConstants } from './GridConstants';
import { Pixel } from './tile/Pixel';

/**
 * Grid utilities
 */
export class GridUtils {
  /**
   * Get the pixel where the point fits into the bounds
   *
   * @param width
   *            width
   * @param height
   *            height
   * @param bounds
   *            bounds
   * @param point
   *            point
   * @return pixel
   */
  public static getPixel(width: number, height: number, bounds: Bounds, point: Point): Pixel {
    point = point.toMeters();
    bounds = bounds.toMeters();

    const x = this.getXPixel(width, bounds, point.getLongitude());
    const y = this.getYPixel(height, bounds, point.getLatitude());
    return new Pixel(x, y);
  }

  /**
   * Get the X pixel for where the longitude in meters fits into the bounds
   *
   * @param width
   *            width
   * @param bounds
   *            bounds
   * @param longitude
   *            longitude in meters
   * @return x pixel
   */
  public static getXPixel(width: number, bounds: Bounds, longitude: number): number {
    bounds = bounds.toMeters();

    const boxWidth = bounds.getMaxLongitude() - bounds.getMinLongitude();
    const offset = longitude - bounds.getMinLongitude();
    const percentage = offset / boxWidth;
    const pixel = percentage * width;

    return pixel;
  }

  /**
   * Get the Y pixel for where the latitude in meters fits into the bounds
   *
   * @param height
   *            height
   * @param bounds
   *            bounds
   * @param latitude
   *            latitude
   * @return y pixel
   */
  public static getYPixel(height: number, bounds: Bounds, latitude: number): number {
    bounds = bounds.toMeters();

    const boxHeight = bounds.getMaxLatitude() - bounds.getMinLatitude();
    const offset = bounds.getMaxLatitude() - latitude;
    const percentage = offset / boxHeight;
    const pixel = percentage * height;

    return pixel;
  }

  /**
   * Get the tile bounds from the XYZ tile coordinates and zoom level
   *
   * @param x
   *            x coordinate
   * @param y
   *            y coordinate
   * @param zoom
   *            zoom level
   * @return bounds
   */
  public static getBounds(x: number, y: number, zoom: number): Bounds {
    const tilesPerSide = this.tilesPerSide(zoom);
    const tileSize = this.tileSize(tilesPerSide);

    const minLon = -1 * GeometryConstants.WEB_MERCATOR_HALF_WORLD_WIDTH + x * tileSize;
    const minLat = GeometryConstants.WEB_MERCATOR_HALF_WORLD_WIDTH - (y + 1) * tileSize;
    const maxLon = -1 * GeometryConstants.WEB_MERCATOR_HALF_WORLD_WIDTH + (x + 1) * tileSize;
    const maxLat = GeometryConstants.WEB_MERCATOR_HALF_WORLD_WIDTH - y * tileSize;

    return Bounds.meters(minLon, minLat, maxLon, maxLat);
  }

  /**
   * Get the tiles per side, width and height, at the zoom level
   *
   * @param zoom
   *            zoom level
   * @return tiles per side
   */
  public static tilesPerSide(zoom: number): number {
    return Math.pow(2, zoom);
  }

  /**
   * Get the tile size in meters
   *
   * @param tilesPerSide
   *            tiles per side
   * @return tile size
   */
  public static tileSize(tilesPerSide: number): number {
    return (2 * GeometryConstants.WEB_MERCATOR_HALF_WORLD_WIDTH) / tilesPerSide;
  }

  /**
   * Get the zoom level of the bounds using the shortest bounds side length
   *
   * @param bounds
   *            bounds
   * @return zoom level
   */
  public static getZoomLevel(bounds: Bounds): number {
    bounds = bounds.toMeters();
    const tileSize = Math.min(bounds.getWidth(), bounds.getHeight());
    const tilesPerSide = (2 * GeometryConstants.WEB_MERCATOR_HALF_WORLD_WIDTH) / tileSize;
    return Math.log(tilesPerSide) / Math.log(2);
  }

  /**
   * Convert a coordinate from a unit to another unit
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
  public static toUnit(fromUnit: Unit, longitude: number, latitude: number, toUnit: Unit): Point {
    let point = null;
    if (fromUnit === toUnit) {
      point = Point.point(longitude, latitude, toUnit);
    } else {
      point = this.toUnitOpposite(longitude, latitude, toUnit);
    }
    return point;
  }

  /**
   * Convert a coordinate to the unit, assumes the coordinate is in the
   * opposite unit
   *
   * @param longitude
   *            longitude
   * @param latitude
   *            latitude
   * @param unit
   *            desired unit
   * @return point in unit
   */
  public static toUnitOpposite(longitude: number, latitude: number, unit: Unit): Point {
    let point: MilPoint;
    switch (unit) {
      case Unit.DEGREE:
        point = GeometryUtils.metersToDegreesCoord(longitude, latitude);
        break;
      case Unit.METER:
        point = GeometryUtils.degreesToMetersCoord(longitude, latitude);
        break;
      default:
        throw new Error('Unsupported unit: ' + unit);
    }
    return Point.pointFromPoint(point, unit);
  }

  /**
   * Is the band letter an omitted letter
   * {@link GridConstants#BAND_LETTER_OMIT_I} or
   * {@link GridConstants#BAND_LETTER_OMIT_O}
   *
   * @param letter
   *            band letter
   * @return true if omitted
   */
  public static isOmittedBandLetter(letter: string): boolean {
    return letter === GridConstants.BAND_LETTER_OMIT_I || letter === GridConstants.BAND_LETTER_OMIT_O;
  }

  /**
   * Get the precision value before the value
   *
   * @param value
   *            value
   * @param precision
   *            precision
   * @return precision value
   */
  public static precisionBefore(value: number, precision: number): number {
    let before = 0.0;
    if (Math.abs(value) >= precision) {
      before = value - (((value % precision) + precision) % precision);
    } else if (value < 0.0) {
      before = -precision;
    }
    return before;
  }

  /**
   * Get the precision value after the value
   *
   * @param value
   *            value
   * @param precision
   *            precision
   * @return precision value
   */
  public static precisionAfter(value: number, precision: number): number {
    return this.precisionBefore(value + precision, precision);
  }

  /**
   * Get the point intersection between two lines
   *
   * @param line1
   *            first line
   * @param line2
   *            second line
   * @return intersection point or null if no intersection
   */
  public static lineIntersection(line1: Line, line2: Line): Point | undefined {
    return this.intersection(line1.getPoint1(), line1.getPoint2(), line2.getPoint1(), line2.getPoint2());
  }

  /**
   * Get the point intersection between end points of two lines
   *
   * @param line1Point1
   *            first point of the first line
   * @param line1Point2
   *            second point of the first line
   * @param line2Point1
   *            first point of the second line
   * @param line2Point2
   *            second point of the second line
   * @return intersection point or null if no intersection
   */
  public static intersection(
    line1Point1: Point,
    line1Point2: Point,
    line2Point1: Point,
    line2Point2: Point,
  ): Point | undefined {
    let intersection: Point | undefined;

    const point: MilPoint = GeometryUtils.intersection(
      line1Point1.toMeters(),
      line1Point2.toMeters(),
      line2Point1.toMeters(),
      line2Point2.toMeters(),
    );

    if (point !== null && point !== undefined) {
      intersection = Point.pointFromPoint(point, Unit.METER).toUnit(line1Point1.getUnit()!);
    }

    return intersection;
  }
}
