import m from 'mithril';
import Indent from './indent.model';

export default class Agenda {
    constructor(args) {
        //props
        this.title = m.prop(args.title || '');
        this.isEdit = m.prop(false);
        this.list = new Array();

        //init
        this.addListAll(args.list);
    }
    removeList(index) {
        return () => {
            this.list.splice(index, 1);
        };
    }
    addList(item) {
        this.list.push(new Indent(item));
    }
    addListAll(list = []) {
        list.map(item => this.addList(item));
    }
    toggleEdit() {
        this.isEdit(!this.isEdit());
    }
}
