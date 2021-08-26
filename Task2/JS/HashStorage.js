function HashStorage() {
    var self = this;
    self.storage = {};
    self.addValue = function(key, value) {
        self.storage[key] = value;
    }
    self.getValue = function(key) {
        return self.storage[key];
    }
    self.deleteValue = function(key) {
        if (key in self.storage) {
            return delete self.storage[key];
        } else {
            return false;
        }
    }
    self.getKeys = function() {
        for (var key in self.storage) {
            return Object.keys(self.storage);
        }
    }
}