(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = window.App = Ember.Application.createWithMixins(Bootstrap, {
  LOG_TRANSITIONS: false,
  LOG_TRANSITIONS_INTERNAL: false
});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.Router.map(function () {
  this.resource("jobs", { path: "/" });
  this.resource('job', { path: 'jobs/:hive_job_id' });
});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.IndexRoute = Ember.Route.extend({

  model: function () {
    return this.modelFor('hiveJobs');
  },

  beforeModel: function () {
    this.transitionTo('jobs');
  }

});

App.JobsRoute = Ember.Route.extend({

  model: function () {
    return this.get('store').find('hiveJob');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    var hashArray = location.pathname.split('/');
    var view = hashArray[2];
    var version = hashArray[3];
    var instanceName = hashArray[4];
    App.set('view', view);
    App.set('version', version);
    App.set('instanceName', instanceName);

    controller.set('interval', 6000);
    controller.loop('loadJobs', true);
    // This observer should be set with addObserver
    // If it set like ".observes(....)" it triggers two times
    Em.addObserver(controller, 'filterObject.startTime', controller, 'startTimeObserver');
  }

});

App.JobRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('loaded', false);
    controller.loop('loadJobDetails', true);
  },

  model: function (params) {
    return this.get('store').getById('hiveJob', params.hive_job_id);
  }

});

})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.ApplicationAdapter = DS.FixtureAdapter.extend();


})();

(function() {

App.Helpers = Ember.Namespace.create();

App.initializer({

  name: "preload",

  initialize: function(container, application) {

    application.reopen({

      /**
       * Test mode is automatically enabled if running on localhost
       * @type {bool}
       */
      testMode: (location.hostname == 'localhost'),

      /**
       * Prefix for API-requests
       * @type {string}
       */
      urlPrefix: '/api/v1/',

      /**
       * Current cluster name
       * @type {null|string}
       */
      clusterName: null

    });

    application.ApplicationStatusMapper.getInstanceParameters();

  }
});


/* Order and include as you please. */


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Ember.I18n.translations = {

  'any': 'Any',
  'apply': 'Apply',
  'ok': 'Ok',
  'cancel': 'Cancel',


  'common.status':'Status',
  'common.time.start': 'Start Time',
  'common.time.end': 'End Time',
  'common.name': 'Name',
  'common.tasks':'Tasks',
  'common.na': 'n/a',
  'common.value': 'Value',

  'number.validate.empty': 'cannot be empty',
  'number.validate.notValidNumber': 'not a valid number',
  'number.validate.lessThanMinumum': 'value less than %@1',
  'number.validate.moreThanMaximum': 'value greater than %@1',

  'jobs.type':'Jobs Type',
  'jobs.type.hive':'Hive',
  'jobs.show.up.to':'Show up to',
  'jobs.filtered.jobs':'%@ jobs showing',
  'jobs.filtered.clear':'clear filters',
  'jobs.column.id':'Id',
  'jobs.column.user':'User',
  'jobs.column.start.time':'Start Time',
  'jobs.column.end.time':'End Time',
  'jobs.column.duration':'Duration',
  'jobs.new_jobs.info':'New jobs available on server.',
  'jobs.loadingTasks': 'Loading...',

  'jobs.nothingToShow': 'No jobs to display',
  'jobs.error.ats.down': 'Jobs data cannot be shown since YARN App Timeline Server is not running.',
  'jobs.error.400': 'Unable to load data.',
  'jobs.table.custom.date.am':'AM',
  'jobs.table.custom.date.pm':'PM',
  'jobs.table.custom.date.header':'Select Custom Dates',
  'jobs.table.job.fail':'Job failed to run',
  'jobs.customDateFilter.error.required':'This field is required',
  'jobs.customDateFilter.error.date.order':'End Date must be after Start Date',
  'jobs.customDateFilter.startTime':'Start Time',
  'jobs.customDateFilter.endTime':'End Time',
  'jobs.hive.failed':'JOB FAILED',
  'jobs.hive.more':'show more',
  'jobs.hive.less':'show less',
  'jobs.hive.query':'Hive Query',
  'jobs.hive.stages':'Stages',
  'jobs.hive.yarnApplication':'YARN&nbsp;Application',
  'jobs.hive.tez.tasks':'Tez Tasks',
  'jobs.hive.tez.hdfs':'HDFS',
  'jobs.hive.tez.localFiles':'Local Files',
  'jobs.hive.tez.spilledRecords':'Spilled Records',
  'jobs.hive.tez.records':'Records',
  'jobs.hive.tez.reads':'%@1 reads',
  'jobs.hive.tez.writes':'%@1 writes',
  'jobs.hive.tez.records.count':'%@1 Records',
  'jobs.hive.tez.operatorPlan':'Operator Plan',
  'jobs.hive.tez.dag.summary.metric':'Summary Metric',
  'jobs.hive.tez.dag.error.noDag.title':'No Tez Information',
  'jobs.hive.tez.dag.error.noDag.message':'This job does not identify any Tez information.',
  'jobs.hive.tez.dag.error.noDagId.title':'No Tez Information',
  'jobs.hive.tez.dag.error.noDagId.message':'No Tez information was found for this job. Either it is waiting to be run, or has exited unexpectedly.',
  'jobs.hive.tez.dag.error.noDagForId.title':'No Tez Information',
  'jobs.hive.tez.dag.error.noDagForId.message':'No details were found for the Tez ID given to this job.',
  'jobs.hive.tez.metric.input':'Input',
  'jobs.hive.tez.metric.output':'Output',
  'jobs.hive.tez.metric.recordsRead':'Records Read',
  'jobs.hive.tez.metric.recordsWrite':'Records Written',
  'jobs.hive.tez.metric.tezTasks':'Tez Tasks',
  'jobs.hive.tez.metric.spilledRecords':'Spilled Records',
  'jobs.hive.tez.edge.':'Unknown',
  'jobs.hive.tez.edge.contains':'Contains',
  'jobs.hive.tez.edge.broadcast':'Broadcast',
  'jobs.hive.tez.edge.scatter_gather':'Shuffle',

  'app.loadingPlaceholder': 'Loading...',
  'apps.item.dag.job': 'Job',
  'apps.item.dag.jobId': 'Job Id',
  'apps.item.dag.type': 'Job Type',
  'apps.item.dag.status': 'Status',
  'apps.item.dag.num_stages': 'Total Stages',
  'apps.item.dag.stages': 'Tasks per Stage',
  'apps.item.dag.maps': 'Maps',
  'apps.item.dag.reduces': 'Reduces',
  'apps.item.dag.input': 'Input',
  'apps.item.dag.output': 'Output',
  'apps.item.dag.duration': 'Duration',

  'menu.item.jobs':'Jobs'

};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Allow to run object method periodically and stop it
 * Example:
 *  <code>
 *    var obj = Ember.Object.createWithMixins(App.RunPeriodically, {
 *      method: Ember.K
 *    });
 *    obj.set('interval', 10000); // override default value
 *    obj.loop('method'); // run periodically
 *    obj.stop(); // stop running
 *  </code>
 * @type {Ember.Mixin}
 */
App.RunPeriodically = Ember.Mixin.create({

  /**
   * Interval for loop
   * @type {number}
   */
  interval: 5000,

  /**
   * setTimeout's return value
   * @type {number}
   */
  timer: null,

  /**
   * Run <code>methodName</code> periodically with <code>interval</code>
   * @param {string} methodName method name to run periodically
   * @param {bool} initRun should methodName be run before setInterval call (default - true)
   * @method run
   */
  loop: function(methodName, initRun) {
    initRun = Em.isNone(initRun) ? true : initRun;
    var self = this,
      interval = this.get('interval');
    Ember.assert('Interval should be numeric and greated than 0', $.isNumeric(interval) && interval > 0);
    if (initRun) {
      this[methodName]();
    }
    this.set('timer',
      setInterval(function () {
        self[methodName]();
      }, interval)
    );
  },

  /**
   * Stop running <code>timer</code>
   * @method stop
   */
  stop: function() {
    var timer = this.get('timer');
    if (!Em.isNone(timer)) {
      clearTimeout(timer);
    }
  }

});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Config for each ajax-request
 *
 * Fields example:
 *  mock - testMode url
 *  real - real url (without API prefix)
 *  type - request type (also may be defined in the format method)
 *  format - function for processing ajax params after default formatRequest. May be called with one or two parameters (data, opt). Return ajax-params object
 *  testInProduction - can this request be executed on production tests (used only in tests)
 *
 * @type {Object}
 *
 * Any property inside {braces} is substituted dynamically by the formatUrl function provided that the property is passed into the "data" dictionary
 * by the ajax call.
 * E.g.,
   App.ajax.send({
     name: 'key_foo',
     data: {
          property1: value1,
          property2: value2
     }
   });

   Where the "urls" dictionary contains 'key_foo': {real: 'some_value_with_{property1}_and_{property2}' }
 */
var urls = {

  'load_jobs': {
    real: '/views/{view}/{version}/{instanceName}/proxy?url={atsURL}/ws/v1/timeline/HIVE_QUERY_ID{filtersLink}',
    mock: '/scripts/assets/hive-queries.json',
    apiPrefix: ''
  },

  'jobs_lastID': {
    // The filters "TEZ:true" are needed because ATS is case sensitive,
    // and in HDP 2.1, "tez" was used, while in HDP 2.2, "TEZ" was used.
    real: '/views/{view}/{version}/{instanceName}/proxy?url={atsURL}/ws/v1/timeline/HIVE_QUERY_ID?limit=1&secondaryFilter=TEZ:true',
    mock: '/scripts/assets/hive-queries.json',
    apiPrefix: ''
  },

  'job_details': {
    real: '/views/{view}/{version}/{instanceName}/proxy?url={atsURL}/ws/v1/timeline/HIVE_QUERY_ID/{job_id}?fields=events,otherinfo',
    mock: '/scripts/assets/hive-query-2.json',
    apiPrefix: ''
  },

  'jobs.tezDag.NametoID': {
    'real': '/views/{view}/{version}/{instanceName}/proxy?url={atsURL}/ws/v1/timeline/TEZ_DAG_ID?primaryFilter=dagName:{tezDagName}',
    'mock': '/scripts/assets/tezDag-name-to-id.json',
    'apiPrefix': ''
  },

  'jobs.tezDag.tezDagId': {
    'real': '/views/{view}/{version}/{instanceName}/proxy?url={atsURL}/ws/v1/timeline/TEZ_DAG_ID/{tezDagId}?fields=relatedentities,otherinfo',
    'mock': '/scripts/assets/tezDag.json',
    'apiPrefix': ''
  },

  'jobs.tezDag.tezDagVertexId': {
    'real': '/views/{view}/{version}/{instanceName}/proxy?url={atsURL}/ws/v1/timeline/TEZ_VERTEX_ID/{tezDagVertexId}?fields=otherinfo',
    'mock': '/scripts/assets/tezDagVertex.json',
    'apiPrefix': ''
  },

  'cluster_name': {
    real: 'clusters',
    mock: '/scripts/assets/clusters.json'
  },

  'services': {
    real: 'clusters/{clusterName}/services?fields=ServiceInfo/state,ServiceInfo/maintenance_state&minimal_response=true',
    mock: '/scripts/assets/services.json'
  },

  'components': {
    real: 'clusters/{clusterName}/components/?fields=ServiceComponentInfo/state&minimal_response=true',
    mock: '/scripts/assets/components.json'
  },

  'components_hosts': {
    real: 'clusters/{clusterName}/hosts?host_components/HostRoles/component_name={componentName}&minimal_response=true',
    mock: '/scripts/assets/components_hosts.json'
  },

  'config_tags': {
    real: 'clusters/{clusterName}/?fields=Clusters/desired_configs',
    mock: '/scripts/assets/desired_configs.json'
  },

  'configurations': {
    real: 'clusters/{clusterName}/configurations?{params}',
    mock: '/scripts/assets/configurations.json'
  },

  'instance_parameters': {
    real: 'views/{view}/versions/{version}/instances/{instanceName}/resources/status',
    mock: ''
  }

};
/**
 * Replace data-placeholders to its values
 *
 * @param {String} url
 * @param {Object} data
 * @return {String}
 */
var formatUrl = function (url, data) {
  if (!url) return null;
  var keys = url.match(/\{\w+\}/g);
  keys = (keys === null) ? [] : keys;
  if (keys) {
    keys.forEach(function (key) {
      var raw_key = key.substr(1, key.length - 2);
      var replace;
      if (!data || !data[raw_key]) {
        replace = '';
      }
      else {
        replace = data[raw_key];
      }
      url = url.replace(new RegExp(key, 'g'), replace);
    });

    var pattern = "/proxy?url=";
    var index = url.indexOf(pattern);
    if (index > -1) {
      url = url.substring(0, index) + pattern + escape(url.substring(index + pattern.length));
    }
  }
  return url;
};

/**
 * this = object from config
 * @return {Object}
 */
var formatRequest = function (data) {
  var opt = {
    type: this.type || 'GET',
    dataType: 'json',
    async: true,
    headers: this.headers
  };
  if (App.get('testMode')) {
    opt.url = formatUrl(this.mock ? this.mock : '', data);
    opt.type = 'GET';
  }
  else {
    var prefix = this.apiPrefix != null ? this.apiPrefix : App.get('urlPrefix');
    opt.url = prefix + formatUrl(this.real, data);
  }

  if (this.format) {
    jQuery.extend(opt, this.format(data, opt));
  }
  return opt;
};

/**
 * Wrapper for all ajax requests
 *
 * @type {Object}
 */
var ajax = Em.Object.extend({
  /**
   * Send ajax request
   *
   * @param {Object} config
   * @return {$.ajax} jquery ajax object
   *
   * config fields:
   *  name - url-key in the urls-object *required*
   *  sender - object that send request (need for proper callback initialization) *required*
   *  data - object with data for url-format
   *  beforeSend - method-name for ajax beforeSend response callback
   *  success - method-name for ajax success response callback
   *  error - method-name for ajax error response callback
   */
  send: function (config) {

    Ember.assert('Ajax sender should be defined!', config.sender);
    Ember.assert('Invalid config.name provided - ' + config.name, urls[config.name]);

    var opt = {},
      params = {clusterName: App.get('clusterName')};

    if (config.data) {
      jQuery.extend(params, config.data);
    }

    opt = formatRequest.call(urls[config.name], params);
    opt.context = this;

    // object sender should be provided for processing beforeSend, success, error and complete responses
    opt.beforeSend = function (xhr) {
      if (config.beforeSend) {
        config.sender[config.beforeSend](opt, xhr, params);
      }
    };

    opt.success = function (data) {
      console.log("TRACE: The url is: " + opt.url);
      if (config.success) {
        config.sender[config.success](data, opt, params);
      }
    };

    opt.error = function (request, ajaxOptions, error) {
      if (config.error) {
        config.sender[config.error](request, ajaxOptions, error, opt, params);
      }
    };

    opt.complete = function (xhr, status) {
      if (config.complete) {
        config.sender[config.complete](xhr, status);
      }
    };

    return $.ajax(opt);
  }

});

App.ajax = ajax.create({});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.Helpers.date = {

  /**
   * List of monthes short names
   * @type {string[]}
   */
  dateMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  /**
   * List of days short names
   * @type {string[]}
   */
  dateDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  /**
   * Add leading zero
   *
   * @param {string} time
   * @returns {string}
   * @method dateFormatZeroFirst
   */
  dateFormatZeroFirst: function (time) {
    if (time < 10) return '0' + time;
    return ""  + time;
  },

  /**
   * Convert timestamp to date-string 'DAY_OF_THE_WEEK, MONTH DAY, YEAR HOURS:MINUTES'
   *
   * @param {number} timestamp
   * @param {bool} showSeconds should seconds be added to result string
   * @param {bool} showMilliseconds should miliseconds be added to result string (if <code>showSeconds</code> is false, milliseconds wouldn't be added)
   * @return {*} date
   * @method dateFormat
   */
  dateFormat: function (timestamp, showSeconds, showMilliseconds) {
    if (!App.Helpers.validator.isValidInt(timestamp)) {
      return timestamp;
    }
    var format = 'ddd, MMM DD, YYYY HH:mm';
    if (showSeconds) {
      format += ':ss';
      if (showMilliseconds) {
        format += ':SSS';
      }
    }
    return moment(new Date(timestamp)).format(format);
  },

  /**
   * Convert starTimestamp to 'DAY_OF_THE_WEEK, MONTH DAY, YEAR HOURS:MINUTES', except for the case: year equals 1969
   *
   * @param {string} startTimestamp
   * @return {string} startTimeSummary
   * @method startTime
   */
  startTime: function (startTimestamp) {
    if (!App.Helpers.validator.isValidInt(startTimestamp)) {
      return '';
    }
    var startDate = new Date(startTimestamp);
    var months = this.dateMonths;
    var days = this.dateDays;
    // generate start time
    if (startDate.getFullYear() == 1969 || startTimestamp < 1) {
      return 'Not started';
    }
    var startTimeSummary = '';
    if (new Date(startTimestamp).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) { //today
      startTimeSummary = 'Today ' + this.dateFormatZeroFirst(startDate.getHours()) + ':' + this.dateFormatZeroFirst(startDate.getMinutes());
    } else {
      startTimeSummary = days[startDate.getDay()] + ' ' + months[startDate.getMonth()] + ' ' +
        this.dateFormatZeroFirst(startDate.getDate()) + ' ' + startDate.getFullYear() + ' '
        + this.dateFormatZeroFirst(startDate.getHours()) + ':' + this.dateFormatZeroFirst(startDate.getMinutes());
    }
    return startTimeSummary;
  },

  /**
   * Provides the duration between the given start and end timestamp. If start time
   * not valid, duration will be ''. If end time is not valid, duration will
   * be till now, showing 'Lasted for xxx secs'.
   *
   * @param {string} startTimestamp
   * @param {string} endTimestamp
   * @return {string} durationSummary
   * @method durationSummary
   */
  durationSummary: function (startTimestamp, endTimestamp) {
    // generate duration
    var durationSummary = '';
    var startDate = new Date(startTimestamp);
    var endDate = new Date(endTimestamp);
    if (startDate.getFullYear() == 1969 || startTimestamp < 1) {
      // not started
      return Em.I18n.t('common.na');
    }
    if (endDate.getFullYear() != 1969 && endTimestamp > 0) {
      return '' + this.timingFormat(endTimestamp - startTimestamp, 1); //lasted for xx secs
    } else {
      // still running, duration till now
      var t = new Date().getTime(),
        time = (t - startTimestamp) < 0 ? 0 : (t - startTimestamp);
      durationSummary = '' + this.timingFormat(time, 1);
    }
    return durationSummary;
  },

  /**
   * Convert time in mseconds to
   * 30 ms = 30 ms
   * 300 ms = 300 ms
   * 999 ms = 999 ms
   * 1000 ms = 1.00 secs
   * 3000 ms = 3.00 secs
   * 35000 ms = 35.00 secs
   * 350000 ms = 350.00 secs
   * 999999 ms = 999.99 secs
   * 1000000 ms = 16.66 mins
   * 3500000 secs = 58.33 mins
   *
   * @param {number} time
   * @param {bool} zeroValid for the case to show 0 when time is 0, not null
   * @return {string|null} formatted date
   * @method timingFormat
   */
  timingFormat: function (time, /* optional */ zeroValid) {
    var intTime = parseInt(time);
    if (zeroValid && intTime == 0) {
      return 0 + ' secs';
    }
    if (!intTime) {
      return null;
    }
    var timeStr = intTime.toString();
    var lengthOfNumber = timeStr.length;
    var oneMinMs = 60000;
    var oneHourMs = 3600000;
    var oneDayMs = 86400000;

    if (lengthOfNumber < 4) {
      return time + ' ms';
    } else if (lengthOfNumber < 7) {
      time = (time / 1000).toFixed(2);
      return time + ' secs';
    } else if (time < oneHourMs) {
      time = (time / oneMinMs).toFixed(2);
      return time + ' mins';
    } else if (time < oneDayMs) {
      time = (time / oneHourMs).toFixed(2);
      return time + ' hours';
    } else {
      time = (time / oneDayMs).toFixed(2);
      return time + ' days';
    }
  },

  /**
   * Provides the duration between the given start and end time. If start time
   * is not given, duration will be 0. If end time is not given, duration will
   * be till now.
   *
   * @param {Number} startTime Start time from epoch
   * @param {Number} endTime End time from epoch
   * @return {Number} duration
   * @method duration
   */
  duration: function (startTime, endTime) {
    var duration = 0;
    if (startTime && startTime > 0) {
      if (!endTime || endTime < 1) {
        endTime = new Date().getTime();
      }
      duration = endTime - startTime;
    }
    return duration;
  }
};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.Helpers.jobs = {

  /**
   * Refreshes the latest information for a given job
   *
   * @param {App.AbstractJob} job
   * @param {Function} successCallback
   * @param {Function} errorCallback (errorId) Called in error cases where there is no
   *          data from server. 'errorId' can be one of
   *          <ul>
   *            <li>job.dag.noId</li>
   *            <li>job.dag.noname</li>
   *            <li>job.dag.id.noDag</li>
   *            <li>job.dag.id.loaderror</li>
   *            <li>job.dag.name.loaderror</li>
   *          </ul>
   */
  refreshJobDetails: function (job, successCallback, errorCallback) {
    this.refreshHiveJobDetails(job, successCallback, errorCallback);
  },

  /**
   * Refreshes latest information of a Hive Job.
   *
   * @param {App.HiveJob} hiveJob
   * @param {Function} successCallback
   * @param {Function} errorCallback @see #refreshJobDetails()
   * @method refreshHiveJobDetails
   */
  refreshHiveJobDetails: function (hiveJob, successCallback, errorCallback) {
    var  atsURL = App.get('atsURL') || 'http://' + App.HiveJob.store.getById('component', 'APP_TIMELINE_SERVER').get('hostName') +
        ':' + App.HiveJob.store.getById('service', 'YARN').get('ahsWebPort');

    return App.ajax.send({
      name: 'job_details',
      sender: this,
      data: {
        atsURL: atsURL,
        job_id: hiveJob.get('id'),
        view: App.get("view"),
        version: App.get("version"),
        instanceName: App.get("instanceName"),
        successCallback: successCallback,
        errorCallback: errorCallback
      },
      success: 'refreshHiveJobDetailsSuccessCallback'
    });

  },

  refreshHiveJobDetailsSuccessCallback: function (data, opt, params) {
    App.hiveJobMapper.map(data);
    var hiveRecord = App.HiveJob.store.getById('hiveJob', params.job_id),
      tezDagName = hiveRecord.get('tezDag.name'),
      self = this;
    if (!Em.isNone(tezDagName)) {
      var sender = {
        dagNameToIdSuccess: function (data) {
          if (data && data.entities && data.entities.length > 0) {
            var dagId = data.entities[0].entity;
            hiveRecord.get('tezDag').set('instanceId', dagId);
            self.refreshTezDagDetails(tezDagName, params.successCallback, params.errorCallback);
          }
          else {
            params.errorCallback('job.dag.noId');
          }
        },
        dagNameToIdError: function () {
          params.errorCallback('job.dag.name.loaderror');
        }
      };
      App.ajax.send({
        name: 'jobs.tezDag.NametoID',
        sender: sender,
        data: {
          atsURL: params.atsURL,
          tezDagName: tezDagName,
          view: App.get("view"),
          version: App.get("version"),
          instanceName: App.get("instanceName")
        },
        success: 'dagNameToIdSuccess',
        error: 'dagNameToIdError'
      });
    }
    else {
      params.errorCallback('job.dag.noname');
    }
  },

  /**
   * Refreshes runtime information of a Tez DAG based on events generated.
   * The instance ID of the Tez DAG should be set.
   *
   * @param {string} tezDagId ID of the Tez DAG. Example: 'HIVE-Q2:1'
   * @param {Function} successCallback
   * @param {Function} errorCallback @see #refreshJobDetails()
   * @method refreshTezDagDetails
   */
  refreshTezDagDetails: function (tezDagId, successCallback, errorCallback) {
    var self = this,
        atsURL = App.get('atsURL') || 'http://' + App.HiveJob.store.getById('component', 'RESOURCEMANAGER').get('hostName') + ':' + App.HiveJob.store.getById('service', 'YARN').get('ahsWebPort'),
        resourceManager = App.HiveJob.store.getById('component', 'RESOURCEMANAGER'),
        resourceManagerHostName = App.get('resourceManagerURL') || (resourceManager && 'http://' + resourceManager.get('hostName') + ':8088') || '',
        tezDag = App.HiveJob.store.getById('tezDag', tezDagId);
    if (tezDag) {
      var tezDagInstanceId = tezDag.get('instanceId'),
          sender = {
            loadTezDagSuccess: function (data) {
              if (data) {
                var app_id = Em.get(data, 'otherinfo.applicationId');
                if (app_id && resourceManagerHostName) {
                  tezDag.set('yarnApplicationId', app_id);
                  tezDag.set('yarnApplicationLink', resourceManagerHostName + '/cluster/app/' + app_id);
                }
                if (data.relatedentities && data.relatedentities.TEZ_VERTEX_ID != null) {
                  var count = data.relatedentities.TEZ_VERTEX_ID.length;
                  data.relatedentities.TEZ_VERTEX_ID.forEach(function (v) {
                    self.refreshTezDagVertex(tezDagId, v, function () {
                      if (--count <= 0) {
                        // all vertices succeeded
                        successCallback();
                      }
                    });
                  });
                }
              }
            },
            loadTezDagError: function () {
              errorCallback('job.dag.id.loaderror');
            }
          };
      App.ajax.send({
        name: 'jobs.tezDag.tezDagId',
        sender: sender,
        data: {
          tezDagId: tezDagInstanceId,
          atsURL: atsURL,
          view: App.get("view"),
          version: App.get("version"),
          instanceName: App.get("instanceName")
        },
        success: 'loadTezDagSuccess',
        error: 'loadTezDagError'
      });
    }
    else {
      errorCallback('job.dag.id.noDag');
    }
  },

  /**
   * Refreshes runtime information of the given vertex.
   *
   * @param {string} tezDagId ID of the Tez DAG. Exmaple: 'HIVE-Q2:1'
   * @param {string} tezVertexInstanceId Instance ID of the vertex to refresh. Example 'vertex_1390516007863_0001_1_00'
   * @param {Function} successCallback
   * @method refreshTezDagVertex
   */
  refreshTezDagVertex: function (tezDagId, tezVertexInstanceId, successCallback) {
    var atsURL = App.get('atsURL') || 'http://' + App.HiveJob.store.getById('component', 'APP_TIMELINE_SERVER').get('hostName') + ':' + App.HiveJob.store.getById('service', 'YARN').get('ahsWebPort'),
      tezDag = App.HiveJob.store.getById('tezDag', tezDagId),
      hiveJob = App.HiveJob.store.all('hiveJob').findBy('tezDag', tezDag),
      hiveJobFailed = hiveJob.get('failed'),
      hiveJobEndTime = hiveJob.get('endTime'),
      sender = {
        loadTezDagVertexSuccess: function (data) {
          if (data && data.otherinfo) {
            var vertexRecord = App.HiveJob.store.getById('tezDagVertex', tezDagId + "/" + data.otherinfo.vertexName);
            if (vertexRecord != null) {
              vertexRecord.set('startTime', data.otherinfo.startTime);
              if (data.otherinfo.endTime == undefined && hiveJobFailed) {
                vertexRecord.set('endTime', hiveJobEndTime);
              }
              else {
                vertexRecord.set('endTime', data.otherinfo.endTime);
              }
              vertexRecord.set('tasksCount', data.otherinfo.numTasks);
              if (data.otherinfo.status == null && hiveJobFailed) {
                vertexRecord.set('state', Em.I18n.t('jobs.hive.failed'));
              }
              else {
                vertexRecord.set('state', data.otherinfo.status);
              }
              if (data.otherinfo.counters && data.otherinfo.counters.counterGroups) {
                data.otherinfo.counters.counterGroups.forEach(function (cGroup) {
                  var cNameToPropetyMap = {};
                  switch (cGroup.counterGroupName) {
                    case 'org.apache.tez.common.counters.FileSystemCounter':
                      cNameToPropetyMap = {
                        'FILE_BYTES_READ': 'fileReadBytes',
                        'FILE_BYTES_WRITTEN': 'fileWriteBytes',
                        'FILE_READ_OPS': 'fileReadOps',
                        'FILE_WRITE_OPS': 'fileWriteOps',
                        'HDFS_BYTES_READ': 'hdfsReadBytes',
                        'HDFS_BYTES_WRITTEN': 'hdfsWriteBytes',
                        'HDFS_READ_OPS': 'hdfsReadOps',
                        'HDFS_WRITE_OPS': 'hdfsWriteOps'
                      };
                      break;
                    case 'org.apache.tez.common.counters.TaskCounter':
                      cNameToPropetyMap = {
                        'SPILLED_RECORDS': 'spilledRecords'
                      };
                      break;
                    case 'HIVE':
                      var vertexNameFormatted = App.Helpers.string.convertSpacesToUnderscores(data.otherinfo.vertexName);
                      cNameToPropetyMap = {};
                      cNameToPropetyMap['RECORDS_IN_' + vertexNameFormatted] = 'recordReadCount';
                      cNameToPropetyMap['RECORDS_OUT_' + vertexNameFormatted] = 'recordWriteCount';
                      break;
                    default:
                      break;
                  }
                  if (cGroup.counters) {
                    cGroup.counters.forEach(function (counter) {
                      var prop = cNameToPropetyMap[counter.counterName];
                      if (prop != null) {
                        vertexRecord.set(prop, counter.counterValue);
                      }
                    });
                  }
                });
              }
              successCallback();
            }
          }
        },
        loadTezDagVertexError: function (jqXHR, url, method, showStatus) {}
      };
    App.ajax.send({
      name: 'jobs.tezDag.tezDagVertexId',
      sender: sender,
      data: {
        atsURL: atsURL,
        tezDagVertexId: tezVertexInstanceId,
        view: App.get("view"),
        version: App.get("version"),
        instanceName: App.get("instanceName")
      },
      success: 'loadTezDagVertexSuccess',
      error: 'loadTezDagVertexError'
    });
  }
};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.Helpers.misc = {

  /**
   * Convert value from bytes to appropriate measure
   */
  formatBandwidth: function (value) {
    if (value) {
      if (value < 1024) {
        value = '<1KB';
      } else {
        if (value < 1048576) {
          value = (value / 1024).toFixed(1) + 'KB';
        } else if (value >= 1048576 && value < 1073741824) {
          value = (value / 1048576).toFixed(1) + 'MB';
        } else {
          value = (value / 1073741824).toFixed(2) + 'GB';
        }
      }
    }
    return value;
  },

  /**
   * Convert ip address to integer
   * @param ip
   * @return integer
   */
  ipToInt: function (ip) {
    // *     example 1: ipToInt('192.0.34.166');
    // *     returns 1: 3221234342
    // *     example 2: ipToInt('255.255.255.256');
    // *     returns 2: false
    // Verify IP format.
    if (!/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
      return false; // Invalid format.
    }
    // Reuse ip variable for component counter.
    var d = ip.split('.');
    return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
  }

};

App.tooltip = function (self, options) {
  self.tooltip(options);
  self.on("remove DOMNodeRemoved", function () {
    $(this).trigger('mouseleave');
  });
};

})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.Helpers.number = {

  /**
   * Convert byte size to other metrics.
   * 
   * @param {Number} bytes to convert to string
   * @param {Number} precision Number to adjust precision of return value. Default is 0.
   * @param {String} parseType
   *           JS method name for parse string to number. Default is "parseInt".
   * @param {Number} multiplyBy bytes by this number if given. This is needed
   *          as <code>null * 1024 = 0</null>
   * @remarks The parseType argument can be "parseInt" or "parseFloat".
   * @return {String} Returns converted value with abbreviation.
   */
  bytesToSize: function (bytes, precision, parseType, multiplyBy) {
    if (isNaN(bytes)) bytes = 0;
    if (Em.isNone(bytes)) {
      return 'n/a';
    } else {
      if (arguments[2] === undefined) {
        parseType = 'parseInt';
      }
      if (arguments[3] === undefined) {
        multiplyBy = 1;
      }
      var value = bytes * multiplyBy;
      var sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ];
      var posttxt = 0;
      while (value >= 1024) {
        posttxt++;
        value = value / 1024;
      }
      if (value === 0) {
        precision = 0;
      }
      var parsedValue = window[parseType](value);
      return parsedValue.toFixed(precision) + " " + sizes[posttxt];
    }
  },

  /**
   * Validates if the given string or number is an integer between the
   * values of min and max (inclusive). The minimum and maximum
   * checks are ignored if their valid is NaN.
   *
   * @method validateInteger
   * @param {string|number} str - input string
   * @param {string|number} [min]
   * @param {string|number} [max]
   */
  validateInteger : function(str, min, max) {
    if (Em.isNone(str) || (str + "").trim().length < 1) {
      return Em.I18n.t('number.validate.empty');
    }
    str = (str + "").trim();
    var number = parseInt(str);
    if (isNaN(number)) {
      return Em.I18n.t('number.validate.notValidNumber');
    }
    if (str.length != (number + "").length) {
      // parseInt("1abc") returns 1 as integer
      return Em.I18n.t('number.validate.notValidNumber');
    }
    if (!isNaN(min) && number < min) {
      return Em.I18n.t('number.validate.lessThanMinumum').fmt(min);
    }
    if (!isNaN(max) && number > max) {
      return Em.I18n.t('number.validate.moreThanMaximum').fmt(max);
    }
    return null;
  }

};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.Helpers.string = {

  /**
   * Determines whether string end within another string.
   *
   * @method endsWith
   * @param {string} str string
   * @param {string} suffix substring for search
   * @return {boolean}
   */
  endsWith: function (str, suffix) {
    return str.indexOf(suffix, this.length - suffix.length) !== -1;
  },

  /**
   * Determines whether string start within another string.
   *
   * @method startsWith
   * @param {string} str string
   * @param {string} prefix substring for search
   * @return {boolean}
   */
  startsWith: function (str, prefix) {
    return str.indexOf(prefix) == 0;
  },

  getCamelCase: function(name) {
    if (name != null) {
      return name.toLowerCase().replace(/(\b\w)/g, function(f) {
        return f.toUpperCase();
      })
    }
    return name;
  },

  /**
   * Finds the value in an object where this string is a key.
   * Optionally, the index of the key can be provided where the
   * value of the nth key in the hierarchy is returned.
   *
   * Example:
   *  var tofind = 'smart';
   *  var person = {'name': 'Bob Bob', 'smart': 'no', 'age': '28', 'personality': {'smart': 'yes', 'funny': 'yes', 'emotion': 'happy'} };
   *  findIn(tofind, person); // 'no'
   *  findIn(tofind, person, 0); // 'no'
   *  findIn(tofind, person, 1); // 'yes'
   *  findIn(tofind, person, 2); // null
   *
   *  @method findIn
   *  @param s {string}
   *  @param multi {object}
   *  @param index {number} Occurrence count of this key
   *  @param _foundValues {array}
   *  @return {*} Value of key at given index
   */
  findIn: function(s, multi, index, _foundValues) {
    if (!index) {
      index = 0;
    }
    if (!_foundValues) {
      _foundValues = [];
    }
    multi = multi || '';
    var value = null,
      str = s.valueOf();
    if (typeof multi == 'object') {
      for ( var key in multi) {
        if (value != null) {
          break;
        }
        if (key == str) {
          _foundValues.push(multi[key]);
        }
        if (_foundValues.length - 1 == index) {
          // Found the value
          return _foundValues[index];
        }
        if (typeof multi[key] == 'object') {
          value = value || this.findIn(s, multi[key], index, _foundValues);
        }
      }
    }
    return value;
  },

  /**
   * Convert spaces to underscores
   * @method convertSpacesToUnderscores
   * @param {string} str
   * @returns {string}
   */
  convertSpacesToUnderscores: function (str) {
    return Em.isNone(str) ? '' : str.replace(' ', '_');
  }

};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.Helpers.validator = {

  isValidInt: function(value) {
    var intRegex = /^-?\d+$/;
    return intRegex.test(value);
  }

};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.Component = DS.Model.extend({

  /**
   * Component name
   * @type {string}
   */
  componentName: DS.attr('string'),

  /**
   * Component state
   * @type {string}
   */
  workStatus: DS.attr('string'),

  /**
   * Name of host where ATS installed
   * @type {string}
   */
  hostName: ''

});

