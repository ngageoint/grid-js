import { Point } from '../../lib/features/Point';
import { Unit } from '../../lib/features/Unit';
import { expect } from 'chai';

describe('Point Tests', function () {
  it('test unit', function () {
    const point = Point.degrees(-112.500003, 21.943049);
    expect(point.getUnit()).to.equal(Unit.DEGREE);
    expect(point.getLongitude()).to.approximately(-112.500003, 0.0);
    expect(point.getLatitude()).to.approximately(21.943049, 0.0);

    const point2 = point.toMeters();
    expect(point2.getUnit()).to.equal(Unit.METER);
    expect(point2.getLongitude()).to.approximately(-12523443.048201751, 0.0);
    expect(point2.getLatitude()).to.approximately(2504688.958883909, 0.0);

    const point3 = point2.toDegrees();
    expect(point3.getUnit()).to.equal(Unit.DEGREE);
    expect(point3.getLongitude()).to.approximately(-112.500003, 0.0000000000001);
    expect(point3.getLatitude()).to.approximately(21.943049, 0.0000000000001);
  });
});
