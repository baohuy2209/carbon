/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

jest.setTimeout(20000);

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  // TODO: replace with async version
  // setTimeout(callback);
  callback();
};

if (global.HTMLElement) {
  // This is a quirk that we need to bring in due to how our `tabbable` dependency
  // determines what nodes are focusable. Without this override, it's unable to
  // determine whether or not things are visible in JSDOM. With it, we get
  // expected tab order from the document.
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    get() {
      return this.parentNode;
    },
  });
}

if (global.window) {
  // https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
  const { getComputedStyle } = window;
  window.getComputedStyle = (element) => getComputedStyle(element);
}

if (global.window) {
  window.ResizeObserver = jest.fn(() => {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  });
}

if (global.window && global.AnimationEvent === undefined) {
  // Reference: https://github.com/testing-library/react-testing-library/issues/892#issuecomment-808703402
  class AnimationEvent extends Event {
    constructor(type, animationEventInitDict = {}) {
      const {
        animationName = '',
        elapsedTime = 0,
        pseudoElement = '',
        ...eventInitDict
      } = animationEventInitDict;
      super(type, eventInitDict);

      this._animationName = animationName;
      this._elapsedTime = elapsedTime;
      this._pseudoElement = pseudoElement;
    }

    get animationName() {
      return this._animationName;
    }

    get elapsedTime() {
      return this._elapsedTime;
    }

    get pseudoElement() {
      return this._pseudoElement;
    }
  }
  global.AnimationEvent = AnimationEvent;
}

// jsdom doesn't implement HTMLDialogElement
// https://github.com/jsdom/jsdom/issues/3294
if (global.window) {
  if (!window.HTMLDialogElement.prototype.show) {
    HTMLDialogElement.prototype.show = jest.fn(function () {
      this.open = true;
    });
  }

  if (!window.HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = jest.fn(function () {
      this.open = true;
    });
  }

  if (!window.HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = jest.fn(function () {
      this.open = false;
    });
  }
}
