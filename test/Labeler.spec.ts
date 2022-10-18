import { expect } from 'chai';
import { Labeler } from '../lib/Labeler';
import { TestLabeler } from './TestLabeler';

describe('Labeler Tests', function () {
  it('test zoom', function () {
    const labeler = new TestLabeler(true, 0, undefined, undefined, 12, 0.3);
    expect(labeler.hasMaxZoom()).to.be.false;
    expect(labeler.isWithin(labeler.getMinZoom())).to.be.true;

    labeler.setMaxZoom(10);
    expect(labeler.hasMaxZoom()).to.be.true;
    expect(labeler.isWithin(labeler.getMinZoom())).to.be.true;
  });

  it('test buffer', function () {
    const labeler = new TestLabeler(true, 0, undefined, undefined, 12, 0.3);
    expect(function () {
      labeler.setBuffer(-1);
    }).to.throw(Error);
  });
});
