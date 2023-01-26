import React, {useState, useRef} from 'react';
import {Button, TouchableHighlight, Text, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
const ScreenWidth = Dimensions.get('window').width;
class DynamicTabViewScrollHeader extends React.Component {
  constructor(props) {
    super(props);
    this.defaultStyle = DynamicdefaultStyle;
    this.state = {
      selected: this.props.selectedTab,
      underlayPosition: this.props.underlayPosition || 'bottom',
    };
  }

  _onPressHeader = index => {
    this.props.goToPage(index);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTab !== this.props.selectedTab) {
      this.setState({selected: nextProps.selectedTab});
    }
  }

  _renderTitle = ({item, index}) => {
    let isTabActive = index === this.state.selected;
    let fontWeight = isTabActive ? 'bold' : 'normal';
    let fontColor = isTabActive ? this.props.headerTextStyle.color : 'grey';
    return (
      <TouchableHighlight
        onPress={this._onPressHeader.bind(this, index)}
        style={[
          this.defaultStyle.tabItemContainer,
          {
            backgroundColor: this.props.headerBackgroundColor,
            width:
              this.props.data.length > 0 &&
              ScreenWidth / this.props.data.length > 80
                ? ScreenWidth / this.props.data.length
                : 80,
          },
        ]}
        underlayColor={'#00000033'}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth:
              this.state.underlayPosition === 'bottom' && isTabActive ? 4 : 0,
            borderTopWidth:
              this.state.underlayPosition === 'top' && isTabActive ? 4 : 0,
            paddingHorizontal: 5,
            borderColor: this.props.headerUnderlayColor,
          }}>
          {/* <View>
          {this._renderHighlight(isTabActive)} */}
          <View style={{alignItems: 'center', paddingVertical: 5}}>
            {item.meta.icon && (
              <MaterialCommunityIcons
                name={item.meta.icon}
                color={fontColor}
                size={item.meta.iconSize || 25}
              />
            )}
            <Text
              style={[
                {
                  fontWeight: fontWeight,
                  fontSize: item.meta.icon ? 12 : 17,
                  paddingVertical: item.meta.icon ? 0 : 10,
                },
                this.defaultStyle.tabItemText,
                this.props.headerTextStyle,
                {color: fontColor},
              ]}>
              {item.meta.title}
            </Text>
          </View>
          {/* </View> */}
        </View>
      </TouchableHighlight>
    );
  };

  _renderHighlight = showHighlight => {
    if (showHighlight) {
      return (
        <View
          style={[
            this.defaultStyle.highlight,
            this.props.highlightStyle,
            {backgroundColor: this.props.headerUnderlayColor},
          ]}
        />
      );
    } else {
      return (
        <View
          style={[this.defaultStyle.noHighlight, this.props.noHighlightStyle]}
        />
      );
    }
  };

  scrollHeader = index => {
    this.headerView.scrollToIndex({index, animated: true});
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.headerBackgroundColor,
          flexDirection: 'row',
        }}>
        <FlatList
          horizontal
          alwaysBounceHorizontal={false}
          ref={headerView => {
            this.headerView = headerView;
          }}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          extraData={this.state}
          renderItem={this._renderTitle}
          style={[
            this.defaultStyle.headerStyle,
            {backgroundColor: this.props.headerBackgroundColor},
          ]}
        />
      </View>
    );
  }
}

const DynamicdefaultStyle = {
  headerStyle: {},
  tabItemText: {
    color: 'white',
  },
  tabItemContainer: {
    overflow: 'hidden',
    backgroundColor: '#555555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 1.5,
    marginTop: 2,
  },
  noHighlight: {
    paddingHorizontal: 10,
    paddingVertical: 1.5,
    marginTop: 2,
  },
};

DynamicTabViewScrollHeader.defaultProps = {
  selectedTab: 0,
  headerBackgroundColor: '#555555',
  headerUnderlayColor: '#00000033',
};

DynamicTabViewScrollHeader.propTypes = {
  goToPage: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  headerBackgroundColor: PropTypes.any,
  headerTextStyle: PropTypes.any,
  highlightStyle: PropTypes.any,
  noHighlightStyle: PropTypes.any,
  headerUnderlayColor: PropTypes.any,
};

export default DynamicTabViewScrollHeader;
