import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import BarChartDataSection from './datasection';
import { datatypes } from '../../../constant';
import Title from '../../../common/Title';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const BarChartSubField = ({element, index, onClickUpdateField}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const preview = formStore(state => state.preview);
  const [chartWidth, setChartWidth] = useState(0);
  const [data, setData] = useState(formValue[element.field_name] || {labels: [], datasets: [{data: []}]});
  const [visible, setVisible] = useState(false);

  const onLayout = useCallback(event => {
    setChartWidth(event.nativeEvent.layout.width - 10);
  }, []);

  useEffect(() => {
    if (formValue[element.field_name]) {
      setData(formValue[element.field_name]);
    }
  }, [JSON.stringify(formValue[element.field_name])]);

  const onChangeData = (type, changedData, dataIndex) => {
    switch (type) {
      case datatypes.addBarChartLabel:
        const labels1 = [...data.labels, changedData];
        const datasets1 = [...data.datasets];
        datasets1[0].data.push(0);
        setFormValue({...formValue, [element.field_name]: {...data, labels: labels1, datasets: datasets1}})

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
        setFormValue({...formValue, [element.field_name]: {...data, labels: labels2}})

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
        setFormValue({...formValue, [element.field_name]: {...data, labels: labels3}})

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
        setFormValue({...formValue, [element.field_name]: {...data, datasets: datasets}})

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
        setFormValue({...formValue, [element.field_name]: {...data, ...tempData}})
        setVisible(false);
        break;
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'Bar Chart'} visible={!element.meta.hide_title} />
            <BarChart
              style={styles.barchart}
              data={data}
              width={chartWidth}
              height={200}
              yAxisLabel=""
              xAxisLabel=""
              xLabelsOffset={5}
              chartConfig={styles.chartConfig(colors, fonts)}
              showValuesOnTopOfBars
              fromZero={true}
              // verticalLabelRotation={60}
            />
            {(role.edit || preview) && (
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
          </>
        )
      }
    </View>
  );
};

const BarChartField = ({element, index}) => {
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <BarChartSubField  onClickUpdateField={updateFormData} element={element} index={index} />, [element, index]);
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
  chartConfig: (colors, fonts) => ({
    // backgroundColor: "#e26a00",
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 2,
    color: (opacity = 1) => fonts.values.color,
    labelColor: (opacity = 1) => fonts.labels.color,
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
