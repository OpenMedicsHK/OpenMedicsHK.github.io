---
layout: post
title:  "內科床位佔用率\n（按日熱量圖）"
desc: "於服務高峰期期間，醫管局每日發布的內科住院病床使用率數據。"
tags: [醫療服務實況]
img: pic01.jpg
level: 第一級
---

<script src='https://tmroyal.github.io/Chart.HeatMap/Chart.HeatMap.S.min.js'></script>

<canvas id="container" style="min-height: {{ site.data.MEDOCCUPANCY | size | minus: 1 | times: 10 | plus: 150 }}px; min-width: 440px; max-width: 660px; margin: 0 auto"></canvas>


[原始數據](https://docs.google.com/spreadsheets/d/e/2PACX-1vRpbqc-2MwM-s9JtgXKFbfNmNOaTkve2rPmUxZvMoiJdYTJENStLX1W6i47mb-RURj3Or2oXRjPLhgD/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false)

數據等級：[第一級](/faq/#datalevel)

資料來源：[政府一站通搜尋功能 www.search.gov.hk](http://www.search.gov.hk/result?query="occupancy+rates"+"medical+wards"+"statistics"+"public hospitals"&search_but=&ui_charset=utf-8&web=this&output=xml_no_dtd&client=depts&proxystylesheet=ogcio_home_adv_frontend&ui_lang=en&r_lang=&gp1=gia_home&gp0=gia_home&web=this&txtonly=0&tpl_id=stdsearch&oe=UTF-8&ie=UTF-8&sort=date%3AS%3AS%3Ad1&site=gia_home&num=50)
  
<script>
  function ctx(elementId){
    return document.getElementById(elementId).getContext('2d');
  }

  // completely arbitrary data
  var data = {{ site.data.MEDOCCUPANCY | jsonify }};
  var matrixData = {};
  
  for (var i in data){
    if (i == 0){
      var labels = data[i];
      labels.splice(0,1);
      matrixData.labels = labels;
      matrixData.datasets = [];
    }else{
      var occupancies = data[data.length-i]; // invert order
      var label = occupancies.splice(0,1);
      for (var j in occupancies){
        occupancies[j] = parseInt(occupancies[j].match(/([0-9]*)/g)[0]);
        if (!occupancies[j])
          occupancies[j] = 0;
      }
      matrixData.datasets.push({
        label: label,
        data: occupancies
      })
      console.log(occupancies);
    }
      
      if (i > 60) // too many entries already
        break;  //abort
  }

  var sampleChart = new Chart(ctx('container')).HeatMap(matrixData, {
    responsive: false,
    labelScale: 0.6,
    rounded: true,
    options: {
      scales: {
        xAxes:[{ position: 'top' }]
      }
    }    
  });
</script>
