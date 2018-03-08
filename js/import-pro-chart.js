var layers = [
  {
    layerDefinition: {
      charts: [{
          type: "chart",
          name: "Bar Chart 1",
          title: "Comparison of Average Spending Per State",
          subTitle: "",
          footer: "",
          theme: "",
          series: [{
              type: "barSeries",
              title: "MEAN_Standardized_Per_Capita_Costs11",
              query: {
                  orderByFields: [
                      "'State_Health_charts_CleanCMS201'"
                  ]
              },
              x: "State_Health_charts_CleanCMS201",
              y: "CleanCMS2011_Statistics_2_MEAN_",
              showLabels: false,
              horizontalAxisId: "0",
              verticalAxisId: "1",
              colorType: "colorMatch",
              multipleBarType: "sideBySide",
              barSize: 90,
              fillSymbol: {
                  type: "esriSFS",
                  style: "esriSFSSolid",
                  color: [
                      166,
                      206,
                      227,
                      1
                  ]
              },
              verticalOrientation: true
          }],
          metadata: "",
          legend: {
              type: "chartLegend",
              visible: true,
              title: "",
              alignment: "bottom",
              content: ""
          },
          axes: [{
                  type: "chartAxis",
                  id: "0",
                  visible: true,
                  isLogarithmic: false,
                  title: "State",
                  valueFormat: "N2",
                  dateTimeFormat: "M/d/yyyy",
                  calculateAutomaticMinimum: true,
                  calculateAutomaticMaximum: true,
                  minimum: null,
                  maximum: null,
                  isVertical: true,
                  start: 0,
                  stop: 100,
                  position: 0
              },
              {
                  type: "chartAxis",
                  id: "1",
                  visible: true,
                  isLogarithmic: false,
                  title: "Standardized Per Capita Costs",
                  valueFormat: "N2",
                  dateTimeFormat: "M/d/yyyy",
                  calculateAutomaticMinimum: true,
                  calculateAutomaticMaximum: true,
                  minimum: null,
                  maximum: null,
                  isVertical: false,
                  start: 0,
                  stop: 100,
                  position: 0
              }
          ]
      }]
    }
  }
];

function importQuery(query) {
  var q  = {};
  if (query.orderByFields) {
    q.orderByFields = query.orderByFields.join(',');
  }
  return q;
}

cedar.import = function (url, arcgisChart) {
  var arcgisSeries = arcgisChart.series;
  if (!arcgisSeries || !arcgisSeries.length) {
    // TODO: throw?
    return {};
  }
  var firstSeries = arcgisChart.series[0];
  return {
    type: firstSeries.type.replace(/Series/, ''),
    datasets: [
      {
        url: url,
        query: importQuery(firstSeries.query)
      }
    ],
  };
  definition.series = arcgisSeries.map(function(s) {
    console.log(s);
    return {
      category: { field: s.x, label: s.title },
      value: { field: s.y, label: undefined }
    }
  });
  return definition;
};
