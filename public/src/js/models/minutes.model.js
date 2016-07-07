import m from 'mithril';
import Agenda from './agenda.model';

export default class Minutes {
    constructor(args) {
        //props
        this.objectId = m.prop(args.objectId || null);
        this.title = m.prop(args.title || '');
        this.minutes_id = m.prop(args.minutes_id || '');
        this.entryList = new Array();
        this.agendaList = new Array();
        this.secretary = m.prop(args.secretary || '');
        this.where = m.prop(args.where || '');
        this.day = m.prop(args.day || '');
        this.startTime = m.prop(args.startTime || '');
        this.endTime = m.prop(args.endTime || '');
        this.isSave = m.prop(args.isSave);

        //init
        this.addAgendaListAll(args.agendaList);
        this.addEntryListAll(args.entryList);
    }
    addAgendaList(item) {
        this.agendaList.push(new Agenda(item));
    }
    addAgendaListAll(list = []) {
        list.map(item => this.addAgendaList(item));
    }
    addEntryList(item) {
        const value = m.prop(item);
        this.entryList.push(value);
    }
    addEntryListAll(list = []) {
        list.map(item => this.addEntryList(item));
    }
    removeAgendaList(index) {
        console.log(index);
        this.agendaList.splice(index, 1);
    }
    removeEntryList(index) {
        this.entryList.splice(index, 1);
    }
}
