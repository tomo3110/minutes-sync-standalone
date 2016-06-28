import m from 'mithril';
import moment from 'moment';

const mo = moment;

const MinutesTableItem = {
    controller: function(item) {
        this.clicked = function() {
            m.route(`/minutes/${item.minutes_id()}`);
        };
    },
    view(ctrl, item) {
        return <tr onclick={ctrl.clicked}>
            <td>{mo(item.day()).format('YYYY/MM/DD')}</td>
            <td>{`${mo(item.startTime()).format('hh:mm')} 〜 ${mo(item.endTime()).format('hh:mm')}`}</td>
            <td>{item.title()}</td>
            <td>{item.where()}</td>
            <td>公開中</td>
        </tr>;
    }
};

const MinutesTableHeader = {
    view(ctrl, item) {
        return <thead>
            <tr>
                <th>日付</th>
                <th>時間</th>
                <th>タイトル</th>
                <th>場所</th>
                <th></th>
            </tr>
        </thead>;
    }
}

const MinutesTableView = {
    view(ctrl, props) {
        return <table className='table table-hover table-condensed'>
            <MinutesTableHeader />
            <tbody>
                {props.list.map(item => {
                    return <MinutesTableItem
                        project_id={item.project_id}
                        minutes_id={item.minutes_id}
                        day={item.day}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        title={item.title}
                        where={item.where}
                        secretary={item.secretary}/>
                })}
            </tbody>
        </table>;
    }
};

export default MinutesTableView;
