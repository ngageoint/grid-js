import { expect } from 'chai';
import { Hemisphere } from '../lib/Hemisphere';
import { HemisphereUtils } from '../lib/HemisphereUtils';
import { Point } from '../lib/features/Point';

describe('HemisphereUtils Tests', function () {
  it('test fromLatitude', function () {
    let hemisphere = HemisphereUtils.fromLatitude(80);
    expect(hemisphere).to.equal(Hemisphere.NORTH);

    hemisphere = HemisphereUtils.fromLatitude(-80);
    expect(hemisphere).to.equal(Hemisphere.SOUTH);
  });

  it('test from', function () {
    let point = Point.degrees(0, 80);
    let hemisphere = HemisphereUtils.from(point);
    expect(hemisphere).to.equal(Hemisphere.NORTH);

    point = Point.degrees(0, -80);
    hemisphere = HemisphereUtils.from(point);
    expect(hemisphere).to.equal(Hemisphere.SOUTH);
  });
});
