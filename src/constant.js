/* eslint-disable prettier/prettier */
export const stripePubKey = 'pk_test_51M439GCc34pJZGeiWGWBUESTc6zTakAmrlKjGfZycotvoCPRJYfwDnGkdgAxG540gvdfx9ftpU7dqoMT3kN4vRAt00tS8MT56c';

export const componentName = {
  CHECKBOX: 'input_checkbox',
  DATE_PICKER: 'input_date',
  DROPDOWN: 'input_dropdown',
  IMAGE_WITH_LINK: 'image_with_link',
  IMAGE: 'image',
  RADIO: 'input_radio',
  RATING: 'rating',
  READ_ONLY_TEXT: 'read_only_text',
  TEXT_AREA: 'input_textarea',
  TEXT_INPUT: 'input_text',
  TIME_PICKER: 'input_time',
  FILE_UPLOAD: 'file_upload',
  HEADER: 'header',
  GROUP: 'group',
  LINECHART: 'line_chart',
  BARCHART: 'bar_chart',
  PIECHART: 'pie_chart',
  RADARCHART: 'radar_chart',
  MAP: 'map',
  CALENDAR: 'calendar',
  TAB: 'tab',
  BITMAP: 'bitmap',
  DATA_TABLE: 'data_table',
  GAUGECHART: 'gauge_chart',
  GRID: 'grid',
  GRIDCELL: 'grid_cell',
  LISTSECTION: 'list_section',
  LISTCELL: 'list_cell',
  TABSECTION: 'tab_section',
  SLIDER: 'slider',
  BUTTON: 'button',
  COMPOSITE: 'composite',
  PAYMENT: 'payment',
  POPUP: 'popup',
  EMBEDDED: 'EMBEDDED',
  CARDSLIDER: 'CARDSLIDER',
  CARD: 'CARD',
  TWITTER: 'TWITTER',
  VOICEMESSAGE: 'VPOCEMESSAGE',
};

export const radioButton = {
  selected: require('./assets/icon_images/selectedRadio.png'),
  unselected: require('./assets/icon_images/unselectedRadio.png'),
};

export const emptyImage = require('./assets/icon_images/imageIcon.png');

// TODO: Need to remove isMandatory for below fields from template json.
export const skipValidationForFields = [
  'image',
  'image-with-link',
  'read-only-text',
  'header',
  'line-chart',
  'bar-chart',
  'pie-chart',
  'radar-chart',
  'gauge_chart',
];

export const modes = {
  builder: 'builder',
  submitter: 'submitter',
  reviewer: 'reviewer',
  approver: 'approver',
};


export const newFormData = {
  title: 'New TForm',
  logo: '',
  data: [],
  theme: 'Native',
  lightStyle: {
    formBackgroundColor: '#F8F8F8',
    backgroundPatternImage: '',
    foregroundColor: '#FFFFFF',
    headings: {
      fontSize: 18,
      color: '#000000',
      fontFamily: 'PublicSans-SemiBold',
    },
    labels: {
        fontSize: 16,
        color: '#080808',
        fontFamily: 'PublicSans-Regular',
    },
    values: {
        fontSize: 14,
        color: '#080808',
        fontFamily: 'PublicSans-Regular',
    },
  },
  darkStyle: {
    formBackgroundColor: '#1F2128',
    backgroundPatternImage: '',
    foregroundColor: '#242731',
    headings: {
      fontSize: 18,
      color: '#FFFFFF',
      fontFamily: 'PublicSans-SemiBold',
    },
    labels: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'PublicSans-Regular',
    },
    values: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: 'PublicSans-Regular',
    },
  },
  checkedRoles: [],
};

