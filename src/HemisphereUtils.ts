import { Point } from './features/Point';
import { Hemisphere } from './Hemisphere';

export class HemisphereUtils {
  /**
   * Get the hemisphere for the latitude
   *
   * @param latitude
   *            latitude
   * @return hemisphere
   */
  public static fromLatitude(latitude: number): Hemisphere {
    return latitude >= 0 ? Hemisphere.NORTH : Hemisphere.SOUTH;
  }

  /**
   * Get the hemisphere for the point
   *
   * @param point
   *            point
   * @return hemisphere
   */
  public static from(point: Point): Hemisphere {
    return HemisphereUtils.fromLatitude(point.getLatitude());
  }
}
