import { expect } from 'chai';
import { BaseGrid } from '../lib/BaseGrid';

describe('BaseGrid Tests', function () {
  it('test zoom', function () {
    const baseGrid = new BaseGrid();
    expect(baseGrid.getMaxZoom()).to.be.undefined;
    expect(baseGrid.hasMaxZoom()).to.be.false;

    expect(baseGrid.getLinesMaxZoom()).to.be.undefined;
    expect(baseGrid.hasLinesMaxZoom()).to.be.false;

    expect(baseGrid.getLinesMinZoom()).to.be.equal(baseGrid.getMinZoom());
    expect(baseGrid.hasLinesMinZoom()).to.be.false;

    expect(baseGrid.isWithin(baseGrid.getMinZoom()!)).to.be.true;
    expect(baseGrid.isWithin(baseGrid.getMinZoom()! - 1)).to.be.false;
    baseGrid.setMaxZoom(2);
    expect(baseGrid.isWithin(baseGrid.getMaxZoom()!)).to.be.true;
    expect(baseGrid.isWithin(baseGrid.getMaxZoom()! + 1)).to.be.false;

    expect(baseGrid.isLinesWithin(0)).to.be.true;

    baseGrid.setLinesMinZoom(0);
    expect(baseGrid.isLinesWithin(baseGrid.getLinesMinZoom())).to.be.true;
    expect(baseGrid.isLinesWithin(baseGrid.getLinesMinZoom() - 1)).to.be.false;
    baseGrid.setLinesMaxZoom(10);
    expect(baseGrid.isLinesWithin(baseGrid.getLinesMaxZoom()!)).to.be.true;
    expect(baseGrid.isLinesWithin(baseGrid.getLinesMaxZoom()! + 1)).to.be.false;
  });

  it('test style', function () {
    const baseGrid = new BaseGrid();
    expect(baseGrid.getStyle()).to.not.be.undefined;
    baseGrid.setStyle(undefined);
    expect(baseGrid.getStyle()).to.not.be.undefined;
  });
});
