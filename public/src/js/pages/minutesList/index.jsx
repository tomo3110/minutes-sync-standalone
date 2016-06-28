import m from 'mithril';
import Minutes from '../../models/minutes.model';
import MinutesPanelView from '../../components/minutes.panel.jsx';
import MinutesAddForm from '../../components/minutes.add.form.jsx';
import TabView from '../../components/tab.jsx';

export default class MinutesList {
    constructor(vm) {
            this.controller = function() {
                this.list = Object.values(vm.minutes.cache).map(item => new Minutes(item)) || [];
                this.newTitle = vm.minutes.newTitle;
                this.newWhere = vm.minutes.newWhere;
                this.newDay = vm.minutes.newDay;
                this.newStartTime = vm.minutes.newStartTime;
                this.newEndTime = vm.minutes.newEndTime;
            };
    }
    view(ctrl) {
        return <div className='container-fluid'>
            <h2>議事録一覧</h2>
            <hr/>
            <ul className="breadcrumb">
                <li><a href='/top' config={m.route}>トップページ</a></li>
                <li className='active'>
                    議事録一覧
                </li>
            </ul>
            <hr/>
            <TabView active='minutesList' list={[
                {
                    id: 'minutesList',
                    title: '議事録一覧',
                    content: <MinutesPanelView list={ctrl.list}/>
                },{
                    id: 'newMinutes',
                    title: '新しく議事録を作る',
                    content: <MinutesAddForm
                        newTitle={ctrl.newTitle}
                        newWhere={ctrl.newWhere}
                        newDay={ctrl.newDay}
                        newStartTime={ctrl.newStartTime}
                        newEndTime={ctrl.newEndTime}/>
                }
            ]}/>
        </div>;
    }
}
