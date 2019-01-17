---
layout: post
title: 急症室輪候時間
desc: 各急症室每天在同一時間的平均等候時間。
img: HKAED.jpg
tags: [醫療服務實況]
level: 第三級
---

以下圖表顯示過去數小時病人在各急診室最長的等候時間。由於急症室實施分流制度，病人病情的輕重緩急將決定治理的先後次序。數據只供參考，並不能預測其他病人的等候時間。

最長等候時間顯示上限為8小時，表示急症室正處理大量等候已久的病人。

> 溫馨提示：
> 急症室須處理突發意外傷者及危重病人，非緊急病人的平均輪候會受當日個案量影響，難以估計。為防有需要的病人得不到適切救治，請勿輕易輪候急症服務。
> 醫管局部分普通科門診提供夜間、週末及公眾假期的診症服務，等候時間一般較急診室為短。
> 若需要診症服務，可先參考[「基層醫療診所地圖」](../PC-Doctor-List/)、[「普通科診所地圖」](../GOPC-List/)及[「私立醫院門診收費一覽」](../Private-OPD-Price/)。

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sheetrock/1.1.4/dist/sheetrock.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/locale/zh-hk.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.js"></script>

<div id="charts">
<div class="row">
	{% assign clusters = site.HAhospital | map: 'cluster_tc' | uniq %}
	{% for cluster in clusters %}
  	<div class="col-4 col-12-medium">
		<h2>{{ cluster }}</h2>
		{% for hospital in site.HAhospital %}
			{% if hospital.with_AE_service_eng == true and hospital.cluster_tc == cluster %}
				<h3>{% include HA-icon.html name=hospital.institution_eng %}  {{ hospital.institution_tc }}</h3>
				<div name="chart-container" hosp="{{ hospital.abbrev }}" style="position: relative; height:200px;"><canvas id="chart" height="300" width="600"></canvas></div>
			{% endif %}
		{% endfor %}
	</div>
	{% endfor %}
</div>
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
var dataMap = [];
var charts = [];


function loadLIVEDATA(data) {
  $.each( data.result.hospData, function( key, val ) {
    if (!charts[val.hospCode])
      return;
    var chart = charts[val.hospCode];
    chart.data.datasets[1] = {};
    chart.data.datasets[1].data = [];
    chart.data.datasets[1].data[parseInt(moment(val.hospTime).format('H'))] = parseInt(val.topWait.match(/[0-9]/g)[0]);
    chart.data.datasets[1].label = '現時最長等候時間'
    chart.data.datasets[1].backgroundColor = "rgba(255, 99, 132, 0.2)";
    console.log(parseInt(moment(val.hospTime, 'en').format('H')));
    console.log(parseInt(val.topWait.match(/[0-9]/g)[0]));
    console.log(chart.data.datasets[1].data);
    chart.update();
  });
}

function updateChart() {
    var data = {{ site.data.AEDLOG | jsonify }};
    $.each( data, function( i , val ) {
      if (parseInt(val.DOW) != moment().day())
        return;
      if (parseInt(val.DOW) == 7 && moment().day() != 0)
        return;
      labels.push(moment(val.HOD, 'H', 'en'));
      $.each( val, function( j , val2 ) {
	if (j == 'HOD' || j == 'DOW'){
          return;
	}
	if (!dataMap[j])
	  dataMap[j] = [];
        dataMap[j][val.HOD] = val2;
      });    
    });
    
    console.log(dataMap);
    console.log(labels);
    var nodes = document.getElementsByName("chart-container");
    for (i = 0; i < nodes.length; i++) {    
	console.log(i);
	console.log(nodes[i]);
	var hosp = nodes[i].getAttribute("hosp");
        var chart = new Chart(nodes[i].firstChild.getContext("2d"), {
            type: 'bar',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
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
                        offset: true,
                        gridLines: {
			    display: false,
                        },
                        time: {
                            unit: 'hour',
                            stepSize: 3,
			    displayFormats: {
			    	hour: 'A h時'
			    }
                        },
                        stacked: true,
                        categoryPercentage: 1.0,
                        bounds: 'data',
                        ticks: {
			    source: 'labels'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '最長等候時間（小時）'
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
        chart.config.data = {
            datasets: [
                {
                    data: dataMap[hosp],
                    label: '平均最長等候時間',
                    backgroundColor: "rgba(54, 162, 235, 0.2)"
                }
            ]
        };
        chart.config.data.labels = labels;
        chart.config.options.tooltips.callbacks.title = function(tooltipItems, data) {
            // Pick first xLabel for now
            var title = '';
            var labels = data.labels;
            var labelCount = labels ? labels.length : 0;

            if (tooltipItems.length > 0) {
                var item = tooltipItems[0];

                if (item.xLabel) {
                    title = moment(item.xLabel).locale('zh_cn').format('A h時');
                } else if (labelCount > 0 && item.index < labelCount) {
                    title = labels[item.index];
                }
            }

            return title;
        };
        chart.config.options.tooltips.callbacks.label = function(tooltipItem, data) {
            if (!tooltipItem.yLabel)
	        return;
	    var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            
	    label += '等候超過 ' + Math.round(tooltipItem.yLabel) + '小時';
            return label;
        };
        console.log(chart.config);
        chart.update();
	    charts[hosp] = chart;

    }
    
	$.ajax({
	    url: "https://jsonp.afeld.me/?callback=loadLIVEDATA&url=https://www.ha.org.hk/aedwt/data/aedWtData.json",
	    dataType: "jsonp",
	    success: function( response ) {
		loadLIVEDATA( response ); // server response
	    }

	}); 
}

updateChart();
