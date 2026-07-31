// SVGR turns `.svg` imports into React components in webpack. Jest would
// otherwise get next/jest's string file stub, which is not a valid element type.
const React = require('react');

const SvgMock = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('svg', { ref, ...props }, children)
);

SvgMock.displayName = 'SvgMock';

module.exports = SvgMock;
module.exports.default = SvgMock;
module.exports.ReactComponent = SvgMock;
module.exports.__esModule = true;
