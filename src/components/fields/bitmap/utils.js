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

const makeImageSvgFromData = (data, options) => {
  const newPaths = data.paths;
  const rectangles = data.rectangles;
  const ellipses = data.ellipses;
  const lines = data.lines;
  const polygons = data.polygons;
  
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
    ${
      rectangles.map(rectangle => {
        return `<rect x="${rectangle.startPoint.x}" y="${rectangle.startPoint.y}" width="${Math.abs(rectangle.startPoint.x - rectangle.endPoint.x)}" height="${Math.abs(rectangle.startPoint.y - rectangle.endPoint.y)}" stroke="red" stroke-width="2" />`;
      })
    }
    ${
      ellipses.map(ellipse => {
        return `<ellipse cx="${ellipse.startPoint.x + Math.abs((ellipse.startPoint.x - ellipse.endPoint.x)/2)}" cy="${ellipse.startPoint.y + Math.abs((ellipse.startPoint.y - ellipse.endPoint.y)/2)}" rx="${Math.abs((ellipse.startPoint.x - ellipse.endPoint.x)/2)}" ry="${Math.abs((ellipse.startPoint.y - ellipse.endPoint.y)/2)}" stroke="red" stroke-width="2" />`;
      })
    }
    ${
      lines.map(line => {
        return `<line x1="${line.startPoint.x}" y1="${line.startPoint.y}" x2="${line.endPoint.x}" y2="${line.endPoint.y}" stroke="red" strokeWidth="6" />`;
      })
    }
    ${
      polygons.map(polygon => {
        var tempPointStr = '';
        for(let i = 0; i < polygon.length; i++) {
          if (i === 0) {
            tempPointStr = tempPointStr + Math.floor(polygon[i].x) + ' ' + Math.floor(polygon[i].y);
          } else {
            tempPointStr = tempPointStr + ' ' + Math.floor(polygon[i].x) + ' ' + Math.floor(polygon[i].y);
          }
        }
        return `<polygon fill="none" points="${tempPointStr}" stroke="red" strokeWidth="5" />`;
      })
    }
    </svg>`;
};

function clickHandle(e) { 
  e.preventDefault();
  console.log('Handled');
} 

const makeImageSvgFromNewData = (data, options) => {
  if (data.name === 'polygon') {
    var tempPointStr = '';
    for(let i = 0; i < data.length; i++) {
      if (i === 0) {
        tempPointStr = tempPointStr + Math.floor(data[i].x) + ' ' + Math.floor(data[i].y);
      } else {
        tempPointStr = tempPointStr + ' ' + Math.floor(data[i].x) + ' ' + Math.floor(data[i].y);
      }
    }
    return `<svg width="${options.maxPosition.x}" height="${
        options.maxPosition.y
      }" viewBox="0 0 ${options.maxPosition.x} ${
        options.maxPosition.y
      }" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${`<polygon fill="none" points="${tempPointStr}" stroke="red" strokeWidth="5" />`
      }
    </svg>`;
  }
  if (data.name === 'rectangle') {
    return `<svg width="${options.maxPosition.x}" height="${
        options.maxPosition.y
      }" viewBox="0 0 ${options.maxPosition.x} ${
        options.maxPosition.y
      }" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="{console.log('bc')}">
      ${
        `<rect x="${data.startPoint.x}" y="${data.startPoint.y}" width="${Math.abs(data.startPoint.x - data.endPoint.x)}" height="${Math.abs(data.startPoint.y - data.endPoint.y)}" stroke="red" fill="red" stroke-width="2"  onClick="{console.log('bc')}" />`
      }
    </svg>`;
  }
  if (data.name === 'ellipse') {
    return `<svg width="${options.maxPosition.x}" height="${
        options.maxPosition.y
      }" viewBox="0 0 ${options.maxPosition.x} ${
        options.maxPosition.y
      }" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${`<ellipse cx="${data.startPoint.x + Math.abs((data.startPoint.x - data.endPoint.x)/2)}" cy="${data.startPoint.y + Math.abs((data.startPoint.y - data.endPoint.y)/2)}" rx="${Math.abs((data.startPoint.x - data.endPoint.x)/2)}" ry="${Math.abs((data.startPoint.y - data.endPoint.y)/2)}" stroke="red" stroke-width="2"  onPress="${console.log('onpress-------ellipse')}" />`
      }
    </svg>`;
  }
  return `<svg width="${options.maxPosition.x}" height="${
      options.maxPosition.y
    }" viewBox="0 0 ${options.maxPosition.x} ${
      options.maxPosition.y
    }" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>`;
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
  makeImageSvgFromData,
  makeImageSvgFromNewData
};
