import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Text,
} from 'react-native';
import DynamicTabViewScrollHeader from './DynamicTabViewScrollHeader';
import PropTypes from 'prop-types';

class DynamicTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.defaultIndex,
      containerWidth: Dimensions.get('window').width,
      begin_offset: null,
      end_offset: null,
    };
    this.defaultStyle = defaultStyle;
    this.headerRef = React.createRef();
  }

  componentDidMount() {
    //HACK
    let wait = new Promise(resolve => setTimeout(resolve, 100));
    wait.then(() => {
      this.flatView.scrollToIndex({index: this.state.index, animated: false});
      this.headerRef.scrollHeader(this.state.index);
    });
  }

  handleTabChange = (type, data) => {
    this.props.parentReference(type, data);
  };

  getItemLayout = (data, index) => ({
    length: this.state.containerWidth,
    offset: this.state.containerWidth * index,
    index,
  });

  goToPage = index => {
    this.setState({index});
    this.flatView.scrollToIndex({index});
    if (this.props.onChangeTab) {
      this.props.onChangeTab(index);
    }

    this.headerRef.scrollHeader(index);
  };

  onScrollBeginDrag = e => {
    var begin_offset = e.nativeEvent.contentOffset.x; //since horizontal scroll view begin
    this.setState({begin_offset});
  };

  onScrollEndDrag = e => {
    var end_offset = e.nativeEvent.contentOffset.x; // since horizontal scroll view end
    this.setState({end_offset});
  };

  // To calculate Page scroll from left->right or right->left
  _onCalculateIndex = (begin_offset, end_offset, width) => {
    var begin_offset = this.state.begin_offset;
    var end_offset = this.state.end_offset;
    var width = this.state.containerWidth;

    if (begin_offset < end_offset) {
      let index = Math.floor(begin_offset / width) + 1; // if Page scroll from left->right, index is increase by 1

      if (index < this.props.data.length) {
        this.goToPage(index);
      }
    } else if (begin_offset > end_offset) {
      let index = Math.ceil(begin_offset / width) - 1; // if Page scroll from right->left, index is decrease by 1

      if (index < this.props.data.length && index >= 0) {
        this.goToPage(index);
      }
    }
  };

  _onLayout = e => {
    const {width} = e.nativeEvent.layout;
    this.setState({containerWidth: width});
  };

  _renderTab = ({item, index}) => {
    return (
      <View
        style={[
          {width: this.state.containerWidth},
          this.defaultStyle.tabContainer,
          this.props.tabContainerStyle,
        ]}>
        {this.props.renderTab(item, index)}
      </View>
    );
  };

  _renderHeader = () => {
    return (
      <View
        style={[
          this.defaultStyle.headerContainer,
          this.props.headerContainerStyle,
        ]}>
        <DynamicTabViewScrollHeader
          ref={headerRef => {
            this.headerRef = headerRef;
          }}
          data={this.props.data}
          goToPage={this.goToPage}
          selectedTab={this.state.index}
          headerBackgroundColor={this.props.headerBackgroundColor}
          headerTextStyle={this.props.headerTextStyle}
          headerUnderlayColor={this.props.headerUnderlayColor}
          onHandleTab={this.handleTabChange}
          underlayPosition={this.props.underlayPosition}
          preview={this.props.preview}
        />
      </View>
    );
  };

  render() {
    return (
      <View
        onLayout={this._onLayout}
        style={[this.defaultStyle.container, this.props.containerStyle]}>
        {this._renderHeader()}
        <FlatList
          {...this.props}
          horizontal
          scrollEnabled={true}
          ref={flatView => {
            this.flatView = flatView;
          }}
          styleCustomization={this.props.styleCustomization}
          renderItem={this._renderTab}
          scrollEventThrottle={10}
          keyboardDismissMode={'on-drag'}
          getItemLayout={this.getItemLayout}
          pagingEnabled={true}
          onMomentumScrollBegin={this._onCalculateIndex}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
        />
      </View>
    );
  }
}

// const DynamicTabView = props => {
//   const {
//     data,
//     defaultIndex,
//     onChangeTab,
//     styleCustomization,
//     containerStyle,
//     tabContainerStyle,
//     headerContainerStyle,
//     //header style props
//     headerBackgroundColor,
//     headerTextStyle,
//     highlightStyle,
//     noHighlightStyle,
//     headerUnderlayColor,
//     renderTab,
//   } = props;

//   const [index, setIndex] = useState(defaultIndex || 0);
//   const [containerWidth, setContainerWidth] = useState(
//     Dimensions.get('window').width,
//   );
//   const [begin_offset1, set_begin_offset] = useState(null);
//   const [end_offset1, set_end_offset] = useState(null);
//   const defaultStyle = tabview_defaultStyle;
//   const flatViewRef = useRef();
//   const headerRef = useRef();

//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     index: this.props.defaultIndex,
//   //     containerWidth: Dimensions.get('window').width,
//   //     begin_offset: null,
//   //     end_offset: null,
//   //   };
//   //   this.defaultStyle = defaultStyle;
//   // }

//   useEffect(() => {
//     let wait = new Promise(resolve => setTimeout(resolve, 100));
//     wait.then(() => {
//       flatViewRef.current.scrollToIndex({index: index, animated: false});
//       headerRef.current.scrollHeader(index);
//     });
//   }, []);

