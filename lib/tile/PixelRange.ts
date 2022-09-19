import { Pixel } from "./Pixel";

/**
 * Pixel Range
 * 
 * @author osbornb
 */
export class PixelRange {

    /**
     * Top left pixel
     */
    private topLeft: Pixel;

    /**
     * Bottom right pixel
     */
    private bottomRight: Pixel;

    /**
     * Constructor
     * 
     * @param topLeft
     *            top left pixel
     * @param bottomRight
     *            bottom right pixel
     */
    public constructor(topLeft: Pixel, bottomRight: Pixel) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    /**
     * Get the top left pixel
     * 
     * @return top left pixel
     */
    public getTopLeft(): Pixel {
        return this.topLeft;
    }

    /**
     * Set the top left pixel
     * 
     * @param topLeft
     *            top left pixel
     */
    public setTopLeft(topLeft: Pixel): void {
        this.topLeft = topLeft;
    }

    /**
     * Get the bottom right pixel
     * 
     * @return bottom right pixel
     */
    public getBottomRight(): Pixel {
        return this.bottomRight;
    }

    /**
     * Set the bottom right pixel
     * 
     * @param bottomRight
     *            bottom right pixel
     */
    public setBottomRight(bottomRight: Pixel): void {
        this.bottomRight = bottomRight;
    }

    /**
     * Get the minimum x pixel
     * 
     * @return minimum x pixel
     */
    public getMinX(): number {
        return this.topLeft.getX();
    }

    /**
     * Get the minimum y pixel
     * 
     * @return minimum y pixel
     */
    public getMinY(): number {
        return this.topLeft.getY();
    }

    /**
     * Get the maximum x pixel
     * 
     * @return maximum x pixel
     */
    public getMaxX(): number {
        return this.bottomRight.getX();
    }

    /**
     * Get the maximum y pixel
     * 
     * @return maximum y pixel
     */
    public getMaxY(): number {
        return this.bottomRight.getY();
    }

    /**
     * Get the left pixel
     * 
     * @return left pixel
     */
    public getLeft(): number {
        return this.getMinX();
    }

    /**
     * Get the top pixel
     * 
     * @return top pixel
     */
    public getTop(): number {
        return this.getMinY();
    }

    /**
     * Get the right pixel
     * 
     * @return right pixel
     */
    public getRight(): number {
        return this.getMaxX();
    }

    /**
     * Get the bottom pixel
     * 
     * @return bottom pixel
     */
    public getBottom(): number {
        return this.getMaxY();
    }

    /**
     * Get the pixel width
     * 
     * @return pixel width
     */
    public getWidth(): number {
        return this.getMaxX() - this.getMinX();
    }

    /**
     * Get the pixel height
     * 
     * @return pixel height
     */
    public getHeight(): number {
        return this.getMaxY() - this.getMinY();
    }

}