App.Component.FIXTURES = [];

})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/**
 * Base class of all Jobs.
 *
 * This class is meant to be extended and not instantiated directly.
 */
App.AbstractJob = DS.Model.extend({

  name : DS.attr('string'),

  user : DS.attr('string'),

  startTime : DS.attr('number'),

  endTime : DS.attr('number'),

  startTimeDisplay : function() {
    var startTime = this.get('startTime');
    return startTime > 0 ? App.Helpers.date.dateFormat(startTime) : '';
  }.property('startTime'),

  endTimeDisplay : function() {
    var endTime = this.get('endTime');
    return endTime > 0 ? App.Helpers.date.dateFormat(endTime) : '';
  }.property('endTime'),

  /**
   * Provides the duration of this job. If the job has not started, duration
   * will be given as 0. If the job has not ended, duration will be till now.
   *
   * @return {Number} Duration in milliseconds.
   */
  duration : function() {
    var startTime = this.get('startTime');
    var endTime = this.get('endTime');
    if(endTime < startTime || endTime == undefined) {
      endTime =  new Date().getTime();
    }
    return App.Helpers.date.duration(startTime, endTime);
  }.property('startTime', 'endTime'),

  durationDisplay : function() {
    return App.Helpers.date.timingFormat(this.get('duration'), true);
  }.property('duration'),

  /**
   * Type of this job. Should be one of constants defined in App.JobType
   */
  jobType : DS.attr('string')
});

App.JobType = {
  HIVE : "hive"
};

App.AbstractJob.FIXTURES = [];


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.HiveJob = App.AbstractJob.extend({

  jobType: App.JobType.HIVE,

  queryText: DS.attr('string'),

  hasTezDag: DS.attr('boolean'),

  tezDag: DS.belongsTo('tezDag'),

  failed: DS.attr('boolean')

});

App.HiveJob.FIXTURES = [];


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.TezDag = DS.Model.extend({

  /**
   * When DAG is actually running on server, a unique ID is assigned.
   */
  instanceId: DS.attr('string'),

  name: DS.attr('string'),

  yarnApplicationId: DS.attr('string'),

  yarnApplicationLink: DS.attr('string'),

  stage: DS.attr('string'),

  vertices: DS.hasMany('tezDagVertex'),

  edges: DS.hasMany('tezDagEdge'),

  hiveJob: DS.belongsTo('hiveJob')

});

App.TezDagEdge = DS.Model.extend({

  instanceId: DS.attr('string'),

  fromVertex: DS.belongsTo('tezDagVertex'),

  toVertex: DS.belongsTo('tezDagVertex'),

  /**
   * Type of this edge connecting vertices. Should be one of constants defined
   * in 'App.TezDagEdgeType'.
   */
  edgeType: DS.attr('string'),

  tezDag: DS.belongsTo('tezDag')

});

App.TezDagVertex = DS.Model.extend({

  /**
   * When DAG vertex is actually running on server, a unique ID is assigned.
   */
  instanceId: DS.attr('string'),

  name: DS.attr('string'),

  tezDag: DS.belongsTo('tezDag'),

  /**
   * State of this vertex. Should be one of constants defined in
   * App.TezDagVertexState.
   */
  state: DS.attr('string'),

  /**
   * Vertex type has to be one of the types defined in 'App.TezDagVertexType'
   * @return {string}
   */
  type: DS.attr('string'),

  /**
   * A vertex can have multiple incoming edges.
   */
  incomingEdges: DS.hasMany('tezDagEdge'),

  /**
   * This vertex can have multiple outgoing edges.
   */
  outgoingEdges: DS.hasMany('tezDagEdge'),

  startTime: DS.attr('number'),

  endTime: DS.attr('number'),

  /**
   * Provides the duration of this job. If the job has not started, duration
   * will be given as 0. If the job has not ended, duration will be till now.
   *
   * @return {Number} Duration in milliseconds.
   */
  duration: function () {
    return App.Helpers.date.duration(this.get('startTime'), this.get('endTime'))
  }.property('startTime', 'endTime'),

  /**
   * Each Tez vertex can perform arbitrary application specific computations
   * inside. The application can provide a list of operations it has provided in
   * this vertex.
   *
   * Array of strings. [{string}]
   */
  operations: DS.attr('array'),

  /**
   * Provides additional information about the 'operations' performed in this
   * vertex. This is shown directly to the user.
   */
  operationPlan: DS.attr('string'),

  /**
   * Number of actual Map/Reduce tasks in this vertex
   */
  tasksCount: DS.attr('number'),

  tasksNumber: function () {
    return this.getWithDefault('tasksCount', 0);
  }.property('tasksCount'),

  /**
   * Local filesystem usage metrics for this vertex
   */
  fileReadBytes: DS.attr('number'),

  fileWriteBytes: DS.attr('number'),

  fileReadOps: DS.attr('number'),

  fileWriteOps: DS.attr('number'),

  /**
   * Spilled records
   */
  spilledRecords: DS.attr('number'),

  /**
   * HDFS usage metrics for this vertex
   */
  hdfsReadBytes: DS.attr('number'),

  hdfsWriteBytes: DS.attr('number'),

  hdfsReadOps: DS.attr('number'),

  hdfsWriteOps: DS.attr('number'),

  /**
   * Record metrics for this vertex
   */
  recordReadCount: DS.attr('number'),

  recordWriteCount: DS.attr('number'),

  totalReadBytes: function () {
    return (this.get('fileReadBytes') || 0) + (this.get('hdfsReadBytes') || 0);
  }.property('fileReadBytes', 'hdfsReadBytes'),

  totalWriteBytes: function () {
    return (this.get('fileWriteBytes') || 0) + (this.get('hdfsWriteBytes') || 0);
  }.property('fileWriteBytes', 'hdfsWriteBytes'),

  totalReadBytesDisplay: function () {
    return  App.Helpers.number.bytesToSize(this.get('totalReadBytes'));
  }.property('totalReadBytes'),

  totalWriteBytesDisplay: function () {
    return  App.Helpers.number.bytesToSize(this.get('totalWriteBytes'));
  }.property('totalWriteBytes'),

  durationDisplay: function () {
    return App.Helpers.date.timingFormat(this.get('duration'), true);
  }.property('duration')

});

App.TezDagVertexState = {
  NEW: "NEW",
  INITIALIZING: "INITIALIZING",
  INITED: "INITED",
  RUNNING: "RUNNING",
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
  KILLED: "KILLED",
  ERROR: "ERROR",
  TERMINATING: "TERMINATING",
  JOBFAILED: "JOB FAILED"
};

