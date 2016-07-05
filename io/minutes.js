'use strict';

var router = require('express').Router(),
    validator = require('validator'),
    fs = require('fs'),
    uuid = require('node-uuid'),
    minutesDirName = './.minutes',
    cache = {};

exports.init = function(io) {

    fs.mkdir(minutesDirName, function(err) {
        try {
           if(err){
               throw err;
           }
        } catch (e) {
            console.log(e.message);
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
                if (!validator.isUUID(data.minutes_id, 4)) {
                    throw Error('minutes_id != uuid ver4');
                }
                console.log('<= initDataGet: on');
                socket.join(data.minutes_id, function(err) {
                    if (err) {
                        throw err;
                    }
                });
                if(cache[data.minutes_id] === undefined) {
                    if(!data.minutes) {
                        const file = './.minutes/' + data.minutes_id + '.json';
                        fs.readFile(file, 'utf8', function(err, sou) {
                            if(err) {
                                throw err;
                            } else {
                                if (validator.isJSON(sou)) {
                                    cache[data.minutes_id] = sou;
                                    socket.emit('update_serve', {minutes: cache[data.minutes_id]});
                                } else {
                                    throw Error('data.minutes != JSON');
                                }
                            }
                        });
                    } else {
                        if (validator.isJSON(data.minutes)) {
                            cache[data.minutes_id] = data.minutes;
                        } else {
                            throw Error('data.minutes != JSON');
                        }
                    }
                } else {
                    if (validator.isJSON(cache[data.minutes_id])) {
                        cache[data.minutes_id] = data.minutes;
                        socket.emit('update_serve', {minutes: cache[data.minutes_id]});
                    } else {
                        throw Error('data.minutes != JSON');
                    }
                    console.log('=> update_serve: emit');
                }
            } catch (e) {
                console.log(e);
            }
        });
        /*
        * 更新イベントの待受
        */
        socket.on('leaveroom', function(data) {
            try {
                if (!validator.isUUID(data.minutes_id, 4)) {
                    throw Error('minutes_id != uuid ver4');
                }
                socket.leave(data.minutes_id);
                console.log('leave connection:' + socket.client.conn.server.clientsCount);
            } catch (e) {
                console.log(e);
            }
        });

        socket.on('update_client', function(data) {

            /*
            * 更新イベントにより取得したデータをキャッシュへ入れる
            */
            try {
                if (!validator.isJSON(data.minutes)) {
                    throw Error('data.minutes != JSON');
                }
                if (!validator.isUUID(data.minutes_id, 4)) {
                    throw Error('data.minutes != UUID.v4');
                }
                if (!validator.isJSON(cache[data.minutes_id])) {
                    throw Error('data.minutes != UUID.v4');
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
    });
    router.post('/new', function(req, res) {
        try {
            if(!validator.isJSON(req.body.minutes) ) {
                throw Error('typeof not json');
            }
            const file = './.minutes/' + req.body.minutes.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            fs.writeFile(file, data, function(err) {
                if(err) {throw err;}
                res.end();
            });
        } catch (e) {
            console.log(e.message);
            res.end();
        }
    });

    router.post('/update', function(req, res) {
        try {
            if(!validator.isUUID(req.body.minutes.minutes_id)) {
                throw Error('not uuid v4');
                res.end();
            }
            const file = './.minutes/' + req.body.minutes.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            fs.writeFile(file, data, function(err, data) {
                if(err) {
                    console.log(err);
                    res.end();
                }
            });
        } catch (e) {
            console.log(e);
            res.end();
        }
    });

    router.post('/delete', function(req, res) {
        try {
            if(!validator.isJSON(req.body.minutes.minutes_id)) {
                throw Error('not JSON');
            }
            const file = './.minutes/' + req.body.minutes.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            fs.unlink(file,function(err) {
                if(err) throw err;
                res.end();
            });
        } catch (e) {
            console.log(e);
            res.end();
        }
    });

    return router;
};
