import {
  PaintStyle,
  Skia,
  StrokeCap,
  StrokeJoin,
} from '@shopify/react-native-skia';

const getPaint = (strokeWidth, color) => {
  const paint = Skia.Paint();
  paint.setStrokeWidth(strokeWidth);
  paint.setStrokeMiter(5);
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeCap(StrokeCap.Round);
  paint.setStrokeJoin(StrokeJoin.Round);
  paint.setAntiAlias(true);
  const _color = paint.copy();
  _color.setColor(Skia.Color(color));
  return _color;
};

const makeSvgFromPaths = (paths, options) => {
  const newPaths = Object.assign(paths);
  return `<svg width="${options.maxPosition.x + 10}" height="${
    options.maxPosition.y + 10
  }" viewBox="-5 -5 ${options.maxPosition.x + 5} ${
    options.maxPosition.y + 5
  }" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    <g transform="
      scale(${40 / (options.maxPosition.x - options.minPosition.x + 10)} ${
    40 / (options.maxPosition.y - options.minPosition.y + 10)
  })"
      >
    ${newPaths.map(
      path => {
        if (path.paint && path.path) {
          let newPathMake = Skia.Path.Make();
          newPathMake = path.path;
          newPathMake.offset(-options.minPosition.x, -options.minPosition.y);
          const mmm = `<path d="${newPathMake.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`;
          newPathMake.offset(options.minPosition.x, options.minPosition.y);
          return mmm;
        } else {
          return '';
        }
      },
      // path.paint && path.path
      //   ? `<path d="${path.path.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
      //   : ''
    )}
    </g>
    </svg>`;
};

const makeImageSvgFromPaths = (paths, options) => {
  const newPaths = Object.assign(paths);
  return `<svg width="${options.maxPosition.x}" height="${
    options.maxPosition.y
  }" viewBox="0 0 ${options.maxPosition.x} ${
    options.maxPosition.y
  }" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${newPaths.map(
      path => {
        if (path.paint && path.path) {
          let newPathMake = Skia.Path.Make();
          newPathMake = path.path;
          const mmm = `<path d="${newPathMake.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`;
          return mmm;
        } else {
          return '';
        }
      },
      // path.paint && path.path
      //   ? `<path d="${path.path.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
      //   : ''
    )}
    </svg>`;
};

const handleImageSize = (width, height, maxWidth, maxHeight) => {
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
// const makeSvgFromPaths = (
//   paths,
//   options
// ) => {
//   return `<svg width="${options.maxPosition.x - options.minPosition.x}" height="${options.maxPosition.y - options.minPosition.y}" viewBox="${options.minPosition.x} ${options.minPosition.y} ${options.maxPosition.x - options.minPosition.x} ${
//       options.maxPosition.y - options.minPosition.y
//     }" fill="none" xmlns="http://www.w3.org/2000/svg">

//     <g transform="
//       translate(50 50)
//       scale(${40 / ( options.maxPosition.x - options.minPosition.x )} ${40 / ( options.maxPosition.y - options.minPosition.y )})">
//     ${paths.map(path =>
//       path.paint && path.path
//         ? `<path d="${path.path.toSVGString()}" stroke="red" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
//         : ''
//     )}
//     </g>
//     </svg>`;
// };

export default {
  getPaint,
  makeSvgFromPaths,
  handleImageSize,
  makeImageSvgFromPaths,
};
