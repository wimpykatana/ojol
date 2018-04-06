/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);


    },

    onSuccess: function(acceleration) {
        // alert('Acceleration X: ' + acceleration.x + '\n' +
        //     'Acceleration Y: ' + acceleration.y + '\n' +
        //     'Acceleration Z: ' + acceleration.z + '\n' +
        //     'Timestamp: '      + acceleration.timestamp + '\n');

        document.getElementById("accx").innerHTML = 'Sumbu X: ' + Math.round(acceleration.x);
        document.getElementById("accy").innerHTML = 'Sumbu y: ' + Math.round(acceleration.y);
        document.getElementById("accz").innerHTML = 'Sumbu z: ' + Math.round(acceleration.z);
    },

    onError: function() {
        // alert('onError!');
        document.getElementById("demo").innerHTML = "NOT SUPPORTED !!!";
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        // console.log("%c KABOOOMMMMM.....",
        //     "color: rgb(235, 50, 50); " +
        //     "font-size: 32px; font-family: 'Arial', sans-serif !important; font-weight: bold; font-style:italic");
        // navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);
        // navigator.accelerometer.getCurrentAcceleration(this.onSuccess.bind(this), this.onError.bind(this));

        var options = { frequency: 100 };
        navigator.accelerometer.getCurrentAcceleration(this.onSuccess.bind(this), this.onError.bind(this));
        navigator.accelerometer.watchAcceleration(this.onSuccess.bind(this), this.onError.bind(this), options);
        document.getElementById("demo").innerHTML = "coba saja";
        // console.log("wimpy");

    },

};

app.initialize();