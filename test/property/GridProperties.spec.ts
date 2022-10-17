import { expect } from 'chai';
import { GridProperties } from '../../lib/property/GridProperties';

describe('GridProperties Tests', function () {
    it('test getProperty', function () {
        const props = new GridProperties();
        const gridWidth = props.getProperty(true, props.buildProperty(['grid', 'width']));
        expect(gridWidth).to.not.be.null;
    });

    it('test getFloatProperty', function () {
        const props = new GridProperties();
        const gridWidth = props.getFloatProperty(true, props.buildProperty(['grid', 'width']));
        expect(gridWidth).to.not.be.null;
        expect(gridWidth).to.be.approximately(2.0, .1);
    });
});