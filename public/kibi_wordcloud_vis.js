define(function (require) {
  require('ui/agg_table');
  require('ui/agg_table/agg_table_group');

  require('plugins/kibi-wordcloud-plugin/kibi_wordcloud_vis.less');
  require('plugins/kibi-wordcloud-plugin/kibi_wordcloud_vis_controller');
  require('plugins/kibi-wordcloud-plugin/kibi_wordcloud_vis_params');

  require('ui/registry/vis_types').register(KibiWordcloudVisProvider);

  function KibiWordcloudVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    return new TemplateVisType({
      name: 'kibi_wordcloud',
      title: 'Kibi Word Cloud',
      icon: 'fa-cloud',
      description: 'Visualize a word cloud from high frequency terms.',
      template: require('plugins/kibi-wordcloud-plugin/kibi_wordcloud_vis.html'),
      params: {
        defaults: {
          perPage: 10,
          showPartialRows: false,
          showMetricsAtAllLevels: false
        },
        editor: '<kibi-wordcloud-vis-params></kibi-wordcloud-vis-params>'
      },
      hierarchicalData: function (vis) {
        return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          max: 1,
          defaults: [
            {type: 'count', schema: 'metric'}
          ]
        },
        {
          group: 'buckets',
          name: 'bucket',
          title: 'Split Rows',
          aggFilter: ['terms', 'significant_terms'],
          min: 1,
          max: 1
        }
      ]),
      requiresSearch: false
    });
  }

  // export the provider so that the visType can be required with Private()
  return KibiWordcloudVisProvider;
});
