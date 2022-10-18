import { FC } from 'react';
import { Theme, useTheme } from '@emotion/react';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Radar as RCRadar } from 'react-chartjs-2';
import { loudFontfamily } from 'shared/constants/styles/typograhy';

type Props = {
  data: number[];
  labels: string[];
  small?: boolean;
  className?: string;
};

export const Radar: FC<Props> = ({ data, labels, small }) => {
  const theme = useTheme();
  const chartData: ChartData<'radar'> = {
    labels: labels,
    datasets: [
      {
        data,
        fill: true,
        backgroundColor: theme.backdrop,
        borderColor: theme.border,
        pointBackgroundColor: theme.background,
        pointBorderColor: theme.border,
        pointHoverBackgroundColor: theme.background,
        pointHoverBorderColor: theme.border,
      },
    ],
  };

  return <RCRadar options={getChartOptions(theme, small)} data={chartData} plugins={[ChartDataLabels]} />;
};

const getChartOptions = (theme: Theme, small?: boolean): ChartOptions<'radar'> => ({
  elements: {
    point: {
      pointStyle: 'circle',
      radius: small ? 12 : 14,
      hoverRadius: small ? 14 : 18,
      borderWidth: 2,
      hoverBorderWidth: 3,
    },
  },
  layout: {
    autoPadding: true,
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
          size: small ? 14 : 16,
        },
      },
      pointLabels: {
        font: {
          size: small ? 12 : 16,
        },
        color: theme.text['default'],
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
      color: theme.border,
      font: {
        size: small ? 16 : 18,
        family: loudFontfamily,
        weight: 'bold',
      },
    },
  },
});