//   // componentDidMount() {
//   //   //HACK
//   //   let wait = new Promise(resolve => setTimeout(resolve, 100));
//   //   wait.then(() => {
//   //     this.headerRef.scrollToIndex({index: index, animated: false});
//   //     headerRef.scrollHeader(index);
//   //   });
//   // }

//   const getItemLayout = (data, tabIndex) => ({
//     length: containerWidth,
//     offset: containerWidth * tabIndex,
//     tabIndex,
//   });

//   const goToPage = pageindex => {
//     setIndex(pageindex);
//     flatViewRef.current.scrollToIndex({pageindex});
//     if (onChangeTab) {
//       onChangeTab(pageindex);
//     }

//     headerRef.scrollHeader(pageindex);
//   };

//   const onScrollBeginDrag = e => {
//     var begin_offset = e.nativeEvent.contentOffset.x; //since horizontal scroll view begin
//     set_begin_offset(begin_offset);
//   };

//   const onScrollEndDrag = e => {
//     var end_offset = e.nativeEvent.contentOffset.x; // since horizontal scroll view end
//     set_end_offset(end_offset);
//   };

//   // To calculate Page scroll from left->right or right->left
//   const _onCalculateIndex = (begin_offset, end_offset, width) => {
//     var begin_offset = begin_offset1;
//     var end_offset = end_offset1;
//     var width = containerWidth;

//     if (begin_offset < end_offset) {
//       let index1 = Math.floor(begin_offset / width) + 1; // if Page scroll from left->right, index is increase by 1

//       if (index1 < data.length) {
//         goToPage(index1);
//       }
//     } else if (begin_offset > end_offset) {
//       let index2 = Math.ceil(begin_offset / width) - 1; // if Page scroll from right->left, index is decrease by 1

//       if (index2 < data.length && index >= 0) {
//         goToPage(index2);
//       }
//     }
//   };

//   const _onLayout = e => {
//     const {width} = e.nativeEvent.layout;
//     setContainerWidth(width);
//   };

//   const _renderTab = ({item, itemIndex}) => {
//     return (
//       <View
//         style={[
//           {width: containerWidth},
//           defaultStyle.tabContainer,
//           tabContainerStyle,
//         ]}>
//         {renderTab(item, itemIndex)}
//       </View>
//     );
//   };

//   const _renderHeader = () => {
//     return (
//       <View style={[defaultStyle.headerContainer, headerContainerStyle]}>
//         <DynamicTabViewScrollHeader
//           ref={headerRef}
//           data={data}
//           goToPage={goToPage}
//           selectedTab={index}
//           headerBackgroundColor={headerBackgroundColor}
//           headerTextStyle={headerTextStyle}
//           headerUnderlayColor={headerUnderlayColor}
//         />
//       </View>
//     );
//   };

//   return (
//     <View onLayout={_onLayout} style={[defaultStyle.container, containerStyle]}>
//       {_renderHeader()}
//       <FlatList
//         {...props}
//         horizontal
//         scrollEnabled={true}
//         ref={flatViewRef}
//         styleCustomization={styleCustomization}
//         renderItem={_renderTab}
//         scrollEventThrottle={10}
//         keyboardDismissMode={'on-drag'}
//         getItemLayout={getItemLayout}
//         pagingEnabled={true}
//         onMomentumScrollBegin={_onCalculateIndex}
//         onScrollBeginDrag={onScrollBeginDrag}
//         onScrollEndDrag={onScrollEndDrag}
//       />
//     </View>
//   );
// };

// const tabview_defaultStyle = {
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     backgroundColor: 'white',
//   },
//   tabContainer: {
//     flex: 1,
//   },
//   labelStyle: {
//     color: 'white',
//   },
//   indicatorStyle: {
//     backgroundColor: 'white',
//     marginVertical: 1,
//     bottom: 4, //indicatorStyle is implemented in absolute in the library
//     height: 4,
//   },
// };

const defaultStyle = {
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
  },
  tabContainer: {
    flex: 1,
  },
  labelStyle: {
    color: 'white',
  },
  indicatorStyle: {
    backgroundColor: 'white',
    marginVertical: 1,
    bottom: 4, //indicatorStyle is implemented in absolute in the library
    height: 4,
  },
};

DynamicTabView.defaultProps = {
  defaultIndex: 0,
  containerStyle: {},
  tabContainerStyle: {},
  headerContainerStyle: {},

  //styles for header
  headerTextStyle: {},
  highlightStyle: {},
  noHighlightStyle: {},
};

DynamicTabView.propTypes = {
  parentReference: PropTypes.func,
  onChangeTab: PropTypes.func,
  styleCustomization: PropTypes.object,
  containerStyle: PropTypes.any,
  tabContainerStyle: PropTypes.any,
  headerContainerStyle: PropTypes.any,
  //header style props
  headerBackgroundColor: PropTypes.any,
  headerTextStyle: PropTypes.any,
  highlightStyle: PropTypes.any,
  noHighlightStyle: PropTypes.any,
  headerUnderlayColor: PropTypes.any,
  underlayPosition: PropTypes.any,
};

export default DynamicTabView;