App.TezDagVertexType = {
  MAP: 'MAP',
  REDUCE: 'REDUCE',
  UNION: 'UNION'
};

App.TezDagEdgeType = {
  SCATTER_GATHER: "SCATTER_GATHER",
  BROADCAST: "BROADCAST",
  CONTAINS: "CONTAINS"
};

App.TezDag.FIXTURES = [];
App.TezDagEdge.FIXTURES = [];
App.TezDagVertex.FIXTURES = [];

})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.Service = DS.Model.extend({

  /**
   * Service maintenance state
   * @type {string}
   */
  maintenanceState: DS.attr('string'),

  /**
   * Service state
   * @type {string}
   */
  workStatus: DS.attr('string'),

  /**
   *
   * @type {string}
   */
  ahsWebPort: '8188'

});

App.Service.FIXTURES = [];

})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.ServerDataMapper = Em.Object.extend({
  jsonKey: false,
  map: function (json) {
    if (json) {
      var model = this.get('model');
      var jsonKey = this.get('jsonKey');

      if (jsonKey && json[jsonKey]) {
        json = json[jsonKey];
      }

      $.each(json, function (field, value) {
        model.set(field, value);
      })
    }
  }
});


App.QuickDataMapper = App.ServerDataMapper.extend({
  config: {},
  model: null,
  map: Em.K,

  parseIt: function (data, config) {
    var result = {};
    for ( var i in config) {
      if (i.substr(0, 1) === '$') {
        i = i.substr(1, i.length);
        result[i] = config['$' + i];
      } else {
        var isSpecial = false;
        if (i.substr(-5) == '_type') {
          var prefix = i.substr(0, i.length - 5);
          isSpecial = config[prefix + '_key'] != null;
        } else if (i.substr(-4) == '_key') {
          var prefix = i.substr(0, i.length - 4);
          isSpecial = config[prefix + '_type'] != null;
        }
        if (!isSpecial && typeof config[i] == 'string') {
          result[i] = this.getJsonProperty(data, config[i]);
        } else if (typeof config[i] == 'object') {
          result[i] = [];
          var _data = this.getJsonProperty(data, config[i + '_key']);
          var _type = config[i + '_type'];
          var l = _data.length;
          for ( var index = 0; index < l; index++) {
            if (_type == 'array') {
              result[i].push(this.getJsonProperty(_data[index], config[i].item));
            } else {
              result[i].push(this.parseIt(_data[index], config[i]));
            }
          }
          if(_type == 'array'){
            result[i] = result[i].sort();
          }
        }
      }
    }
    return result;
  },

  getJsonProperty: function (json, path) {
    var pathArr = path.split('.');
    var current = json;
    pathArr = this.filterDotted(pathArr);
    while (pathArr.length && current) {
      if (pathArr[0].substr(-1) == ']') {
        var index = parseInt(pathArr[0].substr(-2, 1));
        var attr = pathArr[0].substr(0, pathArr[0].length - 3);
        if (attr in current) {
          current = current[attr][index];
        }
      } else {
        current = current[pathArr[0]];
      }
      pathArr.splice(0, 1);
    }
    return current;
  },

  filterDotted: function(arr) {
    var buffer = [];
    var dottedBuffer = [];
    var dotted = false;
    arr.forEach(function(item) {
      if(/\['|\["/.test(item)) {
        dottedBuffer.push(item.substr(2, item.length));
        dotted = true;
      } else if (dotted && !/\]'|"\]/.test(item)) {
        dottedBuffer.push(item);
      } else if (/']|"]/.test(item)) {
        dottedBuffer.push(item.substr(0, item.length - 2));
        buffer.push(dottedBuffer.join('.'));
        dotted = false;
        dottedBuffer = [];
      } else {
        buffer.push(item);
      }
    });

    return buffer;
  },

  /**
   * properly delete record from model
   * @param item
   */
  deleteRecord: function (item) {
    item.deleteRecord();
    App.store.commit();
    item.get('stateManager').transitionTo('loading');
    console.log('Record with id:' + item.get('id') + ' was deleted from model');
  }
});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Mapper for YARN and ATS
 * Get their statuses and save it to proper models
 * Should be called only from application initializer (and it's already done)
 * @type {Ember.Object}
 */
App.ApplicationStatusMapper = Em.Object.createWithMixins(App.RunPeriodically, {

  /**
   * Map for Service-model
   * @type {Object}
   */
  yarnMap: {
    workStatus: {
      key: 'ServiceInfo.state',
      default: 'UNKNOWN'
    },
    maintenanceState: {
      key: 'ServiceInfo.maintenance_state',
      default: 'OFF'
    },
    id: {
      default: 'YARN'
    }
  },

  /**
   * Map for Component-model
   * @type {Object}
   */
  atsMap: {
    workStatus: {
      key: 'ServiceComponentInfo.state',
      default: 'UNKNOWN'
    },
    componentName: {
      default: 'APP_TIMELINE_SERVER'
    },
    id: {
      default: 'APP_TIMELINE_SERVER'
    }
  },

  /**
   * Is ATS and RESOURCEMANAGER hosts loaded
   * @type {bool}
   */
  hostForComponentIsLoaded: false,

  /**
   * Is <code>ahsWebPort</code> loaded
   * @type {bool}
   */
  portIsLoaded: false,

  /**
   * Array of component names that need to be loaded
   * @type {Array}
   */
  componentsToLoad: [
    "APP_TIMELINE_SERVER",
    "RESOURCEMANAGER"
  ],

  /**
   * Start mapping when <code>App.clusterName</code> is loaded
   * @method mapInit
   */
  mapInit: function() {
    var clusterName = App.get('clusterName');
    if (Em.isNone(clusterName)) return;
    this.loop('map');
  }.observes('App.clusterName'),

  /**
   * Map service and component periodically
   * Map host name for component only once
   * @method map
   */
  map: function() {
    var self = this;
    this.getServices().then(function() {
      self.getComponents().then(function() {
        if (!self.get('hostForComponentIsLoaded'))
          self.get('componentsToLoad').forEach(function (componentName) {
            self.getHostsForComponents(componentName);
          })
        if (!self.get('portIsLoaded'))
          self.getDesiredConfigs();
      });
    });
  },

  /**
   * Get View instance properties provided by user
   * @returns {$.ajax}
   * @method getInstanceParameters
   */
  getInstanceParameters: function () {
    var hashArray = location.pathname.split('/');
    var view = hashArray[2];
    var version = hashArray[3];
    var instanceName = hashArray[4];
    return App.ajax.send({
      name: 'instance_parameters',
      sender: this,
      data: {
        view: view,
        version: version,
        instanceName: instanceName
      },
      success: 'getInstanceParametersSuccessCallback',
      error: 'getInstanceParametersErrorCallback'
    });
  },

  /**
   * Success callback for getInstanceParameters-request
   * @param {object} data
   * @method getInstanceParametersSuccessCallback
   */
  getInstanceParametersSuccessCallback: function (data) {
    var atsURLParameter = data.parameters['yarn.ats.url'];
    var resourceManagerURLParameter = data.parameters['yarn.resourcemanager.url'];
    if (atsURLParameter) {
      App.set('atsURL', atsURLParameter);
      App.set('resourceManagerURL', resourceManagerURLParameter);
    } else {
      this.getClusterName();
    }
  },

  /**
   * Success callback for getInstanceParameters-request
   * @method getInstanceParametersErrorCallback
   */
  getInstanceParametersErrorCallback: function () {
    this.getClusterName();
  },

  /**
   * Get cluster name from server
   * @returns {$.ajax}
   * @method getClusterName
   */
  getClusterName: function() {
    return App.ajax.send({
      name: 'cluster_name',
      sender: this,
      success: 'getClusterNameSuccessCallback'
    });
  },

  /**
   * Success callback for clusterName-request
   * @param {object} data
   * @method getClusterNameSuccessCallback
   */
  getClusterNameSuccessCallback: function(data) {
    App.set('clusterName', Em.get(data.items[0], 'Clusters.cluster_name'));
  },

  /**
   * Get list of installed services (YARN is needed)
   * @returns {$.ajax}
   * @method getServices
   */
  getServices: function() {
    return App.ajax.send({
      name: 'services',
      sender: this,
      success: 'getServicesSuccessCallback',
      error: 'getServicesErrorCallback'
    });
  },

  /**
   * Success callback for services-request
   * Map YARN-service to model (if YARN not available - save empty object)
   * @param {Object} data
   * @method getServicesSuccessCallback
   */
  getServicesSuccessCallback: function(data) {
    var map = this.get('yarnMap'),
      yarn = data.items.findBy('ServiceInfo.service_name', 'YARN'),
      yarnModel = Em.isNone(yarn) ? {id: 'YARN'} : Em.JsonMapper.map(yarn, map);
    App.HiveJob.store.push('service', yarnModel);
  },

  /**
   * Error callback for services-request
   * Save empty object to model
   * @method getServicesErrorCallback
   */
  getServicesErrorCallback: function() {
    App.HiveJob.store.push('yarn', {id: 'YARN'});
  },

  /**
   * Get list of components from server
   * @returns {$.ajax}
   * @method getComponents
   */
  getComponents: function() {
    return App.ajax.send({
      name: 'components',
      sender: this,
      success: 'getComponentsSuccessCallback',
      error: 'getComponentsErrorCallback'
    });
  },

  /**
   * Success callback for components-request
   * Save ATS to model (if ATS not available - save empty object)
   * @param {object} data
   * @method getComponentsSuccessCallback
   */
  getComponentsSuccessCallback: function(data) {
    var map = this.get('atsMap'),
      ats = data.items.findBy('ServiceComponentInfo.component_name', 'APP_TIMELINE_SERVER'),
      atsModel = Em.isNone(ats) ? {id: 'APP_TIMELINE_SERVER'} : Em.JsonMapper.map(ats, map);
    App.HiveJob.store.push('component', atsModel);
    App.HiveJob.store.push('component', {id: 'RESOURCEMANAGER'});
  },

  /**
   * Error callback for components-request
   * Save empty object to model
   * @method getComponentsErrorCallback
   */
  getComponentsErrorCallback: function() {
    App.HiveJob.store.push('component', {id: 'APP_TIMELINE_SERVER'});
    App.HiveJob.store.push('component', {id: 'RESOURCEMANAGER'});
  },

  /**
   * Get host name for ATS
   * @returns {$.ajax}
   * @method getHostsForComponents
   */
  getHostsForComponents: function(componentName) {
    return App.ajax.send({
      name: 'components_hosts',
      sender: this,
      data: {
        componentName: componentName
      },
      success: 'getHostsForComponentsSuccessCallback'
    });
  },

  /**
   * Success callback for hosts-request
   * Save host name to ATS-model
   * @param {Object} data
   * @method getHostsForComponentsSuccessCallback
   */
  getHostsForComponentsSuccessCallback: function(data) {
    App.HiveJob.store.getById('component', arguments[2].componentName).set('hostName', Em.get(data.items[0], 'Hosts.host_name'));
    this.set('componentsToLoad', this.get('componentsToLoad').without(arguments[2].componentName))

    if(this.get('componentsToLoad').length === 0){
      this.set('hostForComponentIsLoaded', true);
    }
  },

  /**
   * Get Ambari desired configs
   * @returns {$.ajax}
   * @method getDesiredConfigs
   */
  getDesiredConfigs: function() {
    return App.ajax.send({
      name: 'config_tags',
      sender: this,
      success: 'getDesiredConfigsSuccessCallback'
    });
  },

  /**
   * Success callback for Ambari desired configs request
   * Make request for YARN configs
   * @param {object} data
   * @returns {$.ajax|null}
   * @method getDesiredConfigsSuccessCallback
   */
  getDesiredConfigsSuccessCallback: function(data) {
    var c = Em.get(data, 'Clusters.desired_configs')['yarn-site'];
    if (!Em.isNone(c)) {
      return this.getConfigurations(c);
    }
  },

  /**
   * Get YARN configs
   * @param {{user: string, tag: string}} config
   * @returns {$.ajax}
   * @method getConfigurations
   */
  getConfigurations: function(config) {
    return App.ajax.send({
      name: 'configurations',
      sender: this,
      data: {
        params: '(type=yarn-site&tag=%@1)'.fmt(config.tag)
      },
      success: 'getConfigurationSuccessCallback'
    });
  },

  /**
   * Success callback for YARN configs
   * Set <code>ahsWebPort</code> property using <code>yarn.timeline-service.webapp.address</code> or '8188' as default
   * @param {object} data
   * @method getConfigurationSuccessCallback
   */
  getConfigurationSuccessCallback: function(data) {
    var c = data.items.findBy('type', 'yarn-site');
    if (!Em.isNone(c)) {
      var properties = Em.get(c, 'properties'),
        port = '8188';
      if (!Em.isNone(properties)) {
        port = properties['yarn.timeline-service.webapp.address'].match(/:(\d+)/)[1];
      }
      App.HiveJob.store.getById('service', 'YARN').set('ahsWebPort', port);
      this.set('portIsLoaded', true);
    }
  }

});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/**
 * Maps a Hive job response from server into an existing Hive Job.
 *
 * This will only update an existing Hive Job and not create a new one. It will
 * populate all fields (stages, Tez DAG, etc.) except runtime information like
 * <ul>
 * <li>tezDag.id
 * <li>tezDag.vertices.state
 * <li>tezDag.vertices.startTime
 * <li>tezDag.vertices.endTime
 * <li>tezDag.vertices.tasksCount
 * <li>tezDag.vertices.file*
 * <li>tezDag.vertices.hdfs*
 * <li>tezDag.vertices.recordReadCount
 * <li>tezDag.vertices.recordWriteCount
 * </ul>
 */
App.hiveJobMapper = App.QuickDataMapper.create({

  map : function(json) {
    var model = this.get('model'),
      hiveJob = {};
    if (json && json.entity) {
      hiveJob.id = json.entity;
      hiveJob.name = hiveJob.id;
      hiveJob.startTime = json.starttime;
      if (typeof(json.endtime) == "undefined") {
        var i = 0;
        while (typeof(hiveJob.endTime) == "undefined" &&  json.events && json.events[i]) {
          if (json.events[i].eventtype == 'QUERY_COMPLETED') {
            hiveJob.endTime = json.events[i].timestamp;
          }
          i++;
        }
      }
      else {
        hiveJob.endTime = json.endtime;
      }
      json.otherinfo.query = $.parseJSON(Em.get(json, 'otherinfo.query') || Em.get(json, 'otherinfo.QUERY'));
      if (json.otherinfo.query && json.otherinfo.query.queryText) {
        hiveJob.query_text = json.otherinfo.query.queryText;
      }
      hiveJob.stages = [];
      var stagePlans = json.otherinfo.query.queryPlan["STAGE PLANS"];
      for ( var stage in stagePlans) {
        var stageValue = stagePlans[stage];
        var stageItem = {};
        stageItem.id = stage;
        stageItem.description = '. ';
        for (var item in stageValue) {
          stageItem.description += item;
        }
        hiveJob.stages.push(stageItem);
        if (stageValue.Tez != null && hiveJob.tezDag == null) {
          var dagName = stageValue.Tez['DagName:'];
          // Vertices
          var vertices = [];
          var vertexIds = [];
          var vertexIdMap = {};
          for ( var vertexName in stageValue.Tez["Vertices:"]) {
            var vertex = stageValue.Tez["Vertices:"][vertexName];
            var vertexObj = {
              id : dagName + "/" + vertexName,
              name : vertexName,
              incomingEdges : [],
              outgoingEdges : []
            };
            vertexIds.push(vertexObj.id);
            var operatorExtractor = function(obj) {
              var ops = [];
              if ($.isArray(obj)) {
                obj.forEach(function(o) {
                  ops = ops.concat(operatorExtractor(o));
                });
              }
              else {
                for ( var key in obj) {
                  ops.push(key);
                  if (obj[key].children != null) {
                    ops = ops.concat(operatorExtractor(obj[key].children));
                  }
                }
              }
              return ops;
            };
            if (vertex["Map Operator Tree:"] != null) {
              vertexObj.type = App.TezDagVertexType.MAP;
              vertexObj.operations = operatorExtractor(vertex["Map Operator Tree:"]);
              vertexObj.operationPlan = JSON.stringify(vertex["Map Operator Tree:"], undefined, "  ");
            }
            else
              if (vertex["Reduce Operator Tree:"] != null) {
                vertexObj.type = App.TezDagVertexType.REDUCE;
                vertexObj.operations = operatorExtractor(vertex["Reduce Operator Tree:"]);
                vertexObj.operationPlan = JSON.stringify(vertex["Reduce Operator Tree:"], undefined, "  ");
              }
              else
                if (vertex["Vertex:"] != null && vertexName==vertex['Vertex:']) {
                  vertexObj.type = App.TezDagVertexType.UNION;
                }
            vertexIdMap[vertexObj.id] = vertexObj;
            vertices.push(vertexObj);
          }
          // Edges
          var edges = [];
          var edgeIds = [];
          for ( var childVertex in stageValue.Tez["Edges:"]) {
            var childVertices = stageValue.Tez["Edges:"][childVertex];
            if (!$.isArray(childVertices)) {
              // Single edge given as object instead of array
              childVertices = [ childVertices ];
            }
            childVertices.forEach(function(e) {
              var parentVertex = e.parent;
              if (e.type == 'CONTAINS') {
                var parentVertexNode = vertexIdMap[dagName + "/" + parentVertex];
                if (parentVertexNode != null && parentVertexNode.type == App.TezDagVertexType.UNION) {
                  // We flip the edges for Union vertices
                  var tmp = childVertex;
                  childVertex = parentVertex;
                  parentVertex = tmp;
                }
              }
              var edgeObj = {
                id : dagName + "/" + parentVertex + "-" + childVertex,
                fromVertex: dagName + "/" + parentVertex,
                toVertex : dagName + "/" + childVertex
              };
              vertexIdMap[edgeObj.fromVertex].outgoingEdges.push(edgeObj.id);
              vertexIdMap[edgeObj.toVertex].incomingEdges.push(edgeObj.id);
              edgeIds.push(edgeObj.id);
              switch (e.type) {
              case "BROADCAST_EDGE":
                edgeObj.edgeType = App.TezDagEdgeType.BROADCAST;
                break;
              case "SIMPLE_EDGE":
                edgeObj.edgeType = App.TezDagEdgeType.SCATTER_GATHER;
                break;
              case "CONTAINS":
                edgeObj.edgeType = App.TezDagEdgeType.CONTAINS;
                break;
              default:
                break;
              }
              edges.push(edgeObj);
            });
          }
          // Create records
          var tezDag = {
            id : dagName,
            name : dagName,
            stage : stage,
            vertices : vertexIds,
            edges : edgeIds
          };
          // Once the DAG is loaded, we do not need to
          // reload as the structure does not change. Reloading
          // here causes missing data (got from other calls)
          // to propagate into UI - causing flashing.
          var newVertices = [],
            newEdges = [];
          vertices.forEach(function(v) {
            var vertexRecord = App.HiveJob.store.getById('tezDagVertex', v.id);
            if (!vertexRecord || !vertexRecord.get('isLoaded')) {
              newVertices.push(v);
            }
          });
          edges.forEach(function(e) {
            var edgeRecord = App.HiveJob.store.getById('tezDagEdge', e.id);
            if (!edgeRecord || !edgeRecord.get('isLoaded')) {
              newEdges.push(e);
            }
          });

          App.HiveJob.store.pushMany('tezDagVertex', newVertices);
          App.HiveJob.store.pushMany('tezDagEdge', newEdges);

          var dagRecord = App.HiveJob.store.getById('tezDag', tezDag.id);
          if (!dagRecord || !dagRecord.get('isLoaded')) {
            App.HiveJob.store.push('tezDag', tezDag);
          }
          hiveJob.tezDag = tezDag.id;
        }
      }

      if(App.HiveJob.store.all('hiveJob').length == 0){
        App.HiveJob.store.push('hiveJob', hiveJob);
      }
      var hiveJobRecord = App.HiveJob.store.getById('hiveJob', hiveJob.id);
      if (hiveJobRecord != null) {
        hiveJobRecord.set('stages', hiveJob.stages.sortBy('id'));
        hiveJobRecord.set('startTime', hiveJob.startTime);
        hiveJobRecord.set('endTime', hiveJob.endTime);
        if (hiveJob.tezDag != null) {
          // Some hive queries dont use Tez
          hiveJobRecord.set('tezDag', App.HiveJob.store.getById('tezDag', hiveJob.tezDag));
        }
      }
    }
  },
  config : {}
});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.hiveJobsMapper = App.QuickDataMapper.create({

  json_map: {
    id: 'entity',
    name: 'entity',
    user: 'primaryfilters.user',
    hasTezDag: {
      custom: function(source) {
        var query = Ember.get(source, 'otherinfo.query') || Ember.get(source, 'otherinfo.QUERY');
        return Ember.isNone(query) ? false : query.match("\"Tez\".*\"DagName:\"");
      }
    },
    queryText: {
      custom: function(source) {
        var query = Ember.get(source, 'otherinfo.query') || Ember.get(source, 'otherinfo.QUERY');
        return Ember.isNone(query) ? '' : $.parseJSON(query).queryText;
      }
    },
    failed: {
      custom: function(source) {
        var status = Ember.get(source ,'otherinfo.status') || Ember.get(source ,'otherinfo.STATUS');
        return status === false;
      }
    },
    startTime: {
      custom: function(source) {
        return source.starttime > 0 ? source.starttime : null
      }
    },
    endTime: {
      custom: function(source) {
        return source.endtime > 0 ? source.endtime : null
      }
    }
  },

  map: function (json) {

    var model = this.get('model'),
      map = this.get('json_map'),
      hiveJobs = [];

    if (json) {
      if (!json.entities) {
        json.entities = [];
        if (json.entity) {
          json.entities = [json];
        }
      }
      var currentEntityMap = {};
      json.entities.forEach(function (entity) {
        currentEntityMap[entity.entity] = entity.entity;
        var hiveJob = Ember.JsonMapper.map(entity, map);

        if (entity.events != null) {
          entity.events.forEach(function (event) {
            switch (event.eventtype) {
              case "QUERY_SUBMITTED":
                hiveJob.startTime = event.timestamp;
                break;
              case "QUERY_COMPLETED":
                hiveJob.endTime = event.timestamp;
                break;
              default:
                break;
            }
          });
        }
        hiveJobs.push(hiveJob);
        var tezDag = App.HiveJob.store.all('tezDag').findBy('hiveJob.id', hiveJob.id);
        if (!Em.isNone(tezDag)) {
          hiveJob.tezDag = tezDag.id;
        }
      });

      var jobsController = App.__container__.lookup('controller:Jobs');
      if(hiveJobs.length > jobsController.get('filterObject.jobsLimit')) {
        var lastJob = hiveJobs.pop();
        if(jobsController.get('navIDs.nextID') != lastJob.id) {
          jobsController.set('navIDs.nextID', lastJob.id);
        }
        currentEntityMap[lastJob.id] = null;
      }
      App.HiveJob.store.all('hiveJob').forEach(function (r) {
        if(r && !currentEntityMap[r.get('id')]) {
          r.destroyRecord();
        }
      });

    }
    App.HiveJob.store.pushMany('hiveJob', hiveJobs);
  }

});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.JobController = Ember.ObjectController.extend(App.RunPeriodically, {

  name: 'jobController',

  /**
   * Is Job details info loaded
   * @type {bool}
   */
  loaded: false,

  /**
   * Timeout for <code>loadJobDetails</code> periodic call
   * @type {number}
   */
  loadTimeout: null,

  /**
   * Column which is currently sorted
   * @type {string}
   */
  sortingColumn: null,

  /**
   * Modal-popup buttons
   * @type {Em.Object[]}
   */
  showPopupButtons: [
    Ember.Object.create({title: Em.I18n.t('ok'), dismiss: 'modal'})
  ],

  /**
   * Show popup with message about job-details loading error
   * @param {string} title
   * @method showPopup
   */
  showPopup: function (title) {
    var self = this,
    modal = Bootstrap.ModalManager.open(
      'errorPopup',
      title,
      'job/error_popup',
      this.get('showPopupButtons'),
      this
    );
    this.stop();
    modal.on('closed', function ( ) {
      self.transitionToRoute('jobs');
    });
  },

  /**
   * Init method called in <code>router.setupController</code>
   * Load job's details info (like Tez Dag etc)
   * @method loadJobDetails
   */
  loadJobDetails: function () {
    var self = this,
      timeout = this.get('loadTimeout'),
      yarnService = App.HiveJob.store.getById('service', 'YARN'),
      content = this.get('content');
    if (!Em.isNone(yarnService) || App.get('atsURL')) {
      if (!Em.isNone(content)) {
        App.Helpers.jobs.refreshJobDetails(
          content,
          function () {
            self.set('content', App.HiveJob.store.getById('hiveJob', content.get('id')));
            self.set('loaded', true);
          },
          function (errorId) {
            switch (errorId) {
              case 'job.dag.noId':
                self.set('error_message', Em.I18n.t('jobs.hive.tez.dag.error.noDagId.message'));
                self.showPopup(Em.I18n.t('jobs.hive.tez.dag.error.noDagId.title'));
                break;
              case 'job.dag.noname':
                self.set('error_message', Em.I18n.t('jobs.hive.tez.dag.error.noDag.message'));
                self.showPopup(Em.I18n.t('jobs.hive.tez.dag.error.noDag.title'));
                break;
              case 'job.dag.id.noDag':
                self.set('error_message', Em.I18n.t('jobs.hive.tez.dag.error.noDagForId.message'));
                self.showPopup(Em.I18n.t('jobs.hive.tez.dag.error.noDagForId.title'));
                break;
              case 'job.dag.id.loaderror':
              case 'job.dag.name.loaderror':
                self.transitionToRoute('jobs');
                break;
              default:
                self.transitionToRoute('jobs');
                break;
            }
          }
        );
      }
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        self.loadJobDetails();
      }, 300);
    }
  }

});

})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.JobsController = Ember.ArrayController.extend(App.RunPeriodically, {

  name: 'mainJobsController',

  /**
   * Sorted ArrayProxy
   * @type {App.HiveJob[]}
   */
  sortedContent: [],

  navIDs: {
    backIDs: [],
    nextID: ''
  },

  /**
   * ID of the last job
   * @type {string}
   */
  lastJobID: '',

  hasNewJobs: false,

  /**
   * Are jobs already loaded
   * @type {bool}
   */
  loaded: false,

  /**
   * Are jobs loading
   * @type {bool}
   */
  loading: false,

  /**
   * Should pagination be reset
   * Used when jobs list is updated
   * @type {bool}
   */
  resetPagination: false,

  /**
   * Column which is used to sort jobs now
   * @type {Em.Object}
   */
  sortingColumn: null,

  /**
   * Property-name used to sort jobs
   * @type {string}
   */
  sortProperty: 'id',

  /**
   * Is sorting doing in asc order
   * @type {bool}
   */
  sortAscending: true,

  /**
   * Is sorting complete
   * @type {bool}
   */
  sortingDone: true,

  /**
   * Diagnostic message shown on jobs table when no data present
   * @type {string}
   */
  jobsMessage: Em.I18n.t('jobs.loadingTasks'),

  totalOfJobs: 0,

  /**
   * Buttons for custom-date popup
   * @type {Em.Object[]}
   */
  customDatePopupButtons: [
    Ember.Object.create({title: Em.I18n.t('ok'), clicked: 'submitCustomDate'}),
    Ember.Object.create({title: Em.I18n.t('cancel'), dismiss: 'modal', clicked: 'dismissCustomDate'})
  ],

  actions: {

    /**
     * Click-handler for "New jobs available on server"-link
     * @method updateJobsByClick
     */
    updateJobsByClick: function () {
      this.set('navIDs.backIDs', []);
      this.set('navIDs.nextID', '');
      this.set('filterObject.nextFromId', '');
      this.set('filterObject.backFromId', '');
      this.set('filterObject.fromTs', '');
      this.set('hasNewJobs', false);
      this.set('resetPagination', true);
      this.loadJobs();
    },

    /**
     * Custom-date submit handler
     * @method submitCustomDate
     */
    submitCustomDate: function () {
      if(this.get('filterObject').submitCustomDate())
        Bootstrap.ModalManager.close('customDate');
    },

    /**
     * Custom-date dismiss handler
     * @method dismissCustomDate
     */
    dismissCustomDate: function() {
      this.set('filterObject.startTime', 'Any');
    }

  },

  /**
   * Observer for content and sorting indicators
   * @method contentAndSortObserver
   */
  contentAndSortObserver: function () {
    Ember.run.once(this, 'contentAndSortUpdater');
  }.observes(
      'content.length',
      'content.@each.id',
      'content.@each.startTime',
      'content.@each.endTime',
      'sortProperties',
      'sortAscending'
    ),

  /**
   * Update <code>sortedContent</code>
   * Called once from <code>contentAndSortObserver</code>
   * @method contentAndSortUpdater
   */
  contentAndSortUpdater: function () {
    this.set('sortingDone', false);
    var content = this.get('content');
    var sortedContent = content.toArray();
    var sortProperty = this.get('sortProperty');
    var sortAscending = this.get('sortAscending');
    sortedContent.sort(function (r1, r2) {
      var r1id = r1.get(sortProperty);
      var r2id = r2.get(sortProperty);
      if (r1id < r2id)
        return sortAscending ? -1 : 1;
      if (r1id > r2id)
        return sortAscending ? 1 : -1;
      return 0;
    });
    var sortedArray = this.get('sortedContent');
    var count = 0;
    sortedContent.forEach(function (sortedJob) {
      if (sortedArray.length <= count) {
        sortedArray.pushObject(Ember.Object.create());
      }
      sortedArray[count].set('failed', sortedJob.get('failed'));
      sortedArray[count].set('hasTezDag', sortedJob.get('hasTezDag'));
      sortedArray[count].set('queryText', sortedJob.get('queryText'));
      sortedArray[count].set('name', sortedJob.get('name'));
      sortedArray[count].set('user', sortedJob.get('user'));
      sortedArray[count].set('id', sortedJob.get('id'));
      sortedArray[count].set('startTimeDisplay', sortedJob.get('startTimeDisplay'));
      sortedArray[count].set('endTimeDisplay', sortedJob.get('endTimeDisplay'));
      sortedArray[count].set('durationDisplay', sortedJob.get('durationDisplay'));
      count++;
    });
    if (sortedArray.length > count) {
      for (var c = sortedArray.length - 1; c >= count; c--) {
        sortedArray.removeObject(sortedArray[c]);
      }
    }
    sortedContent.length = 0;
    this.set('sortingDone', true);
  },

  /**
   * Filters-processor
   * @type {Em.Object}
   */
  filterObject: Ember.Object.create({

    /**
     * @type {string}
     */
    id: "",

    /**
     * Does user filter jobs by ID
     * @type {bool}
     */
    isIdFilterApplied: false,

    /**
     * Number of jobs shown on the page
     * @type {string}
     */
    jobsLimit: '10',

    /**
     * Username used to filter
     * @type {string}
     */
    user: "",

    /**
     * Custom start date
     * @type {string}
     */
    windowStart: "",

    /**
     * Custom end date
     * @type {string}
     */
    windowEnd: "",

    /**
     * @type {string}
     */
    nextFromId: "",

    /**
     * @type {string}
     */
    backFromId: "",

    /**
     * @type {string}
     */
    fromTs: "",

    /**
     * Is user using any filter now
     * @type {bool}
     */
    isAnyFilterApplied: false,

    /**
     * Set <code>isIdFilterApplied</code> according to <code>id</code> value
     * @type {bool}
     */
    onApplyIdFilter: function () {
      this.set('isIdFilterApplied', this.get('id') != "");
    }.observes('id'),

    /**
     * Direct binding to startTime filter field
     * @type {string}
     */
    startTime: "",

    /**
     * Fields values from Select Custom Dates form
     * @type {Em.Object}
     */
    customDateFormFields: Ember.Object.create({
      startDate: null,
      hoursForStart: null,
      minutesForStart: null,
      middayPeriodForStart: null,
      endDate: null,
      hoursForEnd: null,
      minutesForEnd: null,
      middayPeriodForEnd: null
    }),

    /**
     * Error-flags for custom start/end dates
     * @type {Em.Object}
     */
    errors: Ember.Object.create({
      isStartDateError: false,
      isEndDateError: false
    }),

    /**
     * Error-messages for custom start/end dates
     * @type {Em.Object}
     */
    errorMessages: Ember.Object.create({
      startDate: '',
      endDate: ''
    }),

    columnsName: Ember.ArrayController.create({
      content: [
        { name: Em.I18n.t('jobs.column.id'), index: 0 },
        { name: Em.I18n.t('jobs.column.user'), index: 1 },
        { name: Em.I18n.t('jobs.column.start.time'), index: 2 },
        { name: Em.I18n.t('jobs.column.end.time'), index: 3 },
        { name: Em.I18n.t('jobs.column.duration'), index: 4 }
      ],
      columnsCount: 6
    }),

    /**
     * Submit custom dates handler
     * @returns {boolean}
     * @method submitCustomDate
     */
    submitCustomDate: function() {
      this.validate();
      if (this.get('errors.isStartDateError') || this.get('errors.isEndDateError')) {
        return false;
      }
      var windowStart = this.createCustomStartDate(),
        windowEnd = this.createCustomEndDate();
      this.set("windowStart", windowStart.getTime());
      this.set("windowEnd", windowEnd.getTime());
      return true;
    },

    /**
     * Create custom start date according to provided in popup data
     * @returns {Date|null}
     * @method createCustomStartDate
     */
    createCustomStartDate: function () {
      var startDate = this.get('customDateFormFields.startDate'),
        hoursForStart = this.get('customDateFormFields.hoursForStart'),
        minutesForStart = this.get('customDateFormFields.minutesForStart'),
        middayPeriodForStart = this.get('customDateFormFields.middayPeriodForStart');
      if (startDate && hoursForStart && minutesForStart && middayPeriodForStart) {
        return new Date(startDate + ' ' + hoursForStart + ':' + minutesForStart + ' ' + middayPeriodForStart);
      }
      return null;
    },

    /**
     * Create custom end date according to provided in popup data
     * @returns {Date|null}
     * @method createCustomStartDate
     */
    createCustomEndDate: function () {
      var endDate = this.get('customDateFormFields.endDate'),
        hoursForEnd = this.get('customDateFormFields.hoursForEnd'),
        minutesForEnd = this.get('customDateFormFields.minutesForEnd'),
        middayPeriodForEnd = this.get('customDateFormFields.middayPeriodForEnd');
      if (endDate && hoursForEnd && minutesForEnd && middayPeriodForEnd) {
        return new Date(endDate + ' ' + hoursForEnd + ':' + minutesForEnd + ' ' + middayPeriodForEnd);
      }
      return null;
    },

    /**
     * Clear <code>errorMessages</code> and <code>errors</code>
     * @method clearErrors
     */
    clearErrors: function () {
      var errorMessages = this.get('errorMessages');
      Em.keys(errorMessages).forEach(function (key) {
        errorMessages.set(key, '');
      }, this);
      var errors = this.get('errors');
      Em.keys(errors).forEach(function (key) {
        errors.set(key, false);
      }, this);
    },

    /**
     * Validation for every field in customDateFormFields
     * @method validate
     */
    validate: function () {
      var formFields = this.get('customDateFormFields'),
        errors = this.get('errors'),
        errorMessages = this.get('errorMessages');
      this.clearErrors();
      // Check if feild is empty
      Em.keys(errorMessages).forEach(function (key) {
        if (!formFields.get(key)) {
          errors.set('is' + key.capitalize() + 'Error', true);
          errorMessages.set(key, Em.I18n.t('jobs.customDateFilter.error.required'));
        }
      }, this);
      // Check that endDate is after startDate
      var startDate = this.createCustomStartDate(),
        endDate = this.createCustomEndDate();
      if (startDate && endDate && (startDate.getTime() > endDate.getTime())) {
        errors.set('isEndDateError', true);
        errorMessages.set('endDate', Em.I18n.t('jobs.customDateFilter.error.date.order'));
      }
    },

    /**
     * Create link for server request
     * @return {String}
     * @method createJobsFiltersLink
     */
    createJobsFiltersLink: function () {
      // The filters "TEZ:true" are needed because ATS is case sensitive,
      // and in HDP 2.1, "tez" was used, while in HDP 2.2, "TEZ" was used.
      var link = "?fields=events,primaryfilters,otherinfo&secondaryFilter=TEZ:true",
        numberOfAppliedFilters = 0;

      if (this.get("id") !== "") {
        link = "/" + this.get("id") + link;
        numberOfAppliedFilters++;
      }

      link += "&limit=" + (parseInt(this.get("jobsLimit")) + 1);

      if (this.get("user") !== "") {
        link += "&primaryFilter=user:" + this.get("user");
        numberOfAppliedFilters++;
      }
      if (this.get("backFromId") != "") {
        link += "&fromId=" + this.get("backFromId");
      }
      if (this.get("nextFromId") != "") {
        link += "&fromId=" + this.get("nextFromId");
      }
      if (this.get("fromTs") != "") {
        link += "&fromTs=" + this.get("fromTs");
      }
      if (this.get("startTime") !== "" && this.get("startTime") !== "Any") {
        link += this.get("windowStart") !== "" ? ("&windowStart=" + this.get("windowStart")) : "";
        link += this.get("windowEnd") !== "" ? ("&windowEnd=" + this.get("windowEnd")) : "";
        numberOfAppliedFilters++;
      }

      this.set('isAnyFilterApplied', numberOfAppliedFilters > 0);

      return link;
    }

  }),

  sortingColumnObserver: function () {
    if (this.get('sortingColumn')) {
      this.set('sortProperty', this.get('sortingColumn').get('name'));
      this.set('sortAscending', this.get('sortingColumn').get('status') !== "sorting_desc");
    }
  }.observes('sortingColumn.name', 'sortingColumn.status'),

  setTotalOfJobs: function () {
    if (this.get('totalOfJobs') < this.get('content.length')) {
      this.set('totalOfJobs', this.get('content.length'));
    }
  }.observes('content.length'),

  /**
   * Observer for <code>startTime</code>
   * Calculates value for <code>filterObject.windowStart</code> and <code>filterObject.windowEnd</code> or
   * shows Custom Date popup
   * @method startTimeObserver
   */
  startTimeObserver: function () {
    var time = "",
      curTime = new Date().getTime();
    switch (this.get('filterObject.startTime')) {
      case 'Past 1 hour':
        time = curTime - 3600000;
        break;
      case 'Past 1 Day':
        time = curTime - 86400000;
        break;
      case 'Past 2 Days':
        time = curTime - 172800000;
        break;
      case 'Past 7 Days':
        time = curTime - 604800000;
        break;
      case 'Past 14 Days':
        time = curTime - 1209600000;
        break;
      case 'Past 30 Days':
        time = curTime - 2592000000;
        break;
      case 'Custom':
        this.showCustomDatePopup();
        break;
      case 'Any':
        time = "";
        break;
    }
    if (this.get('filterObject.startTime') != "Custom") {
      this.set("filterObject.windowStart", time);
      this.set("filterObject.windowEnd", "");
    }
  },

  /**
   * Show popup with fields for custom start/end dates
   * @method showCustomDatePopup
   */
  showCustomDatePopup: function () {
    Bootstrap.ModalManager.open(
      'customDate',
      Em.I18n.t('jobs.table.custom.date.header'),
      App.JobsCustomDatesSelectView,
      this.get('customDatePopupButtons'),
      this
    );
  },

  /**
   * Success-callback for "jobs-lastID" request
   * Updates <code>hasNewJobs</code>-flag
   * @param {object} data
   * @method lastIDSuccessCallback
   */
  lastIDSuccessCallback: function (data) {
    if (!data.entities[0]) {
      return;
    }
    var lastReceivedID = data.entities[0].entity;
    if (this.get('lastJobID') == '') {
      this.set('lastJobID', lastReceivedID);
      if (this.get('loaded') && App.HiveJob.store.all('hiveJob').get('length') < 1) {
        this.set('hasNewJobs', true);
      }
    }
    else {
      if (this.get('lastJobID') !== lastReceivedID) {
        this.set('lastJobID', lastReceivedID);
        if (!App.HiveJob.store.getById('hiveJob', lastReceivedID)) {
          this.set('hasNewJobs', true);
        }
      }
    }
  },

  /**
   * Error-callback for "jobs-lastID" request
   * @method lastIDErrorCallback
   */
  lastIDErrorCallback: function (data, jqXHR) {
    console.debug(jqXHR);
  },

  /**
   * Check, why jobs weren't loaded and set <code>jobsMessage</code>
   * @param {object|null} jqXHR
   * @method checkDataLoadingError
   */
  checkDataLoadingError: function (jqXHR) {
    var atsComponent = App.HiveJob.store.getById('component', 'APP_TIMELINE_SERVER');
    if (!App.get('atsURL') && atsComponent && atsComponent.get('workStatus') != "STARTED") {
      this.set('jobsMessage', Em.I18n.t('jobs.error.ats.down'));
    }
    else {
      if (jqXHR && (jqXHR.status == 400 || jqXHR.status == 404)) {
        this.set('jobsMessage', Em.I18n.t('jobs.error.400'));
      }
      else {
        if ((!jqXHR && this.get('loaded') && !this.get('loading')) || (jqXHR && jqXHR.status == 500)) {
          this.set('jobsMessage', Em.I18n.t('jobs.nothingToShow'));
        }
        else {
          this.set('jobsMessage', Em.I18n.t('jobs.loadingTasks'));
        }
      }
    }
  },

  /**
   * Do request to load jobs and check last job id
   * @method loadJobs
   */
  loadJobs: function () {
    var yarnService = App.HiveJob.store.getById('service', 'YARN'),
      atsComponent = App.HiveJob.store.getById('component', 'APP_TIMELINE_SERVER'),
      atsInValidState = !!atsComponent && atsComponent.get('workStatus') === "STARTED";
    this.checkDataLoadingError();
    if (App.get('atsURL') || (!Em.isNone(yarnService) && atsInValidState)) {
      this.set('loading', true);
      var atsURL = App.get('atsURL') || 'http://' + atsComponent.get('hostName') + ':' + yarnService.get('ahsWebPort');
      App.ajax.send({
        name: 'jobs_lastID',
        sender: this,
        data: {
          atsURL: atsURL,
          view: App.get("view"),
          version: App.get("version"),
          instanceName: App.get("instanceName")
        },
        success: 'lastIDSuccessCallback',
        error : 'lastIDErrorCallback'
      });
      App.ajax.send({
        name: 'load_jobs',
        sender: this,
        data: {
          atsURL: atsURL,
          filtersLink: this.get('filterObject').createJobsFiltersLink(),
          view: App.get("view"),
          version: App.get("version"),
          instanceName: App.get("instanceName")
        },
        success: 'loadJobsSuccessCallback',
        error: 'loadJobsErrorCallback'
      });
    }
  },

  /**
   * Success callback for jobs-request
   * Call mapper to save jobs to the models
   * @param {object} data
   * @method loadJobsSuccessCallback
   */
  loadJobsSuccessCallback: function (data) {
    App.hiveJobsMapper.map(data);
    this.set('loading', false);
    if (this.get('loaded') == false || this.get('resetPagination') == true) {
      this.initializePagination();
      this.set('resetPagination', false);
    }
    this.set('loaded', true);
  },

  /**
   * Error callback for jobs-request
   * @param {object} jqXHR
   * @method loadJobsErrorCallback
   */
  loadJobsErrorCallback: function (jqXHR) {
    App.hiveJobsMapper.map({entities: []});
    this.checkDataLoadingError(jqXHR);
  },

  /**
   * Update <code>filterObject</code> fields
   * @method initializePagination
   */
  initializePagination: function () {
    var back_link_IDs = this.get('navIDs.backIDs.[]');
    if (!back_link_IDs.contains(this.get('lastJobID'))) {
      back_link_IDs.push(this.get('lastJobID'));
    }
    this.set('filterObject.backFromId', this.get('lastJobID'));
    this.get('filterObject').set('fromTs', new Date().getTime());
  },

  /**
   * Go to next page
   * @method navigateNext
   */
  navigateNext: function () {
    this.set("filterObject.backFromId", '');
    var back_link_IDs = this.get('navIDs.backIDs.[]');
    var lastBackID = this.get('navIDs.nextID');
    if (!back_link_IDs.contains(lastBackID)) {
      back_link_IDs.push(lastBackID);
    }
    this.set('navIDs.backIDs.[]', back_link_IDs);
    this.set("filterObject.nextFromId", this.get('navIDs.nextID'));
    this.set('navIDs.nextID', '');
    this.loadJobs();
  },

  /**
   * Go to previous page
   * @method navigateBack
   */
  navigateBack: function () {
    this.set("filterObject.nextFromId", '');
    var back_link_IDs = this.get('navIDs.backIDs.[]');
    back_link_IDs.pop();
    var lastBackID = back_link_IDs[back_link_IDs.length - 1];
    this.set('navIDs.backIDs.[]', back_link_IDs);
    this.set("filterObject.backFromId", lastBackID);
    this.loadJobs();
  },

  /**
   * Load jobs when <code>filterObject</code> fields were changed
   * @method refreshLoadedJobs
   */
  refreshLoadedJobs: function () {
    this.loadJobs();
  }.observes(
    'filterObject.id',
    'filterObject.jobsLimit',
    'filterObject.user',
    'filterObject.windowStart',
    'filterObject.windowEnd'
  )

});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Wrapper View for all sort components. Layout template and common actions are located inside of it.
 * Logic specific for sort fields
 * located in inner view - <code>fieldView</code>.
 *
 * @type {*}
 */
