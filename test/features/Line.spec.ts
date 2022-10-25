import { Line } from '../../lib/features/Line';
import { Point } from '../../lib/features/Point';
import { Unit } from '../../lib/features/Unit';
import { expect } from 'chai';

describe('Line Tests', function () {
  it('test setPoints', function () {
    const point1 = Point.degrees(0, 0);
    const point2 = Point.degrees(1, 1);

    const line = Line.line(point1, point2);
    expect(line).to.not.be.undefined;
  });

  it('test toMeters', function () {
    const point1 = Point.degrees(0, 0);
    const point2 = Point.degrees(1, 1);

    const line = Line.line(point1, point2);
    expect(line).to.not.be.undefined;

    const metersLine = line.toMeters();
    expect(metersLine.getPoint1().getUnit()).to.equal(Unit.METER);
    expect(metersLine.getPoint2().getUnit()).to.equal(Unit.METER);
  });
});
