import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {
  VictoryArea,
  VictoryLabel,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryPolarAxis,
} from 'victory-native';

const VictoryRadar = ({meta}) => {
  const getMaxima = useCallback(data => {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map(d => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }, [meta.data.datasets]);

  const processData = useCallback(data => {
    const maxByGroup = getMaxima(data);
    const makeDataArray = d => {
      return Object.keys(d).map(key => {
        return {x: key, y: d[key] / maxByGroup[key]};
      });
    };
    return data.map(datum => makeDataArray(datum));
  }, [meta.data.datasets]);

  const [datas, setDatas] = useState(null);
  const [maxima, setMaxima] = useState(null);

  useEffect(() => {
    setDatas(processData(meta.data.datasets));
    setMaxima(getMaxima(meta.data.datasets));
  }, [meta]);

  return (
    <View>
      {datas && maxima && (
        <VictoryChart polar theme={VictoryTheme.material} domain={{y: [0, 1]}}>
          <VictoryGroup
            colorScale={meta.data.colors}
            style={{data: {fillOpacity: 0.2, strokeWidth: 2}}}>
            {datas.map((data, i) => {
              return <VictoryArea key={i} data={data} />;
            })}
          </VictoryGroup>
          {Object.keys(maxima).map((key, i) => {
            return (
              <VictoryPolarAxis
                key={i}
                dependentAxis
                style={{
                  axisLabel: {padding: 30},
                  axis: {stroke: 'none'},
                  grid: {stroke: 'grey', strokeWidth: 0.25, opacity: 0.5},
                }}
                tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
                labelPlacement="perpendicular"
                axisValue={i + 1}
                label={key}
                tickFormat={t => Math.ceil(t * maxima[key])}
                tickValues={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
              />
            );
          })}
          <VictoryPolarAxis
            labelPlacement="parallel"
            tickFormat={() => ''}
            style={{
              axis: {stroke: 'none'},
              grid: {stroke: 'grey', opacity: 0.5},
            }}
          />
        </VictoryChart>
      )}
    </View>
  );
};

VictoryRadar.prototype = {
  meta: PropTypes.object.isRequired,
};

export default React.memo(VictoryRadar);
