import m from 'mithril';
import uuid from 'uuid';

import Jumbotron from '../../components/jumbotron.jsx';

export default class Top {
    constructor(vm) {
        this.controller = function() {
            const ctrl = this;
            this.newMinutesTitle = m.prop('');
            this.add = function() {
                const minutesId = uuid.v4();
                console.log(minutesId);
                vm.minutes.newMinutes({
                    title: ctrl.newMinutesTitle(),
                    minutes_id: minutesId
                });
                if(window.localStorage) {
                    window.localStorage.setItem('minutes_sync', JSON.stringify(vm.minutes.cache));
                }
                ctrl.newMinutesTitle('');
                m.route(`/minutes/${minutesId}`);
            };
            this.onkeyressed = function(e) {
                if(e.keyCode === 13) {
                    ctrl.add();
                }
            };
        }
    }
    view(ctrl) {
        return <div className='container-fluid'>
            <div className='row'>
                <Jumbotron
                    content=<section className='form-group'>
                        <div className='input-group'>
                            <input type='text'
                                className='form-control input-lg'
                                placeholder='あなたの会議の議題'
                                value={ctrl.newMinutesTitle()}
                                onkeypress={ctrl.onkeyressed}
                                oninput={m.withAttr('value', ctrl.newMinutesTitle)}/>
                            <span className='input-group-btn'>
                                <button type='text' className='btn btn-success btn-lg' onclick={ctrl.add}>
                                    議事録の作成
                                </button>
                            </span>
                        </div>
                    </section>
                    catchCopy={'会議だけでは何も生まない'}
                    text={[
                        <p>会議自体が仕事になっていませんか？</p>,
                        <p>あるべき姿の会議を取り戻しましょう。</p>
                    ]}/>
            </div>
        </div>;
    }
}