var wrapperView = Em.View.extend({
  tagName: 'tr',

  classNames: ['sort-wrapper'],

  willInsertElement: function () {
    if (this.get('parentView.tableFilteringComplete')) {
      this.get('parentView').set('filteringComplete', true);
    }
  },

  /**
   * Load sort statuses from local storage
   * Works only after finish filtering in the parent View
   */
  loadSortStatuses: function () {

  }.observes('parentView.filteringComplete'),

  /**
   * Save sort statuses to local storage
   * Works only after finish filtering in the parent View
   */
  saveSortStatuses: function () {
    if (!this.get('parentView.filteringComplete')) return;

    var statuses = [];
    this.get('childViews').forEach(function (childView) {
      statuses.push({
        name: childView.get('name'),
        status: childView.get('status')
      });
    });
  },

  /**
   * sort content by property
   * @param property {object}
   * @param order {Boolean} true - DESC, false - ASC
   * @param returnSorted {Boolean}
   */
  sort: function (property, order, returnSorted) {
    var content = this.get('content').toArray();
    var sortFunc = this.getSortFunc(property, order);
    var status = order ? 'sorting_desc' : 'sorting_asc';

    this.resetSort();
    this.get('childViews').findProperty('name', property.get('name')).set('status', status);
    this.saveSortStatuses(property, order);
    content.sort(sortFunc);

    if (!!returnSorted) {
      return content;
    } else {
      this.set('content', content);
    }
  },

  isSorting: false,

  onContentChange: function () {
    if (!this.get('isSorting') && this.get('content.length')) {
      this.get('childViews').forEach(function (view) {
        if (view.status !== 'sorting') {
          var status = view.get('status');
          this.set('isSorting', true);
          this.sort(view, status == 'sorting_desc');
          this.set('isSorting', false);
          view.set('status', status);
        }
      }, this);
    }
  }.observes('content.length'),

  /**
   * reset all sorts fields
   */
  resetSort: function () {
    this.get('childViews').setEach('status', 'sorting');
  },
  /**
   * determines sort function depending on the type of sort field
   * @param property
   * @param order
   * @return {*}
   */
  getSortFunc: function (property, order) {
    var func;
    switch (property.get('type')) {
      case 'ip':
        func = function (a, b) {
          a = App.Helpers.misc.ipToInt(a.get(property.get('name')));
          b = App.Helpers.misc.ipToInt(b.get(property.get('name')));
          return order ? (b - a) : (a - b);
        };
        break;
      case 'number':
        func = function (a, b) {
          a = parseFloat(a.get(property.get('name')));
          b = parseFloat(b.get(property.get('name')));
          return order ? (b - a) : (a - b);
        };
        break;
      default:
        func = function (a, b) {
          if (order) {
            if (a.get(property.get('name')) > b.get(property.get('name')))
              return -1;
            if (a.get(property.get('name')) < b.get(property.get('name')))
              return 1;
            return 0;
          } else {
            if (a.get(property.get('name')) < b.get(property.get('name')))
              return -1;
            if (a.get(property.get('name')) > b.get(property.get('name')))
              return 1;
            return 0;
          }
        }
    }
    return func;
  }
});

