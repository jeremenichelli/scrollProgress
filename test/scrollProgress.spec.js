'use strict';

import test from 'ava';
import sinon from 'sinon';

// mock window object
global.window = {
  innerWidth: 0,
  innerHeight: 0,
  scrollX: 0,
  scrollY: 0,
  addEventListener: f => f,
  removeEventListener: f => f
};

global.document = {
  body: {
    scrollHeight: 0,
    scrollWidth: 0
  }
};

// requiring package after window mock up
var ScrollProgress = require('../src/scrollProgress.js').default;

test.afterEach(() => {
  global.window = {
    innerWidth: 0,
    innerHeight: 0,
    scrollX: 0,
    scrollY: 0,
    addEventListener: f => f,
    removeEventListener: f => f
  };

  global.document = {
    body: {
      scrollHeight: 0,
      scrollWidth: 0
    }
  };
})

test('constructor registers listeners', t => {
  window.addEventListener = sinon.spy();

  const dummy = new ScrollProgress();

  t.deepEqual(window.addEventListener.getCall(0).args[0], 'scroll');
  t.deepEqual(window.addEventListener.getCall(0).args[1], dummy._onScroll);

  t.deepEqual(window.addEventListener.getCall(1).args[0], 'resize');
  t.deepEqual(window.addEventListener.getCall(1).args[1], dummy._onResize);
});

test('viewport metrics are gathered correctly', t => {
  global.window.innerHeight = 500;
  global.window.innerWidth = 500;

  global.document.body.scrollHeight = 1000;
  global.document.body.scrollWidth = 1000;

  const dummy = new ScrollProgress();

  t.deepEqual(dummy._viewportHeight, 500);
  t.deepEqual(dummy._viewportWidth, 500);
});

test('update method is called on initialization', t => {
  const dummyCallback = sinon.spy();

  const dummy = new ScrollProgress(dummyCallback); // eslint-disable-line no-unused-vars, max-len

  t.deepEqual(dummyCallback.callCount, 1);
});

test('resize event updates correctly', t => {
  global.window.innerHeight = 500;
  global.window.innerWidth = 500;

  global.document.body.scrollHeight = 1000;
  global.document.body.scrollWidth = 1000;

  const dummyCallback = sinon.spy();

  const dummy = new ScrollProgress(dummyCallback); // eslint-disable-line no-unused-vars, max-len

  // emulate scrolling
  global.window.scrollX = 250;
  global.window.scrollY = 250;

  dummy._onScroll();

  // emulate resizing
  global.window.innerHeight = 400;
  global.window.innerWidth = 400;

  global.document.body.scrollHeight = 1600;
  global.document.body.scrollWidth = 1600;

  global.window.scrollX = 120;
  global.window.scrollY = 120;

  dummy._onResize();

  t.deepEqual(dummyCallback.getCall(2).args[0], 0.1);
  t.deepEqual(dummyCallback.getCall(2).args[1], 0.1);
});

test('update method is called on scroll', t => {
  const dummyCallback = sinon.spy();

  const dummy = new ScrollProgress(dummyCallback); // eslint-disable-line no-unused-vars, max-len

  dummy._onScroll();

  t.deepEqual(dummyCallback.callCount, 2);
});

test('trigger calls update method', t => {
  const dummyCallback = sinon.spy();

  const dummy = new ScrollProgress(dummyCallback); // eslint-disable-line no-unused-vars, max-len

  dummy.trigger();

  t.deepEqual(dummyCallback.callCount, 2);
});

test('destroy remove listeners', t => {
  window.removeEventListener = sinon.spy();

  const dummy = new ScrollProgress();

  dummy.destroy();

  t.deepEqual(window.removeEventListener.getCall(0).args[0], 'scroll');
  t.deepEqual(window.removeEventListener.getCall(0).args[1], dummy._onScroll);

  t.deepEqual(window.removeEventListener.getCall(1).args[0], 'resize');
  t.deepEqual(window.removeEventListener.getCall(1).args[1], dummy._onResize);
});
