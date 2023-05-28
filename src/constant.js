/* eslint-disable prettier/prettier */
export const stripePubKey = 'pk_test_51M439GCc34pJZGeiWGWBUESTc6zTakAmrlKjGfZycotvoCPRJYfwDnGkdgAxG540gvdfx9ftpU7dqoMT3kN4vRAt00tS8MT56c';

export const languages = [
  {name: 'English', code: 'en'},
  {name: 'French', code: 'fr'},
  {name: 'Arabic', code: 'ar'},
];

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
  SPACE: 'space',
  GROUP: 'group',
  LINECHART: 'line_chart',
  BARCHART: 'bar_chart',
  PIECHART: 'pie_chart',
  RADARCHART: 'radar_chart',
  MAP: 'map',
  CALENDAR: 'calendar',
  SCHEDULAR: 'schedular',
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
  QUESTIONANDANSWER: "QUESTIONANDANSWER",
  CONTACT: "CONTACT",
  NAVIGATIONBUTTON: "NAVIGATIONBUTTON",
  NOTIFICATION: "NOTIFICATION",
  DATACARD: "DATACARD"
};

export const radioButton = {
  selected: require('./assets/icon_images/selectedRadio.png'),
  unselected: require('./assets/icon_images/unselectedRadio.png'),
};

export const navigationButtonImages = {
  find_doctor: require('./assets/icon_images/find_doctor.png'),
  online_consultation: require('./assets/icon_images/online_consultation.png'),
  visiting_history: require('./assets/icon_images/visiting_history.png'),
  x_ray_report: require('./assets/icon_images/x_ray_report.png'),
};

export const emptyImage = require('./assets/icon_images/imageIcon.png');

// TODO: Need to remove isMandatory for below fields from template json.
export const skipValidationForFields = [
  'image',
  'image-with-link',
  'read-only-text',
  'header',
  'space',
  'line-chart',
  'bar-chart',
  'pie-chart',
  'radar-chart',
  'gauge_chart',
];

export const shapes = [
  {name: 'draw', icon: 'draw'},
  {name: 'square', icon: 'square-outline'},
  {name: 'rectangle', icon: 'rectangle-outline'},
  {name: 'circle', icon: 'circle-outline'},
  {name: 'ellipse', icon: 'ellipse-outline'},
  {name: 'polygon', icon: 'pentagon-outline'},
  {name: 'line', icon: 'slash-forward'},
  {name: 'text', icon: 'alphabetical-variant'},
];

export const modes = {
  builder: 'builder',
  submitter: 'submitter',
  reviewer: 'reviewer',
  approver: 'approver',
};

export const newFormData = {
  name: 'New TForm',
  isPublic: false,
  isShared: [],
  logo: '',
  data: [],
  theme: 'Native',
  lightStyle: {
    formBackgroundColor: '#F8F8F8',
    backgroundPatternImage: '',
    foregroundColor: '#FFFFFF',
    buttonBackgroundColor: '#3E7EFF',
    buttonTexts: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: 'PublicSans-Regular',
    },
    headings: {
      fontSize: 18,
      color: '#080808',
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
    buttonBackgroundColor: '#3E7EFF',
    buttonTexts: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: 'PublicSans-Regular',
    },
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
  roles: [
    {name: 'submitter', view: false, edit: false, submit: true, users: [], fieldRoles: {}},
    {name: 'reviewer', view: false, edit: true, submit: false, users: [], fieldRoles: {}},
    {name: 'approver', view: true, edit: false, submit: false, users: [], fieldRoles: {}},
  ],
  checkedRoles: [],
};