/**
 * view that carry on sorting on server-side via <code>refresh()</code> in parentView
 * @type {*}
 */
var serverWrapperView = Em.View.extend({
  tagName: 'tr',

  classNames: ['sort-wrapper'],

  willInsertElement: function () {
    this.loadSortStatuses();
  },

  /**
   * Initialize and save sorting statuses: publicHostName sorting_asc
   */
  loadSortStatuses: function () {
    var statuses = [];
    var childViews = this.get('childViews');
    childViews.forEach(function (childView) {
      var sortStatus = (childView.get('name') == 'publicHostName' && childView.get('status') == 'sorting') ? 'sorting_asc' : childView.get('status');
      statuses.push({
        name: childView.get('name'),
        status: sortStatus
      });
      childView.set('status', sortStatus);
    });
    this.get('controller').set('sortingColumn', childViews.findProperty('name', 'publicHostName'));
  },

  /**
   * Save sort statuses to local storage
   * Works only after finish filtering in the parent View
   */
  saveSortStatuses: function () {
    var statuses = [];
    this.get('childViews').forEach(function (childView) {
      statuses.push({
        name: childView.get('name'),
        status: childView.get('status')
      });
    });
  },

  /**
   * sort content by property
   * @param property {object}
   * @param order {Boolean} true - DESC, false - ASC
   */
  sort: function (property, order) {
    var status = order ? 'sorting_desc' : 'sorting_asc';

    this.resetSort();
    this.get('childViews').findProperty('name', property.get('name')).set('status', status);
    this.saveSortStatuses();
    this.get('parentView').refresh();
  },

  /**
   * reset all sorts fields
   */
  resetSort: function () {
    this.get('childViews').setEach('status', 'sorting');
  }
});

/**
 * particular view that contain sort field properties:
 * name - name of property in content table
 * type(optional) - specific type to sort
 * displayName - label to display
 * @type {*}
 */
var fieldView = Em.View.extend({
  templateName: 'sort_field_template',
  classNameBindings: ['viewNameClass'],
  tagName: 'th',
  name: null,
  displayName: null,
  status: 'sorting',
  viewNameClass: function () {
    return 'sort-view-' + this.get('column');
  }.property(),
  type: null,
  column: 0,
  /**
   * callback that run sorting and define order of sorting
   * @param event
   */
  click: function (event) {
    this.get('parentView').sort(this, (this.get('status') !== 'sorting_desc'));
    this.get('controller').set('sortingColumn', this);
  }
});

/**
 * Result object, which will be accessible outside
 * @type {Object}
 */
App.Sorts = {
  serverWrapperView: serverWrapperView,
  wrapperView: wrapperView,
  fieldView: fieldView
};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Wrapper View for all filter components. Layout template and common actions are located inside of it.
 * Logic specific for data component(input, select, or custom multi select, which fire any changes on interface) are
 * located in inner view - <code>filterView</code>.
 *
 * If we want to have input filter, put <code>textFieldView</code> to it.
 * All inner views implemented below this view.
 * @type {*}
 */

var wrapperView = Ember.View.extend({
  classNames: ['view-wrapper'],
  layoutName: 'wrapper_layout',
  templateName: 'wrapper_template',

  value: null,

  /**
   * Column index
   */
  column: null,

  /**
   * If this field is exists we dynamically create hidden input element and set value there.
   * Used for some cases, where this values will be used outside of component
   */
  fieldId: null,

  clearFilter: function(){
    this.set('value', this.get('emptyValue'));
    if(this.get('setPropertyOnApply')){
      this.setValueOnApply();
    }
    return false;
  },

  setValueOnApply: function() {
    if(this.get('value') == null){
      this.set('value', '')
    }
    this.set(this.get('setPropertyOnApply'), this.get('value'));
    return false;
  },

  actions: {
    actionSetValueOnApply: function() {
      this.setValueOnApply();
    },
    actionClearFilter: function() {
      this.clearFilter();
    }
  },

  /**
   * Use to determine whether filter is clear or not. Also when we want to set empty value
   */
  emptyValue: '',

  /**
   * Whether our <code>value</code> is empty or not
   * @return {Boolean}
   */
  isEmpty: function(){
    if(this.get('value') === null){
      return true;
    }
    return this.get('value').toString() === this.get('emptyValue').toString();
  },

  /**
   * Show/Hide <code>Clear filter</code> button.
   * Also this method updates computed field related to <code>fieldId</code> if it exists.
   * Call <code>onChangeValue</code> callback when everything is done.
   */
  showClearFilter: function(){
    if(!this.get('parentNode')){
      return;
    }
    // get the sort view element in the same column to current filter view to highlight them together
    var relatedSort = $(this.get('element')).parents('thead').find('.sort-view-' + this.get('column'));
    if(this.isEmpty()){
      this.get('parentNode').removeClass('active-filter');
      this.get('parentNode').addClass('notActive');
      relatedSort.removeClass('active-sort');
    } else {
      this.get('parentNode').removeClass('notActive');
      this.get('parentNode').addClass('active-filter');
      relatedSort.addClass('active-sort');
    }

    if(this.get('fieldId')){
      this.$('> input').eq(0).val(this.get('value'));
    }

    this.onChangeValue();
  }.observes('value'),

  /**
   * Callback for value changes
   */
  onChangeValue: function(){

  },

  /**
   * Filter components is located here. Should be redefined
   */
  filterView: Em.View,

  /**
   * Update class of parentNode(hide clear filter button) on page load
   */
  didInsertElement: function(){
    var parent = this.$().parent();
    this.set('parentNode', parent);
    parent.addClass('notActive');
  }
});

/**
 * Simple input control for wrapperView
 */
var textFieldView = Ember.TextField.extend({
  type:'text',
  placeholder: Em.I18n.t('any'),
  valueBinding: "parentView.value"
});

/**
 * Simple multiselect control for wrapperView.
 * Used to render blue button and popup, which opens on button click.
 * All content related logic should be implemented manually outside of it
 */
var componentFieldView = Ember.View.extend({
  classNames: ['btn-group'],
  classNameBindings: ['isFilterOpen:open:'],

  /**
   * Whether popup is shown or not
   */
  isFilterOpen: false,

  /**
   * We have <code>value</code> property similar to inputs <code>value</code> property
   */
  valueBinding: 'parentView.value',

  /**
   * Clear filter to initial state
   */
  clearFilter: function(){
    this.set('value', '');
  },

  /**
   * Onclick handler for <code>cancel filter</code> button
   */
  closeFilter:function () {
    $(document).unbind('click');
    this.set('isFilterOpen', false);
  },

  /**
   * Onclick handler for <code>apply filter</code> button
   */
  applyFilter:function() {
    this.closeFilter();
  },

  /**
   * Onclick handler for <code>show component filter</code> button.
   * Also this function is used in some other places
   */
  clickFilterButton:function () {
    var self = this;
    this.set('isFilterOpen', !this.get('isFilterOpen'));
    if (this.get('isFilterOpen')) {

      var dropDown = this.$('.filter-components');
      var firstClick = true;
      $(document).bind('click', function (e) {
        if (!firstClick && $(e.target).closest(dropDown).length == 0) {
          self.set('isFilterOpen', false);
          $(document).unbind('click');
        }
        firstClick = false;
      });
    }
  }
});

/**
 * Simple select control for wrapperView
 */
var selectFieldView = Ember.Select.extend({
  selectionBinding: 'parentView.value',
  contentBinding: 'parentView.content'
});

/**
 * Result object, which will be accessible outside
 * @type {Object}
 */
