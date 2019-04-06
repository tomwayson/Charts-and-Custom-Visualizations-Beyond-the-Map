<div style="display: flex; justify-content: space-between; align-items: center; width: 400px; margin: 0 auto;">
  ## [Cedar](https://github.com/esri/cedar)
  <img src="img/cedar-logo-tree.png" class="transparent" height="200"/>
</div>
<h3>JavaScript Charts for ArcGIS</h3>

---

<h3><img src="img/globe.png" height="100" class="inline transparent">
Integrated with ArcGIS</h3>

<small class="fragment">Use `url` / `query` or `featureSet`</small>

---

<h3><img src="img/icons8-development_skill_filled.png" class="inline transparent">
 Smart Defaults</h3>

<small class="fragment">(with overrides)</small>

Note:
More and more means aligning w/ Pro's defaults

---

<h3><img src="img/icons8-recycle_sign_filled.png" class="inline transparent">
Extend, re-use, share</h3>

Note:
find yourself making same overrides again and again, create own chart type

---

### Process

<div class="center-align">
  <div class="stack fragment">
    <img style="margin-left: 50px; margin-bottom: 0;" src="img/icons8-thinking_bubble.png" class="transparent">
    <img style="margin-top: 0" src="img/icons8-under_computer_filled.png" class="transparent">
  </div>
  <div class="stack fragment">
    <img src="img/icons8-cloud_storage.png" class="transparent">
    <img src="img/icons8-usa_map.png" class="transparent">
  </div>
  <div class="stack fragment">
    <code style="font-size: 2em">{}</code>
    <br><code style="font-size: .6em">definition</code>
  </div>
  <div class="fragment">
    <img src="img/cedar-logo-tree.png" class="transparent" height="200"/>
  </div>
  <div class="fragment">
    <img src="img/icons8-combo_chart_filled.png" class="transparent">
  </div>
</div>

---

<h3><img src="img/icons8-rocket_filled.png" class="inline transparent">
Getting started</h3>

---

<a href="https://codepen.io/tomwayson/pen/paxgeO"><img src="img/simple-bar-chart.png" height="500" class="transparent" /></a>

Let's build [this chart](https://codepen.io/tomwayson/pen/paxgeO)

---

### Install with package manager
<div><code>npm install --save @esri/cedar</code></div>
<div class="fragment">or <code>yarn add @esri/cedar</code></div>

---

### Or from CDN

```html
<!-- load the amCharts base library -->
<script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
<!-- for bar, line, and area charts -->
<script src="https://www.amcharts.com/lib/3/serial.js"></script>
<!-- optionally load calcite theme -->
<script src="https://unpkg.com/@esri/cedar/dist/umd/themes/amCharts/calcite.js"></script>
<!-- load cedar -->
<script src="https://unpkg.com/@esri/cedar"></script>
```

---

<!-- .slide: data-transition="none" -->

### Build definition

```js
var definition = {};
```
<ul>
  <li class="fragment">Just a POJO</li>
  <li class="fragment">Minimum: `type`, `datasets`, `series`</li>
<ul>

---

<!-- .slide: data-transition="none" -->

### Definition `type`

```js
definition.type = 'bar';
```
<ul>
  <li class="fragment">Predefined: `'bar'`, `'line'`, `'scatter'`, `'pie'`</li>
  <li class="fragment">Or provide your own: `specification: {...}`</li>
<ul>

---

<!-- .slide: data-transition="none" -->
### Definition `datasets`

```js
definition.datatsets = [{
  url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/0",
  query: { orderByFields: "POPULATION DESC" }
}]
```

---

<!-- .slide: data-transition="none" -->

### Definition `series`

```js
definition.series = [
  {
    category: {field:"STATE_NAME",label:"US State"},
    value: {field:"POPULATION",label:"Population"}
  }
]
```

---

### Create chart instance (ESM)

<!-- .slide: data-transition="none" -->

```js
import { Chart } from '@esri/cedar';

// create a new cedar chart at a specified element
const myChart = new Chart('elementId', definition)
```

---

### Create chart instance (global)

<!-- .slide: data-transition="none" -->

```js
// create a new cedar chart at a specified element
var myChart = new cedar.Chart('elementId', definition)
```

&nbsp;

---

<!-- .slide: data-transition="none" -->

### Show the chart

```js
// execute query and render chart
cedarChart.show()
```

