import m from 'mithril';


export const MinutesAgendaItem = {
    controller(item) {
        return {
            remove() {
                item.remove(item.index);
            }
        };
    },
    view(ctrl, item) {
        return  <section className='form-group'>
            <div className='input-group'>
                <span className='input-group-btn'>
                    <button className='btn btn-danger' onclick={ctrl.remove}>
                        削除
                    </button>
                </span>
                <input type='text'
                    className='form-control'
                    id={`list-${item.index}`}
                    value={item.title()}
                    oninput={m.withAttr('value', item.title)}/>
            </div>
        </section>;
    }
};


export const MinutesAgendaAdd = {
    controller: function(addItem) {
        const ctrl = this;
        this.newTitle = addItem.newTitle;
        this.add = function() {
            addItem.add();
        };
        this.keypressed = function(e) {
            if(e.keyCode === 13) {
                ctrl.add();
            }
        };
    },
    view(ctrl, addItem) {
        return <section className='input-group'>
            <span className='input-group-btn'>
                <button className='btn btn-success' onclick={ctrl.add}>
                    追加
                </button>
            </span>
            <input type='text'
                className='form-control'
                id='list-add'
                placeholder='新しい議案'
                onkeypress={ctrl.keypressed}
                value={ctrl.newTitle()}
                oninput={m.withAttr('value', ctrl.newTitle)}/>
        </section>;
    }
};

const MinutesAgendaList = {
    view(ctrl, agenda) {
        return <div className='content'>
            <h3>議案一覧</h3>
            <section className='form'>
                {agenda.data().agendaList.map((item, index) => {
                    return <MinutesAgendaItem
                        remove={agenda.remove}
                        index={index}
                        {...item} />
                })}
                <MinutesAgendaAdd newTitle={agenda.newTitle} add={agenda.add} />
            </section>
        </div>;
    }
};

export default MinutesAgendaList;
