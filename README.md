# Deprecation

:warning: This visualization is deprecated for Kibi/Kibana >= 5.2. Use the `tag cloud` visualization instead.

# Kibi/Kibana Word Cloud Plugin    

This is a plugin for [Kibana 4.3+](https://www.elastic.co/products/kibana) and [Kibi 0.3](http://siren.solutions/kibi) (our extention of Kibana for Relational Data).

The plugin displays a cloud of words.

![image](img/wordcloud.png)
![image](img/wordcloud-config.png)

## Installation

This plugin can be installed in both:
 
 * [Kibana: 4.3+](https://www.elastic.co/downloads/past-releases/kibana-4-3-0)
 * [Kibi: 0.3+](https://siren.solutions/kibi) (Coming soon ...)

### Automatic

```sh
$ # for kibi
$ ./bin/kibi plugin -i kibi_wordcloud_vis -u https://github.com/sirensolutions/kibi_wordcloud_vis/raw/4.5.3/target/kibi_wordcloud_vis-4.5.3.zip
$ # for kibana 
$ ./bin/kibana plugin -i kibi_wordcloud_vis -u https://github.com/sirensolutions/kibi_wordcloud_vis/raw/4.5.3/target/kibi_wordcloud_vis-4.5.3.zip
```

### Manual

```sh
$ git clone https://github.com/sirensolutions/kibi_wordcloud_vis.git
$ cd kibi_wordcloud_vis
$ npm install
$ npm run build
$ npm run package
$ unzip target/kibi_wordcloud_vis-4.5.3.zip -d KIBANA_FOLDER_PATH/installedPlugins/
```

## Uninstall

```sh
$ # for kibi
$ bin/kibi plugin  --remove kibi_wordcloud_vis
$ # for kibana
$ bin/kibana plugin  --remove kibi_wordcloud_vis
```

## Development

- Clone the repository at the same level of a Kibana > 4.3 clone
- If needed, switch to the same node version as Kibana using nvm 
  (e.g. `nvm use 0.12`)
- Install dependencies with `npm install`
- Install the plugin to Kibana and start watching for changes by running 
  `npm start`
- run tests with `npm test`

If you are running kibana from folder with a name other than kibana, e.g. kibi

```sh
$ gulp dev  --kibanahomepath=/path/to/kibi
$ gulp test --kibanahomepath=/path/to/kibi
```

## Breaking changes with respect to the version embedded in Kibi 0.1x and 0.2.x

In the saved/exported visualization:

- The visualization name changed from `sindicetech_wordcloud` to `kibi_wordcloud`
- The visualization parameter `showMeticsAtAllLevels` is now `showMetricsAtAllLevels`
