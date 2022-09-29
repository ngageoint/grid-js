import { GeometryEnvelope } from '@ngageoint/simple-features-js';
import { Unit } from './Unit';
import { Point } from './Point';
import { Line } from './Line';
import { GridUtils } from '../GridUtils';
import { GridTile } from '../tile/GridTile';
import { PixelRange } from '../tile/PixelRange';

/**
 * Grid Bounds
 *
 * @author osbornb
 */
export class Bounds extends GeometryEnvelope {

  /**
   * Unit
   */
  private unit?: Unit = Unit.DEGREE;

  /**
   * Create bounds
   *
   * @param minLongitude
   *            min longitude
   * @param minLatitude
   *            min latitude
   * @param maxLongitude
   *            max longitude
   * @param maxLatitude
   *            max latitude
   * @param unit
   *            unit
   * @return bounds
   */
  public static bounds(
    minLongitude: number,
    minLatitude: number,
    maxLongitude: number,
    maxLatitude: number,
    unit: Unit,
  ): Bounds {
    const bounds = new Bounds(minLongitude, minLatitude, maxLongitude, maxLatitude);
    bounds.unit = unit;
    return bounds;
  }

  /**
   * Create bounds in degrees
   *
   * @param minLongitude
   *            min longitude
   * @param minLatitude
   *            min latitude
   * @param maxLongitude
   *            max longitude
   * @param maxLatitude
   *            max latitude
   * @return bounds
   */
  public static degrees(minLongitude: number, minLatitude: number, maxLongitude: number, maxLatitude: number): Bounds {
    return this.bounds(minLongitude, minLatitude, maxLongitude, maxLatitude, Unit.DEGREE);
  }

  /**
   * Create bounds in meters
   *
   * @param minLongitude
   *            min longitude
   * @param minLatitude
   *            min latitude
   * @param maxLongitude
   *            max longitude
   * @param maxLatitude
   *            max latitude
   * @return bounds
   */
  public static meters(minLongitude: number, minLatitude: number, maxLongitude: number, maxLatitude: number): Bounds {
    return this.bounds(minLongitude, minLatitude, maxLongitude, maxLatitude, Unit.METER);
  }

  /**
   * Create bounds
   *
   * @param southwest
   *            southwest corner
   * @param northeast
   *            northeast corner
   * @return bounds
   */
  public static boundsFromCorners(southwest: Point, northeast: Point): Bounds {
    const bounds = new Bounds(
      southwest.getLongitude(),
      southwest.getLatitude(),
      northeast.getLongitude(),
      northeast.getLatitude(),
    );

    bounds.unit = southwest.getUnit();

    if (!bounds.isUnit(northeast.getUnit()!)) {
      throw new Error(
        'Points are in different units. southwest: ' + bounds.unit + ', northeast: ' + northeast.getUnit(),
      );
    }

    return bounds;
  }

  /**
   * Copy bounds
   *
   * @param bounds
   *            bounds to copy
   * @return bounds
   */
  public static boundsFromBounds(bounds: Bounds): Bounds {
    return Bounds.boundsFromEnvelope(bounds as GeometryEnvelope, bounds.unit);
  }

  /**
   * Create bounds
   *
   * @param envelope
   *            geometry envelope
   * @param unit
   *            unit
   * @return bounds
   */
  public static boundsFromEnvelope(envelope: GeometryEnvelope, unit?: Unit): Bounds {
    const bounds = new Bounds(envelope);
    bounds.unit = unit;
    return bounds;
  }

  /**
   * Get the min longitude
   *
   * @return min longitude
   */
  public getMinLongitude(): number {
    return this.minX;
  }

  /**
   * Set the min longitude
   *
   * @param minLongitude
   *            min longitude
   */
  public setMinLongitude(minLongitude: number): void {
    this.minX = minLongitude;
  }

  /**
   * Get the min latitude
   *
   * @return min latitude
   */
  public getMinLatitude(): number {
    return this.minY;
  }

  /**
   * Set the min latitude
   *
   * @param minLatitude
   *            min latitude
   */
  public setMinLatitude(minLatitude: number): void {
    this.minY = minLatitude;
  }

  /**
   * Get the max longitude
   *
   * @return max longitude
   */
  public getMaxLongitude(): number {
    return this.maxX;
  }

  /**
   * Set the max longitude
   *
   * @param maxLongitude
   *            max longitude
   */
  public setMaxLongitude(maxLongitude: number): void {
    this.maxX = maxLongitude;
  }

  /**
   * Get the max latitude
   *
   * @return max latitude
   */
  public getMaxLatitude(): number {
    return this.maxY;
  }

