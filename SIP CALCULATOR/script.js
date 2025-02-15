let sipChart;

function calculateSIP() {
    let P = parseFloat(document.getElementById("amount").value);
    let n = parseFloat(document.getElementById("time").value) * 12; // Convert years to months
    let i = (parseFloat(document.getElementById("rate").value) / 100) / 12; // Monthly interest rate

    if (isNaN(P) || isNaN(n) || isNaN(i) || P <= 0 || n <= 0 || i <= 0) {
        document.getElementById("result").innerHTML = "<p style='color: red;'>Please enter valid inputs!</p>";
        return;
    }

    let total_investment = P * n;
    let M = P * ((Math.pow((1 + i), n) - 1) / i) * (1 + i);
    let gain = M - total_investment;

    document.getElementById("result").innerHTML = `
        <p>Total amount invested: ₹${Math.round(total_investment)}</p>
        <p>Maturity amount: ₹${Math.round(M)}</p>
        <p>Gain amount: ₹${Math.round(gain)}</p>
    `;

    // Update Graph
    updateChart(total_investment, gain);
}

// Function to Update Chart
function updateChart(invested, profit) {
    let ctx = document.getElementById("sipChart").getContext("2d");

    if (sipChart) {
        sipChart.destroy(); // Destroy previous chart to prevent overlap
    }

    sipChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Total Investment", "Total Gain"],
            datasets: [{
                data: [invested, profit],
                backgroundColor: ["#3b82f6", "#16a34a"], // Blue & Green
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `₹${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
}
