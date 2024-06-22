import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';

chai.use(sinonChai);

global.expect = expect;
global.sinon = sinon;
