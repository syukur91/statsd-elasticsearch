
var counters = function (key, value, ts, bucket) {
    var listKeys = key.split('.');
    var act = listKeys.slice(4, listKeys.length).join('.');
    bucket.push({
		"tnt": listKeys[0] || '',
		"ns": listKeys[1] || '',
		"grp":listKeys[2] || '',
		"tgt":listKeys[3] || '',
		"act":act || '',
		"val":value,
		"@timestamp": ts
	});
	return 1;
}

var timers = function (key, series, ts, bucket) {
    var listKeys = key.split('.');
    var act = listKeys.slice(4, listKeys.length).join('.');
    for (keyTimer in series) {
      bucket.push({
		"tnt": listKeys[0] || '',        
		"ns": listKeys[1] || '',
		"grp":listKeys[2] || '',
		"tgt":listKeys[3] || '',
		"act":act || '',
		"val":series[keyTimer],
		"@timestamp": ts
	 });
    }
	return series.length;
}

var timer_data = function (key, value, ts, bucket) {
    var listKeys = key.split('.');
    var act = listKeys.slice(4, listKeys.length).join('.');
    value["@timestamp"] = ts;
    value["tnt"]  = listKeys[0] || '';
    value["ns"]  = listKeys[1] || '';
    value["grp"] = listKeys[2] || '';
    value["tgt"] = listKeys[3] || '';
    value["act"] = act || '';
    if (value['histogram']) {
      for (var keyH in value['histogram']) {
        value[keyH] = value['histogram'][keyH];
      }
      delete value['histogram'];
    }
    bucket.push(value);
}

exports.counters   = counters;
exports.timers     = timers;
exports.timer_data = timer_data;
exports.gauges     = counters;
