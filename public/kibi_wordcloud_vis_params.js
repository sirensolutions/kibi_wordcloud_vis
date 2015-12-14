define(function (require) {
  require('ui/modules').get('kibi_wordcloud/kibi_wordcloud_vis')
  .directive('kibiWordcloudVisParams', function () {
    return {
      restrict: 'E',
      template: require('plugins/kibi-wordcloud-plugin/kibi_wordcloud_vis_params.html'),
      link: function ($scope) {
        $scope.$watchMulti([
          'vis.params.showPartialRows',
          'vis.params.showMetricsAtAllLevels'
        ], function () {
          if (!$scope.vis) return;

          var params = $scope.vis.params;
          if (params.showPartialRows || params.showMetricsAtAllLevels) {
            $scope.metricsAtAllLevels = true;
          } else {
            $scope.metricsAtAllLevels = false;
          }
        });
      }
    };
  });
});
