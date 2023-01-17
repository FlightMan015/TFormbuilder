// import {
//   PaintStyle,
//   Skia,
//   StrokeCap,
//   StrokeJoin,
// } from '@shopify/react-native-skia';

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export const invertColor = hex => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
};

// export const getPaint = (strokeWidth, color) => {
//   const paint = Skia.Paint();
//   paint.setStrokeWidth(strokeWidth);
//   paint.setStrokeMiter(5);
//   paint.setStyle(PaintStyle.Stroke);
//   paint.setStrokeCap(StrokeCap.Round);
//   paint.setStrokeJoin(StrokeJoin.Round);
//   paint.setAntiAlias(true);
//   const _color = paint.copy();
//   _color.setColor(Skia.Color(color));
//   return _color;
// };

// export const makeSvgFromPaths = (paths, options) => {
//   const newPaths = Object.assign(paths);
//   return `<svg width="${options.maxPosition.x + 10}" height="${
//     options.maxPosition.y + 10
//   }" viewBox="-5 -5 ${options.maxPosition.x + 5} ${
//     options.maxPosition.y + 5
//   }" fill="none" xmlns="http://www.w3.org/2000/svg">
    
//     <g transform="
//       scale(${40 / (options.maxPosition.x - options.minPosition.x + 10)} ${
//     40 / (options.maxPosition.y - options.minPosition.y + 10)
//   })"
//       >
//     ${newPaths.map(
//       path => {
//         if (path.paint && path.path) {
//           let newPathMake = Skia.Path.Make();
//           newPathMake = path.path;
//           newPathMake.offset(-options.minPosition.x, -options.minPosition.y);
//           const mmm = `<path d="${newPathMake.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`;
//           newPathMake.offset(options.minPosition.x, options.minPosition.y);
//           return mmm;
//         } else {
//           return '';
//         }
//       },
//       // path.paint && path.path
//       //   ? `<path d="${path.path.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
//       //   : ''
//     )}
//     </g>
//     </svg>`;
// };

// export const makeImageSvgFromPaths = (paths, options) => {
//   const newPaths = Object.assign(paths);
//   return `<svg width="${options.maxPosition.x}" height="${
//     options.maxPosition.y
//   }" viewBox="0 0 ${options.maxPosition.x} ${
//     options.maxPosition.y
//   }" fill="none" xmlns="http://www.w3.org/2000/svg">
//     ${newPaths.map(
//       path => {
//         if (path.paint && path.path) {
//           let newPathMake = Skia.Path.Make();
//           newPathMake = path.path;
//           const mmm = `<path d="${newPathMake.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`;
//           return mmm;
//         } else {
//           return '';
//         }
//       },
//       // path.paint && path.path
//       //   ? `<path d="${path.path.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
//       //   : ''
//     )}
//     </svg>`;
// };

export const handleImageSize = (width, height, maxWidth, maxHeight) => {
  if (width >= height) {
    var ratio = maxWidth / width;
    var h = Math.ceil(ratio * height);

    if (h > maxHeight) {
      // Too tall, resize
      var ratio = maxHeight / height;
      var w = Math.ceil(ratio * width);
      var ret = {
        width: w,
        height: maxHeight,
      };
    } else {
      var ret = {
        width: maxWidth,
        height: h,
      };
    }
  } else {
    var ratio = maxHeight / height;
    var w = Math.ceil(ratio * width);

    if (w > maxWidth) {
      var ratio = maxWidth / width;
      var h = Math.ceil(ratio * height);
      var ret = {
        width: maxWidth,
        height: h,
      };
    } else {
      var ret = {
        width: w,
        height: maxHeight,
      };
    }
  }

  return ret;
};
