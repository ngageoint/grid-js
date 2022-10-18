import { expect } from 'chai';
import { Bounds } from '../../lib/features/Bounds';
import { Point } from '../../lib/features/Point';
import { Unit } from '../../lib/features/Unit';

describe('Bounds Tests', function () {
  it('test construction', function () {
    let bounds = Bounds.bounds(-180, -90, 180, 90, Unit.DEGREE);
    expect(bounds.getUnit()).to.be.equal(Unit.DEGREE);
    let other = Bounds.degrees(
      bounds.getMinLongitude(),
      bounds.getMinLatitude(),
      bounds.getMaxLongitude(),
      bounds.getMaxLatitude(),
    );
    expect(bounds.equals(other)).to.be.true;

    bounds = bounds.toMeters();
    expect(bounds.getUnit()).to.be.equal(Unit.METER);
    other = Bounds.meters(
      bounds.getMinLongitude(),
      bounds.getMinLatitude(),
      bounds.getMaxLongitude(),
      bounds.getMaxLatitude(),
    );
    expect(bounds.equals(other)).to.be.true;

    other = Bounds.boundsFromBounds(bounds);
    expect(bounds.equals(other)).to.be.true;

    other = Bounds.boundsFromCorners(bounds.getSouthwest(), bounds.getNortheast());
    expect(bounds.equals(other)).to.be.true;
  });

  it('test toUnit', function () {
    const boundsDegree = Bounds.bounds(-180, -90, 180, 90, Unit.DEGREE);

    let toUnit = boundsDegree.toUnit(Unit.METER);
    toUnit = boundsDegree.toUnit(Unit.DEGREE);
    expect(boundsDegree.equals(toUnit)).to.be.true;
  });
});
