'use strict';

var router = require('express').Router(),
    validator = require('validator'),
    fs = require('fs'),
    uuid = require('node-uuid'),
    minutesDirName = './.minutes',
    cache = {};

exports.init = function(io) {

    fs.mkdir(minutesDirName, err => {
        if (err) {
            console.log(err);
        }
    });

    //
    //socket.io
    //議事録の新規作成
    /*
    新規作成フォームがら送れれてきたデータを
    形式整えてバックエンドへ転送
    */
    var minutesIo = io.of('/minutes/io');

    minutesIo.on('connection', function(socket) {

        console.log('connection:' + socket.client.conn.server.clientsCount);

        socket.on('init', function(data) {
            try {
                // if (!validator.isUUID(data.minutes_id, 4)) {
                //     throw new Error('minutes_id != uuid ver4');
                // }
                console.log('<= initDataGet: on');
                socket.join(data.minutes_id, function(err) {
                    if (err) {
                        throw err;
                    }
                });
                if(cache[data.minutes_id] === undefined) {
                    if(!data.minutes) {
                        const file =  minutesDirName + '/' + data.minutes_id + '.json';
                        fs.readFile(file, (err, resolt) => {
                            if(err) {
                                throw err;
                            } else {
                                if (validator.isJSON(resolt)) {
                                    cache[data.minutes_id] = resolt;
                                    socket.emit('update_serve', {minutes: cache[data.minutes_id]});
                                    console.log('=> update_serve: emit');
                                } else {
                                    throw new Error('data.minutes != JSON');
                                }
                            }
                        });
                    } else {
                        if (validator.isJSON(data.minutes)) {
                            cache[data.minutes_id] = data.minutes;
                        } else {
                            throw new Error('data.minutes != JSON');
                        }
                    }
                } else {
                    if (validator.isJSON(cache[data.minutes_id])) {
                        socket.emit('update_serve', {minutes: cache[data.minutes_id]});
                        console.log('=> update_serve: emit');
                    } else {
                        throw new Error('data.minutes != JSON');
                    }
                }
            } catch (e) {
                console.log(e);
                socket.emit('update_serve', {minutes: "{}", error: e});
            }
        });

        /*
        * 更新イベントの待受
        */
        socket.on('update_client', function(data) {

            /*
            * 更新イベントにより取得したデータをキャッシュへ入れる
            */
            try {
                if (!validator.isUUID(data.minutes_id, 4)) {
                    throw new Error('data.minutes != UUID.v4');
                }

                cache[data.minutes_id] = data.minutes;
                console.log('<= update_client: on');
                /*
                * 接続中のブラウザへ更新内容の発信
                */
                socket.broadcast.emit('update_serve', {minutes: cache[data.minutes_id]});
                console.log('=> update_serve: emit');
            } catch (e) {
                console.log(e);

            }
        });

        /*
        * 接続出来なくなったら、接続情報を削除
        */
        // socket.on('disconnect', function(data) {
        //     console.log('disconnect:' + socket.client.conn.server.clientsCount);
        // });
    });
    router.post('/new', function(req, res) {
        try {
            const file =  minutesDirName + '/' + req.body.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            console.log(file);
            console.log(data);
            fs.writeFile(file, data, err => {
                if(err) {
                   throw err;
                } else {
                    res.send(data);
                }
            });
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    });

    router.post('/update', function(req, res) {
        try {
            if(!validator.isUUID(req.body.minutes.minutes_id)) {
                throw new Error('not uuid v4');
            }
            const file =  minutesDirName + '/' + req.body.minutes.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            console.log(data);
            fs.writeFile(file, data, err => {
                if(err) {
                   throw err;
                } else {
                    res.send(data);
                }
            });
        } catch (e) {
            console.log(e);
            res.end();
        }
    });

    router.post('/delete', function(req, res) {
        try {
            if(!validator.isUUID(req.body.minutes.minutes_id)) {
                throw new Error('not UUID v4');
            }
            const file =  minutesDirName + '/' + req.body.minutes.minutes_id + '.json';
            fs.unlink(file, (err) => {
                if (err) {
                    throw err;
                } else {
                    res.send(req.body.minutes);
                }
            });
        } catch (e) {
            console.log(e);
            res.end();
        }
    });

    return router;
};
