function id3() {
    var i = {};

    i.entropy = function(data, attr) {
        var attr_freq = {}, len = data.length;
        data.map(function(d) {
            if (d[attr]) {
                attr_freq[d[attr]] = (attr_freq[d[attr]]) ?
                    (attr_freq[d[attr]] + 1) : 1;
            }
        });
        var attr_vals = [];
        for (var i in attr_freq) {
            attr_vals.push(attr_freq[i]);
        }
        return attr_vals.reduce(function(m, v) {
            return m + (-v / len) * Math.log(v / len, 2);
        }, 0);
    };

    i.gain = function(data, attr, target_attr) {
        var val_freq = {};
        data.map(function(d) {
            if (d[attr]) {
                val_freq[d[attr]] = (val_freq[d[attr]]) ?
                    (val_freq[d[attr]] + 1) : 1;
            }
        });
        var val_freq_sum = 0;
        for (var j in val_freq) {
            val_freq_sum += val_freq[j];
        }

        var subset_entropy = 0.0;

        // Calculate the sum of the entropy for each subset of records weighted
        // by their probability of occuring in the training set.
        Object.keys(val_freq).map(function(val) {
            val_prob = val_freq[val] / val_freq_sum;
            var data_subset = data.filter(function(d) {
                return d[attr] == val;
            });
            subset_entropy += val_prob * i.entropy(data_subset, attr)
        });

        // Subtract the entropy of the chosen attribute from the entropy of the
        // whole data set with respect to the target attribute (and return it)
        return i.entropy(data, target_attr) - subset_entropy;
    };

    return i;
}

module.exports = id3;