App.Filters = {
  /**
   * You can access wrapperView outside
   */
  wrapperView : wrapperView,

  /**
   * And also controls views if need it
   */
  textFieldView : textFieldView,
  selectFieldView: selectFieldView,
  componentFieldView: componentFieldView,

  /**
   * Quick create input filters
   * @param config parameters of <code>wrapperView</code>
   */
  createTextView : function(config){
    config.fieldType = config.fieldType || 'input-medium';
    config.filterView = textFieldView.extend({
      classNames : [ config.fieldType ]
    });

    return wrapperView.extend(config);
  },

  /**
   * Quick create multiSelect filters
   * @param config parameters of <code>wrapperView</code>
   */
  createComponentView : function(config){
    config.clearFilter = function(){
      this.forEachChildView(function(item){
        if(item.clearFilter){
          item.clearFilter();
        }
      });
      return false;
    };

    return wrapperView.extend(config);
  },

  /**
   * Quick create select filters
   * @param config parameters of <code>wrapperView</code>
   */
  createSelectView: function(config){

    config.fieldType = config.fieldType || 'input-medium';
    config.filterView = selectFieldView.extend({
      classNames : [ config.fieldType ],
      attributeBindings: ['disabled','multiple'],
      disabled: false
    });
    config.emptyValue = Em.I18n.t('any');

    return wrapperView.extend(config);
  },
  /**
   * returns the filter function, which depends on the type of property
   * @param type
   * @param isGlobal check is search global
   * @return {Function}
   */
  getFilterByType: function(type, isGlobal){
    switch (type){
      case 'ambari-bandwidth':
        return function(rowValue, rangeExp){
          var compareChar = isNaN(rangeExp.charAt(0)) ? rangeExp.charAt(0) : false;
          var compareScale = rangeExp.charAt(rangeExp.length - 1);
          var compareValue = compareChar ? parseFloat(rangeExp.substr(1, rangeExp.length)) : parseFloat(rangeExp.substr(0, rangeExp.length));
          var match = false;
          if (rangeExp.length == 1 && compareChar !== false) {
            // User types only '=' or '>' or '<', so don't filter column values
            match = true;
            return match;
          }
          switch (compareScale) {
            case 'g':
              compareValue *= 1073741824;
              break;
            case 'm':
              compareValue *= 1048576;
              break;
            case 'k':
              compareValue *= 1024;
              break;
            default:
              //default value in GB
              compareValue *= 1073741824;
          }
          rowValue = (jQuery(rowValue).text()) ? jQuery(rowValue).text() : rowValue;

          var convertedRowValue;
          if (rowValue === '<1KB') {
            convertedRowValue = 1;
          } else {
            var rowValueScale = rowValue.substr(rowValue.length - 2, 2);
            switch (rowValueScale) {
              case 'KB':
                convertedRowValue = parseFloat(rowValue)*1024;
                break;
              case 'MB':
                convertedRowValue = parseFloat(rowValue)*1048576;
                break;
              case 'GB':
                convertedRowValue = parseFloat(rowValue)*1073741824;
                break;
            }
          }

          switch (compareChar) {
            case '<':
              if (compareValue > convertedRowValue) match = true;
              break;
            case '>':
              if (compareValue < convertedRowValue) match = true;
              break;
            case false:
            case '=':
              if (compareValue == convertedRowValue) match = true;
              break;
          }
          return match;
        };
        break;
      case 'duration':
        return function (rowValue, rangeExp) {
          var compareChar = isNaN(rangeExp.charAt(0)) ? rangeExp.charAt(0) : false;
          var compareScale = rangeExp.charAt(rangeExp.length - 1);
          var compareValue = compareChar ? parseFloat(rangeExp.substr(1, rangeExp.length)) : parseFloat(rangeExp.substr(0, rangeExp.length));
          var match = false;
          if (rangeExp.length == 1 && compareChar !== false) {
            // User types only '=' or '>' or '<', so don't filter column values
            match = true;
            return match;
          }
          switch (compareScale) {
            case 's':
              compareValue *= 1000;
              break;
            case 'm':
              compareValue *= 60000;
              break;
            case 'h':
              compareValue *= 3600000;
              break;
            default:
              compareValue *= 1000;
          }
          rowValue = (jQuery(rowValue).text()) ? jQuery(rowValue).text() : rowValue;

          switch (compareChar) {
            case '<':
              if (compareValue > rowValue) match = true;
              break;
            case '>':
              if (compareValue < rowValue) match = true;
              break;
            case false:
            case '=':
              if (compareValue == rowValue) match = true;
              break;
          }
          return match;
        };
        break;
      case 'date':
        return function (rowValue, rangeExp) {
          var match = false;
          var timePassed = App.dateTime() - rowValue;
          switch (rangeExp) {
            case 'Past 1 hour':
              match = timePassed <= 3600000;
              break;
            case 'Past 1 Day':
              match = timePassed <= 86400000;
              break;
            case 'Past 2 Days':
              match = timePassed <= 172800000;
              break;
            case 'Past 7 Days':
              match = timePassed <= 604800000;
              break;
            case 'Past 14 Days':
              match = timePassed <= 1209600000;
              break;
            case 'Past 30 Days':
              match = timePassed <= 2592000000;
              break;
            case 'Any':
              match = true;
              break;
          }
          return match;
        };
        break;
      case 'number':
        return function(rowValue, rangeExp){
          var compareChar = rangeExp.charAt(0);
          var compareValue;
          var match = false;
          if (rangeExp.length == 1) {
            if (isNaN(parseInt(compareChar))) {
              // User types only '=' or '>' or '<', so don't filter column values
              match = true;
              return match;
            }
            else {
              compareValue = parseFloat(parseFloat(rangeExp).toFixed(2));
            }
          }
          else {
            if (isNaN(parseInt(compareChar))) {
              compareValue = parseFloat(parseFloat(rangeExp.substr(1, rangeExp.length)).toFixed(2));
            }
            else {
              compareValue = parseFloat(parseFloat(rangeExp.substr(0, rangeExp.length)).toFixed(2));
            }
          }
          rowValue = parseFloat((jQuery(rowValue).text()) ? jQuery(rowValue).text() : rowValue);
          match = false;
          switch (compareChar) {
            case '<':
              if (compareValue > rowValue) match = true;
              break;
            case '>':
              if (compareValue < rowValue) match = true;
              break;
            case '=':
              if (compareValue == rowValue) match = true;
              break;
            default:
              if (rangeExp == rowValue) match = true;
          }
          return match;
        };
        break;
      case 'multiple':
        return function(origin, compareValue){
          var options = compareValue.split(','),
            rowValue = (typeof (origin) === "string") ? origin : origin.mapProperty('componentName').join(" ");
          var str = new RegExp(compareValue, "i");
          for (var i = 0; i < options.length; i++) {
            if(!isGlobal) {
              str = new RegExp('(\\W|^)' + options[i] + '(\\W|$)');
            }
            if (rowValue.search(str) !== -1) {
              return true;
            }
          }
          return false;
        };
        break;
      case 'boolean':
        return function (origin, compareValue){
          return origin === compareValue;
        };
        break;
      case 'string':
      default:
        return function(origin, compareValue){
          var regex = new RegExp(compareValue,"i");
          return regex.test(origin);
        }
    }
  }

};


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.TableView = Em.View.extend({

  /**
   * Defines to show pagination or show all records
   * @type {Boolean}
   */
  pagination: true,

  /**
   * Shows if all data is loaded and filtered
   * @type {Boolean}
   */
  filteringComplete: false,

  /**
   * intermediary for filteringComplete
   * @type {Boolean}
   */
  tableFilteringComplete: false,

  /**
   * The number of rows to show on every page
   * The value should be a number converted into string type in order to support select element API
   * Example: "10", "25"
   * @type {String}
   */
  displayLength: '10',

  /**
   * default value of display length
   * The value should be a number converted into string type in order to support select element API
   * Example: "10", "25"
   */
  defaultDisplayLength: "10",

  /**
   * number of hosts in table after applying filters
   */
  filteredCount: function () {
    return this.get('filteredContent.length');
  }.property('filteredContent.length'),

  /**
   * Do filtering, using saved in the local storage filter conditions
   */
  willInsertElement:function () {
    this.initFilters();
  },

  /**
   * initialize filters
   * restore values from local DB
   * or clear filters in case there is no filters to restore
   */
  initFilters: function () {
    this.clearFilters();
    this.set('tableFilteringComplete', true);
  },

  /**
   * Return pagination information displayed on the page
   * @type {String}
   */
  paginationInfo: function () {
    return this.t('tableView.filters.paginationInfo').format(this.get('startIndex'), this.get('endIndex'), this.get('filteredCount'));
  }.property('filteredCount', 'endIndex'),

  paginationLeft: Ember.View.extend({
    tagName: 'a',
    templateName: 'table/navigation/pagination_left',
    classNameBindings: ['class'],
    class: function () {
      if (this.get("parentView.startIndex") > 1) {
        return "paginate_previous";
      }
      return "paginate_disabled_previous";
    }.property("parentView.startIndex", 'parentView.filteredCount'),

    click: function () {
      if (this.get('class') === "paginate_previous") {
        this.get('parentView').previousPage();
      }
    }
  }),

  paginationRight: Ember.View.extend({
    tagName: 'a',
    templateName: 'table/navigation/pagination_right',
    classNameBindings: ['class'],
    class: function () {
      if ((this.get("parentView.endIndex")) < this.get("parentView.filteredCount")) {
        return "paginate_next";
      }
      return "paginate_disabled_next";
    }.property("parentView.endIndex", 'parentView.filteredCount'),

    click: function () {
      if (this.get('class') === "paginate_next") {
        this.get('parentView').nextPage();
      }
    }
  }),

  paginationFirst: Ember.View.extend({
    tagName: 'a',
    templateName: 'table/navigation/pagination_first',
    classNameBindings: ['class'],
    class: function () {
      if ((this.get("parentView.endIndex")) > parseInt(this.get("parentView.displayLength"))) {
        return "paginate_previous";
      }
      return "paginate_disabled_previous";
    }.property("parentView.endIndex", 'parentView.filteredCount'),

    click: function () {
      if (this.get('class') === "paginate_previous") {
        this.get('parentView').firstPage();
      }
    }
  }),

  paginationLast: Ember.View.extend({
    tagName: 'a',
    templateName: 'table/navigation/pagination_last',
    classNameBindings: ['class'],
    class: function () {
      if (this.get("parentView.endIndex") !== this.get("parentView.filteredCount")) {
        return "paginate_next";
      }
      return "paginate_disabled_next";
    }.property("parentView.endIndex", 'parentView.filteredCount'),

    click: function () {
      if (this.get('class') === "paginate_next") {
        this.get('parentView').lastPage();
      }
    }
  }),

  /**
   * Select View with list of "rows-per-page" options
   * @type {Ember.View}
   */
  rowsPerPageSelectView: Em.Select.extend({
    content: ['10', '25', '50', '100'],
    change: function () {
      this.get('parentView').saveDisplayLength();
    }
  }),

  /**
   * Start index for displayed content on the page
   */
  startIndex: 1,

  /**
   * Calculate end index for displayed content on the page
   */
  endIndex: function () {
    if (this.get('pagination') && this.get('displayLength')) {
      return Math.min(this.get('filteredCount'), this.get('startIndex') + parseInt(this.get('displayLength')) - 1);
    } else {
      return this.get('filteredCount') || 0;
    }
  }.property('startIndex', 'displayLength', 'filteredCount'),

  /**
   * Onclick handler for previous page button on the page
   */
  previousPage: function () {
    var result = this.get('startIndex') - parseInt(this.get('displayLength'));
    this.set('startIndex', (result < 2) ? 1 : result);
  },

  /**
   * Onclick handler for next page button on the page
   */
  nextPage: function () {
    var result = this.get('startIndex') + parseInt(this.get('displayLength'));
    if (result - 1 < this.get('filteredCount')) {
      this.set('startIndex', result);
    }
  },
  /**
   * Onclick handler for first page button on the page
   */
  firstPage: function () {
    this.set('startIndex', 1);
  },
  /**
   * Onclick handler for last page button on the page
   */
  lastPage: function () {
    var pagesCount = this.get('filteredCount') / parseInt(this.get('displayLength'));
    var startIndex = (this.get('filteredCount') % parseInt(this.get('displayLength')) === 0) ?
      (pagesCount - 1) * parseInt(this.get('displayLength')) :
      Math.floor(pagesCount) * parseInt(this.get('displayLength'));
    this.set('startIndex', ++startIndex);
  },

  /**
   * Calculates default value for startIndex property after applying filter or changing displayLength
   */
  updatePaging: function (controller, property) {
    var displayLength = this.get('displayLength');
    var filteredContentLength = this.get('filteredCount');
    if (property == 'displayLength') {
      this.set('startIndex', Math.min(1, filteredContentLength));
    }
    else
      if (!filteredContentLength) {
        this.set('startIndex', 0);
      }
      else
        if (this.get('startIndex') > filteredContentLength) {
          this.set('startIndex', Math.floor((filteredContentLength - 1) / displayLength) * displayLength + 1);
        }
        else
          if (!this.get('startIndex')) {
            this.set('startIndex', 1);
          }
  }.observes('displayLength', 'filteredCount'),

  /**
   * Apply each filter to each row
   *
   * @param {Number} iColumn number of column by which filter
   * @param {Object} value
   * @param {String} type
   */
  updateFilter: function (iColumn, value, type) {
    var filterCondition = this.get('filterConditions').findProperty('iColumn', iColumn);
    if (filterCondition) {
      filterCondition.value = value;
    }
    else {
      filterCondition = {
        iColumn: iColumn,
        value: value,
        type: type
      };
      this.get('filterConditions').push(filterCondition);
    }
    this.filtersUsedCalc();
    this.filter();
  },

  /**
   * Contain filter conditions for each column
   * @type {Array}
   */
  filterConditions: [],

  /**
   * Contains content after implementing filters
   * @type {Array}
   */
  filteredContent: [],

  /**
   * Determine if <code>filteredContent</code> is empty or not
   * @type {Boolean}
   */
  hasFilteredItems: function() {
    return !!this.get('filteredCount');
  }.property('filteredCount'),

  /**
   * Contains content to show on the current page of data page view
   * @type {Array}
   */
  pageContent: function () {
    return this.get('filteredContent').slice(this.get('startIndex') - 1, this.get('endIndex'));
  }.property('filteredCount', 'startIndex', 'endIndex'),

  /**
   * Filter table by filterConditions
   */
  filter: function () {
    var content = this.get('content');
    var filterConditions = this.get('filterConditions').filterProperty('value');
    var result;
    var assoc = this.get('colPropAssoc');
    if (filterConditions.length) {
      result = content.filter(function (item) {
        var match = true;
        filterConditions.forEach(function (condition) {
          var filterFunc = App.Filters.getFilterByType(condition.type, false);
          if (match) {
            match = filterFunc(item.get(assoc[condition.iColumn]), condition.value);
          }
        });
        return match;
      });
      this.set('filteredContent', result);
    } else {
      this.set('filteredContent', content.toArray());
    }
  }.observes('content.length'),

  /**
   * Does any filter is used on the page
   * @type {Boolean}
   */
  filtersUsed: false,

  /**
   * Determine if some filters are used on the page
   * Set <code>filtersUsed</code> value
   */
  filtersUsedCalc: function() {
    var filterConditions = this.get('filterConditions');
    if (!filterConditions.length) {
      this.set('filtersUsed', false);
      return;
    }
    var filtersUsed = false;
    filterConditions.forEach(function(filterCondition) {
      if (filterCondition.value.toString() !== '') {
        filtersUsed = true;
      }
    });
    this.set('filtersUsed', filtersUsed);
  },

  /**
   * Run <code>clearFilter</code> in the each child filterView
   */
  clearFilters: function() {
    this.set('filterConditions', []);
    this.get('_childViews').forEach(function(childView) {
      if (childView['clearFilter']) {
        childView.clearFilter();
      }
    });
  },

  actions: {
    actionClearFilters: function() {
      this.clearFilters();
    }
  }

});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.MainHiveJobDetailsTezDagView = Em.View.extend({

  templateName: 'job/hive_job_details_tez_dag',

  /**
   * Selected Vertex
   * @type {App.TezDagVertex}
   */
  selectedVertex: null,

  /**
   * @type {string}
   */
  summaryMetricType: null,

  /**
   * The contents of the <svg> element
   */
  svgVerticesLayer: null,

  svgTezRoot: null,

  svgWidth: -1,

  svgHeight: -1,

  // zoomScaleFom: -1, // Bound from parent view
  // zoomScaleTo: -1, // Bound from parent view
  // zoomScale: -1, // Bound from parent view

  zoomTranslate: [0, 0],

  zoomBehavior: null,

  svgCreated: false,

  /**
   * Populated by #drawTezDag()
   *
   * {
   *   "nodes": [
   *     {
   *       "id": "Map2",
   *       "name": "Map 2",
   *       "type": App.TezDagVertexType.MAP,
   *       "operations": [
   *         "TableScan",
   *         "File Output"
   *       ],
   *       "depth": 1,
   *       "parents": [],
   *       "children": [],
   *       "x": 0,
   *       "y": 0,
   *       "metricDisplay": "100MB",
   *       "metricPercent": 64,
   *       "metricType": "Input",
   *       "selected": true,
   *       "fixed": true,
   *       "metrics": {
   *         "input": 40022,
   *         "output": 224344,
   *         "recordsRead": 200,
   *         "recordsWrite": 122,
   *         "tezTasks": 2
   *       }
   *     }
   *   ],
   *   "links": [
   *     {
   *       "source": {},
   *       "target": {},
   *       "edgeType": "BROADCAST"
   *     }
   *   ]
   * }
   */
  dagVisualModel: {
    nodes: [],
    links: [],
    maxMetrics: {},
    minMetrics: {}
  },

  didInsertElement: function () {
    this._super();
    this.createSvg();
  },

  willDestroyElement: function () {
    $('.svg-tooltip').tooltip('destroy');
  },

  /**
   * Basic init for graph
   * @method createSvg
   */
  createSvg: function () {
    var self = this;
    var dagVisualModel = this.get('dagVisualModel');
    dagVisualModel.nodes.clear();
    dagVisualModel.links.clear();
    dagVisualModel.maxMetrics = {};
    dagVisualModel.minMetrics = {};

    //this.set('content', this.get('content'));
    var svg = d3.select("#tez-dag-svg");
    d3.selectAll(".tez-dag-canvas").remove();
    var tezRoot = svg.append("svg:g").attr("class", "tez-root");
    this.set('svgTezRoot', tezRoot);
    var tezRootRect = tezRoot.append("rect").attr("class", "tez-root-rect");
    this.set('svgVerticesLayer', tezRoot.append("svg:g").attr("class", "tez-dag-canvas"));
    this.adjustGraphHeight();
    var canvasSize = this.drawTezDag();
    var minScale = Math.min(this.get('svgHeight') / canvasSize.height, this.get('svgWidth') / canvasSize.width);
    if (minScale > 1) {
      minScale = 1;
    }
    tezRootRect.attr("width", canvasSize.width).attr("height", canvasSize.height);
    var zoom = d3.behavior.zoom().scaleExtent([ minScale, 2 ]).on("zoom", function () {
      tezRoot.attr("transform", "translate(" + (d3.event.translate) + ")scale(" + d3.event.scale + ")");
      self.set('zoomScale', d3.event.scale);
      self.set('zoomTranslate', d3.event.translate);
    });
    svg.call(zoom);
    this.set('zoomBehavior', zoom);
    this.set('zoomTranslate', [0, 0]);
    this.set('zoomScaleFrom', minScale);
    this.set('zoomScaleTo', 2);
    this.set('zoomScale', minScale);
    this.set('svgCreated', true);
  },

  /**
   * Change graph's zoom
   * @method zoomScaleObserver
   */
  zoomScaleObserver: function () {
    var tezRoot = this.get("svgTezRoot"),
      newScale = this.get('zoomScale'),
      zoomTranslate = this.get('zoomTranslate'),
      zoomBehavior = this.get('zoomBehavior');
    if (d3.event == null && this.get('svgCreated')) {
      // Values were set from actions instead of UI events
      // We need to center in on selected vertex if available.
      var selectedNode = null;
      var dagVisualModel = this.get('dagVisualModel');
      if (dagVisualModel && dagVisualModel.nodes && dagVisualModel.nodes.length > 0) {
        dagVisualModel.nodes.every(function (node) {
          if (node.selected) {
            selectedNode = node;
            return false;
          }
          return true;
        })
      }
      if (selectedNode != null) {
        var cX = selectedNode.x + selectedNode.width / 2,
          cY = selectedNode.y + selectedNode.height / 2,
          mX = (cX * zoomBehavior.scale()) + zoomTranslate[0],
          mY = (cY * zoomBehavior.scale()) + zoomTranslate[1],
          pX = (cX * newScale) + zoomTranslate[0],
          pY = (cY * newScale) + zoomTranslate[1],
          nX = (mX - pX),
          nY = (mY - pY);
        zoomTranslate[0] += nX;
        zoomTranslate[1] += nY;
        this.set('zoomTranslate', zoomTranslate);
      }
    }
    zoomBehavior.scale(newScale);
    zoomBehavior.translate(zoomTranslate);
    tezRoot.attr("transform", "translate(" + zoomTranslate + ")scale(" + newScale + ")");
  }.observes('zoomScale', 'zoomScaleFrom', 'zoomScaleTo', 'zoomTranslate'),

  /**
   * We have to make the height of the DAG section match the height of the Summary section.
   * @method adjustGraphHeight
   */
  adjustGraphHeight: function () {
    var rhsDiv = document.getElementById('tez-vertices-rhs'),
      lhsDiv = document.getElementById('tez-dag-section');
    if (lhsDiv && rhsDiv) {
      var rhsHeight = rhsDiv.clientHeight - 26, // box boundary
      currentWidth = lhsDiv.clientWidth;
      $(lhsDiv).attr('style', "height:" + rhsHeight + "px;");
      var svgHeight = rhsHeight - 20;
      d3.select("#tez-dag-svg").attr('height', svgHeight).attr('width', '100%');
      this.set('svgWidth', currentWidth);
      this.set('svgHeight', svgHeight);
    }
  },

  /**
   * Update graph when <code>selectedVertex</code> changed
   * @method vertexSelectionUpdated
   */
  vertexSelectionUpdated: function () {
    var vertexId = this.get('selectedVertex.id'),
      zoomTranslate = [],
      zoomBehavior = this.get('zoomBehavior'),
      selectedNode = this.get('dagVisualModel').nodes.findProperty('id', vertexId),
      dagVisualModel = this.get('dagVisualModel');
    if (dagVisualModel && dagVisualModel.nodes && dagVisualModel.nodes.length > 0) {
      dagVisualModel.nodes.forEach(function (node) {
        node.selected = node.id == vertexId;
      })
    }
    if (!this.get('selectedVertex.notTableClick')) {
      var cX = selectedNode.x + (selectedNode.width) / 2,
        cY = selectedNode.y + (selectedNode.height) / 2;
      zoomTranslate[0] = (225 / zoomBehavior.scale() - cX);
      zoomTranslate[1] = (250 / zoomBehavior.scale() - cY);
      this.set('zoomTranslate', [0, 0]);
      this.get('svgVerticesLayer').attr("transform", "translate(0,0)");
      this.get('svgVerticesLayer').attr("transform", "translate(" + zoomTranslate[0] + "," + zoomTranslate[1] + ")");
    }
    this.refreshGraphUI();
  }.observes('selectedVertex'),

  /**
   * Update graph when new summary metric is selected
   * @method summaryMetricTypeUpdated
   */
  summaryMetricTypeUpdated: function () {
    var summaryMetricType = this.get('summaryMetricType'),
      dagVisualModel = this.get('dagVisualModel'),
      min = dagVisualModel.minMetrics[summaryMetricType],
      max = dagVisualModel.maxMetrics[summaryMetricType];
    dagVisualModel.nodes.forEach(function (node) {
      var value = node.metrics[summaryMetricType],
        percent = -1;
      if (App.Helpers.number.validateInteger(value) == null && value >= 0) {
        if (App.Helpers.number.validateInteger(min) == null && App.Helpers.number.validateInteger(max) == null) {
          if (max > min && value >= 0) {
            percent = Math.round((value - min) * 100 / (max - min));
          }
        }
      }
      else {
        value = '';
      }
      if (['input', 'output'].contains(summaryMetricType)) {
        value = App.Helpers.number.bytesToSize(value);
      }
      node.metricType = Em.I18n.t('jobs.hive.tez.metric.' + summaryMetricType);
      node.metricDisplay = value;
      node.metricPercent = percent;
    });
    this.refreshGraphUI();
  }.observes('summaryMetricType'),

  /**
   * Observes metrics of all vertices
   * @method vertexMetricsUpdated
   */
  vertexMetricsUpdated: function () {
    var dagVisualModel = this.get('dagVisualModel');
    dagVisualModel.minMetrics = {
      input: Number.MAX_VALUE,
      output: Number.MAX_VALUE,
      recordsRead: Number.MAX_VALUE,
      recordsWrite: Number.MAX_VALUE,
      tezTasks: Number.MAX_VALUE,
      spilledRecords: Number.MAX_VALUE
    };
    dagVisualModel.maxMetrics = {
      input: 0,
      output: 0,
      recordsRead: 0,
      recordsWrite: 0,
      tezTasks: 0,
      spilledRecords: 0
    };
    if (dagVisualModel.nodes) {
      dagVisualModel.nodes.forEach(function (node) {
        var vertex = App.HiveJob.store.getById('tezDagVertex', node.id);
        if (vertex) {
          node.metrics['input'] = vertex.get('fileReadBytes') + vertex.get('hdfsReadBytes');
          node.metrics['output'] = vertex.get('fileWriteBytes') + vertex.get('hdfsWriteBytes');
          node.metrics['recordsRead'] = vertex.get('recordReadCount');
          node.metrics['recordsWrite'] = vertex.get('recordWriteCount');
          node.metrics['tezTasks'] = vertex.get('tasksCount');
          node.metrics['spilledRecords'] = vertex.get('spilledRecords');
          node.state = vertex.get('state');
          // Min metrics
          dagVisualModel.minMetrics.input = Math.min(dagVisualModel.minMetrics.input, node.metrics.input);
          dagVisualModel.minMetrics.output = Math.min(dagVisualModel.minMetrics.output, node.metrics.output);
          dagVisualModel.minMetrics.recordsRead = Math.min(dagVisualModel.minMetrics.recordsRead, node.metrics.recordsRead);
          dagVisualModel.minMetrics.recordsWrite = Math.min(dagVisualModel.minMetrics.recordsWrite, node.metrics.recordsWrite);
          dagVisualModel.minMetrics.tezTasks = Math.min(dagVisualModel.minMetrics.tezTasks, node.metrics.tezTasks);
          dagVisualModel.minMetrics.spilledRecords = Math.min(dagVisualModel.minMetrics.spilledRecords, node.metrics.spilledRecords);
          // Max metrics
          dagVisualModel.maxMetrics.input = Math.max(dagVisualModel.maxMetrics.input, node.metrics.input);
          dagVisualModel.maxMetrics.output = Math.max(dagVisualModel.maxMetrics.output, node.metrics.output);
          dagVisualModel.maxMetrics.recordsRead = Math.max(dagVisualModel.maxMetrics.recordsRead, node.metrics.recordsRead);
          dagVisualModel.maxMetrics.recordsWrite = Math.max(dagVisualModel.maxMetrics.recordsWrite, node.metrics.recordsWrite);
          dagVisualModel.maxMetrics.tezTasks = Math.max(dagVisualModel.maxMetrics.tezTasks, node.metrics.tezTasks);
          dagVisualModel.maxMetrics.spilledRecords = Math.max(dagVisualModel.maxMetrics.spilledRecords, node.metrics.spilledRecords);
        }
      });
    }
    Ember.run.once(this, 'summaryMetricTypeUpdated');
  }.observes(
      'content.tezDag.vertices.@each.fileReadBytes',
      'content.tezDag.vertices.@each.fileWriteBytes',
      'content.tezDag.vertices.@each.hdfsReadBytes',
      'content.tezDag.vertices.@each.hdfsWriteBytes',
      'content.tezDag.vertices.@each.recordReadCount',
      'content.tezDag.vertices.@each.recordWriteCount',
      'content.tezDag.vertices.@each.state',
      'content.tezDag.vertices.@each.spilledRecords'
    ),

  /**
   * Create object with data for graph popups
   * @param {string} vertexName
   * @param {string} op
   * @param {number} opIndex
   * @returns {{name: string, value: string}[]}
   * @method createOperationPlanObj
   */
  createOperationPlanObj: function (vertexName, op, opIndex) {
    var operatorPlanObj = [],
      text = this.get('content.tezDag.vertices').findBy('name', vertexName).get('operationPlan');
    text = text.replace(/:"/g, '"').replace(/([:,])(?=\S)/g, '$1 ');
    var jsonText = $.parseJSON(text);
    opIndex = opIndex ? parseInt(opIndex) - 1 : 0;
    jsonText = App.Helpers.string.findIn(op, jsonText, opIndex);
    if (jsonText != null) {
      for (var key in jsonText) {
        if (jsonText.hasOwnProperty(key) && typeof(jsonText[key]) == "string") {
          operatorPlanObj.push({
            name: key,
            value: jsonText[key]
          });
        }
      }
    }
    return operatorPlanObj;
  },

  /**
   * Determines layout and creates Tez graph. In the process it populates the
   * visual model into 'dagVisualModel' field.
   *
   * Terminology: 'vertices' and 'edges' are Tez terms. 'nodes' and 'links' are
   * visual (d3) terms.
   * @method drawTezDag
   */
  drawTezDag: function () {
    var self = this,
      width = this.get('svgWidth'),
      svgLayer = this.get('svgVerticesLayer'),
      vertices = this.get('content.tezDag.vertices'),
      edges = this.get('content.tezDag.edges'),
      constants = this.get('constants'),
      vertexIdToNode = {},
      depthToNodes = [], // Array of id arrays
      dagVisualModel = this.get('dagVisualModel'),
      selectedVertex = this.get('selectedVertex'),
      minVertexDuration = Number.MAX_VALUE,
      maxVertexDuration = Number.MIN_VALUE;

    //
    // CALCULATE DEPTH - BFS to get correct graph depth
    //
    var visitEdges = [];
    var maxRowLength = 0;
    var maxRowDepth = 0;
    vertices.forEach(function (v) {
      if (v.get('incomingEdges.length') < 1) {
        visitEdges.push({
          depth: 0,
          parent: null,
          toVertex: v
        });
      }
    });
    function getNodeFromEdge(edgeObj) {
      var vertex = edgeObj.toVertex;
      var pName = edgeObj.parent ? edgeObj.parent.name : null;
      var cName = edgeObj.toVertex ? edgeObj.toVertex.get('name') : null;
      if (edgeObj.parent && edgeObj.depth < edgeObj.parent.depth + 1) {
        edgeObj.depth = edgeObj.parent.depth + 1;
      }
      var node = vertexIdToNode[vertex.get('id')];
      for (var k = depthToNodes.length; k <= edgeObj.depth; k++) {
        depthToNodes.push([]);
      }
      if (!node) {
        // New node
        node = {
          id: vertex.get('id'),
          name: vertex.get('name'),
          state: vertex.get('state'),
          type: vertex.get('type'),
          operations: vertex.get('operations'),
          depth: edgeObj.depth,
          parents: [],
          children: [],
          x: 0,
          y: 0,
          metricType: null,
          metricDisplay: null,
          metricPercent: -1,
          selected: selectedVertex != null ? selectedVertex.get('id') == vertex.get('id') : false,
          fixed: true,
          metrics: {
            input: -1,
            output: -1,
            recordsRead: -1,
            recordsWrite: -1,
            tezTasks: -1
          },
          duration: vertex.get('duration')
        };
        if (node.duration < minVertexDuration && node.duration > 0) {
          minVertexDuration = node.duration;
        }
        if (node.duration > maxVertexDuration && node.duration > 0) {
          maxVertexDuration = node.duration;
        }
        vertexIdToNode[vertex.get('id')] = node;
        depthToNodes[node.depth].push(node);
      } else {
        // Existing node
        if (edgeObj.depth > node.depth) {
          function moveNodeToDepth(node, newDepth) {
            var oldIndex = depthToNodes[node.depth].indexOf(node);
            depthToNodes[node.depth].splice(oldIndex, 1);
            node.depth = newDepth;
            if (!depthToNodes[node.depth]) {
              depthToNodes[node.depth] = [];
            }
            depthToNodes[node.depth].push(node);
            if (node.children) {
              // Move children down depth
              node.children.forEach(function (c) {
                moveNodeToDepth(c, node.depth + 1);
              })
            }
          }

          moveNodeToDepth(node, edgeObj.depth);
        }
      }
      if (depthToNodes[node.depth].length > maxRowLength) {
        maxRowLength = depthToNodes[node.depth].length;
        maxRowDepth = node.depth;
      }
      if (edgeObj.parent != null) {
        node.parents.push(edgeObj.parent);
        edgeObj.parent.children.push(node);
      }
      return node;
    }

    var edgeObj;
    var visitedVertexMap = {};
    while (edgeObj = visitEdges.shift()) {
      var node = getNodeFromEdge(edgeObj);
      if (!visitedVertexMap[edgeObj.toVertex.get('id')]) {
        visitedVertexMap[edgeObj.toVertex.get('id')] = true;
        var outEdges = edgeObj.toVertex.get('outgoingEdges');
        outEdges.forEach(function (oe) {
          var childVertex = oe.get('toVertex');
          visitEdges.push({
            depth: node.depth + 1,
            parent: node,
            toVertex: childVertex
          });
        });
      }
    }
    edges.forEach(function (e) {
      dagVisualModel.links.push({
        source: vertexIdToNode[e.get('fromVertex.id')],
        target: vertexIdToNode[e.get('toVertex.id')],
        edgeType: e.get('edgeType')
      });
    });
    // Sort nodes so that parents stay together
    for (var depth = 0; depth < depthToNodes.length; depth++) {
      var nodes = depthToNodes[depth];
      nodes.sort(function (n1, n2) {
        var ck1 = '';
        var ck2 = '';
        if (n1.children) {
          n1.children.forEach(function (c) {
            ck1 += c.name;
          });
        }
        if (n2.children) {
          n2.children.forEach(function (c) {
            ck2 += c.name;
          });
        }
        if (ck1 < ck2) {
          return -1
        }
        if (ck1 > ck2) {
          return 1
        }
        return 0
      });
      depthToNodes[depth] = nodes;
    }

    //
    // LAYOUT - Now with correct depth, we calculate layouts
    //
    // When a node's effective width changes, all its parent nodes are updated.
    var updateNodeEffectiveWidth = function (node, newEffectiveWidth) {
      if (App.Helpers.number.validateInteger(node.effectiveWidth) != null) {
        node.effectiveWidth = newEffectiveWidth;
      }
      var diff = newEffectiveWidth - node.effectiveWidth;
      if (diff > 0) {
        var oldEffectiveWidth = node.effectiveWidth;
        node.effectiveWidth = newEffectiveWidth;
        if (node.parents != null) {
          node.parents.forEach(function (parent) {
            updateNodeEffectiveWidth(parent, parent.effectiveWidth + diff);
          })
        }
      }
    };
    var xGap = 20;
    var yGap = 70;
    var currentY = 40;
    // First pass - calculate layout widths, and Y coordinates
    for (var depth = 0; depth < depthToNodes.length; depth++) {
      var nodes = depthToNodes[depth];
      var maxNodeHeight = 0;
      for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        var node = nodes[nodeIndex];
        var nodeDim = this.getNodeCalculatedDimensions(node, minVertexDuration, maxVertexDuration);
        node.drawWidth = nodeDim.drawWidth;
        node.drawHeight = nodeDim.drawHeight;
        node.scale = nodeDim.scale;
        node.width = nodeDim.width;
        node.height = nodeDim.height;
        if (maxNodeHeight < node.height) {
          maxNodeHeight = node.height;
        }
        if (depth == 0) {
          // Top nodes - position uniformly
          updateNodeEffectiveWidth(node, xGap + node.width);
        }
        if (node.children && node.children.length > 0) {
          // There can be dedicated or shared children.
          // Dedicated children increase effective width of parent by their
          // width.
          // Shared children increase effective width of parent only by the
          // fraction of parentage
          var childrenWidth = 0;
          node.children.forEach(function (child) {
            var childDim = self.getNodeCalculatedDimensions(child, minVertexDuration, maxVertexDuration);
            childrenWidth += ((childDim.width + xGap) / child.parents.length);
          });
          updateNodeEffectiveWidth(node, Math.max(childrenWidth, (node.width + xGap)));
        } else {
          updateNodeEffectiveWidth(node, xGap + node.width);
        }
        node.y = currentY;
        node.incomingY = node.y;
        node.outgoingY = node.incomingY + node.height;
      }
      currentY += maxNodeHeight;
      currentY += yGap;
    }
    // Second pass - determine actual X coordinates
    var maxX = 0;
    for (var depth = 0; depth < depthToNodes.length; depth++) {
      var nodes = depthToNodes[depth];
      var currentX = -1;
      var parentCurrentXMap = {};
      for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        var node = nodes[nodeIndex];
        var parentsKey = null;
        if (node.parents != null && node.parents.length > 0) {
          var parentMidX = 0;
          var parentsKey = '';
          var childrenEffectiveWidth = -1;
          node.parents.forEach(function (parent) {
            parentMidX += (parent.x + (parent.width / 2));
            parentsKey += (parent.id + '//');
            if (childrenEffectiveWidth < 0) {
              parent.children.forEach(function (c) {
                childrenEffectiveWidth += (c.effectiveWidth);
              });
            }
          });
          parentMidX = parentMidX / node.parents.length;
          var parentCurrentX = parentCurrentXMap[parentsKey];
          if (parentCurrentX == null || parentCurrentX == undefined) {
            parentCurrentX = parentMidX - (childrenEffectiveWidth / 2);
            parentCurrentXMap[parentsKey] = parentCurrentX;
          }
          currentX = parentCurrentX;
        } else {
          if (currentX < 0) {
            currentX = 0;
          }
        }
        node.x = (currentX + (node.effectiveWidth - node.width) / 2);
        node.outgoingX = (node.x + node.width / 2);
        node.incomingX = node.outgoingX;
        dagVisualModel.nodes.push(node);
        if (parentsKey != null) {
          parentCurrentXMap[parentsKey] = currentX + node.effectiveWidth;
        } else {
          currentX += node.effectiveWidth;
        }
        if ((node.x + node.width) > maxX) {
          maxX = node.x + node.width;
        }
      }
    }
    var canvasHeight = currentY;
    var canvasWidth = maxX + (xGap << 1);

    //
    // Draw SVG
    //
    var force = d3.layout.force().nodes(dagVisualModel.nodes).links(dagVisualModel.links).start();
    var nodeDragData = {
      nodeRelativeX: 0,
      nodeRelativeY: 0
    };
    var nodeDrag = d3.behavior.drag().on('dragstart',function (node) {
      d3.event.sourceEvent.stopPropagation();
      var rc = d3.mouse(this);
      nodeDragData.nodeRelativeX = (rc[0] * node.scale);
      nodeDragData.nodeRelativeY = (rc[1] * node.scale);
    }).on('drag',function (node) {
        var nx = d3.event.x - nodeDragData.nodeRelativeX;
        var ny = d3.event.y - nodeDragData.nodeRelativeY;
        self.dragVertex(d3.select(this), node, [nx, ny], diagonal);
      }).on('dragend', function () {
        nodeDragData.nodeRelativeX = 0;
        nodeDragData.nodeRelativeY = 0;
      });
    // Create Links
    var diagonal = d3.svg.diagonal().source(function (d) {
      return {
        x: d.source.outgoingX,
        y: d.source.outgoingY
      };
    }).target(function (d) {
        return {
          x: d.target.incomingX,
          y: d.target.incomingY - 12
        }
      });
    var link = svgLayer.selectAll(".link-g").data(dagVisualModel.links).enter().append("g").attr("class", "link-g").attr("marker-end", "url(#arrow)");
    link.append("path").attr("class",function (l) {
      var classes = "link svg-tooltip ";
      if (l.edgeType) {
        classes += ("type-" + l.edgeType.toLowerCase() + " ");
      } else {
        classes += "type-unknown ";
      }
      return classes;
    }).attr("d", diagonal).attr("title", function (l) {
        var lower = l.edgeType ? l.edgeType.toLowerCase() : '';
        return Em.I18n.t("jobs.hive.tez.edge." + lower);
      });
    // Create Nodes
    var node = svgLayer.selectAll(".node").data(dagVisualModel.nodes).enter().append("g").attr("class", "node").call(nodeDrag);
    node.append("rect").attr("class", "background").attr("width",function (n) {
      return n.drawWidth;
    }).attr("height",function (n) {
        return n.drawHeight;
      }).attr("rx", "10").attr("filter", "url(#shadow)").on('mousedown', function (n) {
        //var vertex = App.TezDagVertex.find(n.id);
        var vertex = App.HiveJob.store.getById('tezDagVertex', n.id);
        if (vertex != null) {
          self.get('parentView').doSelectVertex(vertex, true);
        }
      });
    node.each(function (n) {
      var ops = n.operations;
      var opCount = {};
      if (ops != null && ops.length > 0) {
        var opGroups = d3.select(this).selectAll(".operation").data(ops).enter().append("g").attr("class", "operation").attr("transform",function (op, opIndex) {
          var row = Math.floor(opIndex / 3);
          var column = opIndex % 3;
          return "translate(" + (10 + column * 55) + "," + (37 + row * 20) + ")";
        }).attr("clip-path", "url(#operatorClipPath)").attr("opIndex",function (op) {
            if (!opCount[op]) {
              opCount[op] = 1;
            }
            else {
              opCount[op] = opCount[op] + 1;
            }
            return opCount[op];
          }).on('mouseover', function (op) {
            var template = self.createChildView(App.HoverOpTable, {
              content: {
                operationName: op,
                operatorPlanObj: self.createOperationPlanObj(n.name, op, this.getAttribute('opIndex'))
              }
            });
            $(this).find('.svg-tooltip').
              attr('title', template.renderToBuffer().string()).
              tooltip('fixTitle').tooltip('show');
          });

        opGroups.append("rect").attr("class", "operation svg-tooltip ").attr("width", "50").attr("height", "16");
        opGroups.append("text").attr("x", "2").attr("dy", "1em").text(function (op) {
          return op != null ? op.split(' ')[0] : '';
        });
      }
    });
    var metricNodes = node.append("g").attr("class", "metric").attr("transform", "translate(112,7)");
    metricNodes.append("rect").attr("width",function (n) {
      if (n.type == App.TezDagVertexType.UNION) {
        return 0;
      }
      return 60;
    }).attr("height",function (n) {
        if (n.type == App.TezDagVertexType.UNION) {
          return 0;
        }
        return 18;
      }).attr("rx", "3").attr("class", "metric-title svg-tooltip");
    metricNodes.append("text").attr("class", "metric-text").attr("x", "2").attr("dy", "1em");
    node.append("text").attr("x", "1.9em").attr("dy", "1.5em").text(function (d) {
      return d.name;
    });
    var iconContainer = node.append('g').attr('class', 'vertex-icon-container').attr('transform', 'translate(10,10)');
    iconContainer.append('rect').attr('width', '1em').attr('height', '1em').attr('class', 'vertex-icon-rect  svg-tooltip ');
    iconContainer.append('text').attr('dy', '10px').attr("font-family", "FontAwesome").attr('class', 'vertex-icon-text');
    node.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ") scale(" + d.scale + ") ";
    });
    this.vertexMetricsUpdated();
    $('.svg-tooltip').each(function () {
      var item = $(this);
      if (item.prop('tagName') == 'path') {
        item.hover(function (e) {
          var offset = $(this).offset();
          item.prop('offsetWidth', function () {
            return 2 * (e.pageX - offset.left);
          });
          item.prop('offsetHeight', function () {
            return 2 * (e.pageY - offset.top);
          });
        });
      }
      if (item.prop('offsetWidth') == undefined) {
        item.prop('offsetWidth', function () {
          return item.width();
        });
      }
      if (item.prop('offsetHeight') == undefined) {
        item.prop('offsetHeight', function () {
          return item.height();
        });
      }
    });
    App.tooltip($('.svg-tooltip'), {
      container: 'body',
      html: true,
      placement: 'bottom',
      template: '<div class="tooltip jobs-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // Position in center
    var translateX = Math.round((width - canvasWidth) / 2);
    if (translateX > 0) {
      svgLayer.attr("transform", "translate(" + translateX + ",0)");
    }
    return {
      width: canvasWidth,
      height: canvasHeight
    }
  },

  dragVertex: function (d3Vertex, node, newPosition, diagonal) {
    // Move vertex
    node.x = newPosition[0];
    node.y = newPosition[1];
    node.incomingX = newPosition[0] + (node.width / 2);
    node.incomingY = newPosition[1];
    node.outgoingX = newPosition[0] + (node.width / 2);
    node.outgoingY = newPosition[1] + node.height;
    d3Vertex.attr('transform', 'translate(' + newPosition[0] + ',' + newPosition[1] + ') scale(' + node.scale + ') ');
    // Move links
    d3.selectAll('.link').filter(function (l) {
      if (l && (l.source === node || l.target === node)) {
        return this
      }
      return null;
    }).attr('d', diagonal);
  },

  /**
   * Refreshes UI of the Tez graph with latest values
   * @method refreshGraphUI
   */
  refreshGraphUI: function () {
    var svgLayer = this.get('svgVerticesLayer');
    if (svgLayer != null) {
      var self = this,
        metricNodes = svgLayer.selectAll(".metric"),
        metricNodeTexts = svgLayer.selectAll(".metric-text"),
        metricNodeTitles = svgLayer.selectAll(".metric-title"),
        nodeBackgrounds = svgLayer.selectAll(".background"),
        vertexIconTexts = svgLayer.selectAll(".vertex-icon-text"),
        vertexIconRects = svgLayer.selectAll(".vertex-icon-rect");
      metricNodes.attr("class", function (node) {
        var classes = "metric ",
          percent = node.metricPercent;
        if (App.Helpers.number.validateInteger(percent) == null && percent >= 0) {
          if (percent <= 20) {
            classes += "heat-0-20 ";
          }
          else
            if (percent <= 40) {
              classes += "heat-20-40 ";
            }
            else
              if (percent <= 60) {
                classes += "heat-40-60 ";
              }
              else
                if (percent <= 80) {
                  classes += "heat-60-80 ";
                }
                else
                  if (percent <= 100) {
                    classes += "heat-80-100 ";
                  }
                  else {
                    classes += "heat-none";
                  }
        }
        else {
          classes += "heat-none";
        }
        return classes;
      });
      metricNodeTexts.text(function (node) {
        if (node.type == App.TezDagVertexType.UNION) {
          return '';
        }
        return node.metricDisplay;
      });
      metricNodeTitles.attr("title",function (node) {
        return node.metricType;
      }).attr("data-original-title", function (node) {
          return node.metricType;
        });
      nodeBackgrounds.attr("class", function (n) {
        var classes = "background ";
        if (n.type) {
          classes += (n.type.toLowerCase() + " ");
        } else {
          classes += "unknown-vertex-type ";
        }
        if (n.selected) {
          classes += "selected ";
        }
        return classes;
      });
      vertexIconRects.attr('title',function (node) {
        return App.Helpers.string.getCamelCase(node.state);
      }).attr('data-original-title', function (node) {
          return App.Helpers.string.getCamelCase(node.state);
        });
      vertexIconTexts.text(function (n) {
        return self.getVertexIcon(n)
      }).attr('class', function (n) {
          var classes = 'vertex-icon-text ';
          if (n.state != null) {
            if (n.state == App.TezDagVertexState.JOBFAILED) {
              classes += App.TezDagVertexState.FAILED.toLowerCase();
            }
            else {
              classes += n.state.toLowerCase();
            }
          }
          return classes;
        });
    }
  },

  /**
   * Get icon for vertex according to node state
   * @param {object} node
   * @returns {string}
   * @method getVertexIcon
   */
  getVertexIcon: function (node) {
    var icon = "";
    switch (node.state) {
      case App.TezDagVertexState.NEW:
        icon = '\uF10C'; //icon-circle-blank
      case App.TezDagVertexState.RUNNING:
      case App.TezDagVertexState.FAILED:
        icon = '\uF111'; //icon-circle
        break;
      case App.TezDagVertexState.SUCCEEDED:
        icon = '\uF00C'; //icon-ok
        break;
      case App.TezDagVertexState.KILLED:
      case App.TezDagVertexState.ERROR:
        icon = '\uF057'; //icon-remove-sign
        break;
      case App.TezDagVertexState.INITED:
      case App.TezDagVertexState.INITIALIZING:
      case App.TezDagVertexState.TERMINATING:
        icon = '\uF141'; //icon-ellipsis-horizontal
        break;
      case App.TezDagVertexState.JOBFAILED:
        icon = '\uF05C'; //icon-remove-circle
        break;
    }
    return icon;
  },

  /**
   * Determines the size of a node by taking into account its duration and
   * number of operations performed.
   *
   * @return {Object} Provides various metrics necessary in drawing a node.
   * <code>
   * {
   *  width: 360, // Scaled width of the node
   *  height: 80, // Scaled height of the node
   *  scale: 2, // Scale used on vertex dimensions. Quickest vertex is scaled to 1 and slowest vertex is scaled to 10.
   *  drawWidth: 180, // Width of actual drawing (that will be scaled)
   *  drawHeight: 40 // Height of actual drawing (that will be scaled)
   * }
   * </code>
   * @method getNodeCalculatedDimensions
   */
  getNodeCalculatedDimensions: function (node) {
    var size = {
      width: 180,
      height: 40,
      drawWidth: 180,
      drawHeight: 40,
      scale: 1
    };
    if (node.operations && node.operations.length > 0) {
      var opsHeight = Math.ceil(node.operations.length / 3);
      size.drawHeight += (opsHeight * 20);
    }
    size.width = size.drawWidth * size.scale;
    size.height = size.drawHeight * size.scale;
    return size;
  }

});

