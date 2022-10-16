import { FC } from 'react';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Radar as RCRadar } from 'react-chartjs-2';

type Props = {
  data?: number[];
  labels?: string[];
  small?: boolean;
  className?: string;
};

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const Radar: FC<Props> = ({
  data = [0, 0, 0, 0, 0],
  labels = ['軽さ', '    広さ', '   反り', 'グリップ力    ', '反発性    '],
  small,
}) => {
  const chartData: ChartData<'radar'> = {
    labels: labels,
    datasets: [
      {
        data,
        fill: true,
        backgroundColor: '#f4511edf',
        borderColor: '#f4511e',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#f4511e',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  return <RCRadar options={getChartOptions(small)} data={chartData} plugins={[ChartDataLabels]} />;
};

const getChartOptions = (small?: boolean): ChartOptions<'radar'> => ({
  elements: {
    point: {
      pointStyle: 'circle',
      radius: small ? 12 : 14,
      hoverRadius: small ? 14 : 18,
      borderWidth: 3,
      hoverBorderWidth: 3,
    },
  },
  layout: {
    padding: 32,
  },
  responsive: true,
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 5,
      ticks: {
        stepSize: 1,
        backdropColor: 'transparent',
        font: {
          size: small ? 12 : 14,
        },
      },
      pointLabels: {
        font: {
          size: small ? 12 : 16,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      color: '#f4511e',
    },
  },
});
