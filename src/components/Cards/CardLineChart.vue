<template>

  <a-card :bordered="false" class="dashboard-bar-line header-solid">
    <template #title>
      <h6>Sales Overview</h6>
      <p>than last year <span class="text-success">+20%</span></p>
    </template>
    <template #extra>
      <a-badge class="badge-dot-primary" color="primary" text="Traffic"/>
      <a-badge class="badge-dot-secondary" color="primary" text="Sales"/>
    </template>
    <chart-line :data="lineChartData" :height="310"></chart-line>
  </a-card>

</template>

<script>

// Bar chart for "Active Users" card.
import ChartLine from '../Charts/ChartLine';

export default ({
  components: {
    ChartLine,
  },
  data() {
    return {

      // Data for line chart.
      lineChartData: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Mobile apps",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#1890FF",
          borderWidth: 3,
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          maxBarThickness: 6

        },
          {
            label: "Websites",
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#B37FEB",
            borderWidth: 3,
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
            maxBarThickness: 6

          }],
      },
    }
  },
})

</script>