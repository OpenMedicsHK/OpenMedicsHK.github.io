---
layout: post
title:  "內科床位佔用率\n（按日熱量圖）"
desc: "於服務高峰期期間，醫管局每日發布的內科住院病床使用率數據。"
tags: [醫療服務實況]
img: pic01.jpg
level: 第一級
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/locale/zh-hk.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/heatmap.js"></script>
<script src="https://code.highcharts.com/modules/boost.js"></script>

<div id="container" style="min-height: 3500px; min-width: 440px; max-width: 880px; margin: 0 auto"></div>


[原始數據](https://docs.google.com/spreadsheets/d/e/2PACX-1vRpbqc-2MwM-s9JtgXKFbfNmNOaTkve2rPmUxZvMoiJdYTJENStLX1W6i47mb-RURj3Or2oXRjPLhgD/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false)

數據等級：[第一級](/faq/#datalevel)

資料來源：[政府一站通搜尋功能 www.search.gov.hk](http://www.search.gov.hk/result?query="occupancy+rates"+"medical+wards"+"statistics"+"public hospitals"&search_but=&ui_charset=utf-8&web=this&output=xml_no_dtd&client=depts&proxystylesheet=ogcio_home_adv_frontend&ui_lang=en&r_lang=&gp1=gia_home&gp0=gia_home&web=this&txtonly=0&tpl_id=stdsearch&oe=UTF-8&ie=UTF-8&sort=date%3AS%3AS%3Ad1&site=gia_home&num=50)
  
<script>
var data = {{ site.data.MEDOCCUPANCY | jsonify }};

for (var i = 1; i < data.length; i++){
  for (var j = 1; j < data[i].length; j++){				// ignore first column
    data[i][j] = parseInt(data[i][j]);
  }
}

var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'heatmap',
            marginTop: 150,
            marginBottom: 15,
        },
    loading: {
        labelStyle: {
            color: 'white'
        },
        style: {
            backgroundColor: 'gray'
        }
    },
    boost: {
        enabled: true,
	useGPUTranslations: true,
	allowForce: true,
	useAlpha: false,
    },

    yAxis: {
        categories: dateCats,
	reversed:true,
	title:null
    },
    
        credits: {
        enabled: false
    },
    
    title: {
    	text:''
    },

    xAxis: {
        categories: hospCats,
	opposite: true,
        labels: {
            rotation: 90
        }
    },

    colorAxis:{min:80,stops:[[0,'#FFEBEE'],[0.5,'#F44336'],[1,'#B71C1C']]},

    legend: {
        enabled: false
    },

    tooltip: {
        useHTML: true,
	shared: true,
	shadow: false,
	animation: false,
	formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> 於 <br><b>' +
                this.series.yAxis.categories[this.point.y] + '</b> 的入住率為 <br><b>' + this.point.value + '％</b>';
        }
    },

    series: [{
	boostThreshold: 1,
	turboThreshold: 10,
        data: [],
    dataLabels: {
      enabled: true,
      allowOverlap: true,
      shadow: false,
      optimizeSpeed: true,
      style: {
        textOutline: null,
        color: 'white'
      }
    },
    }],
    "data": {
      "rows": data
    }
});

/*
      for (var i = 1; i < data.length; i++){
	dateCats[i] = data[i][0];
      	for (var j = 1; j < data[i].length; j++){				// ignore first column
      		chart.series[0].addPoint([j,i,parseInt(data[i][j])],false,false);
	}
	}
	console.log(Date.now()+" finished loading data");
	chart.redraw();
	console.log(Date.now()+" loading hidden");
      //getData(500);
		*/
</script>
