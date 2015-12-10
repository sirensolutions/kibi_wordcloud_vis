module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'kibi_wordcloud',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      visTypes: [
        'plugins/kibi_wordcloud/kibi_wordcloud_vis'
      ]
    }
  });
};

