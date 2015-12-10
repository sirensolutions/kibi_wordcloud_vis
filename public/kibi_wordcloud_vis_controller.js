define(function (require) {
  var _ = require('lodash');

  var module = require('ui/modules').get('kibi_wordcloud/kibi_wordcloud_vis', ['kibana']);
  require('angular-jqcloud');

  module.controller('KibiWordcloudVisController', function ($scope, $element, $rootScope, Private, getAppState) {
    var filterBarClickHandler = Private(require('ui/filter_bar/filter_bar_click_handler'));
    var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    var _updateDimensions = function () {
      var delta = 18;
      var width = $element.parent().width();
      var height = $element.parent().height();
      if (width) {
        if (width > delta) {
          width -= delta;
        }
        $scope.options.width = width;
      }
      if (height) {
        if (height > delta) {
          height -= delta;
        }
        $scope.options.height = height;
      }
    };

    // set default options
    $scope.options = {
      width: 400,
      height: 300,
      colors: ['#800026', '#bd0026', '#e31a1c', '#fc4e2a', '#fd8d3c', '#feb24c', '#fed976'],
      words: []
    };

    var off = $rootScope.$on('change:vis', function () {
      _updateDimensions();
    });
    $scope.$on('$destroy', off);

    $scope.$watch('esResponse', function (resp, oldResp) {
      var tableGroups = $scope.tableGroups = null;
      var hasSomeRows = $scope.hasSomeRows = null;

      if (resp) {
        var vis = $scope.vis;
        var params = vis.params;

        tableGroups = tabifyAggResponse(vis, resp, {
          partialRows: params.showPartialRows,
          minimalColumns: vis.isHierarchical() && !params.showMetricsAtAllLevels,
          asAggConfigResults: true
        });

        hasSomeRows = tableGroups.tables.some(function haveRows(table) {
          if (table.tables) return table.tables.some(haveRows);
          return table.rows.length > 0;
        });

        var $state = getAppState();

        var words = [];
        if (tableGroups.tables.length === 1) {
          _.each(tableGroups.tables[0].rows, function (row, index) {
            if (row[0].type === 'bucket'  && row[1].type === 'metric') {
              words.push({
                text: row[0].value,
                weight: row[1].value,
                handlers: {
                  click: function (e) {
                    e.preventDefault();
                    var aggConfigResult = tableGroups.tables[0].rows[index][0];
                    var wordCloudEvent = {
                      point: {
                        orig: {
                          aggConfigResult: aggConfigResult
                        }
                      }
                    };
                    filterBarClickHandler($state)(wordCloudEvent);
                  }
                }
              });
            }
          });
        }
        $scope.options.words = words;
      }

      $scope.hasSomeRows = hasSomeRows;
      if (hasSomeRows) {
        $scope.tableGroups = tableGroups;
      }

      _updateDimensions();
    });
  });

});
