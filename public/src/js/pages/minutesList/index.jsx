import m from 'mithril';
import Minutes from '../../models/minutes.model';
import MinutesPanelView from '../../components/minutes.panel.jsx';
import MinutesAddInput from '../../components/minutes.add.input.jsx';
import TabView from '../../components/tab.jsx';

function values(obj) {
    let resolte = new Array(),
        i = 0;
    for (let prop in obj) {
        resolte[i] = obj[prop];
        i++;
    }
    return resolte;
};

export default class MinutesList {
    constructor(vm) {
            this.controller = function() {
                this.list = values(vm.minutes.fetchAll()) || [];
                this.newTitle = vm.minutes.newTitle;
                this.newWhere = vm.minutes.newWhere;
                this.newDay = vm.minutes.newDay;
                this.newStartTime = vm.minutes.newStartTime;
                this.newEndTime = vm.minutes.newEndTime;
            };
    }
    view(ctrl) {
        return <div className='container-fluid'>
            <h2 className='pages-title'>議事録一覧</h2>
            <hr/>
            <section className='container-fluid'>
                <MinutesAddInput />
            </section>
            <MinutesPanelView list={ctrl.list}/>
        </div>;
    }
}
