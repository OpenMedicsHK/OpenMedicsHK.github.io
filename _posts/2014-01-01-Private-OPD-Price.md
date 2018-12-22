---
layout: post
title: 私立醫院門診收費一覽
desc: 香港各大私立醫院的門診收費，分別顯示日診及通宵夜診間的收費分別。
level: 第二級
img: pic01.jpg
tags: [醫療服務實況]
---
<div id="highcharts"></div>

註：

1. 以上收費均以各醫院最新公布為準
2. 上列收費為基本門診收費，並未包含藥物、行政、或額外檢查所產生之費用。
3. 由於某部分醫院提供長者、醫療卡優惠，最終最低收費或會有不同。

<script>
  (function() {
    var files = ["https://code.highcharts.com/stock/highstock.js", "https://code.highcharts.com/highcharts-more.js", "https://code.highcharts.com/highcharts-3d.js", "https://code.highcharts.com/modules/exporting.js", "https://code.highcharts.com/modules/funnel.js", "https://code.highcharts.com/modules/annotations.js", "https://code.highcharts.com/modules/solid-gauge.js"],
        loaded = 0;
    if (typeof window["HighchartsEditor"] === "undefined") {
        window.HighchartsEditor = {
            ondone: [cl],
            hasWrapped: false,
            hasLoaded: false
        };
        include(files[0]);
    } else {
        if (window.HighchartsEditor.hasLoaded) {
            cl();
        } else {
            window.HighchartsEditor.ondone.push(cl);
        }
    }

    function isScriptAlreadyIncluded(src) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].hasAttribute("src")) {
                if ((scripts[i].getAttribute("src") || "").indexOf(src) >= 0 || (scripts[i].getAttribute("src") === "http://code.highcharts.com/highcharts.js" && src === "https://code.highcharts.com/stock/highstock.js")) {
                    return true;
                }
            }
        }
        return false;
    }

    function check() {
        if (loaded === files.length) {
            for (var i = 0; i < window.HighchartsEditor.ondone.length; i++) {
                try {
                    window.HighchartsEditor.ondone[i]();
                } catch (e) {
                    console.error(e);
                }
            }
            window.HighchartsEditor.hasLoaded = true;
        }
    }

    function include(script) {
        function next() {
            ++loaded;
            if (loaded < files.length) {
                include(files[loaded]);
            }
            check();
        }
        if (isScriptAlreadyIncluded(script)) {
            return next();
        }
        var sc = document.createElement("script");
        sc.src = script;
        sc.type = "text/javascript";
        sc.onload = function() {
            next();
        };
        document.head.appendChild(sc);
    }

    function each(a, fn) {
        if (typeof a.forEach !== "undefined") {
            a.forEach(fn);
        } else {
            for (var i = 0; i < a.length; i++) {
                if (fn) {
                    fn(a[i]);
                }
            }
        }
    }
    var inc = {},
        incl = [];
    each(document.querySelectorAll("script"), function(t) {
        inc[t.src.substr(0, t.src.indexOf("?"))] = 1;
    });
    
    var raw = {{ site.data.PRIVATEOPDPRICE | jsonify }};

    function cl() {
        if (typeof window["Highcharts"] !== "undefined") {
            var options = {
                "chart": {
                    "type": "columnrange",
                    "inverted": true,
                    "polar": false
                },
                exporting: { enabled: false },
                "plotOptions": {
                    "series": {
                        "animation": false,
                        "minPointLength": 5,
                        "lineWidth": 5,
                        "dataLabels": {
                            "enabled": true,
                            "style": {
                                "color": "contrast",
                                "fontSize": "11px",
                                "fontWeight": "",
                                "textOutline": "1px 1px contrast"
                            }
                        }
                    }
                },
                "title": {
                    "text": ""
                },
                "subtitle": {
                    "text": ""
                },
                "exporting": {},
                "series": [],
                "credits": {
                    "enabled": false
                },
                "tooltip": {
                    "shared": true
                },
                "legend": {},
                "xAxis": [{
                    "title": {},
                    "labels": {}
                }],
                "yAxis": [{
                    "title": {
                        "text": ""
                    },
                    "labels": {}
                }],
                "series": series
            };
            var chart = new Highcharts.Chart("highcharts", options);
            console.log(chart);
        }
    }
    console.log(series);

})();
</script>
