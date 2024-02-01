$(document).ready(function () {

    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;

    $('#prev-month').click(function () {
        changeMonth(-1);
    });

    $('#next-month').click(function () {
        changeMonth(1);
    });

    var ctx = document.getElementById('caloriesChart');

    var chart = new Chart(ctx, {
        type: 'bar', // 라인 차트 유형
        data: {
            labels: dates, // x축 레이블로 날짜 사용
            datasets: [{
                label: '칼로리', // 데이터셋의 레이블
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Green,
                borderColor: 'green', // 선 색
                borderWidth: 1,
                data: calories, // y축 데이터로 칼로리 사용
                barThickness: 30
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // y축을 0부터 시작
                }
            },
            responsive: false,
            maintainAspectRatio: true,
            onClick: function (e) {
                var activePoints = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

                if (activePoints.length) {
                    var firstPoint = activePoints[0];
                    var label = chart.data.labels[firstPoint.index];
                    // 새 창에서 상세 정보 페이지
                    window.open('/meal/meal_detail/' + label, '_blank', 'width=600,height=400,top=100,left=100');
                }
            }
        }
    });

    function changeMonth(offset) {
        currentMonth += offset;

        // 년도 변경 
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        } else if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }

        // AJAX 요청
        $.ajax({
            url: `/meal/meal_history/${currentYear}/${currentMonth}/`,
            dataType: 'json',
            success: function (response) {
                updateChart(response);
            },
            error: function (err) {
                console.log('Error:', err);
            }
        });
    }

    function updateChart(data) {
        var parsedDates = JSON.parse(data.dates);
        var parsedCalories = JSON.parse(data.calories);

        chart.data.labels = parsedDates;
        chart.data.datasets.forEach((dataset) => {
            dataset.data = parsedCalories;
        });
        chart.update();

        $("#month_display").text(data.month);
        $("#days_with_data_display").text(data.days_with_data);
    }

})