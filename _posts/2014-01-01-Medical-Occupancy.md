---
layout: post
title:  "內科床位佔用率\n（按日熱量圖）"
desc: "於服務高峰期期間，醫管局每日發布的內科住院病床使用率數據。"
tags: [醫療服務實況]
img: pic01.jpg
level: 第一級
---

<script src='https://tmroyal.github.io/Chart.HeatMap/Chart.HeatMap.S.min.js'></script>
<div style="height: 500px; width: 100%; overflow-x: scroll;">
  <canvas id="container" style="min-width: {{ site.data.MEDOCCUPANCY | size | minus: 1 | times: 20 | plus: 150 }}px; max-height: 440px; margin: 0 auto"></canvas>
</div>


[原始數據](https://docs.google.com/spreadsheets/d/e/2PACX-1vRpbqc-2MwM-s9JtgXKFbfNmNOaTkve2rPmUxZvMoiJdYTJENStLX1W6i47mb-RURj3Or2oXRjPLhgD/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false)

數據等級：[第一級](/faq/#datalevel)

資料來源：[政府一站通搜尋功能 www.search.gov.hk](http://www.search.gov.hk/result?query="occupancy+rates"+"medical+wards"+"statistics"+"public hospitals"&search_but=&ui_charset=utf-8&web=this&output=xml_no_dtd&client=depts&proxystylesheet=ogcio_home_adv_frontend&ui_lang=en&r_lang=&gp1=gia_home&gp0=gia_home&web=this&txtonly=0&tpl_id=stdsearch&oe=UTF-8&ie=UTF-8&sort=date%3AS%3AS%3Ad1&site=gia_home&num=50)
  
<script>
  function ctx(elementId){
    return document.getElementById(elementId).getContext('2d');
  }

  // completely arbitrary data
  var data = {{ site.data.MEDOCCUPANCY | jsonify }};
  var matrixData = {
    labels: [],
    datasets: []
  };
  
  for (var i in data){
    if (i == 0){
      var labels = data[i];
      labels.splice(0,1);
      for (var j in labels)
        matrixData.datasets[j] = {
          label: labels[j],
          data: []
        };
    }else{
      var index = data.length-i-1;
      matrixData.labels.push(data[index][0]);
      for (var j in data[i]){
        if (j==0)
          continue;
        matrixData.datasets[j-1].data[i-1] = parseInt(data[index][j].match(/([0-9]*)/g)[0]);
        if (!matrixData.datasets[j-1].data[i-1])
          matrixData.datasets[j-1].data[i-1] = 0;
      }
    }
      if (i > 60) // too many entries already
        break;  //abort
  }
  console.log(matrixData);

  var sampleChart = new Chart(ctx('container')).HeatMap(matrixData, {
    responsive: false,
    labelScale: 0.6,
    rounded: true,
    colors: [ "rgba(220,220,220,0.9)", "rgba(250,157,169,0.9)", "rgba(147,50,63,0.9)"],
    labelFontColor: "rgba(225,225,225,0.8)",
    options: {
      scales: {
        xAxes:[{ position: 'top' }]
      }
    }    
  });
</script>
