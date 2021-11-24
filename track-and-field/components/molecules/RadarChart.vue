<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  ref
} from '@nuxtjs/composition-api';
// eslint-disable-next-line import/named
import { ChartData, ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<number[]>,
      required: true
    },
    labels: {
      type: Array as PropType<string[]>,
      default: () => [
        '軽さ',
        '    広さ',
        '   反り',
        'グリップ力    ',
        '反発性    '
      ]
    }
  },
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    let chart!: Chart;

    const createCharts = () => {
      if (canvasRef.value === null) {
        return;
      }
      const canvas = canvasRef.value.getContext('2d');

      if (canvas === null) {
        return;
      }

      const chartData: ChartData = {
        labels: props.labels,
        datasets: [
          {
            data: props.data,
            fill: true,
            backgroundColor: '#f4511edf',
            borderColor: '#f4511e',
            pointBackgroundColor: '#fff',
            pointBorderColor: '#f4511e',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }
        ]
      };

      const chartOptions: ChartOptions = {
        elements: {
          point: {
            pointStyle: 'circle',
            radius: 14,
            hoverRadius: 18,
            borderWidth: 3,
            hoverBorderWidth: 3
          }
        },
        layout: {},
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
              backdropColor: 'transparent',
              font: {
                size: 14
              }
            },
            pointLabels: {
              font: {
                size: 16
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
          datalabels: {
            color: '#f4511e'
          }
        }
      };

      chart = new Chart(canvas, {
        type: 'radar',
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
      });
    };

    onMounted(() => {
      createCharts();
    });

    return {
      chart,
      canvasRef,
      createCharts
    };
  }
});
</script>
<style lang="scss" scoped>
div {
}
</style>
