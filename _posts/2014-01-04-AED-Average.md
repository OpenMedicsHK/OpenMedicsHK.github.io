---
layout: post
title: 急症室輪候時間
desc: 各急症室每天在同一時間的平均等候時間。
img: HKAED.jpg
tags: [醫療服務實況]
level: 第三級
---

> 溫馨提示：
> 公立醫院急症室實施分流制度，會優先處理情況危殆的病人。非緊急病人的平均輪候會受當日個案量影響，難以估計。為防有需要的病人得不到適切救治，請勿輕易輪候急症服務。
> 若需要診症服務，可先參考[「基層醫療診所地圖」](../PC-Doctor-List/)或[「普通科診所地圖」](../GOPC-List/)。

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sheetrock/1.1.4/dist/sheetrock.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/locale/zh-hk.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.js"></script>

<div id="charts">
</div>
<div id="hidden-charts" style="display: none;">
	<div id="chart-container" style="position: relative; height:200px;"><canvas id="chart" height="300" width="600"></canvas></div>
</div>
  
<script>  
function createMatrix(N, M) {
    var matrix = new Array(N); // Array with initial size of N, not fixed!

    for (var i = 0; i < N; ++i) {
        matrix[i] = new Array(M);
    }

    return matrix;
}

var labels = [];
var dataMap = createMatrix(20, 24);

var ctx = document.getElementById("chart").getContext("2d");

function updateChart(error, options, response) {
    if (!response.rows) {
        return;
    }
    for (var i = 1; i < response.rows.length; i++) {
        for (var j = 0; j < response.rows[i].cellsArray.length; j++) {
            if (j == 0) {
                labels.push(moment(response.rows[i].cellsArray[0], 'H', 'en'));
            } else {
                dataMap[j - 1][i - 1] = response.rows[i].cellsArray[j];
            }
        }
    }

    for (var i = 0; i < 4; i++) {
        var hosp = response.rows[0].cellsArray[i + 1];

        var itm = document.getElementById("chart-container");
        var clone = itm.cloneNode(true);
        clone.id = "clone";
        var newClone = document.getElementById("charts").appendChild(clone);
        var chart = new Chart(newClone.firstChild.getContext("2d"), {
            type: 'bar',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: hosp + ' 急症科輪候時間'
                },
                tooltips: {
                    mode: 'x',
                    callbacks: {
                        title: null
                    }
                },
                scales: {
                    xAxes: [{
                        type: "time",
                        gridLines: {
                            offsetGridLines: true
                        },
                        time: {
                            min: moment('0', 'H', 'en'),
                            max: moment('24', 'H', 'en'),
                            unit: 'hour',
                            displayFormats: {
                                hour: 'LT'
                            }
                        },
                        stacked: true,
                        categoryPercentage: 1.0,
                        ticks: {
                            fixedStepSize: 3
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '預計等候時間（小時）'
                        },
                        stacked: false,
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            min: 0,
                            max: 8,
                            fixedStepSize: 2
                        }
                    }]
                },
                categoryPercentage: 1,

            }
        });
        chart.config.data = {};
        chart.config.data.datasets = new Array(2);
        chart.config.data.datasets[0] = {};
        chart.config.data.datasets[0].data = dataMap[i];
        chart.config.data.datasets[0].label = response.rows[0].cellsArray[i + 1];
	chart.config.data.datasets[0].backgroundColor = ["rgba(54, 162, 235, 0.2)"];
        chart.config.data.datasets[1] = {};
        chart.config.data.datasets[1].data = [];
        chart.config.data.datasets[1].data[14] = 3.4;
        chart.config.data.datasets[1].label = '現時輪侯時間'
	chart.config.data.datasets[1].backgroundColor = rgba(255, 99, 132, 0.2);
        chart.config.data.labels = labels;
        chart.config.options.tooltips.callbacks.title = function(tooltipItems, data) {
            // Pick first xLabel for now
            var title = '';
            var labels = data.labels;
            var labelCount = labels ? labels.length : 0;

            if (tooltipItems.length > 0) {
                var item = tooltipItems[0];

                if (item.xLabel) {
                    //title = moment(item.xLabel, 'H', 'en').locale('zh_cn').format('LT');
                } else if (labelCount > 0 && item.index < labelCount) {
                    title = labels[item.index];
                }
            }

            return title;
        };
        chart.config.options.tooltips.callbacks.label = function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            label += '約等候 ' + Math.round(tooltipItem.yLabel) + '小時';
            return label;
        };
        console.log(chart.config);
        chart.update();

    }
}

var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1gMSLNwy160WN4kFq1kwNY1k0gEmwaQ_yfQG4MeXlaa0/edit#gid=0';
sheetrock({
    url: mySpreadsheet,
    callback: updateChart
});
</script>
 
{{ site.data.AEDLOG | jsonify }}
