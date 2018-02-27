# Charts-and-Custom-Visualizations-Beyond-the-Map

## Part 1 - Flora
What makes a good chart, charting in Pro, arcpy, shared chart JSON specification in web maps and layers.

## Cedar - Tom

[cedar] - Charts for ArcGIS GeoServices

### Cedar Philosophy

#### Integrated with ArcGIS
- pass a `url` and `query`, or an array of `features`
- TODO: `import()` shared chart specification

#### Smart defaults (with overrides)
- align with Pro's defaults

#### Share & Re-usable charts (?)
- charts defined as JSON

### Working with cedar

#### Overview
- developer has data & idea of how they want to visualize it
- cedar `definition` = `type` + `datasets` + `series`

#### Example

`npm install @esri/cedar`

`import { Chart } from '@esri/cedar`;

```js
// create a new cedar chart at a specified element 
const cedarChart = new Chart('elementId', {
  type: 'bar'
});
```

```js
// identify service to query data from
cedarChart.datasets([
  {
    "url": "https://server.arcgisonline.com/arcgis/rest/services/Demographis/USA_Population_Density/MapServer/4"
  }
]);
```

```js
// bind feature attributes to chart properties
cedarChart.series([
  {
    "category": {"field":"NAME","label":"US State"},
    "value": {"field":"TOTPOP_CY","label":"Population"}
  }
]);
```

```js
// execute query and render chart
cedarChart.show();
```

#### Demo: ES5 Example
https://codepen.io/tomwayson/pen/paxgeO?editors=0010#0

#### Demo: Examples of Other Chart Types
Briefly review various types at: http://cedar-v1.surge.sh/
- [bar chart grouped by category field](http://cedar-v1.surge.sh/?type=bar)
- [line chart](http://cedar-v1.surge.sh/?type=line)
- [area chart](http://cedar-v1.surge.sh/?type=area)
- [pie with "other"](http://cedar-v1.surge.sh/?type=pie)
- [scatter](http://cedar-v1.surge.sh/?type=scatter)
- [bar split by field](http://cedar-v1.surge.sh/?type=bar-grouped)
- [bar split by stacked](http://cedar-v1.surge.sh/?type=bar-stacked)

### About v1
Above examples are v1, which is [still in beta](https://github.com/Esri/cedar/milestone/6), compared to [v0](http://esri.github.io/cedar/):
- brings improved support for multi-series charts
- still a few gaps:
 - tooltips
 - events (click, mouseover, etc)
 - selection
 - docs (you're looking at it)
- uses [AmCharts] under the hood instead of [vega](https://vega.github.io/vega/) and [d3](https://d3js.org/)

### Used in ArcGIS Hub
- Needs of ArcGIS Hub users drive cedar requirements

#### Simplify Chart Visualizations of Feature Service Data
- Enable Hub cities and their citizens to easily create chart visualizations of feature service data

#### Better Discovery / Understanding of Open Data
- chart distribution of attribute values in open datasets

#### An Addon for Ember Applications
- [ember-cli-cedar] can be used in _any_ Ember application

#### Demo: Cedar in ArcGIS Hub
- sites/pages w/ charts
 - The one that started it all: http://geohub.lacity.org/
 - Similar implemented w/ cedar: http://nullvisjonen-vision-zero-1-testkommune.hub.arcgis.com/
 - Another cedar site: http://nopoverty-sdgs.opendata.arcgis.com/pages/onedottwodottwo
 - TODO: others? make one?
- TODO: find a good example dataset to show attribute distributions

### Cedar's Road Ahead
- finish v1
- shared ArcGIS chart spec

#### Shared ArcGIS Chart Spec
- working with Pro, ArcGIS Online, Operations Dashboard and other product teams on a shared chart spec
- very similar to cedar's `definition` JSON
- cedar will at very least provide an `import()` method

#### Demo: Prototype Importing Shared Chart Spec
- TODO: this ;)

[cedar]:https://github.com/Esri/cedar
[AmCharts]:https://www.amcharts.com/
[ember-cli-cedar]:https://github.com/Esri/ember-cli-cedar
