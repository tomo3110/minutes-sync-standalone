import m from 'mithril';

import TabView from '../../components/tab.jsx';
import MinutesView from '../../components/minutes.content.jsx';
import MinutesShare from '../../components/minutes.share.jsx';
import MinutesAttendance from '../../components/minutes.attendance.jsx';
import MinutesSetting from '../../components/minutes.setting.jsx';

export default class Minutes {
    constructor(vm) {
        this.controller = function() {
            const minutesId = m.route.param('minutesId');
            vm.socket(minutesId);
            return {
                data: vm.data,
                newAgendaTitle: vm.newAgendaTitle,
                newIndentContent: vm.newIndentContent,
                newIndent: vm.newIndent,
                newSign: vm.newSign,
                isEditTitle: m.prop(false),
                agendaAdd() {
                    vm.addAgendaItem();
                    vm.dataSync(minutesId);
                },
                indentAdd(agendaIndex) {
                    vm.addIndentItem(agendaIndex, {
                        content: '',
                        indent: 1,
                        sign: 0
                    });
                    vm.dataSync(minutesId);
                },
                entryAdd(name = '') {
                    vm.addEntryItem(name);
                    vm.dataSync(minutesId);
                },
                entryRemove(index) {
                    vm.removeEntryItem(index);
                    vm.dataSync(minutesId);
                },
                update() {
                    vm.dataSync(minutesId);
                },
                toggleEditTitle() {
                    this.isEditTitle(!this.isEditTitle());
                },
                save() {
                    if(!vm.data().isSave()) return false;
                    vm.save(minutesId);
                },
                destroy() {
                    vm.data().isSave(false);
                    vm.destroy(minutesId);
                },
                onunload() {
                    this.save();
                }
            };
        }
    }
    view(ctrl) {
        return <div className='container-card'>
            <TabView active='minute-content' list={[
                {
                    id: 'minute-content',
                    title: '議事録',
                    content: <MinutesView
                        data={ctrl.data}
                        agendaAdd={ctrl.agendaAdd}
                        indentAdd={ctrl.indentAdd}
                        update={ctrl.update}
                        newAgendaTitle={ctrl.newAgendaTitle}
                        newIndentContent={ctrl.newIndentContent}
                        newIndent={ctrl.newIndent}
                        newSign={ctrl.newSign}/>
                },{
                    id: 'share-minutes',
                    title: '共有',
                    content: <MinutesShare
                        data={ctrl.data}
                        minutes_id={ctrl.data().minutes_id()}/>
                },{
                    id: 'attendance-minutes',
                    title: '出席管理',
                    content: <MinutesAttendance
                        list={ctrl.data().entryList}
                        addAttendance={ctrl.entryAdd}
                        removeAttendance={ctrl.entryRemove}/>
                },{
                    id: 'setting-minutes',
                    title: '設定・その他',
                    content: <MinutesSetting
                        data={ctrl.data}
                        update={ctrl.update}
                        save={ctrl.save}
                        destroy={ctrl.destroy}/>
                }
            ]}/>
        </div>;
    }
}