const newHeaderData = {
  component: componentName.HEADER,
  field_name: 'header',
  is_mandatory: false,
  meta: {
    header: 'New Header',
    textAlign: 'center',
    field_width: '100%',
    font: {
      fontSize: 18,
      color: '#4195B4',
      fontFamily: 'PublicSans-Bold'
    },
    padding: {
      paddingTop: 0,
      paddingLeft: 0,
      paddingBottom: 0,
      paddingRight: 0
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {

  }
}

const newSpaceData = {
  component: componentName.SPACE,
  field_name: 'space',
  is_mandatory: false,
  meta: {
    width: 100,
    height: 30,
    backgroundColor: '#FFFF00',
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
  }
}

const newInputTextData = {
  component: componentName.TEXT_INPUT,
  field_name: 'textbox',
  is_mandatory: true,
  meta: {
    title: 'TextBox',
    hide_title: false,
    placeholder: 'Enter text..',
    numberOfLines: '1',
    multiline: false,
    field_width: '100%',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
  is_mandatory: false,
  meta: {
    title: 'Date',
    hide_title: false,
    field_width: '100%',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    field_width: '100%',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSelect: '',
  },
};

const newInputTimeData = {
  component: componentName.TIME_PICKER,
  field_name: 'time',
  is_mandatory: false,
  meta: {
    title: 'Time',
    hide_title: false,
    field_width: '100%',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    field_width: '100%',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onSelectFile: '',
  },
};

const newLineChartData = {
  component: componentName.LINECHART,
  field_name: 'line-chart',
  is_mandatory: false,
  meta: {
    title: 'Line Chart',
    hide_title: false,
    field_width: '100%',
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
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
  is_mandatory: false,
  meta: {
    title: 'Bar Chart',
    hide_title: false,
    field_width: '100%',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          data: [30, 40, 20],
        },
      ],
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
  is_mandatory: false,
  meta: {
    title: 'Pie Chart',
    hide_title: false,
    field_width: '100%',
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
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
  is_mandatory: false,
  meta: {
    title: 'Radar Chart',
    hide_title: false,
    field_width: '100%',
    data: {
      datasets: [
        {axis1: 140, axis2: 250, axis3: 70, axis4: 40, axis5: 50},
        {axis1: 100, axis2: 300, axis3: 90, axis4: 80, axis5: 90},
        {axis1: 180, axis2: 225, axis3: 150, axis4: 120, axis5: 120},
      ],
      lines: ['series1', 'series2', 'series3'],
      colors: ['#ff0000', '#00ff00', '#0000ff'],
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
  is_mandatory: false,
  meta: {
    title: 'Map',
    hide_title: false,
    field_width: '100%',
    data: {
      points: [],
      geofences: [],
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
  is_mandatory: false,
  meta: {
    title: 'Calendar',
    hide_title: false,
    field_width: '100%',
    items: {},
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewSchedule: '',
    onUpdateSchedule: '',
    onDeleteSchedule: '',
    onSelectDay: '',
  },
};

const newSchedularData = {
  component: componentName.SCHEDULAR,
  field_name: 'schedular',
  is_mandatory: true,
  meta: {
    title: 'Schedular',
    hide_title: false,
    field_width: '100%',
    monthFont: {
      color: '#4195B4',
      fontSize: 15,
      fontFamily: 'PublicSans-Regular',
    },
    dateFont: {
      color: '#4195B4',
      fontSize: 14,
      fontFamily: 'PublicSans-Bold',
    },
    dayFont: {
      color: '#4195B4',
      fontSize: 14,
      fontFamily: 'PublicSans-Regular',
    },
    scheduleFont: {
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: 'PublicSans-Regular',
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateNewSchedule: '',
    onUpdateSchedule: '',
    onDeleteSchedule: '',
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
    field_width: '100%',
    verticalAlign: true,
    borderWidth: {
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      borderRightWidth: 0,
    },
    borderRadius: 3,
    borderColor: '#000000',
    isButton: false,
    padding: {
      paddingTop: 0,
      paddingLeft: 0,
      paddingBottom: 0,
      paddingRight: 0
    },
    allocation: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
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
    field_width: '100%',
    cellData: {
      height: 100,
      numColumns: 3,
      autoColumn: true,
    },
    cellFields: [],
    verticalAlign: true,
  },
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
    field_width: '100%',
  },
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
    field_width: '100%',
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
    regions: [],
    markers: [],
    field_width: '100%',
    userSelectable: true,
    selectedShow: true,
    defaultState: false,
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    title: 'Data Table',
    hide_title: false,
    field_width: '100%',
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
    backgroundColor: '',
    borderColor: '#808080',
    verticalBorder: false,
    horizontalBorder: false,
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    title: 'Radio Group',
    hide_title: false,
    field_width: '100%',
    options: [
      'option1',
      'option2',
      'option3'
    ],
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    field_width: '100%',
    data: {
      minValue: 0,
      maxValue: 100,
      ometerAngle: 270,
      circle: true,
      markStep: 5,
      width: 200,
      height: 200,
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    field_width: '100%',
    data: {
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    field_width: '100%',
    isText: true,
    isIcon: true,
    icon: '',
    color: '',
    iconSize: 18,
    fontSize: 14,
    fontFamily: 'PublicSans-Regular',
    isRound: true,
    backgroundColor: '',
    iconPosition: 'left',
    function: 'None',
    width: 'fit_content',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onPress: '',
  },
};

const newImageData = {
  component: componentName.IMAGE,
  field_name: 'image',
  is_mandatory: true,
  meta: {
    title: 'Image',
    hide_title: false,
    field_width: '100%',
    width: '30%',
    maxWidth: '200',
    maxHeight: '150',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
    uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F536%2F218%2Foriginal%2Fflat-modern-family-tree-vector-template.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Ffamily-tree&tbnid=rqs5xnKcthRS5M&vet=12ahUKEwivzIDF0N39AhXSxyoKHURvBQsQMygbegUIARCqAg..i&docid=wkdbsHFvqt9DRM&w=2800&h=2800&q=tree%20image&ved=2ahUKEwivzIDF0N39AhXSxyoKHURvBQsQMygbegUIARCqAg',
  },
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
    field_width: '100%',
    numberofColumns: 4,
    spacing: 2,
    data: [],
  },
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
    field_width: '100%',
    buttonText: 'Pay',
    price: 10,
    server_url: 'https://parseapi.back4app.com/functions/checkout',
    currency: 'eur',
  },
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
    field_width: '100%',
    buttonText: 'Open Popup',
    popupTitle: 'Setting',
    childs: [],
    option: false,
  },
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
    field_width: '100%',
    buttonText: 'Send Result',
    apiUrl: '',
    header: {},
    body: {},
    useAPIForm: false,
    response: [],
  },
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
    verticalAlign: false,
    field_width: '100%',
    buttonText: 'Button',
    autoplay: false,
    visibleDots: true,
    isGradientBackground: true,
    buttonBackgroundStartColor: '#3A88B2',
    buttonBackgroundEndColor: '#84DCD2', 
    cardtemplate: 'card1',
    cardCorner: 'rounded',
    cardWidth: 'auto',
    cardBackgroundColor: '#FFFFFF',
    selectedCardIndex: -1,
    titleFont: {
      color: '#5AB7C4',
      fontSize: 15,
      fontFamily: 'PublicSans-Bold',
    },
    subTitleFont: {
      color: '#5AB7C4',
      fontSize: 13,
      fontFamily: 'PublicSans-Regular',
    },
    descriptionFont: {
      color: '#888888',
      fontSize: 12,
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
    visibleAdditionalData: true,
    additionalDatas: {
      titleValueVerticalAlign: true,
      dataNames: ['title1', 'title2', 'title3']
    },
    footer: 'button',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    field_width: '100%',
    tweetUrl: 'https://twitter.com/MMKK02887216',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
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
    field_width: '100%',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onCreateMessage: '',
    onStartPlay: '',
    onPausePlay: '',
    onResumePlay: '',
    onStopPlay: '',
    onDeleteMessage: '',
  },
};

export const newCard = {
  image: '',
  title: 'Title',
  subTitle: 'SubTitle',
  description: 'Description',
  hyperlink: '',
}

export const newQuestionAndAnswer = {
  component: componentName.QUESTIONANDANSWER,
  field_name: 'question_and_answer',
  is_mandatory: false,
  meta: {
    title: 'Question And Answer',
    field_width: '100%',
    question: "What's your gender?",
    answers: ['male', 'female'],
    answerAlign: 'row',
    checkedColor: '#4195B4',
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChecked: '',
  },
}

export const newContactData = {
  component: componentName.CONTACT,
  field_name: 'contact',
  is_mandatory: false,
  meta: {
    title: 'Contacts',
    field_width: '100%',
    name1: 'Sunday - Thursday',
    content1: '9:00 am - 9:00 pm',
    name2: 'Saturday - Friday',
    content2: 'Closed',
    otherContacts: [
      {name: 'Twitter', icon: 'twitter', uri: ''},
      {name: 'Facebook', icon: 'facebook', uri: ''},
      {name: 'Instagram', icon: 'instagram', uri: ''},
      {name: 'Snapchat', icon: 'snapchat-ghost', uri: ''}
    ],
    nameFont: {
      color: '#4195B4',
      fontSize: 16,
      fontFamily: 'PublicSans-SemiBold'
    },
    contentFont: {
      color: '#959595',
      fontSize: 14,
      fontFamily: 'PublicSans-Regular'
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChecked: '',
  },
}

export const newNavigationButtonData = {
  component: componentName.NAVIGATIONBUTTON,
  field_name: 'navigation_button',
  is_mandatory: false,
  meta: {
    title: 'Navigation Buttons',
    field_width: '100%',
    buttons: [
      {text1: 'Find', text2: 'Doctor', iconImage: ''},
      {text1: 'Online', text2: 'Consultation', iconImage: ''},
      {text1: 'Visitings', text2: 'History', iconImage: ''},
      {text1: 'X-ray', text2: 'Reports', iconImage: ''}
    ],
    firstTextFont: {
      color: '#4195B4',
      fontSize: 14,
      fontFamily: 'PublicSans-Regular'
    },
    secondTextFont: {
      color: '#4195B4',
      fontSize: 16,
      fontFamily: 'PublicSans-Bold'
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChecked: '',
  },
}

export const newNavButton = {
  text1: 'First Text',
  text2: 'Second Text',
  iconImage: '',
}

export const newNotificationData = {
  component: componentName.NOTIFICATION,
  field_name: 'notification',
  is_mandatory: false,
  meta: {
    title: 'Notification',
    field_width: '100%',
    imageUri: '',
    name: 'Name',
    description: 'Description',
    nameFont: {
      color: '#4195B4',
      fontSize: 16,
      fontFamily: 'PublicSans-Bold'
    },
    descriptionFont: {
      color: '#4195B4',
      fontSize: 12,
      fontFamily: 'PublicSans-Regular'
    },
    additionalDatas: [
      {name: 'Doctor', content: 'Saleh Ahmed'},
      {name: 'Type', content: 'Consultation'}
    ],
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChecked: '',
  },
}

export const newDataCardData = {
  component: componentName.DATACARD,
  field_name: 'data_card',
  is_mandatory: false,
  meta: {
    title: 'Data Card',
    field_width: '100%',
    datas: ['Doctor', 'Type'],
    nameFont: {
      color: '#888888',
      fontSize: 14,
      fontFamily: 'PublicSans-Regular'
    },
    descriptionFont: {
      color: '#4195B4',
      fontSize: 14,
      fontFamily: 'PublicSans-Regular'
    },
    padding: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      paddingRight: 5
    },
  },
  action: {create: false, update: false, read: false, delete: false},
  event: {
    onChecked: '',
  },
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
  [componentName.SCHEDULAR]: newSchedularData,
  [componentName.HEADER]: newHeaderData,
  [componentName.SPACE]: newSpaceData,
  [componentName.QUESTIONANDANSWER]: newQuestionAndAnswer,
  [componentName.CONTACT]: newContactData,
  [componentName.NAVIGATIONBUTTON]: newNavigationButtonData,
  [componentName.NOTIFICATION]: newNotificationData,
  [componentName.DATACARD]: newDataCardData,
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
  space: 'space',
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
      name: 'group',
      items: [
        {
          name: 'section',
          key: componentName.GROUP,
          icon: 'plus-square',
        },
        {
          name: 'multi_tab_section',
          key: componentName.TABSECTION,
          icon: 'folder-plus',
        },
        {
          name: 'grid_section',
          key: componentName.GRID,
          icon: 'grid',
        },
        {
          name: 'list_section',
          key: componentName.LISTSECTION,
          icon: 'list',
        },
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
      name: 'input',
      items: [
        // {
        //   name: 'space',
        //   key: componentName.SPACE,
        //   icon: 'image',
        // },
        {
          name: 'header',
          key: componentName.HEADER,
          icon: 'image',
        },
        {
          name: 'textbox',
          key: componentName.TEXT_INPUT,
          icon: 'type',
        },
        {
          name: 'date',
          key: componentName.DATE_PICKER,
          icon: 'clipboard',
        },
        {
          name: 'time',
          key: componentName.TIME_PICKER,
          icon: 'clock',
        },
        {
          name: 'file_upload',
          key: componentName.FILE_UPLOAD,
          icon: 'share',
        },
        {
          name: 'dropdown',
          key: componentName.DROPDOWN,
          icon: 'list',
        },
        {
          name: 'radio_group',
          key: componentName.RADIO,
          icon: 'disc',
        },
        {
          name: 'button',
          key: componentName.BUTTON,
          icon: 'pause-circle',
        },
        {
          name: 'data_table',
          key: componentName.DATA_TABLE,
          icon: 'layout',
        },
        // {
        //   name: 'slider',
        //   key: componentName.SLIDER,
        //   icon: 'sliders',
        // },
        {
          name: 'image',
          key: componentName.IMAGE,
          icon: 'image',
        },
        {
          name: 'question_and_answer',
          key: componentName.QUESTIONANDANSWER,
          icon: 'help-circle',
        },
        {
          name: 'contact',
          key: componentName.CONTACT,
          icon: 'user',
        },
        // {
        //   name: 'navigation_button',
        //   key: componentName.NAVIGATIONBUTTON,
        //   icon: 'navigation',
        // },
        // {
        //   name: 'notification',
        //   key: componentName.NOTIFICATION,
        //   icon: 'message-circle',
        // },
        // {
        //   name: 'data_card',
        //   key: componentName.DATACARD,
        //   icon: 'info',
        // },
      ],
    },
    {
      name: 'chart',
      items: [
        {
          name: 'line_chart',
          key: componentName.LINECHART,
          icon: 'activity',
        },
        {
          name: 'bar_chart',
          key: componentName.BARCHART,
          icon: 'bar-chart-2',
        },
        {
          name: 'pie_chart',
          key: componentName.PIECHART,
          icon: 'pie-chart',
        },
        {
          name: 'radar_chart',
          key: componentName.RADARCHART,
          icon: 'box',
        },
        // {
        //   name: 'gauge_chart',
        //   key: componentName.GAUGECHART,
        //   icon: 'compass',
        // },
      ],
    },
    {
      name: 'widget',
      items: [
        {
          name: 'calendar',
          key: componentName.CALENDAR,
          icon: 'calendar',
        },
        {
          name: 'schedular',
          key: componentName.SCHEDULAR,
          icon: 'flag',
        },
        {
          name: 'map',
          key: componentName.MAP,
          icon: 'map',
        },
        {
          name: 'bitmap',
          key: componentName.BITMAP,
          icon: 'image',
        },
      ],
    },
    {
      name: '3rd_party',
      items: [
        {
          name: 'twitter',
          key: componentName.TWITTER,
          icon: 'twitter',
        },
        // {
        //   name: 'stripe',
        //   key: componentName.PAYMENT,
        //   icon: 'dollar-sign',
        // },
        // {
        //   name: 'custom',
        //   key: componentName.EMBEDDED,
        //   icon: 'download',
        // },
      ],
    },
    {
      name: 'featured_widget',
      items: [
        // {
        //   name: 'card_slider',
        //   key: componentName.CARDSLIDER,
        //   icon: 'columns',
        // },
        {
          name: 'voice_message',
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
  {name: 'new', icon: 'file-plus-outline'},
  {name: 'save', icon: 'content-save-outline'},
  // {name: 'save_as', icon: 'content-save-edit-outline'},
  {name: 'rename', icon: 'pencil-outline'},
  {name: 'delete', icon: 'delete-forever-outline'},
];

export const allocations = [
  'center',
  'flex-end',
  'flex-start',
  'space-around',
  'space-between',
  'space-evenly'
];

export const alignItems = [
  'baseline',
  'center',
  'flex-end',
  'flex-start',
  'stretch',
];
