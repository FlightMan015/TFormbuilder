import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Title from '../../../common/Title'
import LineChartDataSection from './datasection';
import { datatypes } from '../../../constant';
import formStore from '../../../store/formStore';
import FieldLabel from '../../../common/FieldLabel';

const LineChartSubField = ({element, index, onClickUpdateField}) => {
  const {colors, fonts} = useTheme();
  const userRole = formStore(state => state.userRole);
  const role = element.role.find(e => e.name === userRole);
  const formValue = formStore(state => state.formValue);
  const setFormValue = formStore(state => state.setFormValue);
  const [chartWidth, setChartWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(formValue[element.field_name] || {labels: [], datasets: [], legend: []});

  useEffect(() => {
    if (formValue[element.field_name]) {
      let tempData = JSON.parse(JSON.stringify(formValue[element.field_name].datasets));
      const newDatasets = tempData.map(ele => {
        const rgbColor = (opacity = 1) =>
          `rgba(${ele.red}, ${ele.green}, ${ele.blue}, ${opacity})`;
        return {...ele, color: rgbColor};
      });
      const tempdata1 = JSON.parse(JSON.stringify(formValue[element.field_name]));
      const newData = {
        ...tempdata1,
        datasets: newDatasets,
      };
      setData(newData);
    }
  }, [JSON.stringify(formValue[element.field_name])]);

  const onLayout = useCallback(event => {
    setChartWidth(event.nativeEvent.layout.width - 10);
  }, []);

  const onChangeData = (type, changedData, dataindex1, dataindex2) => {
    switch (type) {
      case datatypes.addLine:
        const legend1 = [...data.legend, changedData.newLine];
        const newLineData = [];
        data.labels.map(() => newLineData.push(0));
        const rgbColor1 = (opacity = 1) =>
          `rgba(${changedData.red}, ${changedData.green}, ${changedData.blue}, ${opacity})`;
        const datasets1 = [
          ...data.datasets,
          {
            data: newLineData,
            red: changedData.red,
            green: changedData.green,
            blue: changedData.blue,
            strokeWidth: 2,
            color: rgbColor1,
          },
        ];
        setFormValue({...formValue, [element.field_name]: {
          ...data,
          datasets: datasets1,
          legend: legend1,
        }});

        if (element.event.onCreateNewSeries) {
          Alert.alert('Rule Action', `Fired onCreateNewSeries action. rule - ${element.event.onCreateNewSeries}. newSeries - ${JSON.stringify({
            ...data,
            datasets: datasets1,
            legend: legend1,
          })}`);
        }
        break;
      case datatypes.changeLine:
        const legend2 = JSON.parse(JSON.stringify(data.legend));
        legend2.splice(dataindex1, 1, changedData.newLine);
        const tempDataSets = data.datasets.map((e, i) => {
          if (i === dataindex1) {
            const rgbColor2 = (opacity = 1) =>
              `rgba(${changedData.red}, ${changedData.green}, ${changedData.blue}, ${opacity})`;
            const newDataset = {
              ...e,
              red: changedData.red,
              green: changedData.green,
              blue: changedData.blue,
              color: rgbColor2,
            };
            return newDataset;
          }
          return e;
        });
        setFormValue({...formValue, [element.field_name]: {
          ...data,
          datasets: tempDataSets,
          legend: legend2,
        }});


        if (element.event.onUpdateSeries) {
          Alert.alert('Rule Action', `Fired onUpdateSeries action. rule - ${element.event.onUpdateSeries}. newSeries - ${JSON.stringify({
            ...data,
            datasets: tempDataSets,
            legend: legend2,
          })}`);
        }
        break;
      case datatypes.deleteLine:
        const legend3 = JSON.parse(JSON.stringify(data.legend));
        legend3.splice(dataindex1, 1);
        const datasets3 = [...data.datasets];
        datasets3.splice(dataindex1, 1);
        setFormValue({...formValue, [element.field_name]: {
          ...data,
          datasets: datasets3,
          legend: legend3,
        }});

        if (element.event.onDeleteSeries) {
          Alert.alert('Rule Action', `Fired onDeleteSeries action. rule - ${element.event.onDeleteSeries}. newSeries - ${JSON.stringify({
            ...data,
            datasets: datasets3,
            legend: legend3,
          })}`);
        }
        break;
      case datatypes.changeLabel:
        const labels3 = JSON.parse(JSON.stringify(data.labels));
        labels3.splice(dataindex1, 1, changedData);
        setFormValue({...formValue, [element.field_name]: {
          ...data,
          labels: labels3,
        }});

        if (element.event.onUpdateXValue) {
          Alert.alert('Rule Action', `Fired onUpdateXValue action. rule - ${element.event.onUpdateXValue}. newSeries - ${JSON.stringify({
            ...data,
            labels: labels3,
          })}`);
        }
        break;
      case datatypes.addLabel:
        const labels1 = [...data.labels, changedData];
        const datasets4 = data.datasets.map(e => {
          e.data.push(0);
          return e;
        });
        setFormValue({...formValue, [element.field_name]: {
          ...data,
          datasets: datasets4,
          labels: labels1,
        }});

        if (element.event.onCreateNewXValue) {
          Alert.alert('Rule Action', `Fired onCreateNewXValue action. rule - ${element.event.onCreateNewXValue}. newSeries - ${JSON.stringify({
            ...data,
            datasets: datasets4,
            labels: labels1,
          })}`);
        }
        break;
      case datatypes.deleteLabel:
        const labels2 = JSON.parse(JSON.stringify(data.labels));
        labels2.splice(dataindex1, 1);
        const datasets5 = data.datasets.map(e => {
          e.data.splice(dataindex1, 1);
          return e;
        });
        setFormValue({...formValue, [element.field_name]: {
          ...data,
          datasets: datasets5,
          labels: labels2,
        }});

        if (element.event.onDeleteXValue) {
          Alert.alert('Rule Action', `Fired onDeleteXValue action. rule - ${element.event.onDeleteXValue}. newSeries - ${JSON.stringify({
            ...data,
            datasets: datasets5,
          labels: labels2,
          })}`);
        }
        break;
      case datatypes.changeY:
        const datasets6 = data.datasets.map((e, i) => {
          if (i === dataindex1) {
            e.data[dataindex2] = changedData;
          }
          return e;
        });
        setFormValue({...formValue, [element.field_name]: {
          ...data,
          datasets: datasets6,
        }});

        if (element.event.onUpdateYValue) {
          Alert.alert('Rule Action', `Fired onUpdateYValue action. rule - ${element.event.onUpdateYValue}. newSeries - ${JSON.stringify({
            ...data,
            datasets: datasets6,
          })}`);
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
        let tempData = JSON.parse(JSON.stringify(element.meta.data.datasets));
        const newDatasets = tempData.map(ele => {
          const rgbColor = (opacity = 1) =>
            `rgba(${ele.red}, ${ele.green}, ${ele.blue}, ${opacity})`;
          return {...ele, color: rgbColor};
        });
        const tempdata1 = JSON.parse(JSON.stringify(element.meta.data));
        const newData = {
          ...tempdata1,
          datasets: newDatasets,
        };
        setFormValue({...formValue, [element.field_name]: newData});
        setVisible(false);
        break;
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {
        role.view && (
          <>
            <FieldLabel label={element.meta.title || 'Line Chart'} visible={!element.meta.hide_title} />
            {
              (data.labels.length === 0 || data.legend.length === 0) && (
                <Text style={styles.noDataText(fonts)}>No data to show. Please click 'Datas' to add the data.</Text>
              )
            }
            {
              data.labels.length > 0 && data.legend.length > 0 && (
                <LineChart
                  data={data}
                  width={chartWidth} // from react-native
                  height={200}
                  yAxisLabel=""
                  yAxisSuffix=""
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={styles.chartConfig(colors)}
                  bezier
                  fromZero={true}
                  style={styles.barchart}
                />
              )
            }
            <View>
              <Title
                name="Datas"
                onPress={() => setVisible(!visible)}
                visible={visible}
              />
              {visible && (
                <LineChartDataSection data={data} onChangeData={onChangeData} role={role} />
              )}
            </View>
          </> 
        )
      }
    </View>
  );
};

const LineChartField = ({element, index}) => {
  const updateFormData = formStore(state => state.updateFormData);
  return useMemo(() => <LineChartSubField  onClickUpdateField={updateFormData} element={element} index={index} />, [element, index]);
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  barchart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: fonts => ({
    ...fonts.values,
    alignSelf: 'center',
    marginVertical: 10
  }),
  chartConfig: colors => ({
    // backgroundColor: '#e26a00',
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 2,
    color: (opacity = 1) => colors.colorButton,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16,
    },
  }),
});

LineChartField.propTypes = {
  element: PropTypes.object.isRequired,
};

export default LineChartField;