const newInputTextData = {
  component: componentName.TEXT_INPUT,
  field_name: 'textbox',
  is_mandatory: true,
  meta: {
    title: 'TextInput',
    hide_title: false,
    placeholder: 'Enter text..',
    numberOfLines: '1',
    multiline: false,
  },
  role: [{name: 'admin', edit: true, view: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSubmitEditing: '',
    onChangeText: '',
    onBlur: '',
    onFocus: '',
  },
};

const newInputDateData = {
  component: componentName.DATE_PICKER,
  field_name: 'date',
  is_mandatory: true,
  meta: {
    title: 'Date',
    hide_title: false,
  },
  role: [{name: 'admin', edit: true, view: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChangeDate: '',
  },
};

const newDropDownData = {
  component: componentName.DROPDOWN,
  field_name: 'dropdown',
  is_mandatory: true,
  meta: {
    title: 'Dropdown',
    hide_title: false,
    options: ['Option1', 'Option2', 'Option3'],
    search: false,
  },
  role: [{name: 'admin', edit: true, view: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSelect: '',
  },
};

const newInputTimeData = {
  component: componentName.TIME_PICKER,
  field_name: 'time',
  is_mandatory: true,
  meta: {
    title: 'Time',
    hide_title: false,
  },
  role: [{name: 'admin', edit: true, view: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChangeTime: '',
  },
};

const newFileUploadData = {
  component: componentName.FILE_UPLOAD,
  field_name: 'fileupload',
  is_mandatory: true,
  meta: {
    title: 'File Upload',
    hide_title: false,
    multi_select: false,
  },
  role: [{name: 'admin', edit: true, view: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSelectFile: '',
  },
};

const newLineChartData = {
  component: componentName.LINECHART,
  field_name: 'line-chart',
  is_mandatory: true,
  meta: {
    title: 'Line Chart',
    hide_title: false,
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          data: [23, 40, 45],
          red: 0,
          green: 0,
          blue: 255,
          strokeWidth: 2, // optional
        },
        {
          data: [45, 56, 23],
          red: 0,
          green: 255,
          blue: 0,
          strokeWidth: 2, // optional
        },
      ],
      legend: ['Rainy Days', 'Sunny days'],
    },
  },
  // role: [{name: 'admin', view: true, editAxis: true, editSeries: true}],
  role: [{name: 'admin', view: true, editSeries: true, editAxes: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewSeries: '',
    onUpdateSeries: '',
    onDeleteSeries: '',
    onCreateNewXValue: '',
    onUpdateXValue: '',
    onDeleteXValue: '',
    onUpdateYValue: '',
  },
};

const newBarChartData = {
  component: componentName.BARCHART,
  field_name: 'bar-chart',
  is_mandatory: true,
  meta: {
    title: 'Bar Chart',
    hide_title: false,
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          data: [30, 40, 20],
        },
      ],
    },
  },
  role: [{name: 'admin', edit: true, view: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewLabel: '',
    onUpdateLabel: '',
    onDeleteLabel: '',
    onUpdateValue: '',
  },
};

const newPieChartData = {
  component: componentName.PIECHART,
  field_name: 'pie-chart',
  is_mandatory: true,
  meta: {
    title: 'Pie Chart',
    hide_title: false,
    data: [
      {
        name: 'Part1',
        population: 24,
        color: '#EC3C3B',
        legendFontColor: '#EC3C3B',
        legendFontSize: 15,
      },
      {
        name: 'Part2',
        population: 30,
        color: '#4558EB',
        legendFontColor: '#4558EB',
        legendFontSize: 15,
      },
      {
        name: 'Part3',
        population: 40,
        color: '#F23BD6',
        legendFontColor: '#F23BD6',
        legendFontSize: 15,
      },
      {
        name: 'Part4',
        population: 50,
        color: '#44D7E5',
        legendFontColor: '#44D7E5',
        legendFontSize: 15,
      },
      {
        name: 'Part5',
        population: 50,
        color: '#7DEB39',
        legendFontColor: '#7DEB39',
        legendFontSize: 15,
      },
      {
        name: 'Part6',
        population: 50,
        color: '#F5EC4A',
        legendFontColor: '#F5EC4A',
        legendFontSize: 15,
      },
    ],
  },
  role: [{name: 'admin', edit: true, view: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewLabel: '',
    onUpdateLabel: '',
    onDeleteLabel: '',
    onUpdateValue: '',
  },
};

const newRadarChartData = {
  component: componentName.RADARCHART,
  field_name: 'radar-chart',
  is_mandatory: true,
  meta: {
    title: 'Radar Chart',
    hide_title: false,
    data: {
      datasets: [
        {axis1: 140, axis2: 250, axis3: 70, axis4: 40, axis5: 50},
        {axis1: 100, axis2: 300, axis3: 90, axis4: 80, axis5: 90},
        {axis1: 180, axis2: 225, axis3: 150, axis4: 120, axis5: 120},
      ],
      lines: ['series1', 'series2', 'series3'],
      colors: ['#ff0000', '#00ff00', '#0000ff'],
    },
  },
  role: [{name: 'admin', view: true, editAxes: true, editSeries: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewSeries: '',
    onUpdateSeries: '',
    onDeleteSeries: '',
    onCreateNewAxis: '',
    onUpdateAxis: '',
    onDeleteAxis: '',
    onUpdateValue: '',
  },
};

const newMapData = {
  component: componentName.MAP,
  field_name: 'map',
  is_mandatory: true,
  meta: {
    title: 'Map widget',
    hide_title: false,
    data: {
      points: [],
      geofences: [],
    },
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewPoint: '',
    onUpdatePoint: '',
    onDeletePoint: '',
    onCreateNewGeofence: '',
    onUpdateGeofence: '',
    onDeleteGeofence: '',
  },
};

const newCalendarData = {
  component: componentName.CALENDAR,
  field_name: 'calendar',
  is_mandatory: true,
  meta: {
    title: 'Calendar',
    hide_title: false,
    items: {},
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewSchedule: '',
    onUpdateSchedule: '',
    onDeleteSchedule: '',
    onSelectDay: '',
  },
};

const newGroupData = {
  component: componentName.GROUP,
  field_name: 'group',
  meta: {
    title: 'New Section',
    hide_title: false,
    childs: [],
    option: false,
    is_tab: false,
  },
  role: [{name: 'admin', view: true, edit: true}],
  event: {},
};

const newGridData = {
  component: componentName.GRID,
  field_name: 'grid',
  meta: {
    title: 'New Grid',
    hide_title: false,
    childs: [],
    option: false,
    cellData: {
      height: 100,
      numColumns: 3,
      autoColumn: true,
    },
    cellFields: [],
    verticalAlign: true,
  },
  role: [{name: 'admin', view: true, edit: true, define: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChangeCellData: '',
    onCreateCell: '',
    onDeleteCell: '',
  },
};

const newListSectionData = {
  component: componentName.LISTSECTION,
  field_name: 'list-section',
  meta: {
    title: 'New List Section',
    hide_title: false,
    childs: [],
    option: false,
    cellFields: [],
    listVerticalAlign: true,
    cellVerticalAlign: false,
  },
  role: [{name: 'admin', view: true, edit: true, define: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChangeCellData: '',
    onCreateCell: '',
    onDeleteCell: '',
  },
};

const newTabSectionData = {
  component: componentName.TABSECTION,
  field_name: 'tab-section',
  meta: {
    title: 'New Tab Section',
    hide_title: false,
    childs: [
      {
        component: componentName.TAB,
        field_name: 'tab',
        meta: {
          title: 'Tab1',
          childs: [],
        },
      },
      {
        component: componentName.TAB,
        field_name: 'tab',
        meta: {
          title: 'Tab2',
          childs: [],
        },
      },
      {
        component: componentName.TAB,
        field_name: 'tab',
        meta: {
          title: 'Tab3',
          childs: [],
        },
      }
    ],
    option: false,
  },
  role: [{name: 'admin', view: true, edit: true}],
  event: {},
};

const newTabData = {
  component: componentName.TAB,
  field_name: 'tab',
  meta: {
    title: 'Tab',
    childs: [],
  },
};

const newBitMapData = {
  component: componentName.BITMAP,
  field_name: 'bitmap',
  meta: {
    title: 'Bitmap',
    hide_title: false,
    paths: [],
    svgs: [],
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewMarker: '',
    onUpdateMarker: '',
    onDeleteMarker: '',
    onSelectImage: '',
  },
};

const newDataTableData = {
  component: componentName.DATA_TABLE,
  field_name: 'datatable',
  is_mandatory: true,
  meta: {
    title: 'DataTable',
    hide_title: false,
    headers: [
      {name: 'id', type: 'num'},
      {name: 'name', type: 'text'},
      {name: 'birthday', type: 'date'},
      {name: 'time', type: 'time'},
      {
        name: 'menu',
        type: 'menu',
        data: {is_mandatory: false, options: ['menu1', 'menu2']},
      },
    ],
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewEntry: '',
    onUpdateEntry: '',
    onDeleteEntry: '',
  },
};

const newRadioButtonData = {
  component: componentName.RADIO,
  field_name: 'radio_button',
  is_mandatory: true,
  meta: {
    title: 'Radio Button',
    hide_title: false,
    options: [
      'option1',
      'option2',
      'option3'
    ],
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSelect: '',
  },
};

const newGaugeChartData = {
  component: componentName.GAUGECHART,
  field_name: 'gauge_chart',
  is_mandatory: true,
  meta: {
    title: 'Gauge Chart',
    hide_title: false,
    data: {
      minValue: 0,
      maxValue: 100,
      ometerAngle: 270,
      circle: true,
      markStep: 5,
      width: 200,
      height: 200,
    },
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChangeValue: '',
  },
};

const newSliderData = {
  component: componentName.SLIDER,
  field_name: 'slider',
  is_mandatory: false,
  meta: {
    title: 'Slider',
    hide_title: false,
    data: {
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChangeValue: '',
  },
};

const newButtonData = {
  component: componentName.BUTTON,
  field_name: 'button',
  is_mandatory: false,
  meta: {
    title: 'Button',
    isText: true,
    isIcon: true,
    icon: '',
    color: '',
    iconSize: 18,
    fontSize: 14,
    fontFamily: '',
    isRound: true,
    backgroundColor: '',
    iconPosition: 'left',
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onPress: '',
  },
};

const newImageData = {
  component: componentName.IMAGE,
  field_name: 'image',
  is_mandatory: false,
  meta: {
    title: 'Image',
    hide_title: false,
    uri: '',
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSelectImage: '',
  },
};

const newCompositeData = {
  component: componentName.COMPOSITE,
  field_name: 'composite',
  is_mandatory: false,
  meta: {
    title: 'Composite',
    hide_title: false,
    numberofColumns: 4,
    spacing: 2,
    data: [],
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateCell: '',
    onDeleteCell: '',
    onChangeCell: '',
  },
};

export const newCompositeCellData = {
  name: 'none',
  span: 1,
  height: 50,
};

export const newCompositeButtonData = {
  title: 'Button',
  isText: true,
  isIcon: true,
  icon: '',
  text: 'Button',
  textColor: '',
  iconSize: 18,
  fontSize: 14,
  height: 35,
  width: '100%',
  borderRadius: 10,
  backgroundColor: '',
  iconPosition: 'left',
};

export const newCompositeTextData = {
  margin: 10,
  fontsize: 15,
  align: 'center',
  text: 'default text',
};

export const newCompositeTextInputData = {
  margin: 10,
  height: 40,
};

export const newPaymentData = {
  component: componentName.PAYMENT,
  field_name: 'payment',
  is_mandatory: false,
  meta: {
    title: 'Payment',
    hide_title: false,
    buttonText: 'Pay',
    price: 10,
    server_url: 'https://parseapi.back4app.com/functions/checkout',
    currency: 'eur',
  },
  role: [{name: 'admin', read: true, pay: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSuccessPayment: '',
  },
};

export const newPopupData = {
  component: componentName.POPUP,
  field_name: 'pop_up',
  is_mandatory: false,
  meta: {
    title: 'Pop Up',
    hide_title: false,
    buttonText: 'Open Popup',
    popupTitle: 'Setting',
    childs: [],
    option: false,
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onClick: '',
  },
};

export const newEmbeddedData = {
  component: componentName.EMBEDDED,
  field_name: 'embedded',
  is_mandatory: false,
  meta: {
    title: 'Custom',
    hide_title: false,
    buttonText: 'Send Result',
    apiUrl: '',
    header: {},
    body: {},
    useAPIForm: false,
    response: [],
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onClick: '',
  },
};

export const newCardSlider = {
  component: componentName.CARDSLIDER,
  field_name: 'card_slider',
  is_mandatory: false,
  meta: {
    title: 'Card List',
    buttonText: 'Button',
    autoplay: false,
    visibleDots: true,
    isGradientBackground: true,
    buttonBackgroundStartColor: '#3A88B2',
    buttonBackgroundEndColor: '#84DCD2', 
    cardtemplate: 'card1',
    cardCorner: 'default',
    cardWidth: 'auto',
    cardBackgroundColor: '#FFFFFF',
    selectedCardIndex: -1,
    titleFont: {
      color: '#5AB7C4',
      fontSize: 15,
      fontFamily: 'PublicSans-Regular',
    },
    descriptionFont: {
      color: '#000000',
      fontSize: 14,
      fontFamily: 'PublicSans-Regular',
    },
    buttonTextFont: {
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: 'PublicSans-Regular',
    },
    cardDatas: [
      {
        image: '',
        title: 'Title 1',
        subTitle: 'SubTitle 1',
        description: 'Description 1',
        hyperlink: '',
      },
      {
        image: '',
        title: 'Title 2',
        subTitle: 'SubTitle 2',
        description: 'Description 2',
      },
      {
        image: '',
        title: 'Title 3',
        subTitle: 'SubTitle 3',
        description: 'Description 3',
      },
    ],
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateCard: '',
    onChangeCard: '',
    onDeleteCard: '',
  },
};

export const newTwitterData = {
  component: componentName.TWITTER,
  field_name: 'twitter',
  is_mandatory: false,
  meta: {
    title: 'Twitter',
    tweetUrl: 'https://twitter.com/',
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onClick: '',
  },
};

export const newVoiceMessage = {
  component: componentName.VOICEMESSAGE,
  field_name: 'voice_message',
  is_mandatory: false,
  meta: {
    title: 'Voice Message',
    hide_title: false,
    audio_uri: '',
  },
  role: [{name: 'admin', view: true, edit: true}],
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateMessage: '',
    onStartPlay: '',
    onPausePlay: '',
    onResumePlay: '',
    onStopPlay: '',
  },
};

export const newCard = {
  image: '',
  title: 'Title',
  subTitle: 'SubTitle',
  description: 'Description',
  hyperlink: '',
}

export const newFieldData = {
  [componentName.TEXT_INPUT]: newInputTextData,
  [componentName.DATE_PICKER]: newInputDateData,
  [componentName.TIME_PICKER]: newInputTimeData,
  [componentName.FILE_UPLOAD]: newFileUploadData,
  [componentName.DROPDOWN]: newDropDownData,
  [componentName.LINECHART]: newLineChartData,
  [componentName.BARCHART]: newBarChartData,
  [componentName.PIECHART]: newPieChartData,
  [componentName.RADARCHART]: newRadarChartData,
  [componentName.MAP]: newMapData,
  [componentName.CALENDAR]: newCalendarData,
  [componentName.BITMAP]: newBitMapData,
  [componentName.DATA_TABLE]: newDataTableData,
  [componentName.RADIO]: newRadioButtonData,
  [componentName.GAUGECHART]: newGaugeChartData,
  [componentName.GRID]: newGridData,
  [componentName.LISTSECTION]: newListSectionData,
  [componentName.TABSECTION]: newTabSectionData,
  [componentName.TAB]: newTabData,
  [componentName.GROUP]: newGroupData,
  [componentName.SLIDER]: newSliderData,
  [componentName.BUTTON]: newButtonData,
  [componentName.IMAGE]: newImageData,
  [componentName.COMPOSITE]: newCompositeData,
  [componentName.PAYMENT]: newPaymentData,
  [componentName.POPUP]: newPopupData,
  [componentName.EMBEDDED]: newEmbeddedData,
  [componentName.CARDSLIDER]: newCardSlider,
  [componentName.CARD]: newCard,
  [componentName.TWITTER]: newTwitterData,
  [componentName.VOICEMESSAGE]: newVoiceMessage,
};

export const datatypes = {
  addTab: 'addTab',
  editTab: 'editTab',
  deleteTab: 'deleteTab',
  changeInfo: 'changeInfo',

  label: 'label',
  mandatory: 'mandatory',
  addLine: 'addLine',
  changeLine: 'changeLine',
  deleteLine: 'deleteLine',
  addLabel: 'addLabel',
  changeLabel: 'changeLabel',
  deleteLabel: 'deleteLabel',
  changeY: 'changeY',
  edit: 'edit',
  delete: 'delete',
  setting: 'setting',
  actionSetting: 'actionSetting',
  dropdownAddNewOption: 'dropdownAddNewOption',
  dropdownRemoveOption: 'dropdownRemoveOption',
  header: 'header',
  placeholder: 'placeholder',
  multiline: 'multiline',
  numberOfLine: 'numberOfLine',
  role: 'role',
  addBarChartLabel: 'addBarChartLabel',
  changeBarChartLabel: 'changeBarChartLabel',
  changeBarChartValue: 'changeBarChartValue',
  deleteBarChartLabel: 'deleteBarChartLabel',
  addPieChartLabel: 'addPieChartLabel',
  changePieChartLabel: 'changePieChartLabel',
  deletePieChartLabel: 'deletePieChartLabel',
  changePieChartValue: 'changePieChartValue',
  addRadarLine: 'addRadarLine',
  changeRadarLine: 'changeRadarLine',
  deleteRadarLine: 'deleteRadarLine',
  addRadarAxis: 'addRadarAxis',
  changeRadarAxis: 'changeRadarAxis',
  deleteRadarAxis: 'deleteRadarAxis',
  changeRadarValue: 'changeRadarValue',
  addPoint: 'addPoint',
  addFence: 'addFence',
  deleteFence: 'deleteFence',
  deletePoint: 'deletePoint',
  addPolygonFence: 'addPolygonFence',
  addSchedule: 'addSchedule',
  addNewSchedule: 'addNewSchedule',
  deleteEvent: 'deleteEvent',
  editEvent: 'editEvent',
  changeMapData: 'changeMapData',
};

export const string16 = data => {
  const tempstring16 = data.toString(16);
  if (tempstring16.length === 1) {
    return '0' + tempstring16;
  } else {
    return tempstring16;
  }
};

export const componentFields = {
  title: 'title',
  is_mandatory: 'is_mandatory',
  placeholder: 'placeholder',
  multiline: 'multiline',
  numberOfLines: 'numberOfLines',
};

export const fieldMenuData = {
  items: [
    {
      name: 'Group',
      items: [
        {
          name: 'Section',
          key: componentName.GROUP,
          icon: 'plus-square',
        },
        {
          name: 'Multi tabs',
          key: componentName.TABSECTION,
          icon: 'folder-plus',
        },
        {
          name: 'Grid',
          key: componentName.GRID,
          icon: 'grid',
        },
        // {
        //   name: 'List',
        //   key: componentName.LISTSECTION,
        //   icon: 'list',
        // },
        // {
        //   name: 'Composite',
        //   key: componentName.COMPOSITE,
        //   icon: 'sidebar',
        // },
        // {
        //   name: 'Pop up',
        //   key: componentName.POPUP,
        //   icon: 'airplay',
        // },
      ],
    },
    {
      name: 'Input',
      items: [
        {
          name: 'TextBox',
          key: componentName.TEXT_INPUT,
          icon: 'type',
        },
        {
          name: 'Date',
          key: componentName.DATE_PICKER,
          icon: 'clipboard',
        },
        {
          name: 'Time',
          key: componentName.TIME_PICKER,
          icon: 'clock',
        },
        {
          name: 'File Upload',
          key: componentName.FILE_UPLOAD,
          icon: 'share',
        },
        {
          name: 'Drop Down',
          key: componentName.DROPDOWN,
          icon: 'list',
        },
        {
          name: 'Radio Group',
          key: componentName.RADIO,
          icon: 'disc',
        },
        {
          name: 'Button',
          key: componentName.BUTTON,
          icon: 'pause-circle',
        },
        {
          name: 'Data Table',
          key: componentName.DATA_TABLE,
          icon: 'layout',
        },
        // {
        //   name: 'Slider',
        //   key: componentName.SLIDER,
        //   icon: 'sliders',
        // },
        {
          name: 'Image',
          key: componentName.IMAGE,
          icon: 'image',
        },
      ],
    },
    {
      name: 'Chart',
      items: [
        {
          name: 'Line Chart',
          key: componentName.LINECHART,
          icon: 'activity',
        },
        {
          name: 'Bar Chart',
          key: componentName.BARCHART,
          icon: 'bar-chart-2',
        },
        {
          name: 'Pie Chart',
          key: componentName.PIECHART,
          icon: 'pie-chart',
        },
        {
          name: 'Radar Chart',
          key: componentName.RADARCHART,
          icon: 'box',
        },
        // {
        //   name: 'Gauge Chart',
        //   key: componentName.GAUGECHART,
        //   icon: 'compass',
        // },
      ],
    },
    {
      name: 'Widget',
      items: [
        {
          name: 'Calendar',
          key: componentName.CALENDAR,
          icon: 'calendar',
        },
        {
          name: 'Map',
          key: componentName.MAP,
          icon: 'map',
        },
        {
          name: 'Bitmap',
          key: componentName.BITMAP,
          icon: 'image',
        },
      ],
    },
    {
      name: '3rd-Party',
      items: [
        {
          name: 'Twitter',
          key: componentName.TWITTER,
          icon: 'twitter',
        },
        {
          name: 'Stripe',
          key: componentName.PAYMENT,
          icon: 'dollar-sign',
        },
        {
          name: 'Custom',
          key: componentName.EMBEDDED,
          icon: 'download',
        },
      ],
    },
    {
      name: 'Featured Widget',
      items: [
        {
          name: 'Card Slider',
          key: componentName.CARDSLIDER,
          icon: 'columns',
        },
        {
          name: 'Voice Message',
          key: componentName.VOICEMESSAGE,
          icon: 'mic',
        },
      ],
    },
  ],
};

export const icons = [
  'access-point',
  'account',
  'account-box',
  'account-circle',
  'account-music',
  'android-messages',
  'application',
  'bell',
  'bicycle',
  'book',
  'bug',
  'bugle',
  'calculator',
  'camera-enhance',
  'car',
  'card-account-mail',
  'cellphone',
  'chart-arc',
  'chart-bar',
  'chart-bell-curve',
  'chart-line',
  'chat-processing',
];

export const menuItems = [
  {name: 'New', icon: 'file-plus-outline'},
  {name: 'Save', icon: 'content-save-outline'},
  {name: 'Save As', icon: 'content-save-edit-outline'},
  {name: 'Rename', icon: 'pencil-outline'},
  {name: 'Delete', icon: 'delete-forever-outline'},
];
