import {componentName} from '../../constant';
import CardListSetting from './CardListSetting';
import InputTextSetting from './InputTextSetting';
import TabSectionSetting from './TabSectionSetting';
import DateSetting from './DateSetting';
import TimeSetting from './TimeSetting';
import ImageSetting from './ImageSetting';
import DropdownSetting from './DropdownSetting';
import FileUploadSetting from './FileUploadSetting';
import RadioSetting from './RadioSetting';
import SectionSetting from './SectionSetting';
import LineChartSetting from './LineChartSetting';
import PieChartSetting from './PieChartSetting';
import BarChartSetting from './BarChartSetting';
import RadarChartSetting from './RadarChartSetting';
import MapSetting from './MapSetting';
import CalendarSetting from './CalendarSetting';

const componentMap = {
  [componentName.CARDSLIDER]: {
    component: CardListSetting,
  },
  [componentName.TEXT_INPUT]: {
    component: InputTextSetting,
  },
  [componentName.TABSECTION]: {
    component: TabSectionSetting,
  },
  [componentName.DATE_PICKER]: {
    component: DateSetting,
  },
  [componentName.TIME_PICKER]: {
    component: TimeSetting,
  },
  [componentName.IMAGE]: {
    component: ImageSetting,
  },
  [componentName.DROPDOWN]: {
    component: DropdownSetting,
  },
  [componentName.FILE_UPLOAD]: {
    component: FileUploadSetting,
  },
  [componentName.RADIO]: {
    component: RadioSetting,
  },
  [componentName.GROUP]: {
    component: SectionSetting,
  },
  [componentName.LINECHART]: {
    component: LineChartSetting,
  },
  [componentName.BARCHART]: {
    component: BarChartSetting,
  },
  [componentName.PIECHART]: {
    component: PieChartSetting,
  },
  [componentName.RADARCHART]: {
    component: RadarChartSetting,
  },
  [componentName.MAP]: {
    component: MapSetting,
  },
  [componentName.CALENDAR]: {
    component: CalendarSetting,
  },
};

export const getSettingComponent = id => componentMap[id]?.component || null;

export const getSettingValidator = id => componentMap[id]?.validator || null;

function inputTextValidator(text, inputType) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-\.])+.([A-Za-z]{2,4})$/;

  if (inputType === 'email') {
    return text && reg.test(text);
  }

  return true;
}
