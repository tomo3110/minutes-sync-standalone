import m from 'mithril';
import moment from 'moment';

const minutesAddForm = {
    view(ctrl, form) {
        return <section>
            <h3>新しく議事録を作る</h3>
            <hr/>
            <div className='container-fluid'>
                <form className='form-horizontal' style='margin: 1rem;'>
                    <section className='form-group'>
                        <label htmlFor='newProjectTitle' className='col-sm-2  control-label'>タイトル</label>
                        <div className='col-sm-10'>
                            <input type='text'
                                className='form-control'
                                name='newProjectTitle'
                                placeholder='タイトル'
                                value={form.newTitle()}
                                oninput={m.withAttr('value', form.newTitle)} />
                        </div>
                    </section>
                    <section className='form-group'>
                        <label htmlFor='newProjectText' className='col-sm-2  control-label'>日付</label>
                        <div className='col-sm-10'>
                            <input className='form-control'
                                type='text'
                                name='newDay'
                                value={form.newDay()}
                                oninput={m.withAttr('value', form.newDay)}/>
                        </div>
                    </section>
                    <section className='form-group'>
                        <label htmlFor='newProjectText' className='col-sm-2  control-label'>開始時間</label>
                        <div className='col-sm-10'>
                        <input className='form-control'
                            type='text'
                            name='newStartTime'
                            value={form.newStartTime()}
                            oninput={m.withAttr('value', form.newStartTime)}/>
                        </div>
                    </section>
                    <section className='form-group'>
                        <label htmlFor='newProjectText' className='col-sm-2  control-label'>終了時間</label>
                        <div className='col-sm-10'>
                        <input className='form-control'
                            type='text'
                            name='newEndTime'
                            value={form.newEndTime()}
                            oninput={m.withAttr('value', form.newEndTime)}/>
                        </div>
                    </section>
                    <section className='form-group'>
                        <label htmlFor='newProjectText' className='col-sm-2  control-label'>場所</label>
                        <div className='col-sm-10'>
                            <input type='text'
                                className='form-control'
                                name='newWhere'
                                placeholder='どこで'
                                oninput={m.withAttr('value', form.newWhere)}
                                value={form.newWhere()} />
                        </div>
                    </section>
                    <section class="form-group">
                        <div className='col-sm-offset-2 col-sm-10'>
                            <button className="btn btn-success" onclick={form.callback}>
                                議事録の新規登録
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </section>;
    }
};

export default minutesAddForm;
