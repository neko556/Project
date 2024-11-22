// Chart color palette
const CHART_COLORS = {
    primary: '#36A2EB',
    secondary: '#FF6384',
    success: '#4BC0C0',
    warning: '#FFCE56',
    info: '#9966FF',
    danger: '#FF9F40',
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
  };
  
  // Initialize stacked line chart
  function initStackedLineChart(data) {
    if (!data || !data.labels || !data.categories || data.categories.length === 0) {
      console.log('No data available for stacked line chart');
      return;
    }
  
    const ctx = document.getElementById('stackedLineChart').getContext('2d');
    const datasets = data.categories.map((category, index) => ({
      label: category,
      data: data.values[category],
      borderColor: CHART_COLORS.colors[index % CHART_COLORS.colors.length],
      backgroundColor: 'transparent',
      borderWidth: 2
    }));
  
    return new Chart(ctx, {
      type: 'line',
      data: { labels: data.labels, datasets },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Daily Spending by Category'
          }
        },
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              callback: value => '₹' + value.toFixed(2)
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }
  
  // Initialize calendar heatmap
  function initCalendarHeatmap(data) {
    if (!data || !data.dates || !data.values || data.dates.length === 0) {
      console.log('No data available for calendar heatmap');
      return;
    }
  
    const ctx = document.getElementById('calendarHeatmap').getContext('2d');
    const maxValue = Math.max(...Object.values(data.values));
    
    const calendarData = {
      labels: data.dates,
      datasets: [{
        label: 'Daily Spending',
        data: data.dates.map(date => ({
          x: date,
          y: data.values[date] || 0
        })),
        backgroundColor: context => {
          const value = context.raw?.y || 0;
          const intensity = maxValue > 0 ? value / maxValue : 0;
          return `rgba(54, 162, 235, ${intensity})`;
        }
      }]
    };
  
    return new Chart(ctx, {
      type: 'bar',
      data: calendarData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: context => new Date(context[0].label).toLocaleDateString(),
              label: context => `₹${context.raw.y.toFixed(2)}`
            }
          },
          title: {
            display: true,
            text: 'Daily Spending Calendar'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '₹' + value.toFixed(2)
            }
          },
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM d'
              }
            },
            title: {
              display: true,
              text: 'Date'
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }
  
  // Initialize animated line chart
  function initAnimatedLineChart(data) {
    if (!data || !data.labels || !data.values || data.values.length === 0) {
      console.log('No data available for animated line chart');
      return;
    }
  
    const ctx = document.getElementById('animatedLineChart').getContext('2d');
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Total Spending',
          data: data.values,
          borderColor: CHART_COLORS.primary,
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Spending Trend'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '₹' + value.toFixed(2)
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }