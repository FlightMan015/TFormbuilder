import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import PieChartDataSection from './datasection';
import Title from '../../../common/Title';
import { datatypes, string16 } from '../../../constant';
import formStore from '../../../store/formStore';

const PieChartSubField = ({element, index, editRole, onClickUpdateField}) => {
  const {colors} = useTheme();
  const [chartWidth, setChartWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(element.meta.data);

  useEffect(() => {
    const tempData = JSON.parse(JSON.stringify(element.meta.data));
    setData(tempData);
  }, [element]);

  const onLayout = useCallback(event => {
    setChartWidth(event.nativeEvent.layout.width - 10);
  }, []);

  const onChangeData = (type, newData, dataindex) => {
    switch (type) {
      case datatypes.addPieChartLabel:
        const chartColor =
          '#' +
          string16(newData.red) +
          string16(newData.green) +
          string16(newData.blue);
        setData([
          ...data,
          {
            name: newData.newLabel,
            population: 0,
            color: chartColor,
            legendFontColor: chartColor,
            legendFontSize: 15,
          },
        ]);

        if (element.event.onCreateNewLabel) {
          Alert.alert('Rule Action', `Fired onCreateNewLabel action. rule - ${element.event.onCreateNewLabel}. newSeries - ${JSON.stringify([
            ...data,
            {
              name: newData.newLabel,
              population: 0,
              color: chartColor,
              legendFontColor: chartColor,
              legendFontSize: 15,
            },
          ])}`);
        }
        break;
      case datatypes.changePieChartLabel:
        const chartColor1 =
          '#' +
          string16(newData.red) +
          string16(newData.green) +
          string16(newData.blue);
        const tempData1 = data.map((e, i) => {
          if (i === dataindex) {
            return {
              ...e,
              name: newData.newLabel,
              color: chartColor1,
              legendFontColor: chartColor1,
            };
          }
          return e;
        });
        setData(tempData1);

        if (element.event.onUpdateLabel) {
          Alert.alert('Rule Action', `Fired onUpdateLabel action. rule - ${element.event.onUpdateLabel}. newSeries - ${JSON.stringify(tempData1)}`);
        }
        break;
      case datatypes.deletePieChartLabel:
        const tempData2 = [...data];
        tempData2.splice(dataindex, 1);
        setData(tempData2);

        if (element.event.onDeleteLabel) {
          Alert.alert('Rule Action', `Fired onDeleteLabel action. rule - ${element.event.onDeleteLabel}. newSeries - ${JSON.stringify(tempData2)}`);
        }
        break;
      case datatypes.changePieChartValue:
        const tempData3 = [...data];
        const tempdata = {...tempData3[dataindex]};
        tempData3[dataindex] = {
          ...tempdata,
          population: newData,
        };
        setData(tempData3);

        if (element.event.onUpdateValue) {
          Alert.alert('Rule Action', `Fired onUpdateValue action. rule - ${element.event.onUpdateValue}. newSeries - ${JSON.stringify(tempData3)}`);
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
        setData(tempData);
        setVisible(false);
        break;
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.carouselTitle(colors)}>{element.meta.title || 'Pie Chart'}</Text>
      <PieChart
        data={data}
        width={chartWidth}
        height={200}
        chartConfig={styles.chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[10, 0]}
        absolute
      />
      {editRole && (
        <>
          <Title
            name="Datas"
            onPress={() => setVisible(!visible)}
            visible={visible}
          />
          {visible && (
            <PieChartDataSection data={data} onChangeData={onChangeData} />
          )}
        </>
      )}
    </View>
  );
};

const PieChartField = ({element, index, editRole}) => {
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <PieChartSubField  onClickUpdateField={updateFormData} element={element} index={index} editRole={editRole} />, [element, index, editRole]);
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
  chartConfig: {
    // backgroundColor: "#e26a00",
    backgroundGradientFrom: 'darkgreen',
    backgroundGradientTo: 'green',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  },
});

PieChartField.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(PieChartField);
