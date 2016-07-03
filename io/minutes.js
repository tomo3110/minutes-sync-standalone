var router = require('express').Router();
    fs = require('fs'),
    uuid = require('node-uuid'),
    minutesDirName = './.minutes',
    cache = {};


exports.init = function(io) {

    fs.mkdir(minutesDirName, function(err) {
        if(err){
            console.log(err);
        };
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
            console.log('<= initDataGet: on');
            socket.join(data.minutes_id);
            if(cache[data.minutes_id] === undefined) {
                if(!data.minutes) {
                    const file = './.minutes/' + data.minutes_id + '.json';
                    fs.readFile(file, 'utf8', function(err, sou) {
                        if(err) {
                            console.log('err:' + err);
                        } else {
                            cache[data.minutes_id] = sou;
                            socket.emit('update_serve', {minutes: cache[data.minutes_id]});
                        }
                    });
                } else {
                    cache[data.minutes_id] = data.minutes;
                }
            } else {
                console.log('=> update_serve: emit');
                socket.emit('update_serve', {minutes: cache[data.minutes_id]});
            }
        });
        /*
        * 更新イベントの待受
        */
        socket.on('leaveroom', function(data) {
            socket.leave(data.minutes_id);
            console.log('leave connection:' + socket.client.conn.server.clientsCount);
        });

        socket.on('update_client', function(data) {

            /*
            * 更新イベントにより取得したデータをキャッシュへ入れる
            */
            cache[data.minutes_id] = data.minutes;
            console.log('<= update_client: on');
            /*
            * 接続中のブラウザへ更新内容の発信
            */
            socket.broadcast.emit('update_serve', {minutes: cache[data.minutes_id]});
            console.log('=> update_serve: emit');
        });

        /*
        * 接続出来なくなったら、接続情報を削除
        */
    });
    router.post('/new', function(req, res) {
        if(req.body.minutes) {
            const file = './.minutes/' + req.body.minutes.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            fs.writeFile(file, data, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    res.end();
                }
            });
        } else {
            res.end();
        }
    });

    router.post('/update', function(req, res) {
        if(req.body.minutes) {
            const file = './.minutes/' + req.body.minutes.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            fs.writeFile(file, data, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    res.end();
                }
            });
        } else {
            res.end();
        }
    });

    router.post('/delete', function(req, res) {
        if(req.body.minutes) {
            const file = './.minutes/' + req.body.minutes.minutes_id + '.json';
            const data = JSON.stringify(req.body.minutes);
            fs.unlink(file,function(err) {
                if(err) throw err;
                res.end();
            });
        } else {
            res.end();
        }
    });

    return router;
};
