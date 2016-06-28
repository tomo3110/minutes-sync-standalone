import m from 'mithril';
import {IndentList, IndentAdd} from './indent.view.jsx';



const AgendaItem = {
    view(ctrl, item) {
        return <div className='row' key={`agenda-item-${item.key}`}>
            <div className='col-xs-12'>
                <h3>
                    {`${item.key + 1}. ${item.title()}`}
                    {/*<input type='text' className='agenda--item--input' value={item.title()} oninput={m.withAttr('value', item.title)}/>*/}
                </h3>
                <IndentList
                    id={`indent-modal-${item.key}`}
                    callback={item.callback}
                    list={item.list}
                    agendaIndex={item.key}
                    action={item.action}
                    removeChildren={item.removeList}
                    addIndentContent={item.addIndentContent}
                    addIndentSign={item.addIndentSign}/>
                <IndentAdd
                    modalId={`indent-modal-${item.key}`}
                    callback={item.callback}
                    agendaIndex={item.key}
                    indent={
                        typeof item.list[item.list.length - 1] !== 'undefined'
                        ? item.list[item.list.length - 1].indent
                        : m.prop(1)
                    }
                    />
                <hr/>
            </div>
        </div>;
    }
};

const AgendaAdd = {
    controller: function(addItem) {
        return {
            keyPressed: e => {
                if(e.keyCode === 13) {
                    addItem.callback();
                }
            }
        };
    },
    view(ctrl, addItem) {
        return <div key={addItem.key}>
            <h3>
                {`${addItem.agendaLength + 1}. `}
                <input value={addItem.addAgendaTitle()}
                    className='agenda--item--input'
                    placeholder='議題内容を入力'
                    oninput={m.withAttr('value', addItem.addAgendaTitle)}
                    onkeypress={ctrl.keyPressed}/>
            </h3>
        </div>;
    }
};

const AgendaView = {
    view(ctrl, props) {
        return <div>
            {props.agendaList.map((item, index) => {
                return <AgendaItem
                    callback={props.indentAdd}
                    indentSplice={props.indentSplice}
                    key={index}
                    agendaItem={item}
                    title={item.title}
                    list={item.list}
                    removeList={item.removeList}
                    action={props.action}
                    addIndentContent={props.addIndentContent}
                    addIndentSign={props.addIndentSign}/>;
            })}
            <AgendaAdd
                key='agend-add'
                agendaLength={props.agendaList.length}
                callback={props.agendaAdd}
                addAgendaTitle={props.addAgendaTitle}/>
        </div>;
    }
};

export default AgendaView;
