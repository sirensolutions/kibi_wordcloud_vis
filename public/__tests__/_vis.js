describe('Visualization', function () {
  var angular = require('angular');
  var $ = require('jquery');
  var _ = require('lodash');
  var ngMock = require('ngMock');
  var expect = require('expect.js');
  var sinon = require('auto-release-sinon');

  var Private;
  var Vis;

  var vis;
  var filter;
  var init;

  beforeEach(ngMock.module('kibana', 'kibi_wordcloud/kibi_wordcloud_vis'));

  beforeEach(ngMock.inject(function ($injector) {
    Private = $injector.get('Private');
    Vis = Private(require('ui/Vis'));
    var indexPattern = Private(require('fixtures/stubbed_logstash_index_pattern'));
    var createFilter = Private(require('ui/agg_types/buckets/create_filter/terms'));

    init = function () {
      vis = new Vis(indexPattern, {
        type: 'kibi_wordcloud',
        aggs: [
          {
            type: 'terms',
            schema: 'segment',
            params: {field: 'machine.os'}
          }
        ]
      });

      filter = createFilter(vis.aggs[0], 'mykey');
    };
  }));

  it('creates a valid query filter', function () {
    init();

    expect(vis.type.name).to.be('kibi_wordcloud');
    expect(filter).to.have.property('query');
    expect(filter.query.match).to.have.property('machine.os');
    expect(filter.query.match['machine.os'].query).to.be('mykey');
    expect(filter).to.have.property('meta');
    expect(filter.meta).to.have.property('index', vis.indexPattern.id);
  });

});
