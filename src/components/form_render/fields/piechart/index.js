import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import PieChartDataSection from './datasection';
import Title from '../../../../common/Title';
import { datatypes, string16 } from '../../../../constant';
import formStore from '../../../../store/formStore';
import FieldLabel from '../../../../common/FieldLabel';

const PieChartSubField = ({element, index, onClickUpdateField, role}) => {
  const {fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const i18nValues = formStore(state => state.i18nValues);
  const [chartWidth, setChartWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(formValue[element.field_name] || []);

  useEffect(() => {
    if (formValue[element.field_name]) {
      setData(formValue[element.field_name]);
    }    
  }, [JSON.stringify(formValue[element.field_name])]);

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
          setFormValue({...formValue, [element.field_name]: [
          ...data,
          {
            name: newData.newLabel,
            population: 0,
            color: chartColor,
            legendFontColor: chartColor,
            legendFontSize: 15,
          },
        ]});

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
        setFormValue({...formValue, [element.field_name]: tempData1});

        if (element.event.onUpdateLabel) {
          Alert.alert('Rule Action', `Fired onUpdateLabel action. rule - ${element.event.onUpdateLabel}. newSeries - ${JSON.stringify(tempData1)}`);
        }
        break;
      case datatypes.deletePieChartLabel:
        const tempData2 = [...data];
        tempData2.splice(dataindex, 1);
        setFormValue({...formValue, [element.field_name]: tempData2});

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
        setFormValue({...formValue, [element.field_name]: tempData3});

        if (element.event.onUpdateValue) {
          Alert.alert('Rule Action', `Fired onUpdateValue action. rule - ${element.event.onUpdateValue}. newSeries - ${JSON.stringify(tempData3)}`);
        }
        break;
      case 'cancel':
        const tempData = JSON.parse(JSON.stringify(element.meta.data));
        setFormValue({...formValue, [element.field_name]: tempData});
        setVisible(false);
        break;
    }
  };

  return (
    <View style={styles.container(element)} onLayout={onLayout}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || i18nValues.t("field_labels.pie_chart")} visible={!element.meta.hide_title} />
            {
              !(data.length > 0) && (
                <Text style={styles.noDataText(fonts)}>No data to show. Please click 'Datas' to add the data.</Text>
              )
            }
            {
              data.length > 0 && (
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
              )
            }
            {(userRole.edit || userRole.submit) && role.edit && (
              <>
                <Title
                  name={i18nValues.t("setting_labels.datas")}
                  onPress={() => setVisible(!visible)}
                  visible={visible}
                />
                {visible && (
                  <PieChartDataSection data={data} onChangeData={onChangeData} />
                )}
              </>
            )}
          </>
        )
      }
    </View>
  );
};

const PieChartField = ({element, index, editRole}) => {
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <PieChartSubField  onClickUpdateField={updateFormData} element={element} index={index} editRole={editRole} />, [element, index, editRole]);
};

const styles = StyleSheet.create({
  container: element => ({
    ...element.meta.padding
  }),
  barchart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: fonts => ({
    ...fonts.values,
    alignSelf: 'center',
    marginVertical: 10
  }),
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
