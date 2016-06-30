import m from 'mithril';
import Agenda from './agenda.model';

export default class Minutes {
    constructor(args) {
        //props
        this.title = m.prop(args.title || '');
        this.minutes_id = m.prop(args.minutes_id || '');
        this.entryList = new Array();
        this.agendaList = new Array();
        this.secretary = m.prop(args.secretary || '');
        this.where = m.prop(args.where || '');
        this.day = m.prop(args.day || '');
        this.startTime = m.prop(args.startTime || '');
        this.endTime = m.prop(args.endTime || '');

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
        // console.dir(this.entryList);
    }
    addEntryListAll(list = []) {
        list.map(item => this.addEntryList(item));
    }
    removeEntryList(index) {
        this.entryList.splice(index, 1);
    }
}
