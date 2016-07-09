'use strict';

var router = require('express').Router(),
    validator = require('validator'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    uuid = require('node-uuid'),
    minutesDirName = './minutes',
    Schema = mongoose.Schema,
    cache = {};

exports.init = function(io) {

    /**
    * mongodb Minutes Schema
    */
    var MinutesSchema = new Schema({
        minutes_id: {type: String, required: true },
        title:      {type: String, required: true },
        where:      {type: String },
        day:        {type: String },
        startTime:  {type: String },
        endTime:    {type: String },
        entryList:  {type: Array, default: [] },
        agendaList: {type: Array, default: [] },
        secretary:  {type: String },
        isSave:     {type: Boolean, default: true }
    });

    /**
    * mongodb Minutes Model
    */
    var Minutes = mongoose.model('Minutes', MinutesSchema);

    /**
    * mongodb connection
    */
    mongoose.connect('mongodb://' + process.env.APP_DOMAIN + '/sample_db');

    /**
    + mongodb test find all
    */
    Minutes.find({}, function(err, docs) {
        console.log(docs);
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
                    throw new Error('minutes_id != uuid ver4');
                }
                console.log('<= initDataGet: on');
                socket.join(data.minutes_id, function(err) {
                    if (err) {
                        throw err;
                    }
                });
                if(cache[data.minutes_id] === undefined) {
                    if(!data.minutes) {
                        Minutes.find({
                            minutes_id: data.minutes_id
                        }, function(err, docs) {
                            if(err) {
                                throw err;
                            } else {
                                const resolt = JSON.stringify(docs[0]);
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
                if (!validator.isJSON(data.minutes)) {
                    throw new Error('data.minutes != JSON');
                }
                if (!validator.isUUID(data.minutes_id, 4)) {
                    throw new Error('data.minutes != UUID.v4');
                }
                if (!validator.isJSON(cache[data.minutes_id])) {
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
            const minutes = new Minutes(req.body.minutes);
            minutes.save(function(err) {
                if(err) {
                   throw err;
                } else {
                    res.send(JSON.stringify(req.body.minutes));
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
            Minutes.update({
                minutes_id: req.body.minutes.minutes_id
            }, {
                $set: req.body.minutes
            },{
                upsert: false, multi: true
            }, function(err) {
                if(err) {
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

    router.post('/delete', function(req, res) {
        try {
            if(!validator.isUUID(req.body.minutes.minutes_id)) {
                throw new Error('not UUID v4');
            }
            Minutes.remove({
                minutes_id: req.body.minutes.minutes_id
            }, function(err) {
                if(err) {
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
