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

        var movement = 10;
        var accX = Math.round(acceleration.x*10) / 10;
        var accY = Math.round(acceleration.y*10) / 10;

        var baseX = 100;
        var baseY = 150;

        var xA = (accX / 10) * movement;
        var yA = (accY / 10) * movement;

        var acelX = Math.round(acceleration.x);
        var acelY = Math.round(acceleration.y);
        var c = document.getElementById('myCanvas');
        var context = c.getContext('2d');
        var xPos = 0;
        var yPos = 0;


        document.getElementById("accx").innerHTML = 'Sumbu X: ' + Math.round(acceleration.x);
        document.getElementById("accy").innerHTML = 'Sumbu y: ' + Math.round(acceleration.y);
        document.getElementById("accz").innerHTML = 'Sumbu z: ' + Math.round(acceleration.z);
        document.getElementById("timestamp").innerHTML = 'timestamp: ' + acceleration.timestamp;


        document.getElementById("debug").innerHTML = 'Debug: '  + document.getElementById("bola").style.left +' '+ document.getElementById("bola").style.top;
        document.getElementById("debug2").innerHTML = 'Debug: '  + xA +' '+ yA;

        document.getElementById("bola").style.left = baseX + acelX+'px';
        document.getElementById("bola").style.top = baseY + acelY+'px';

        // make_base();
        //
        // function make_base()
        // {
        //     target = new Image();
        //     target.src = '../crosshair.png';
        //     target.onload = function(){
        //         context.drawImage(target, 0, 0);
        //     }
        // }


        target = new Image();
        target.src = '../crosshair.png';
        // target.onload = function(){
        //     context.drawImage(base_image, 0, 0);
        // }


        context.clearRect(0, 0, 240, 297);
        xPos += -1*(acelX * 1.5);
        yPos += (acelY * 1.5);
        context.drawImage(target, xPos, yPos);

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

        this.init();


        var options = { frequency: 100 };
        navigator.accelerometer.getCurrentAcceleration(this.onSuccess.bind(this), this.onError.bind(this));
        navigator.accelerometer.watchAcceleration(this.onSuccess.bind(this), this.onError.bind(this), options);
        document.getElementById("demo").innerHTML = "coba saja";
        // console.log("wimpy");

    },

    init: function () {
        console.log("hello");


        // var c = document.getElementById('myCanvas');
        // var context = c.getContext('2d');
        // var xPos = 0;
        // var yPos = 0;
        // target = new Image();
        // target.src = '../crosshair.png';
        // target.onload = function(){
        //     context.drawImage(target, 0, 0);
        // }




    }

};

app.initialize();