  /**
   * Set the max latitude
   *
   * @param maxLatitude
   *            max latitude
   */
  public setMaxLatitude(maxLatitude: number): void {
    this.maxY = maxLatitude;
  }

  /**
   * Get the western longitude
   *
   * @return western longitude
   */
  public getWest(): number {
    return this.getMinLongitude();
  }

  /**
   * Set the western longitude
   *
   * @param west
   *            western longitude
   */
  public setWest(west: number): void {
    this.setMinLongitude(west);
  }

  /**
   * Get the southern latitude
   *
   * @return southern latitude
   */
  public getSouth(): number {
    return this.getMinLatitude();
  }

  /**
   * Set the southern latitude
   *
   * @param south
   *            southern latitude
   */
  public setSouth(south: number): void {
    this.setMinLatitude(south);
  }

  /**
   * Get the eastern longitude
   *
   * @return eastern longitude
   */
  public getEast(): number {
    return this.getMaxLongitude();
  }

  /**
   * Set the eastern longitude
   *
   * @param east
   *            eastern longitude
   */
  public setEast(east: number): void {
    this.setMaxLongitude(east);
  }

  /**
   * Get the northern latitude
   *
   * @return northern latitude
   */
  public getNorth(): number {
    return this.getMaxLatitude();
  }

