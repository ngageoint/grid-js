/**
 * Tile Pixel
 * 
 * @author osbornb
 */
export class Pixel {

    /**
     * X pixel
     */
    private x: number;

    /**
     * Y pixel
     */
    private y: number;

    /**
     * Constructor
     * 
     * @param x
     *            x pixel
     * @param y
     *            y pixel
     */
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Get the x pixel
     * 
     * @return x pixel
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Set the x pixel
     * 
     * @param x
     *            x pixel
     */
    public setX(x: number): void {
        this.x = x;
    }

    /**
     * Get the y pixel
     * 
     * @return y pixel
     */
    public getY(): number {
        return this.y;
    }

    /**
     * Set the y pixel
     * 
     * @param y
     *            y pixel
     */
    public setY(y: number): void {
        this.y = y;
    }

}
