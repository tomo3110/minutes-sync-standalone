var router = require('express').Router();
    uuid = require('node-uuid'),
    cache = {};

exports.init = function(io) {
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
                cache[data.minutes_id] = data.minutes;
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
            // socket.to(data.minutes_id).emit('update_serve', {minutes: JSON.parse(cache[data.minutes_id])});
            // minutesIo.to(data.minutes_id).emit('update_serve', {minutes: cache[data.minutes_id]});
            console.log('=> update_serve: emit');
        });

        /*
        * 接続出来なくなったら、接続情報を削除
        */
        socket.on('disconnect', function(socket) {
            console.log('disconnect');
        });
    });

    return router;
};
