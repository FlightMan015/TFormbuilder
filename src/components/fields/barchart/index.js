import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import BarChartDataSection from './datasection';
import { datatypes } from '../../../constant';
import Title from '../../../common/Title';
import formStore from '../../../store/formStore';

const BarChartSubField = ({element, index, editRole, onClickUpdateField}) => {
  const {colors} = useTheme();
  const [chartWidth, setChartWidth] = useState(0);
  const [data, setData] = useState({labels: [], datasets: [{data: []}]});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tempData = JSON.parse(JSON.stringify(element.meta.data));
    setData({...tempData});
  }, [element]);

  const onLayout = useCallback(event => {
    setChartWidth(event.nativeEvent.layout.width - 10);
  }, []);

  const onChangeData = (type, changedData, dataIndex) => {
    switch (type) {
      case datatypes.addBarChartLabel:
        const labels1 = [...data.labels, changedData];
        const datasets1 = [...data.datasets];
        datasets1[0].data.push(0);
        setData({...data, labels: labels1, datasets: datasets1});

        if (element.event.onCreateNewLabel) {
          Alert.alert(
            'Rule Action',
            `Fired onCreateNewLabel action. rule - ${
              element.event.onCreateNewLabel
            }. newSeries - ${JSON.stringify({
              ...data,
              labels: labels1,
              datasets: datasets1,
            })}`,
          );
        }
        break;
      case datatypes.changeBarChartLabel:
        const labels2 = [...data.labels];
        labels2.splice(dataIndex, 1, changedData);
        setData({...data, labels: labels2});

        if (element.event.onUpdateLabel) {
          Alert.alert(
            'Rule Action',
            `Fired onUpdateLabel action. rule - ${
              element.event.onUpdateLabel
            }. newSeries - ${JSON.stringify({...data, labels: labels2})}`,
          );
        }
        break;
      case datatypes.deleteBarChartLabel:
        const labels3 = [...data.labels];
        labels3.splice(dataIndex, 1);
        const datasets2 = [...data.datasets];
        datasets2[0].data.splice(dataIndex, 1);
        setData({...data, labels: labels3});

        if (element.event.onDeleteLabel) {
          Alert.alert(
            'Rule Action',
            `Fired onDeleteLabel action. rule - ${
              element.event.onDeleteLabel
            }. newSeries - ${JSON.stringify({...data, labels: labels3})}`,
          );
        }
        break;
      case datatypes.changeBarChartValue:
        const datasets = [...data.datasets];
        datasets[0].data.splice(dataIndex, 1, changedData);
        setData({...data, datasets: datasets});

        if (element.event.onUpdateValue) {
          Alert.alert(
            'Rule Action',
            `Fired onUpdateValue action. rule - ${
              element.event.onUpdateValue
            }. newSeries - ${JSON.stringify({...data, datasets: datasets})}`,
          );
        }
        break;
      case 'changeField':
        const tempMetaData = {...element.meta, data: data};
        const tempElement = {
          ...element,
          meta: tempMetaData,
        };
        onClickUpdateField(index, tempElement);
        setVisible(false);
        break;
      case 'cancel':
        const tempData = JSON.parse(JSON.stringify(element.meta.data));
        setData({...data, ...tempData});
        setVisible(false);
        break;
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Bar Chart'}</Text>
      <BarChart
        style={styles.barchart}
        data={data}
        width={chartWidth}
        height={200}
        yAxisLabel=""
        xAxisLabel=""
        xLabelsOffset={5}
        chartConfig={styles.chartConfig(colors)}
        showValuesOnTopOfBars
        fromZero={true}
        // verticalLabelRotation={60}
      />
      {editRole && (
        <>
          <Title
            name="Datas"
            onPress={() => setVisible(!visible)}
            visible={visible}
          />
          {visible && (
            <BarChartDataSection data={data} onChangeData={onChangeData} />
          )}
        </>
      )}
    </View>
  );
};

const BarChartField = ({element, index, editRole}) => {
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <BarChartSubField  onClickUpdateField={updateFormData} element={element} index={index} editRole={editRole} />, [element, index, editRole]);
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
  barchart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartConfig: colors => ({
    // backgroundColor: "#e26a00",
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 2,
    color: (opacity = 1) => colors.colorButton,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  }),
});

BarChartField.propTypes = {
  element: PropTypes.object.isRequired,
  index: PropTypes.object.isRequired,
};

export default BarChartField;
