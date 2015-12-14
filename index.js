module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'kibi_wordcloud',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      visTypes: [
        'plugins/kibi-wordcloud-plugin/kibi_wordcloud_vis'
      ]
    }
  });
};

