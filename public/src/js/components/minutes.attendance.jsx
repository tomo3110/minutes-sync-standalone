import m from 'mithril';

export const MinutesAttendanceItem = {
    controller(item) {
        return {
            remove() {
                item.removeAttendance(item.index);
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
                    value={item.value()}
                    oninput={m.withAttr('value', item.value)}/>
            </div>
        </section>;
    }
};

export const MinutesAttendanceAdd = {
    controller: function(addItem) {
        const ctrl = this;
        this.newEntry = m.prop('');
        this.add = function() {
            addItem.addAttendance(ctrl.newEntry());
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
                placeholder='新しい参加者'
                onkeypress={ctrl.keypressed}
                value={ctrl.newEntry()}
                oninput={m.withAttr('value', ctrl.newEntry)}/>
        </section>;
    }
};

const MinutesAttendance = {
    view(ctrl, attendance) {
        return <div className='content'>
            <h3>出席者一覧</h3>
            <section className='form'>
                {attendance.list.map((item, index) => <MinutesAttendanceItem
                    value={item}
                    index={index}
                    removeAttendance={attendance.removeAttendance} />)}
                <MinutesAttendanceAdd list={attendance.list} addAttendance={attendance.addAttendance} />
            </section>
        </div>;
    }
};

export default MinutesAttendance;