App.HoverOpTable = Em.View.extend({
  templateName: 'job/hover_op_table'
});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

App.JobView = Em.View.extend({

  templateName: 'job/job',

  selectedVertex: null,

  content: null,

  zoomScaleFrom: 1,

  zoomScaleTo: 2,

  zoomScale: 1,

  /**
   * Is query visible
   * @type {bool}
   */
  showQuery: false,

  /**
   * Current graph zoom
   * @type {number}
   */
  zoomStep: function () {
    var zoomStep = 0.01;
    var zoomFrom = this.get('zoomScaleFrom');
    var zoomTo = this.get('zoomScaleTo');
    if (zoomFrom < zoomTo) {
      zoomStep = (zoomTo - zoomFrom) / 5;
    }
    return zoomStep;
  }.property('zoomScaleFrom', 'zoomScaleTo'),

  /**
   * Is graph in maximum zoom
   * @type {bool}
   */
  isGraphMaximized: false,

  actions: {

    /**
     * Summary metric change handler
     * @param {string} summaryType
     * @method doSelectSummaryMetricType
     */
    doSelectSummaryMetricType: function (summaryType) {
      switch (summaryType) {
        case Em.I18n.t('jobs.hive.tez.metric.input'):
          summaryType = 'input';
          break;
        case Em.I18n.t('jobs.hive.tez.metric.output'):
          summaryType = 'output';
          break;
        case Em.I18n.t('jobs.hive.tez.metric.recordsRead'):
          summaryType = 'recordsRead';
          break;
        case Em.I18n.t('jobs.hive.tez.metric.recordsWrite'):
          summaryType = 'recordsWrite';
          break;
        case Em.I18n.t('jobs.hive.tez.metric.tezTasks'):
          summaryType = 'tezTasks';
          break;
        case Em.I18n.t('jobs.hive.tez.metric.spilledRecords'):
          summaryType = 'spilledRecords';
          break;
        default:
          break;
      }
      this.set('summaryMetricType', summaryType);
    },

    /**
     * "Show more/less" click handler
     * @method toggleShowQuery
     */
    toggleShowQuery: function () {
      this.toggleProperty('showQuery');
      var queryBlock = $('.query-info');
      if (this.get('showQuery')) {
        queryBlock.slideDown();
      }
      else {
        queryBlock.slideUp();
      }
    },

    /**
     * Click handler for vertex-name in the table of vertexes
     * @param {App.TezDagVertex} event
     * @param {bool} notTableClick
     * @method actionDoSelectVertex
     */
    actionDoSelectVertex: function (event, notTableClick) {
      this.doSelectVertex(event, notTableClick);
    },

    /**
     * Zoom-In click-handler
     * @method doGraphZoomIn
     */
    doGraphZoomIn: function () {
      var zoomTo = this.get('zoomScaleTo'),
        zoomScale = this.get('zoomScale'),
        zoomStep = this.get('zoomStep');
      if (zoomScale < zoomTo) {
        zoomScale += Math.min(zoomStep, (zoomTo - zoomScale));
        this.set('zoomScale', zoomScale);
      }
    },

    /**
     * Zoom-out click-handler
     * @method doGraphZoomOut
     */
    doGraphZoomOut: function () {
      var zoomFrom = this.get('zoomScaleFrom'),
        zoomScale = this.get('zoomScale'),
        zoomStep = this.get('zoomStep');
      if (zoomScale > zoomFrom) {
        zoomScale -= Math.min(zoomStep, (zoomScale - zoomFrom));
        this.set('zoomScale', zoomScale);
      }
    },

    /**
     * Maximize graph
     * @method doGraphMaximize
     */
    doGraphMaximize: function () {
      this.set('isGraphMaximized', true);
    },

    /**
     * Minimize graph
     * @method doGraphMinimize
     */
    doGraphMinimize: function () {
      this.set('isGraphMaximized', false);
    }

  },

  /**
   * "Show more/less"-message
   * @type {string}
   */
  toggleShowQueryText: function () {
    return this.get('showQuery') ? Em.I18n.t('jobs.hive.less') : Em.I18n.t('jobs.hive.more');
  }.property('showQuery'),

  /**
   * Current metric type in the metrics-type listbox
   * @type {string}
   */
  summaryMetricType: 'input',

  /**
   * List of available values for <code>summaryMetricType</code>
   * @type {string[]}
   */
  summaryMetricTypesDisplay: [
    Em.I18n.t('jobs.hive.tez.metric.input'),
    Em.I18n.t('jobs.hive.tez.metric.output'),
    Em.I18n.t('jobs.hive.tez.metric.recordsRead'),
    Em.I18n.t('jobs.hive.tez.metric.recordsWrite'),
    Em.I18n.t('jobs.hive.tez.metric.tezTasks'),
    Em.I18n.t('jobs.hive.tez.metric.spilledRecords')
  ],

  /**
   * Display-value for <code>summaryMetricType</code>
   * @type {string}
   */
  summaryMetricTypeDisplay: function () {
    return Em.I18n.t('jobs.hive.tez.metric.' + this.get('summaryMetricType'));
  }.property('summaryMetricType'),

  /**
   * List of sorted vertexes for current job
   * @type {App.TezDagVertex[]}
   */
  sortedVertices: function () {
    var sortColumn = this.get('controller.sortingColumn');
    if (sortColumn && sortColumn.get('status')) {
      var sortColumnStatus = sortColumn.get('status');
      var sorted = sortColumn.get('parentView').sort(sortColumn, sortColumnStatus === "sorting_desc", true);
      sortColumn.set('status', sortColumnStatus);
      return sorted;
    }
    var vertices = this.get('content.tezDag.vertices');
    if (vertices != null) {
      vertices = vertices.toArray();
    }
    return vertices;
  }.property('content.tezDag.vertices', 'controller.sortingColumn'),

  /**
   * When all data loaded in the controller, set <code>content</code>-value
   * @method initialDataLoaded
   */
  initialDataLoaded: function () {
    if (this.get('controller.loaded')) {
      this.set('content', this.get('controller.content'));
    }
  }.observes('controller.loaded'),

  /**
   * Set proper value to <code>isSelected</code> for each vertex
   * @method jobObserver
   */
  jobObserver: function () {
    var content = this.get('content'),
      selectedVertex = this.get('selectedVertex');
    if (selectedVertex == null && content != null) {
      var vertices = content.get('tezDag.vertices');
      if (vertices) {
        vertices.setEach('isSelected', false);
        this.doSelectVertex(vertices.objectAt(0), false);
      }
    }
  }.observes('selectedVertex', 'content.tezDag.vertices.@each.id'),

  /**
   * Set <code>selectedVertex</code>
   * @param {App.TezDagVertex} newVertex
   * @param {bool} notTableClick
   * @method doSelectVertex
   */
  doSelectVertex: function (newVertex, notTableClick) {
    var currentVertex = this.get('selectedVertex');
    if (currentVertex != null) {
      currentVertex.set('isSelected', false);
    }
    newVertex.set('notTableClick', !!notTableClick);
    newVertex.set('isSelected', true);
    this.set('selectedVertex', newVertex);
  },

  /**
   * {
   *  'file': {
   *    'read': {
   *      'ops': '100 reads',
   *      'bytes': '10 MB'
   *    }
   *    'write: {
   *      'ops': '200 writes',
   *      'bytes': '20 MB'
   *    }
   *  },
   *  'hdfs': {
   *    'read': {
   *      'ops': '100 reads',
   *      'bytes': '10 MB'
   *    }
   *    'write: {
   *      'ops': '200 writes',
   *      'bytes': '20 MB'
   *    }
   *  },
   *  'records': {
   *    'read': '100 records',
   *    'write': '123 records'
   *  },
   *  'started': 'Feb 12, 2014 10:30am',
   *  'ended': 'Feb 12, 2014 10:35am',
   *  'status': 'Running'
   * }
   */
  selectedVertexIODisplay: {},

  /**
   * Handler to call <code>selectedVertexIODisplayObs</code> once
   * @method selectedVertexIODisplayObsOnce
   */
  selectedVertexIODisplayObsOnce: function() {
    Em.run.once(this, 'selectedVertexIODisplayObs');
  }.observes(
      'selectedVertex.fileReadOps',
      'selectedVertex.fileWriteOps',
      'selectedVertex.hdfsReadOps',
      'selectedVertex.hdfdWriteOps',
      'selectedVertex.fileReadBytes',
      'selectedVertex.fileWriteBytes',
      'selectedVertex.hdfsReadBytes',
      'selectedVertex.hdfdWriteBytes',
      'selectedVertex.recordReadCount',
      'selectedVertex.recordWriteCount',
      'selectedVertex.status'
    ),

  /**
   * Provides display information for vertex I/O.
   * @method selectedVertexIODisplayObs
   */
  selectedVertexIODisplayObs: function () {
    var v = this.get('selectedVertex'),
      naString = Em.I18n.t('common.na'),
      status = App.Helpers.string.getCamelCase(v.getWithDefault('state', '')),
      fileReadOps = v.getWithDefault('fileReadOps', naString),
      fileWriteOps = v.getWithDefault('fileWriteOps', naString),
      hdfsReadOps = v.getWithDefault('hdfsReadOps', naString),
      hdfsWriteOps = v.getWithDefault('hdfsWriteOps', naString),
      r = {
      file: {
        read: {
          ops: Em.I18n.t('jobs.hive.tez.reads').fmt(fileReadOps),
          bytes: App.Helpers.number.bytesToSize(v.get('fileReadBytes'))
        },
        write: {
          ops: Em.I18n.t('jobs.hive.tez.writes').fmt(fileWriteOps),
          bytes: App.Helpers.number.bytesToSize(v.get('fileWriteBytes'))
        }
      },
      hdfs: {
        read: {
          ops: Em.I18n.t('jobs.hive.tez.reads').fmt(hdfsReadOps),
          bytes: App.Helpers.number.bytesToSize(v.get('hdfsReadBytes'))
        },
        write: {
          ops: Em.I18n.t('jobs.hive.tez.writes').fmt(hdfsWriteOps),
          bytes: App.Helpers.number.bytesToSize(v.get('hdfsWriteBytes'))
        }
      },
      records: {
        read: v.get('recordReadCount') == null ? null : Em.I18n.t('jobs.hive.tez.records.count').fmt(v.get('recordReadCount')),
        write: v.get('recordWriteCount') == null ? null : Em.I18n.t('jobs.hive.tez.records.count').fmt(v.get('recordWriteCount'))
      },
      started: v.get('startTime') ? App.Helpers.date.dateFormat(v.get('startTime'), true, true) : '',
      ended: v.get('endTime') ? App.Helpers.date.dateFormat(v.get('endTime'), true, true) : '',
      status: status
    };
    this.set('selectedVertexIODisplay', r);
  },

  /**
   * Stop updating job info when user navigate away from job's page
   * @method willDestroyElement
   */
  willDestroyElement: function() {
    this.get('controller').stop();
  },

  /**
   * Can graph be zoomed-in
   * @type {bool}
   */
  canGraphZoomIn: function () {
    return this.get('zoomScale') < this.get('zoomScaleTo');
  }.property('zoomScale', 'zoomScaleTo'),

  /**
   * Can graph be zoomed-out
   * @type {bool}
   */
  canGraphZoomOut: function () {
    return this.get('zoomScale') > this.get('zoomScaleFrom');
  }.property('zoomScale', 'zoomScaleFrom')

});

