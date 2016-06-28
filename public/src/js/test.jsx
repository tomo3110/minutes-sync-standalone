import m from 'mithril';
import api from './api';
import vm from './vm';

const app = {};

app.models = {};
app.models.minutes = {
    Item(args) {
        this.project_id = m.prop(args.projects_id);
        this.minutes_id = m.prop(args.minutes_id);
        this.title = m.prop(args.title);
        this.where = m.prop(args.where);
        this.day = m.prop(args.day);
        this.secretary = m.prop(args.secretary);
        this.agenda = m.prop(args.agenda || []);
    },
    List: new Array()
};
app.index = {};
app.index.controller = function() {
    return {
        // msg: vm.msg,
        submit(e) {
            e.preventDefault();
            socket.emit('update_client', {msg: vm.msg()});
        }
    };
};
app.index.view = (ctrl) => {
    return <form>
        <h1>hallo, world!</h1>
        <br/>
        <input type='text' value={vm.msg()} oninput={m.withAttr('value',vm.msg)}/>
        <button className='btn btn-default' type='submit' onclick={ctrl.submit}>submit</button>
    </form>;
};

app.test = {};
app.test.controller = function controller() {
    return {
        testSubmit: function () {
            let rqData = {
                'title': '取得テスト用データ',
                'text': '取得に関して選べるのか動作テスト用です。',
                'make': new Date()
            };
            m.request({
                method: "POST",
                url: api.projects.new(),
                data: rqData
            }).then(function(data) {
                console.log(data);
            });
        },
        testRead: function () {
            m.request({
                method: "GET",
                url: api.projects.index()
            }).then(function(data) {
                console.log(data);
            });
        },
        testQuery: function (project_id) {
            m.request({
                method: "GET",
                url: api.projects.show(projects_id)
            }).then(function(data) {
                console.log(data);
            });
        },
        testUpdate: function (project_id) {
            m.request({
                method: "PUT",
                url: api.projects.update(project_id),
                data: {
                    title: '更新しました。',
                    text: 'テスト用のデータを更新しました。'
                }
            }).then(function(data) {
                console.log(data);
            });
        },
        testDelete: function (project_id) {
            m.request({
                method: "DELETE",
                url: api.projects.destroy(project_id),
                data: {
                    title: '更新しました。',
                    text: 'テスト用のデータを更新しました。'
                }
            }).then(function(data) {
                console.log(data);
            });
        }
    };
};
app.test.view = function view(ctrl) {
    return <div>
        <button className='btn btn-default' type='button' onclick={ctrl.testSubmit}>submit</button>
        <button className='btn btn-default' type='button' onclick={ctrl.testRead}>read</button>
        <button className='btn btn-default' type='button' onclick={() => ctrl.testQuery('00ba01c7-79ba-44ff-9f7a-6ae86e0c3532')}>query</button>
        <button className='btn btn-default' type='button' onclick={() => ctrl.testUpdate('00ba01c7-79ba-44ff-9f7a-6ae86e0c3532')}>update</button>
    </div>;
};

app.minutes = {};
app.minutes.controller = function() {
    return {
        // msg: vm.msg,
        submit(e) {
            e.preventDefault();
            socket.emit('update_client', {msg: vm.msg()});
        },
        add(e) {
            e.preventDefault();
            m.request({
                method: "POST",
                url: api.minutes.new(),
                data: {
                    project_id: '00ba01c7-79ba-44ff-9f7a-6ae86e0c3532',
                    title: 'テストの内容',
                    day: new Date(),
                    startTime: new Date(),
                    endTime: new Date(),
                    where: '4F会議室',
                    secretary: '田中 太郎',
                    agenda:  []
                }
            }).then(function(data) {
                console.log(data);
            });
        }
    };
};
app.minutes.view = function(ctrl) {
    return <form>
        <button className='btn btn-primary' type='submit' onclick={ctrl.submit}>submit</button>
        <button className='btn btn-default' type='submit' onclick={ctrl.add}>add</button>
        <a harf={'/minutes/' + '45cd76e6-c327-4e6f-9925-a9dbdd2379e3'} config={m.route}>go minutes show</a>
    </form>;
};

app.minutesShow = {};
app.minutesShow.controller = function() {
    // console.log(m.route.param());
    return {
        init: m.request({
            method: "GET",
            url: api.minutes.show(m.route.param('minutes_id'))
        }).then(function(data) {
            m.startComputation();
            console.log(data);
            console.log(m.route.param());
            vm.minutes(new app.models.minutes.Item(data));
            m.endComputation();
        }),
        submit(e) {
            e.preventDefault();
            minutesIo.emit('update_client', {minutes: vm.minutes()});
        },
        onunload() {
            socket.emit('disconnect');
        }
    };
};
app.minutesShow.view = ctrl => {
    return <form>
        <input type='text' value={vm.minutes().title()} oninput={m.withAttr('value', vm.minutes().title)}/>
        <br/>
        <input type='text' value={vm.minutes().project_id()} oninput={m.withAttr('value', vm.minutes().project_id)}/>
        <br/>
        <input type='text' value={vm.minutes().day()} oninput={m.withAttr('value', vm.minutes().day)}/>
        <br/>
        <input type='text' value={vm.minutes().secretary()} oninput={m.withAttr('value', vm.minutes().secretary)}/>
        <br/>
        <input type='text' value={vm.minutes().where()} oninput={m.withAttr('value', vm.minutes().where)}/>
        <br/>
        <button className='btn btn-default' onclick={ctrl.submit}>submit</button>
    </form>;
}

app.users = {};
app.users.controller = function() {
    var respon = {
        email: m.prop(''),
        password: m.prop(''),
        submit: function(e) {
            e.preventDefault();
            m.request({
                method: 'POST',
                url: api.users.signIn(),
                data: {
                    email: respon.email(),
                    password: respon.password()
                }
            }).then(function(data) {
                console.log(data);
            });
        },
        userCheck: function(e) {
            e.preventDefault();
            m.request({
                method: 'GET',
                url: api.users.index()
            }).then(function(data) {
                console.log(data);
            });
        },
        signCheck: function(e) {
            e.preventDefault();
            m.request({
                method: 'GET',
                url: api.users.signCheck()
            }).then(function(data) {
                console.log(data);
            });
        },
        logout: function(e) {
            e.preventDefault();
            m.request({
                method: 'GET',
                url: api.users.signOut()
            }).then(function(data) {
                console.log(data);
            });
        }
    };
    return respon;
};
app.users.view = ctrl => {
    return m('form', [
        m('input', {
            'type': 'email',
            'value': ctrl.email(),
            'oninput': m.withAttr('value', ctrl.email)
        }),
        m('input', {
            'type': 'password',
            'value': ctrl.password(),
            'oninput': m.withAttr('value', ctrl.password)
        }),
        m('button', {
            'onclick': ctrl.submit
        }, 'login'),
        m('button', {
            'onclick': ctrl.logout
        }, 'logout'),
        m('button', {
            'onclick': ctrl.userCheck
        }, 'crrentUser check'),
        m('button', {
            'type': 'button',
            'onclick': ctrl.signCheck
        }, 'sign check')
    ]);
};

export default app;
