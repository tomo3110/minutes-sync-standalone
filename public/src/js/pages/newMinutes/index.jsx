import m from 'mithril';

export default class MinutesList {
    constructor(vm) {
        this.controller = function() {
            return {
                signUpEmail: '',
                onclicked: function(e) {
                    e.preventDefault();
                    console.log('click');
                }
            };
        };
    }
    view(ctrl) {
        return <div className='container-fluid'>
            <h2>Sign Up Account</h2>
            <ul className="breadcrumb">
               <li><a href='/home' config={m.route}>Top</a></li>
               <li className='active'>Sign Up Account</li>
            </ul>
            <hr/>
            <div className='container'>
                <form className='form-horizontal'>
                    <section className='form-group'>
                        <label htmlFor='signUpEmail' className='col-sm-3 control-label'>Email</label>
                        <div className='col-sm-9'>
                          <input
                            type='email'
                            className='form-control'
                            id='signUpEmail'
                            placeholder='Email'
                            value=''
                            //oninput={m.withAttr('value', ctrl.signUpEmail)}
                             />
                        </div>
                    </section>
                    <section className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button type="submit" className="btn btn-success" onclick={ctrl.onclicked}>Sign Up</button>
                        </div>
                    </section>
                </form>
            </div>
        </div>;;
    }
}
