import { expect } from 'chai';
import { BaseZoomGrids } from '../lib/BaseZoomGrids';
import { BaseGrid } from '../lib/BaseGrid';

describe('BaseZoomGrids Tests', function () {
  /**
   * Test the iterator
   */
  it('test iterations', function () {
    const zoomGrids = new BaseZoomGrids<BaseGrid>(5);
    zoomGrids.addGrid(new BaseGrid());
    zoomGrids.addGrid(new BaseGrid());

    let count = 0;

    for (const grid of zoomGrids) {
      count++;
    }

    expect(count).to.equal(zoomGrids.numGrids());
  });
});
