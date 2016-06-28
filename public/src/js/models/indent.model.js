import m from 'mithril';

export default class Indent {
    constructor(args) {
        this.indent = m.prop(args.indent || 1);
        this.sign = m.prop(args.sign || 0);
        this.content = m.prop(args.content || '');
        this.isEdit = m.prop(false);
        this.children = new Array();
        this.addChildrenAll(args.children);
    }
    addChildren(item) {
        this.children.push(new Indent(item));
    }
    addChildrenAll(list = []) {
        list.map(item => this.addChildren(item));
    }
    removeChildren(index) {
        return () => {
            this.list.splice(index, 1);
        };
    }
    indentIncrement() {
        if(this.indent() === 11) return;
        this.indent(this.indent() + 1);
    }
    indentDecrement() {
        if(this.indent() === 1) return ;
        this.indent(this.indent() - 1);
    }
    signOk() {
        if(this.sign() === 1) {
            this.sign(0);
        } else {
            this.sign(1);
        }
    }
    signTask() {
        if(this.sign() === 2) {
            this.sign(0);
        } else {
            this.sign(2);
        }
    }

    signImportant() {
        if(this.sign() === 3) {
            this.sign(0);
        } else {
            this.sign(3);
        }
    }

    toggleEdit() {
        m.startComputation();
        this.isEdit(!this.isEdit());
        m.endComputation();
    }
}
