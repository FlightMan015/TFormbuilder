import {componentName} from '../../constant';
// import Bitmap from './bitmap';
// import DataTableBody from './DataTable';
import InputText from './InputText';
// import DatePicker from './DatePicker';
// import TimePicker from './TimePicker';
// import FilePicker from './FilePicker';
// import Radio from './Radio';
// import DropDown from './DropDown';
// import BarChart from './barchart';
// import LineChart from './linechart';
// import PieChart from './piechart';
// import RadarChart from './radarchart';
// import Map from './map';
// import Calendar from './calendar/scheduler';
// import GaugeChart from './GaugeChart';
// import Slider from './Slider';
// import Button from './Button';
// import Image from './Image';
// import Payment from './Payment';
// import Embedded from './Embedded';
import CardSlider from './cardslider';

const componentMap = {
  // [componentName.IMAGE]: {
  //   component: Image,
  // },
  // // [componentName.IMAGE_WITH_LINK]: {
  // //   component: Image,
  // // },
  [componentName.TEXT_INPUT]: {
    component: InputText,
    validator: inputTextValidator,
  },
  // // [componentName.RATING]: {
  // //   component: Rating,
  // // },
  // [componentName.DATE_PICKER]: {
  //   component: DatePicker,
  // },
  // // [componentName.CHECKBOX]: {
  // //   component: Checkbox,
  // // },
  // [componentName.RADIO]: {
  //   component: Radio,
  // },
  // [componentName.DROPDOWN]: {
  //   component: DropDown,
  // },
  // // [componentName.TEXT_AREA]: {
  // //   component: InputText,
  // // },
  // // [componentName.READ_ONLY_TEXT]: {
  // //   component: Text,
  // // },
  // [componentName.TIME_PICKER]: {
  //   component: TimePicker,
  // },
  // [componentName.FILE_UPLOAD]: {
  //   component: FilePicker,
  // },
  // // [componentName.HEADER]: {
  // //   component: Header,
  // // },
  // [componentName.LINECHART]: {
  //   component: LineChart,
  // },
  // [componentName.BARCHART]: {
  //   component: BarChart,
  // },
  // [componentName.PIECHART]: {
  //   component: PieChart,
  // },
  // [componentName.RADARCHART]: {
  //   component: RadarChart,
  // },
  // [componentName.MAP]: {
  //   component: Map,
  // },
  // [componentName.CALENDAR]: {
  //   component: Calendar,
  // },
  // // New 2022-8-22
  // [componentName.DATA_TABLE]: {
  //   component: DataTableBody,
  // },
  // [componentName.BITMAP]: {
  //   component: Bitmap,
  // },
  // [componentName.GAUGECHART]: {
  //   component: GaugeChart,
  // },
  // [componentName.SLIDER]: {
  //   component: Slider,
  // },
  // [componentName.BUTTON]: {
  //   component: Button,
  // },
  // [componentName.PAYMENT]: {
  //   component: Payment,
  // },
  // [componentName.EMBEDDED]: {
  //   component: Embedded,
  // },
  [componentName.CARDSLIDER]: {
    component: CardSlider,
  },
};

export const getComponent = id => componentMap[id]?.component || null;

export const getValidator = id => componentMap[id]?.validator || null;

function inputTextValidator(text, inputType) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-\.])+.([A-Za-z]{2,4})$/;

  if (inputType === 'email') {
    return text && reg.test(text);
  }

  return true;
}
