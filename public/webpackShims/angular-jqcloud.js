require('angular');
require('jquery');
// NOTE: without the "script!" webpack is adding extra jquery to the bundle
// because it is required when loading jqcloud2 in node_modules/jqcloud2/dist/jqcloud.js
require('script!../../node_modules/jqcloud2/dist/jqcloud');
require('../../node_modules/jqcloud2/dist/jqcloud.css');
require('../../node_modules/angular-jqcloud/angular-jqcloud');

require('ui/modules').get('kibana', ['angular-jqcloud']);
