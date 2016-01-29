module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'kibi_wordcloud_vis',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      visTypes: [
        'plugins/kibi_wordcloud_vis/kibi_wordcloud_vis'
      ]
    }
  });
};

