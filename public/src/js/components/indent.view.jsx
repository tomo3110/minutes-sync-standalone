import m from 'mithril';
import IndentEditModal from './indent.modal.jsx';
import IndentIcon from './indent.icon.jsx';

const IndentItem = {
    controller: function(args) {
        const ctrl = this;
        this.close = function(e) {
            ctrl.isEdit(false);
        };
        this.open = function(e) {
            if(true) {
                ctrl.isEdit(true);
            }
        }
        this.isEdit = m.prop(false);
    },
    view(ctrl, args) {
        return <section>
            <div className='row'>
                <div className={`col-xs-${args.indent()} indent--item--blank`} onclick={ctrl.open}>
                    <IndentIcon sign={args.sign}/>
                </div>
                <div className={`col-xs-${12 - args.indent()} indent--item--content`}
                >
                    {(()=>{
                        if(ctrl.isEdit()) {
                            return <IndentEditModal
                                id={args.modalId}
                                indentItem={args.indentItem}
                                content={args.content}
                                indent={args.indent}
                                sign={args.sign}
                                removeChildren={args.removeChildren}
                                indentSplice={args.indentSplice}
                                callback={ctrl.close}/>;
                        }
                    })()}
                    <p className='indent--item--text' onclick={ctrl.open}>
                        {args.content() || 'タップして入力してください。'}
                    </p>
                </div>
            </div>
            <IndentList
                id={`${args.modalId}-${args.indentItem.key}`}
                callback={args.callback}
                list={args.children}
                removeChildren={args.indentItem.removeChildren}
                agendaIndex={args.agendaIndex}
                addIndentContent={args.addIndentContent}
                addIndentSign={args.addIndentSign}/>
        </section>;
    }
}

export const IndentAdd = {
    controller: function(addItem) {
        const ctrl = this;
        this.clicked = function() {
            console.log(addItem.agendaIndex);
            addItem.callback(addItem.agendaIndex);
        };
    },
    view(ctrl, addItem) {
        return <section className='row' key={`${addItem.modalId}-add`}>
            <div className={`col-xs-${addItem.indent()}`}></div>
            <div className={`col-xs-${12 - addItem.indent()}`}>
                <p className='indent--item--text__add' onclick={ctrl.clicked}>&#43;  追加する</p>
            </div>
        </section>;
    }
};

export const IndentList = {
    view(ctrl, props) {
        return <section className='indent__view--list'>
            {props.list.map((item, index) => <IndentItem
                modalId={`${props.id}-${index}`}
                indentIndex={index}
                agendaIndex={props.agendaIndex}
                callback={props.callback}
                removeChildren={props.removeChildren(index)}
                //
                indentItem={item}
                //
                indent={item.indent}
                content={item.content}
                sign={item.sign}
                children={item.children}
                isEdit={item.isEdit}
                //
                addIndentContent={props.addIndentContent}
                addIndentSign={props.addIndentSign}/>
            )}
        </section>;
    }
};
