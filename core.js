var http = require("http");
var wifi = require("Wifi");
var ssid = "webduino.io";
var pwd = "webduino";
var deviceID = "marty";

function Main() {
    this.btn = false;
    this.timer;
}

Main.prototype = {
    init: function(callback) {
        pinMode(12, 'output');
        pinMode(13, 'output');
        pinMode(15, 'output');
        digitalWrite(12, 0);
        digitalWrite(13, 0);
        digitalWrite(15, 0);
        this.connect(callback);
    },
    connect: function(callback) {
        var self = this;
        digitalWrite(15, 1);
        wifi.connect(ssid, { password: pwd },
            function(err) {
                digitalWrite(12, 0);
                digitalWrite(15, 0);
                self.scanBtn();
                callback();
            });
    },
    scanBtn: function() {
        var self = this;
        self.timer = setInterval(function() {
            if (digitalRead(4) == 0 && !self.btn) {
                digitalWrite(12, 0);
                digitalWrite(13, 1);
                console.log("update App...");
                self.btn = true;
                self.updateApp();
            }
        }, 1000)
    },
    updateApp: function() {
        var self = this;
        http.get("http://webduino.tw/app/" + deviceID + "/app.js", function(res) {
            var all = res.headers['Content-Length'];
            var len = 0;
            var str = '';
            res.on('data', function(data) {
                len = len + data.length;
                str += data;
                if (len == all) {
                    clearInterval();
                    global.eval(str);
                    self.btn = false;
                    save();
                }
            });
        });
    }
};

E.on('init', function() {
    console.log("start...");
    try {
        run();
    } catch (e) {
        console.log('error', e);
    }
    new Main().init(function() {
        console.log("WiFi connected.");
    });
});

function run() {
    console.log("First run");
}