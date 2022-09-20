
import { Line as MilLine, Point as MilPoint } from '@ngageoint/simple-features-js';
import { List } from 'tstl';
import { GridUtils } from '../GridUtils';
import { Point } from './Point';
import { Unit } from './Unit';

/**
 * Line between two points
 * 
 * @author osbornb
 */
export class Line extends MilLine {

    /**
     * Serial Version UID
     */
    private static readonly serialVersionUID = 1;

    /**
     * Create a line
     * 
     * @param point1
     *            first point
     * @param point2
     *            second point
     * @return line
     */
    public static line(point1: Point, point2: Point): Line {
        let line = new Line();
        line.setPoints(point1, point2);
        return line;
    }

    /**
     * Get the first point
     * 
     * @return first point
     */
    public getPoint1(): Point {
        return this.startPoint() as Point;
    }

    /**
     * Set the first point
     * 
     * @param point1
     *            first point
     */
    public setPoint1(point1: Point): void {
        this.setPoints(point1, this.getPoint2());
    }

    /**
     * Get the second point
     * 
     * @return second point
     */
    public getPoint2(): Point {
        return this.endPoint() as Point;
    }

    /**
     * Set the second point
     * 
     * @param point2
     *            second point
     */
    public setPoint2(point2: Point): void {
        this.setPoints(this.getPoint1(), point2);
    }

    /**
     * Set the points
     * 
     * @param point1
     *            first point
     * @param point2
     *            second point
     */
    public setPoints(point1: Point, point2: Point): void {
        const points = new List<MilPoint>();
        points.push(point1);
        points.push(point2);
        super.points = points;
        this.validateUnits();
    }

    /**
     * Get the unit
     * 
     * @return unit
     */
    public getUnit(): Unit | undefined {
        return this.getPoint1().getUnit();
    }

    /**
     * Is in the provided unit type
     * 
     * @param unit
     *            unit
     * @return true if in the unit
     */
    public isUnit(unit: Unit): boolean {
        return this.getPoint1().isUnit(unit);
    }

    /**
     * Is this line in degrees
     * 
     * @return true if degrees
     */
    public isDegrees(): boolean {
        return this.getPoint1().isDegrees();
    }

    /**
     * Is this line in meters
     * 
     * @return true if meters
     */
    public isMeters(): boolean {
        return this.getPoint1().isMeters();
    }

    /**
     * Convert to the unit
     * 
     * @param unit
     *            unit
     * @return point in units, same point if equal units
     */
    public toUnit(unit: Unit): Line {
        let line: Line | undefined = undefined;
        if (this.isUnit(unit)) {
            line = this;
        } else {
            line = this.copy();
            line.setPoints(this.getPoint1().toUnit(unit), this.getPoint2().toUnit(unit));
        }
        return line;
    }

    /**
     * Convert to degrees
     * 
     * @return line in degrees, same line if already in degrees
     */
    public toDegrees(): Line {
        return this.toUnit(Unit.DEGREE);
    }

    /**
     * Convert to meters
     * 
     * @return line in meters, same line if already in meters
     */
    public toMeters(): Line {
        return this.toUnit(Unit.METER);
    }

    /**
     * Get the intersection between this line and the provided line
     * 
     * @param line
     *            line
     * @return intersection
     */
    public intersection(line: Line): Point | undefined {
        return GridUtils.lineIntersection(this, line);
    }

    /**
     * Copy the line
     * 
     * @return line copy
     */
    public copy(): Line {
        return new Line(this);
    }

    /**
     * Validate units are the same
     */
    private validateUnits(): void {
        if (!this.getPoint1().isUnit(this.getPoint2().getUnit())) {
            throw new Error(
                "Points are in different units. point1: "
                + this.getPoint1().getUnit() + ", point2: "
                + this.getPoint2().getUnit());
        }
    }

}
