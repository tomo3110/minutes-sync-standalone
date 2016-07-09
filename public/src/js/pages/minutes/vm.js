import m from 'mithril';
import io from 'socket.io-client';
import Minutes from '../../models/minutes.model';
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

const docs = new PDFDocument;
const stream = docs.pipe(blobStream());
// docs.font('');

const minutes = {
    connection(minutesId) {
        //socket.ioクライアントセットアップ
        minutes.io = io('/minutes/io');

        //データ取得
        m.startComputation();
        minutes.data(new Minutes(minutes.cache[minutesId] || {}));
        minutes.io.emit('init', {
            minutes_id: minutesId,
            minutes: (minutes.cache[minutesId]) ? JSON.stringify(minutes.cache[minutesId]) : false
        });
        m.endComputation();


        //更新されたサーバー上のキャッシュデータの待ち受け
        minutes.io.on('update_serve', data => {
            //取得したキャッシュデータをminutesにセット
            m.startComputation();
            console.log('update_serve: ');
            minutes.data(new Minutes(JSON.parse(data.minutes)));
            m.endComputation();
        });

        stream.on('finish', () => {
            const blob = stream.toBlob('application/pdf');
            const url = stream.toBlobURL('application/pdf');
            window.open(url);
        });
    },
    deferred(data) {
        const d = m.deferred();
        d.resolve(data);
        return d.promise;
    },
    newMinutes(data) {
        if(minutes.cache[data.minutes_id]) return false;
        return minutes.request({
            cmd: 'new',
            minutes_id: data.minutes_id,
            minutes: data
        });
    },
    addAgendaItem() {
        m.startComputation();
        minutes.data().addAgendaList({
            title: minutes.newAgendaTitle()
        });
        minutes.newAgendaTitle('');
        m.endComputation();
    },
    removeAgendaItem(index) {
        if (index === undefined) return false;
        if (!typeof index === 'number') return false;
        minutes.data().removeAgendaList(index);
    },
    addIndentItem(agendaIndex, item) {
        m.startComputation();
        minutes.data().agendaList[agendaIndex].addList(item);
        minutes.newIndentContent('');
        m.endComputation();
    },
    addEntryItem(name = '') {
        if (!typeof name === 'string') return false;
        minutes.data().addEntryList(name);
    },
    removeEntryItem(index) {
        if(index === undefined) return false;
        if (!typeof index === 'number') return false;
        minutes.data().removeEntryList(index);
    },
    save(minutesId) {
        if(window.localStorage) {
            m.startComputation();
            return minutes.request({
                cmd: 'update',
                minutes: minutes.jsonParse(minutes.data())
            }).then(resolt => {
                minutes.cache[minutesId] = minutes.jsonParse(minutes.data());
                window.localStorage.setItem('minutes_sync', JSON.stringify(minutes.cache));
                return resolt;
            }).then(resolt => {
                m.endComputation();
                return resolt;
            });
        }
    },
    destroy(minutesId) {
        if(window.localStorage) {
            m.startComputation();
            return minutes.request({
                cmd: 'delete',
                minutes: minutes.jsonParse(minutes.data())
            }).then(resolt => {
                delete minutes.cache[minutesId];
                window.localStorage.setItem('minutes_sync', JSON.stringify(minutes.cache));
                return resolt;
            }).then(resolt => {
                m.endComputation();
                m.route('/minutes');
                return resolt;
            });
        }
    },
    fetchAll() {
        if(window.localStorage) {
            return JSON.parse(window.localStorage.getItem('minutes_sync'));
        }
    },
    dataSync(minutesId) {
        console.log('dataSync: ');
        minutes.io.emit('update_client', {
            minutes_id: minutesId,
            minutes: JSON.stringify(minutes.data())
        });
    },
    jsonParse(jsonData) {
        return JSON.parse(JSON.stringify(jsonData));
    },
    makePDF(data) {
        docs.fontSize(30)
            .text('こんにちは');
        docs.end();
    },
    request(data) {
        return m.request({
            method: 'POST',
            url: `${location.protocol}//${location.host}/api/v1/minutes/${data.cmd}`,
            data: {
                minutes_id: data.minutes_id || data.minutes.minutes_id,
                minutes: {
                    objectId: data.minutes.objectId,
                    minutes_id:  data.minutes.minutes_id,
                    title: data.minutes.title,
                    where: data.minutes.where || '',
                    day: data.minutes.day || '',
                    startTime: data.minutes.startTime || '',
                    endTime: data.minutes.endTime || '',
                    entryList: data.minutes.entryList || [],
                    agendaList: data.minutes.agendaList || [],
                    secretary: data.minutes.secretary || '',
                    isSave: (data.minutes.isSave === undefined) ? true : data.minutes.isSave
                }
            }
        });
    },
    disconnect(minutesId) {
        minutes.io.emit('disconnect', {
            minutes_id: minutesId
        });
    },
    init() {
        //初期化処理

        //props
        minutes.cache = minutes.fetchAll() || {};
        minutes.data = m.prop();
        minutes.newAgendaTitle = m.prop('');
        minutes.newIndentContent = m.prop('');
        minutes.newIndent = m.prop(1);
        minutes.newSign = m.prop(0);
        minutes.newTitle = m.prop('');
        minutes.newWhere = m.prop('');
        minutes.newDay = m.prop('');
        minutes.newStartTime = m.prop('');
        minutes.newEndTime = m.prop('');
        minutes.pdfData = m.prop();
    }
}

export default minutes;
