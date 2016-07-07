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
            return vm.minutes.newMinutes({
                title: ctrl.newMinutesTitle(),
                minutes_id: minutesId,
                isSave: true
            }).then(resolt => {
                vm.minutes.cache[minutesId] = vm.minutes.jsonParse(resolt);
                window.localStorage.setItem('minutes_sync', JSON.stringify(vm.minutes.cache));
                ctrl.newMinutesTitle('');
                return resolt;
            }).then(resolt => {
                m.route(`/minutes/${minutesId}`);
                return resolt;
            });
        };
        this.onkeyressed = function(e) {
            if(e.keyCode === 13) {
                ctrl.add();
            }
        };
        this.config = function(element, init, context) {
            if(!init) {
                element.focus();
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
                    oninput={m.withAttr('value', ctrl.newMinutesTitle)}
                    config={ctrl.config}/>
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
