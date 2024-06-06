const ctx = document.getElementById('growthChart').getContext('2d');

const initialInvestment = 500;
const weeklyGrowthRate = 0.10;
const totalWeeks = 52;

const calculateGrowth = (initial, rate, weeks) => {
  const values = [initial];
  for (let i = 1; i <= weeks; i++) {
    values.push(values[i - 1] * (1 + rate));
  }
  return values;
};

const labels = Array.from({ length: totalWeeks + 1 }, (_, i) => `Week ${i}`);
const data = calculateGrowth(initialInvestment, weeklyGrowthRate, totalWeeks);

const growthChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Investment Value ($)',
      data: data,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    animation: {
      duration: 3000,
      easing: 'easeOutBounce'
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value ($)'
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  }
});

const updateGrowthList = (data) => {
  const growthList = document.getElementById('growthList');
  growthList.innerHTML = '';
  data.forEach((value, index) => {
    const li = document.createElement('li');
    li.textContent = `Week ${index}: $${value.toFixed(2)}`;
    growthList.appendChild(li);
  });

  const summary = document.getElementById('summary');
  summary.innerHTML = `
    <strong>Explanation:</strong><br>
    Week 1: Your initial investment grows to $${data[1].toFixed(2)}.<br>
    Week 10: It’s now $${data[10].toFixed(2)}.<br>
    Week 20: You've reached $${data[20].toFixed(2)}.<br>
    Week 30: Your investment is $${data[30].toFixed(2)}.<br>
    Week 40: It’s now $${data[40].toFixed(2)}.<br>
    Week 52: Your initial investment has grown to an impressive $${data[52].toFixed(2)}.
  `;
};

updateGrowthList(data);

document.getElementById('investmentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const initialCapital = parseFloat(document.getElementById('initialCapital').value);
  const calculatedData = calculateGrowth(initialCapital, weeklyGrowthRate, totalWeeks);
  
  growthChart.data.datasets[0].data = calculatedData;
  growthChart.update();
  
  updateGrowthList(calculatedData);
  
  const calculatedGrowth = document.getElementById('calculatedGrowth');
  calculatedGrowth.innerHTML = `
    <h3>Projected Growth for $${initialCapital}:</h3>
    <ul>${calculatedData.map((value, index) => `<li>Week ${index}: $${value.toFixed(2)}</li>`).join('')}</ul>
  `;
});
