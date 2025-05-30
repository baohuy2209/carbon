/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PropsWithChildren, HTMLElementType } from 'react';
import { usePrefix } from '../../internal/usePrefix';

export interface AspectRatioProps {
  /**
   * Provide a custom component or string to be rendered as
   * the outermost node of the component. This is useful if you want
   * to deviate from the default `div` tag, where you could specify
   * `section` or `article` instead.
   *
   * ```jsx
   * <AspectRatio as="article">My content</AspectRatio>
   * ```
   */
  as?: HTMLElementType;

  /**
   * Specify a class name for the outermost node
   * of the component.
   */
  className?: string;

  /**
   * Specify the ratio to be used by the aspect ratio
   * container. This will  determine what aspect ratio your content
   * will be displayed in.
   */
  ratio?:
    | '1x1'
    | '2x3'
    | '3x2'
    | '3x4'
    | '4x3'
    | '1x2'
    | '2x1'
    | '9x16'
    | '16x9';
}

/**
 * The AspectRatio component provides a `ratio` prop that will be used to
 * specify the aspect ratio that the children you provide will be displayed in.
 * This is often useful alongside our grid components, or for media assets like
 * images or videos.
 */
const AspectRatio = ({
  as: BaseComponent = 'div',
  className: containerClassName,
  children,
  ratio = '1x1',
  ...rest
}: PropsWithChildren<AspectRatioProps>) => {
  const prefix = usePrefix();
  const className = cx(
    containerClassName,
    `${prefix}--aspect-ratio`,
    `${prefix}--aspect-ratio--${ratio}`
  );
  return (
    <BaseComponent className={className} {...rest}>
      {children}
    </BaseComponent>
  );
};

AspectRatio.propTypes = {
  /**
   * Provide a custom component or string to be rendered as the outermost node
   * of the component. This is useful if you want to deviate from the default
   * `div` tag, where you could specify `section` or `article` instead.
   *
   * ```jsx
   * <AspectRatio as="article">My content</AspectRatio>
   * ```
   */
  as: PropTypes.elementType,

  /**
   * Specify the content that will be placed in the aspect ratio
   */
  children: PropTypes.node,

  /**
   * Specify a class name for the outermost node of the component
   */
  className: PropTypes.string,

  /**
   * Specify the ratio to be used by the aspect ratio container. This will
   * determine what aspect ratio your content will be displayed in.
   */
  ratio: PropTypes.oneOf([
    '16x9',
    '9x16',
    '2x1',
    '1x2',
    '4x3',
    '3x4',
    '3x2',
    '2x3',
    '1x1',
  ]),
};

export default AspectRatio;