  /**
   * Set the northern latitude
   *
   * @param north
   *            northern latitude
   */
  public setNorth(north: number): void {
    this.setMaxLatitude(north);
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
  public setUnit(unit: Unit): void {
    this.unit = unit;
  }

  /**
   * Is in the provided unit type
   *
   * @param unit
   *            unit
   * @return true if in the unit
   */
  public isUnit(unit: Unit): boolean {
    return this.unit === unit;
  }

  /**
   * Are bounds in degrees
   *
   * @return true if degrees
   */
  public isDegrees(): boolean {
    return this.isUnit(Unit.DEGREE);
  }

  /**
   * Are bounds in meters
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
   * @return bounds in units, same bounds if equal units
   */
  public toUnit(unit: Unit): Bounds {
    let bounds: Bounds | undefined;
    if (this.isUnit(unit)) {
      bounds = this;
    } else {
      const southwest = this.getSouthwest().toUnit(unit);
      const northeast = this.getNortheast().toUnit(unit);
      bounds = Bounds.boundsFromCorners(southwest, northeast);
    }
    return bounds;
  }

  /**
   * Convert to degrees
   *
   * @return bounds in degrees, same bounds if already in degrees
   */
  public toDegrees(): Bounds {
    return this.toUnit(Unit.DEGREE);
  }

  /**
   * Convert to meters
   *
   * @return bounds in meters, same bounds if already in meters
   */
  public toMeters(): Bounds {
    return this.toUnit(Unit.METER);
  }

  /**
   * Get the centroid longitude
   *
   * @return centroid longitude
   */
  public getCentroidLongitude(): number {
    return super.getMidX();
  }

  /**
   * Get the centroid latitude
   *
   * @return centroid latitude
   */
  public getCentroidLatitude(): number {
    let centerLatitude: number;
    if (this.unit === Unit.DEGREE) {
      centerLatitude = this.getCentroid().getLatitude();
    } else {
      centerLatitude = super.getMidY();
    }
    return centerLatitude;
  }

  /**
   * {@inheritDoc}
   */
  public getCentroid(): Point {
    let point: Point | undefined;
    if (this.unit === Unit.DEGREE) {
      point = this.toMeters().getCentroid().toDegrees();
    } else {
      point = Point.pointFromPoint(this.centroid, this.unit);
    }
    return point;
  }

  /**
   * Get the width
   *
   * @return width
   */
  public getWidth(): number {
    return this.xRange;
  }

  /**
   * Get the height
   *
   * @return height
   */
  public getHeight(): number {
    return this.yRange;
  }

  /**
   * Get the southwest coordinate
   *
   * @return southwest coordinate
   */
  public getSouthwest(): Point {
    return Point.point(this.getMinLongitude(), this.getMinLatitude(), this.unit);
  }

  /**
   * Get the northwest coordinate
   *
   * @return northwest coordinate
   */
  public getNorthwest(): Point {
    return Point.point(this.getMinLongitude(), this.getMaxLatitude(), this.unit);
  }

  /**
   * Get the southeast coordinate
   *
   * @return southeast coordinate
   */
  public getSoutheast(): Point {
    return Point.point(this.getMaxLongitude(), this.getMinLatitude(), this.unit);
  }

  /**
   * Get the northeast coordinate
   *
   * @return northeast coordinate
   */
  public getNortheast(): Point {
    return Point.point(this.getMaxLongitude(), this.getMaxLatitude(), this.unit);
  }

  /**
   * Create a new bounds as the overlapping between this bounds and the
   * provided
   *
   * @param bounds
   *            bounds
   * @return overlap bounds
   */
  public overlap(bounds: GeometryEnvelope): GeometryEnvelope {
    let unionOverlap: GeometryEnvelope | undefined;

    if (bounds instanceof Bounds) {
      const overlapEnvelope = super.overlap(bounds.toUnit(this.unit!) as GeometryEnvelope, true);
      if (overlapEnvelope !== null) {
        unionOverlap = Bounds.boundsFromEnvelope(overlapEnvelope, this.unit);
      }
    } else {
      unionOverlap = super.overlap(bounds);
    }

    return unionOverlap!;
  }

  /**
   * Create a new bounds as the union between this bounds and the provided
   *
   * @param bounds
   *            bounds
   * @return union bounds
   */
  public union(bounds: GeometryEnvelope): GeometryEnvelope {
    let unionBounds: GeometryEnvelope | undefined;

    if (bounds instanceof Bounds) {
      const unionEnvelope = super.union(bounds.toUnit(this.unit!) as GeometryEnvelope);
      if (unionEnvelope !== null) {
        unionBounds = Bounds.boundsFromEnvelope(unionEnvelope, this.unit);
      }
    } else {
      unionBounds = super.union(bounds);
    }

    return unionBounds!;
  }

  /**
   * Get the western line
   *
   * @return west line
   */
  public getWestLine(): Line {
    return Line.line(this.getNorthwest(), this.getSouthwest());
  }

  /**
   * Get the southern line
   *
   * @return south line
   */
  public getSouthLine(): Line {
    return Line.line(this.getSouthwest(), this.getSoutheast());
  }

  /**
   * Get the eastern line
   *
   * @return east line
   */
  public getEastLine(): Line {
    return Line.line(this.getSoutheast(), this.getNortheast());
  }

  /**
   * Get the northern line
   *
   * @return north line
   */
  public getNorthLine(): Line {
    return Line.line(this.getNortheast(), this.getNorthwest());
  }

  /**
   * Convert the bounds to be precision accurate minimally containing the
   * bounds. Each bound is equal to or larger by the precision degree amount.
   *
   * @param precision
   *            precision in degrees
   * @return precision bounds
   */
  public toPrecision(precision: number): Bounds {
    const bounds = this.toDegrees();

    const minLon = GridUtils.precisionBefore(bounds.getMinLongitude(), precision);
    const minLat = GridUtils.precisionBefore(bounds.getMinLatitude(), precision);
    const maxLon = GridUtils.precisionAfter(bounds.getMaxLongitude(), precision);
    const maxLat = GridUtils.precisionAfter(bounds.getMaxLatitude(), precision);

    return Bounds.degrees(minLon, minLat, maxLon, maxLat);
  }

  /**
   * Get the pixel range where the bounds fit into the tile
   *
   * @param tile
   *            tile
   * @return pixel range
   */
  public getPixelRangeFromTile(tile: GridTile): PixelRange {
    return this.getPixelRange(tile.getWidth(), tile.getHeight(), tile.getBounds()!);
  }

  /**
   * Get the pixel range where the bounds fit into the provided bounds
   *
   * @param width
   *            width
   * @param height
   *            height
   * @param bounds
   *            bounds
   * @return pixel range
   */
  public getPixelRange(width: number, height: number, bounds: Bounds): PixelRange {
    bounds = bounds.toMeters();
    const topLeft = GridUtils.getPixel(width, height, bounds, this.getNorthwest());
    const bottomRight = GridUtils.getPixel(width, height, bounds, this.getSoutheast());
    return new PixelRange(topLeft, bottomRight);
  }

  /**
   * Get the four line bounds in meters
   *
   * @return lines
   */
  public getLines(): Line[] {
    const southwest = this.getSouthwest();
    const northwest = this.getNorthwest();
    const northeast = this.getNortheast();
    const southeast = this.getSoutheast();

    const lines: Line[] = [];
    lines.push(Line.line(southwest, northwest));
    lines.push(Line.line(northwest, northeast));
    lines.push(Line.line(northeast, southeast));
    lines.push(Line.line(southeast, southwest));

    return lines;
  }

  /**
   * Copy the bounds
   *
   * @return bounds copy
   */
  public copy(): Bounds {
    return Bounds.boundsFromBounds(this);
  }

  /**
   * {@inheritDoc}
   */
  public equals(other: GeometryEnvelope): boolean {
    if (this === other) return true;
    if (!super.equals(other as GeometryEnvelope)) return false;
    if (!(other instanceof Bounds)) return false;
    if (this.unit !== other.unit) return false;
    return true;
  }
}