App.MainHiveJobDetailsVerticesTableView = App.TableView.extend({

  sortView: App.Sorts.wrapperView,

  didInsertElement: function () {
    if (!this.get('controller.sortingColumn')) {
      var columns = this.get('childViews')[0].get('childViews');
      if (columns && columns.findProperty('name', 'name')) {
        columns.findProperty('name', 'name').set('status', 'sorting_asc');
        this.get('controller').set('sortingColumn', columns.findProperty('name', 'name'))
      }
    }
  },

  nameSort: App.Sorts.fieldView.extend({
    column: 0,
    name: 'name',
    displayName: Em.I18n.t('common.name'),
    type: 'string'
  }),

  tasksSort: App.Sorts.fieldView.extend({
    column: 1,
    name: 'tasksNumber',
    displayName: Em.I18n.t('common.tasks'),
    type: 'number'
  }),

  inputSort: App.Sorts.fieldView.extend({
    column: 2,
    name: 'totalReadBytes',
    displayName: Em.I18n.t('apps.item.dag.input'),
    type: 'number'
  }),

  outputSort: App.Sorts.fieldView.extend({
    column: 3,
    name: 'totalWriteBytes',
    displayName: Em.I18n.t('apps.item.dag.output'),
    type: 'number'
  }),

  durationSort: App.Sorts.fieldView.extend({
    column: 4,
    name: 'duration',
    displayName: Em.I18n.t('apps.item.dag.duration'),
    type: 'number'
  })

});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.JobsCustomDatesSelectView = Em.View.extend({

  name: 'jobsCustomDatesSelectView',

  templateName: 'jobs/custom_date_popup',

  middayPeriodOptions: [Em.I18n.t('jobs.table.custom.date.am'), Em.I18n.t('jobs.table.custom.date.pm')],

  hourOptions: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],

  minuteOptions: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],

  didInsertElement: function () {
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy'
    });
  }
});


})();

(function() {

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.JobsView = App.TableView.extend({

  templateName: 'jobs',

  content: [],


  /**
   * If no jobs table rows to show.
   */
  noDataToShow: true,

  filterCondition:[],

  /**
   * If no jobs to display set noDataToShow to true, else set emptyData to false.
   * @method noDataToShowObserver
   */
  noDataToShowObserver: function () {
    this.set("noDataToShow", this.get("controller.content.length") === 0);
  }.observes("controller.content.length"),

  willInsertElement: function () {
    this._super();
    this.clearFilters();
    this.onApplyIdFilter();
    this.set('tableFilteringComplete', true);
  },

  didInsertElement: function () {
    if(!this.get('controller.sortingColumn')){
      var columns = this.get('childViews')[0].get('childViews');
      if(columns && columns.findProperty('name', 'startTime')){
        columns.findProperty('name','startTime').set('status', 'sorting_desc');
        this.get('controller').set('sortingColumn', columns.findProperty('name','startTime'))
      }
    }
  },

  /**
   * Handler for id-filter applying
   * @method onApplyIdFilter
   */
  onApplyIdFilter: function() {
    var isIdFilterApplied = this.get('controller.filterObject.isIdFilterApplied');
    this.get('childViews').forEach(function(childView) {
      if (childView['clearFilter'] && childView.get('column') != 1) {
        if(isIdFilterApplied){
          childView.clearFilter();
        }
        var childOfChild = childView.get('childViews')[0];
        if(childOfChild){
          Em.run.next(function() {
            childOfChild.set('disabled', isIdFilterApplied);
          })
        }
      }
    });
  }.observes('controller.filterObject.isIdFilterApplied'),

  /**
   * Save filter when filtering is complete
   * @method saveFilter
   */
  saveFilter: function () {
    if(this.get('tableFilteringComplete')){
      this.updateFilter(1, this.get('controller.filterObject.id'), 'string');
      this.updateFilter(2, this.get('controller.filterObject.user'), 'string');
      this.updateFilter(4, this.get('controller.filterObject.windowEnd'), 'date');
    }
  }.observes(
      'controller.filterObject.id',
      'controller.filterObject.user',
      'controller.filterObject.windowEnd'
    ),

  sortView: App.Sorts.wrapperView,

  idSort: App.Sorts.fieldView.extend({
    column: 1,
    name: 'id',
    displayName: Em.I18n.t('jobs.column.id'),
    type: 'string'
  }),

  userSort: App.Sorts.fieldView.extend({
    column: 2,
    name: 'user',
    displayName: Em.I18n.t('jobs.column.user'),
    type: 'string'
  }),

  startTimeSort: App.Sorts.fieldView.extend({
    column: 3,
    name: 'startTime',
    displayName: Em.I18n.t('jobs.column.start.time'),
    type: 'number'
  }),

  endTimeSort: App.Sorts.fieldView.extend({
    column: 4,
    name: 'endTime',
    displayName: Em.I18n.t('jobs.column.end.time'),
    type: 'number'
  }),

  durationSort: App.Sorts.fieldView.extend({
    column: 5,
    name: 'duration',
    displayName: Em.I18n.t('jobs.column.duration'),
    type: 'number'
  }),

  /**
   * Select View with list of "rows-per-page" options
   * @type {Ember.View}
   */
  rowsPerPageSelectView: Ember.Select.extend({
    content: ['10', '25', '50', '100', "250", "500"],
    valueBinding: "controller.filterObject.jobsLimit",
    attributeBindings: ['disabled'],
    disabled: false,
    disabledObserver: function () {
      this.set('disabled', !!this.get("parentView.hasBackLinks"));
    }.observes('parentView.hasBackLinks'),
    change: function () {
      this.get('controller').set('navIDs.nextID', '');
    }
  }),

  /**
   * return filtered number of all content number information displayed on the page footer bar
   * @returns {String}
   * @method filteredJobs
   */
  filteredJobs: function () {
    return Em.I18n.t('jobs.filtered.jobs').fmt(this.get('controller.content.length'));
  }.property('controller.content.length', 'controller.totalOfJobs'),

  /**
   * Manage tooltips for jobs
   * @method pageContentObserver
   */
  pageContentObserver: function () {
    if (!this.get('controller.loading')) {
      var tooltip = $('.tooltip');
      if (tooltip.length) {
        Ember.run.later(this, function() {
          if (tooltip.length > 1) {
            tooltip.first().remove();
          }
        }, 500);
      }
    }
  }.observes('controller.loading'),

  init: function() {
    this._super();
    App.tooltip($('body'), {
      selector: '[rel="tooltip"]'
    });
  },

  willDestroyElement : function() {
    $('.tooltip').remove();
  },

  /**
   * Filter-field for Jobs ID.
   * Based on <code>filters</code> library
   */
  jobsIdFilterView: App.Filters.createTextView({
    column: 1,
    showApply: true,
    setPropertyOnApply: 'controller.filterObject.id'
  }),

  /**
   * Filter-list for User.
   * Based on <code>filters</code> library
   */
  userFilterView: App.Filters.createTextView({
    column: 2,
    fieldType: 'input-small',
    showApply: true,
    setPropertyOnApply: 'controller.filterObject.user'
  }),

  /**
   * Filter-field for Start Time.
   * Based on <code>filters</code> library
   */
  startTimeFilterView: App.Filters.createSelectView({
    fieldType: 'input-120',
    column: 3,
    content: ['Any', 'Past 1 hour',  'Past 1 Day', 'Past 2 Days', 'Past 7 Days', 'Past 14 Days', 'Past 30 Days', 'Custom'],
    valueBinding: "controller.filterObject.startTime",
    onChangeValue: function () {
      this.get('parentView').updateFilter(this.get('column'), this.get('value'), 'date');
    }
  }),

  /**
   * View for job's name
   * @type {Em.View}
   */
  jobNameView: Em.View.extend({

    /**
     * Classname for link
     * @type {string}
     */
    isLink: 'is-not-link',

    /**
     * Update link-status (enabled/disabled) after sorting is complete
     */
    isLinkObserver: function () {
      this.refreshLinks();
    }.observes('controller.sortingDone'),

    /**
     * Update <code>isLink</code> according to <code>job.hasTezDag<code>
     * @method refreshLinks
     */
    refreshLinks: function () {
      this.set('isLink', this.get('job.hasTezDag') ? "" : "is-not-link");
    },

    templateName: 'jobs/jobs_name',

    /**
     * Click-handler.
     * Go to Jobs details page if current job has Tez Dag
     * @returns {null|boolean}
     */
    click: function() {
      if (this.get('job.hasTezDag')) {
        this.get('controller').transitionToRoute('job', this.get('job'));
      }
      return false;
    },

    didInsertElement: function () {
      this.refreshLinks();
    }
  }),

  /**
   * Associations between content (jobs list) property and column index
   * @type {string[]}
   */
  colPropAssoc: function () {
    var associations = [];
    associations[1] = 'id';
    associations[2] = 'user';
    associations[3] = 'startTime';
    associations[4] = 'endTime';
    return associations;
  }.property(),

  clearFilters: function() {
    this.get('childViews').forEach(function(childView) {
      if (childView['clearFilter']) {
        childView.clearFilter();
      }
    });
  },

  jobFailMessage: function() {
    return Em.I18n.t('jobs.table.job.fail');
  }.property(),

  /**
   * @type {Em.View}
   */
  jobsPaginationLeft: Ember.View.extend({
    tagName: 'a',
    templateName: 'table/navigation/pagination_left',
    classNameBindings: ['class'],
    class: function () {
      if (this.get("parentView.hasBackLinks") && !this.get('controller.filterObject.isAnyFilterApplied')) {
        return "paginate_previous";
      }
      return "paginate_disabled_previous";
    }.property('parentView.hasBackLinks', 'controller.filterObject.isAnyFilterApplied'),

    click: function () {
      if (this.get("parentView.hasBackLinks") && !this.get('controller.filterObject.isAnyFilterApplied')) {
        this.get('controller').navigateBack();
      }
    }
  }),

  /**
   * @type {Em.View}
   */
  jobsPaginationRight: Ember.View.extend({
    tagName: 'a',
    templateName: 'table/navigation/pagination_right',
    classNameBindings: ['class'],
    class: function () {
      if (this.get("parentView.hasNextJobs") && !this.get('controller.filterObject.isAnyFilterApplied')) {
        return "paginate_next";
      }
      return "paginate_disabled_next";
    }.property("parentView.hasNextJobs", 'controller.filterObject.isAnyFilterApplied'),

    click: function () {
      if (this.get("parentView.hasNextJobs") && !this.get('controller.filterObject.isAnyFilterApplied')) {
        this.get('controller').navigateNext();
      }
    }
  }),

  /**
   * Enable/disable "next"-arrow
   * @type {bool}
   */
  hasNextJobs: function() {
    return (this.get("controller.navIDs.nextID.length") > 1);
  }.property('controller.navIDs.nextID'),

  /**
   * Enable/disable "back"-arrow
   * @type {bool}
   */
  hasBackLinks: function() {
    return (this.get("controller.navIDs.backIDs").length > 1);
  }.property('controller.navIDs.backIDs.[].length')

});


})();