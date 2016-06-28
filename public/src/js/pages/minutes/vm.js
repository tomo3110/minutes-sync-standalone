import m from 'mithril';
import io from 'socket.io-client';
import Minutes from '../../models/minutes.model';

const minutes = {
    socket(minutesId) {
        //socket.ioクライアントセットアップ
        minutes.io = io('/minutes/io');

        //データ取得
        m.startComputation();
        // console.log(minutes.cache);
        minutes.data(new Minutes(minutes.cache[minutesId] || {}));
        minutes.io.emit('init', {
            minutes_id: minutesId,
            minutes: JSON.stringify(minutes.data)
        });
        m.endComputation();


        //更新されたサーバー上のキャッシュデータの待ち受け
        minutes.io.on('update_serve', data => {
            //取得したキャッシュデータをminutesにセット
            m.startComputation();
            console.log('update_serve: ');
            minutes.deferred(data).then(res => {
                minutes.data(new Minutes(JSON.parse(res.minutes)));
                m.endComputation();
            });
        });
    },
    deferred(data) {
        const d = m.deferred();
        d.resolve(data);
        return d.promise;
    },
    newMinutes(data) {
        if(minutes.cache[data.minutes_id]) return false;
        minutes.cache[data.minutes_id] = data;
    },
    addAgendaItem() {
        m.startComputation();
        minutes.data().addAgendaList({
            title: minutes.newAgendaTitle()
        });
        minutes.newAgendaTitle('');
        m.endComputation();
    },
    addIndentItem(agendaIndex, item) {
        m.startComputation();
        minutes.data().agendaList[agendaIndex].addList(item);
        minutes.newIndentContent('');
        m.endComputation();
    },
    addEntryItem(name = '') {
        minutes.data().addEntryList(name);
    },
    removeEntryItem(index) {
        if(index === undefined) return false;
        minutes.data().removeEntryList(index);
    },
    save(minutesId) {
        console.log(minutesId);
        if(window.localStorage) {
            minutes.cache[minutesId] = minutes.data();
            window.localStorage.setItem('minutes_sync', JSON.stringify(minutes.cache));
        }
    },
    fetch() {
        if(window.localStorage) {
            return JSON.parse(window.localStorage.getItem('minutes_sync'));
        }
    },
    dataSync(minutesId) {
        console.log('dataSync: ');
        minutes.io.emit('update_client', {
            minutes_id: minutesId,
            minutes: JSON.stringify(minutes.data)
        });
    },
    init() {
        //初期化処理

        //props
        minutes.cache = minutes.fetch() || {};
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
    }
}

export default minutes;
