import { expect } from 'chai';
import { TestProperties } from './TestProperties';

describe('GridProperties Tests', function () {
  it('test getProperty', function () {
    const props = new TestProperties();
    const prop = props.getProperty(true, props.buildProperty(['grid', 'width']));
    expect(prop).to.not.be.null;
    expect(Number.parseInt(prop!)).to.be.approximately(2.0, 0.1);
  });

  it('test getBooleanProperty', function () {
    const props = new TestProperties();
    const prop = props.getBooleanProperty(true, props.buildProperty(['test1', 'propagate']));
    expect(prop).to.not.be.null;
    expect(prop).to.be.true;
  });

  it('test getFloatProperty', function () {
    const props = new TestProperties();
    const prop = props.getFloatProperty(true, props.buildProperty(['test2', 'buffer']));
    expect(prop).to.not.be.null;
    expect(prop).to.be.approximately(0.05, 0.01);
  });
});
