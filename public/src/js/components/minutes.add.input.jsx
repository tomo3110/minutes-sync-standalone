import m from 'mithril';
import uuid from 'uuid';
import vm from '../vm';

const MinutesAddInput = {
    controller: function(addMinutes) {
        const ctrl = this;
        this.newMinutesTitle = m.prop('');
        this.add = function() {
            if(ctrl.newMinutesTitle() === '') return false;
            const minutesId = uuid.v4();
            vm.minutes.newMinutes({
                title: ctrl.newMinutesTitle(),
                minutes_id: minutesId,
                isSave: true
            });
            ctrl.newMinutesTitle('');
            m.route(`/minutes/${minutesId}`);
        };
        this.onkeyressed = function(e) {
            if(e.keyCode === 13) {
                ctrl.add();
            }
        };
    },
    view(ctrl, addMinutes) {
        return <section className='form-group'>
            <div className='input-group'>
                <input type='text'
                    className={`form-control input-${addMinutes.size || 'sm'}`}
                    placeholder='あなたの会議の議題'
                    value={ctrl.newMinutesTitle()}
                    onkeypress={ctrl.onkeyressed}
                    oninput={m.withAttr('value', ctrl.newMinutesTitle)}/>
                <span className='input-group-btn'>
                    <button type='button' className={`btn btn-success btn-${addMinutes.size || 'sm'}`} onclick={ctrl.add}>
                        議事録の作成
                    </button>
                </span>
            </div>
        </section>;
    }
};

export default MinutesAddInput;