See the complete [Chart API](http://esri.github.io/cedar/api/classes/chart.html)

---

<h3><img src="img/icons8-usa_map.png" class="transparent inline"> Working with maps</h3>

---

### Charting features

<a href="https://codepen.io/tomwayson/pen/mxdVqO?editors=0110"><img src="img/map-with-feature-chart.png" height="500" class="transparent" /></a>

---

### Dataset `data`

```js
definition.datatsets = [{
  data: { features: graphics }
}]
```

Expects a [FeatureSet](https://esri.github.io/arcgis-rest-js/api/common-types/IFeatureSet/)

Note:
- _instead_ of `url` and `query`

---

### Use JavaScript to filter/sort

```js
graphics.sort(function(a, b) {
  return b.attributes.POPULATION - a.attributes.POPULATION;
});
```

---

### Aggregating map data

<a href="https://codepen.io/tomwayson/pen/YaKGjZ"><img src="img/map-with-aggregate-chart.png" height="500" class="transparent" /></a>

---

### Dataset `url` with aggregate `query`

```js
definition.datasets: [{
  url: "https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/It's_a_Tornado_Map/FeatureServer/0",
  query: {
    groupByFieldsForStatistics: "state",
    outStatistics: [{
      statisticType: "sum",
      onStatisticField: "injuries",
      outStatisticFieldName: "injuries_SUM"
    }]
  }
}]
```

Accepts any [valid query parameters](https://esri.github.io/arcgis-rest-js/api/feature-service/IQueryFeaturesParams/)


---

<a href="https://jsbin.com/juqafec/edit?html,output"><img src="img/client-side-query.gif" height="500" class="transparent" /></a>

[Client-side queries](https://jsbin.com/juqafec/edit?html,output)


---

### Update the chart `data` and re-`render()`

```js
// Query the features on the client using FeatureLayerView.queryFeatures
return featureLayerView.queryFeatures(query).then(function(results) {
  chart.datasets('tracts').data = results;
  chart.render();
}
```

---

### Chart [types](https://esri.github.io/cedar/)

<a href="https://esri.github.io/cedar/?type=bar"><img src="img/icons8-bar_chart.png" class="transparent"></a>
<a href="https://esri.github.io/cedar/?type=line"><img src="img/icons8-line_chart.png" class="transparent"></a>
<a href="https://esri.github.io/cedar/?type=area"><img src="img/icons8-area_chart.png" class="transparent"></a>
<a href="https://esri.github.io/cedar/?type=scatter"><img src="img/icons8-scatter_plot.png" class="transparent"></a>
<a href="https://esri.github.io/cedar/?type=pie"><img src="img/icons8-rebalance_portfolio.png" class="transparent"></a>
<a href="https://esri.github.io/cedar/?type=bar-grouped"><img src="img/icons8-futures.png" class="transparent"></a>

---

### Overriding chart defaults

```js
definition.overrides = {
  categoryAxis: {
    labelRotation: -45
  },
  legend: {
    enabled: true
  }
}
```

Accepts any [amCharts config parameters](https://docs.amcharts.com/3/javascriptcharts/AmChart)

---

### Better to use cedar API

```js
definition.overrides = {
  categoryAxis: {
    labelRotation: -45
  }
}

definition.legend = {
  visible: true
}
```

Note:
- we're expanding API
- aligning w/ shared chart spec

---

### Decoding [domain values](https://esri.github.io/cedar/?type=bar-domain)

```json
"domains": {
  "sheltstat": {
    "type": "codedValue",
    "name": "ShelterCode",
    "description": "Shelter Codes",
    "codedValues": [
      {
        "name": "Open",
        "code": 1
      },
      {
        "name": "Closed",
        "code": 2
      },
      {
        "name": "Full",
        "code": 3
      }
    ]
  }
}
```

<small>(a.k.a [attribute lists](https://doc.arcgis.com/en/arcgis-online/manage-data/define-attribute-lists-and-ranges.htm))</small>

---

<h3><img src="img/ArcGIS-Hub.png" height="100" class="inline transparent"> Cedar in ArcGIS Hub</h3>

Note:
- we are using cedar in production

---

### ArcGIS Hub users drive cedar requirements

<a href="http://geohub.lacity.org/"><img src="img/la-geohub-vision-zero.png" class="transparent" width="800"></a>

---

### Simplified chart building experience

<a href="https://esri.invisionapp.com/share/KPEVB3AQU#/screens/268312097">
<img src="img/chart-builder.png" class="transparent" height="400">
<img src="img/json-chart-editor.png" class="transparent" height="400">
</a>

---

### Cedar Charts in Hub Sites

- Chart Builder: [John's Creek - City Finances](http://datahub.johnscreekga.gov/pages/finances)
- Custom JSON: [City of Brampton - Globally Aware, Locally Active](http://geohub.brampton.ca/pages/globally-aware-locally-active-economy#five)

---


### [ember-cli-cedar](https://github.com/Esri/ember-cli-cedar)

<img src="img/tomster-sm.png" class="transparent">

Can be used in _any_ [Ember](https://www.emberjs.com/) application

Notes:
- makes it easy to get cedar in Ember
- helps you lazy-load amcharts
- not

---

<h3><img src="img/icons8-road_filled.png" height="100" class="inline transparent"> Cedar's road ahead</h3>

---

### <code style="color: gray">// TODO:</code>
- AmCharts [v4](https://www.amcharts.com/javascript-charts/)
- configuring tooltips
- chart events (click, mouseover, etc)
- chart selection
- lazy-load charting library
- support other charting libraries (engines)

---

### The End

[@tomwayson/Charts-and-Custom-Visualizations-Beyond-the-Map](https://github.com/tomwayson/Charts-and-Custom-Visualizations-Beyond-the-Map)
