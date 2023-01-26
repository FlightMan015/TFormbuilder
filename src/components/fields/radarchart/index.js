import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import VictoryRadar from './VictoryRadar';
import Title from '../../../common/Title';
import RadarChartDataSection from './datasection';
import { datatypes, string16 } from '../../../constant';
import formStore from '../../../store/formStore';

const RadarChartSubField = ({element, index, userRole, onClickUpdateField}) => {
  const {colors} = useTheme();
  const [chartWidth, setChartWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  const [meta, setMeta] = useState(element.meta);

  useEffect(() => {
    setMeta({...element.meta});
  }, [element]);

  const onLayout = useCallback(event => {
    setChartWidth(event.nativeEvent.layout.width - 10);
  }, []);

  const onChangeData = (type, changedData, dataindex1, dataindex2) => {
    switch (type) {
      case datatypes.addRadarLine:
        const tempData1 = JSON.parse(JSON.stringify(meta.data));
        const axisArray = Object.keys(tempData1.datasets[0]);
        const newLinedata = {};
        axisArray.map((e, i) => {
          newLinedata[axisArray[i]] = 100;
        });
        tempData1.datasets.push(newLinedata);
        tempData1.lines.push(changedData.newLine);
        tempData1.colors.push(
          '#' +
            string16(changedData.red) +
            string16(changedData.green) +
            string16(changedData.blue),
        );
        setMeta({
          ...meta,
          data: tempData1,
        });

        if (element.event.onCreateNewSeries) {
          Alert.alert('Rule Action', `Fired onCreateNewSeries action. rule - ${element.event.onCreateNewSeries}. newSeries - ${JSON.stringify(tempData1)}`);
        }
        break;
      case datatypes.changeRadarLine:
        const tempData2 = JSON.parse(JSON.stringify(meta.data));
        tempData2.lines.splice(dataindex1, 1, changedData.newLine);
        tempData2.colors.splice(
          dataindex1,
          1,
          '#' +
            string16(changedData.red) +
            string16(changedData.green) +
            string16(changedData.blue),
        );
        setMeta({
          ...meta,
          data: tempData2,
        });

        if (element.event.onUpdateSeries) {
          Alert.alert('Rule Action', `Fired onChangeSeries action. rule - ${element.event.onChangeSeries}. newSeries - ${JSON.stringify(tempData2)}`);
        }
        break;
      case datatypes.deleteRadarLine:
        const tempData3 = JSON.parse(JSON.stringify(meta.data));
        tempData3.datasets.splice(dataindex1, 1);
        tempData3.lines.splice(dataindex1, 1);
        tempData3.colors.splice(dataindex1, 1);
        setMeta({
          ...meta,
          data: tempData3,
        });

        if (element.event.onDeleteSeries) {
          Alert.alert('Rule Action', `Fired onDeleteSeries action. rule - ${element.event.onDeleteSeries}. newSeries - ${JSON.stringify(tempData3)}`);
        }
        break;
      case datatypes.addRadarAxis:
        const tempData4 = JSON.parse(JSON.stringify(meta.data));
        const tempDatasets = tempData4.datasets.map(e => {
          return {
            ...e,
            [changedData]: 10,
          };
        });
        const tempData5 = {
          ...tempData4,
          datasets: tempDatasets,
        };
        setMeta({
          ...meta,
          data: tempData5,
        });

        if (element.event.onCreateNewAxis) {
          Alert.alert('Rule Action', `Fired onCreateNewAxis action. rule - ${element.event.onCreateNewAxis}. newSeries - ${JSON.stringify(tempData5)}`);
        }
        break;
      case datatypes.changeRadarAxis:
        const tempData6 = JSON.parse(JSON.stringify(meta.data));
        const tempDatasets1 = tempData6.datasets.map(e => {
          const tempArray = {
            ...e,
            [changedData]: e[dataindex1],
          };
          delete tempArray[dataindex1];
          return tempArray;
        });
        const tempData7 = {
          ...tempData6,
          datasets: tempDatasets1,
        };
        setMeta({
          ...meta,
          data: tempData7,
        });

        if (element.event.onUpdateAxis) {
          Alert.alert('Rule Action', `Fired onUpdateAxis action. rule - ${element.event.onUpdateAxis}. newSeries - ${JSON.stringify(tempData7)}`);
        }
        break;
      case datatypes.deleteRadarAxis:
        const tempData8 = JSON.parse(JSON.stringify(meta.data));
        const tempDatasets2 = tempData8.datasets.map(e => {
          delete e[dataindex1];
          return e;
        });
        const tempData9 = {
          ...tempData8,
          datasets: tempDatasets2,
        };
        setMeta({
          ...meta,
          data: tempData9,
        });

        if (element.event.onDeleteAxis) {
          Alert.alert('Rule Action', `Fired onDeleteAxis action. rule - ${element.event.onDeleteAxis}. newSeries - ${JSON.stringify(tempData9)}`);
        }
        break;
      case datatypes.changeRadarValue:
        const tempData10 = JSON.parse(JSON.stringify(meta.data));
        tempData10.datasets[dataindex1] = {
          ...tempData10.datasets[dataindex1],
          [dataindex2]: changedData,
        };
        setMeta({
          ...meta,
          data: tempData10,
        });

        if (element.event.onUpdateValue) {
          Alert.alert('Rule Action', `Fired onUpdateYValue action. rule - ${element.event.onUpdateYValue}. newSeries - ${JSON.stringify(tempData10)}`);
        }
        break;
      case 'changeField':
        const tempElement = {
          ...element,
          meta: meta,
        };
        onClickUpdateField(index, tempElement);
        setVisible(false);
        break;
      case 'cancel':
        setMeta({...element.meta});
        setVisible(false);
        break;
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Radar Chart'}</Text>
      <VictoryRadar meta={meta} />
      <View style={styles.titleView}>
        <Title
          name="Datas"
          onPress={() => setVisible(!visible)}
          visible={visible}
        />
      </View>
      {visible && (
        <RadarChartDataSection meta={meta} onChangeData={onChangeData} userRole={userRole} />
      )}
    </View>
  );
};

const RadarChartField = ({element, index, userRole}) => {
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <RadarChartSubField  onClickUpdateField={updateFormData} element={element} index={index} userRole={userRole} />, [element, index, userRole]);
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  carouselTitle: colors => ({
    fontSize: 16,
    padding: 5,
    color: colors.text,
  }),
  titleView: {
    paddingLeft: 10,
  },
});

RadarChartField.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(RadarChartField);
