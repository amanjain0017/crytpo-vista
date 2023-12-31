import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import {Line } from "react-chartjs-2"
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
import { Chart as ChartJS, registerables } from 'chart.js';


ChartJS.register(...registerables);


const CoinInfo = ({coin}) => {

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id,days , currency));
    setFlag(true);
    setHistoricalData(data.prices);
  };

  console.log("data", historicalData);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days])

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='container' 
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        padding: 10,
      }}>
                {!historicalData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo