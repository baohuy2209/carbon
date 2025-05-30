/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { default: template } = require('@babel/template');

const banner = `/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Code generated by @carbon/icon-build-helpers. DO NOT EDIT.
 */`;

const jsx = template.expression(
  `
    React.createElement(
      Icon,
      %%props%%,
      %%children%%,
      children
    )
  `,
  {
    plugins: ['jsx'],
  }
);

const component = template(
  `
    const %%moduleName%% = React.forwardRef(
      function %%moduleName%%({ children, size = %%defaultSize%%, ...rest }, ref) {
        %%statements%%
      }
    );

    if (process.env.NODE_ENV !== "production") {
      %%moduleName%%.propTypes = iconPropTypes;
    }
  `,
  {
    plugins: ['jsx'],
  }
);

const deprecatedBlock = template(
  `
    if (process.env.NODE_ENV !== "production") {
      if (!%%check%%) {
        %%check%% = true;
        console.warn(%%warning%%);
      }
    }
  `
);

module.exports = {
  banner,
  component,
  deprecatedBlock,
  jsx,
};
