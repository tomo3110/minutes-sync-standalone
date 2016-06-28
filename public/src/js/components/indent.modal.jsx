import m from 'mithril';
import ModalBase from './modal.base.jsx';
import vm from '../pages/minutes/vm';

const IndentModalBody = {
    controller: function(body) {
        this.signOkColor = function() {
            if(body.sign() === 1) {
                return '#2bc60b';
            } else {
                return '#000000';
            }
        };
        this.signTaskColor = function() {
            if(body.sign() === 2) {
                return '#e2142d';
            } else {
                return '#000000';
            }
        };
        this.signImportantColor = function() {
            if(body.sign() === 3) {
                return '#e6a21e';
            } else {
                return '#000000';
            }
        };
    },
    view(ctrl, body) {
        return <div className="modal-body">
            <div className="form-group">
                <label htmlFor="message-text" className="control-label">インデント:{body.indent()}</label>
                <textarea
                    className="form-control"
                    id={`${body.id}-textarea`}
                    value={body.content()}
                    oninput={m.withAttr('value', body.content)}
                    rows='10'></textarea>
            </div>
            <div className='row'>
                <section className='col-md-6' style='padding: 1rem;'>
                <div className='btn-group' role="group">
                    <button className='btn btn-default' onclick={body.callback.decrement}>
                        <i className='glyphicon glyphicon-arrow-left'></i>
                    </button>
                    <button className='btn btn-default' onclick={body.callback.increment}>
                        <i className='glyphicon glyphicon-arrow-right'></i>
                    </button>
                    <button className='btn btn-default' onclick={body.callback.remove}>
                        <i className='glyphicon glyphicon-remove'></i>
                    </button>
                    <button className='btn btn-default' onclick={body.callback.indentSplice}>
                        <i className='glyphicon glyphicon-arrow-down'></i>
                    </button>
                </div>
                </section>
                <section className='col-md-6' style='padding: 1rem;'>
                <div className='btn-group' role="group">
                    <button
                        className='btn btn-default'
                        onclick={body.callback.signOk}
                        style={`color: ${ctrl.signOkColor()}`}>
                        <i className='glyphicon glyphicon-ok-sign'></i>
                        決定
                    </button>
                    <button
                        className='btn btn-default'
                        onclick={body.callback.signImportant}
                        style={`color: ${ctrl.signImportantColor()}`}>
                        <i className='glyphicon glyphicon-info-sign'></i>
                        重要
                    </button>
                    <button
                        className='btn btn-default'
                        onclick={body.callback.signTask}
                        style={`color: ${ctrl.signTaskColor()}`}>
                        <i className='glyphicon glyphicon-question-sign'></i>
                        課題
                    </button>
                </div>
                </section>
            </div>
        </div>;
    }
};

const IndentModalFooter = {
    view(ctrl, footer) {
        return <div className="modal-footer">
            <button className='btn btn-default btn-block' onclick={footer.callback}>編集終了</button>
        </div>;
    }
};

const IndentEditModal = {
    controller: function(args) {
        return {
            indentIncrement: function() {
                args.indentItem.indentIncrement();
                vm.dataSync(m.route.param('minutesId'));
            },
            indentDecrement: function() {
                args.indentItem.indentDecrement();
                vm.dataSync(m.route.param('minutesId'));
            },
            signOk: function() {
                args.indentItem.signOk();
                vm.dataSync(m.route.param('minutesId'));
                args.callback();
            },
            signTask: function() {
                args.indentItem.signTask();
                vm.dataSync(m.route.param('minutesId'));
                args.callback();
            },
            signImportant: function() {
                args.indentItem.signImportant();
                vm.dataSync(m.route.param('minutesId'));
                args.callback();
            },
            indentSplice: function() {
                args.indentItem.addChildren({
                    content: '',
                    indent: args.indentItem.indent() + 1
                });
                vm.dataSync(m.route.param('minutesId'));
                args.callback();
            },
            remove: function() {
                args.removeChildren();
                vm.dataSync(m.route.param('minutesId'));
                args.callback();
            }
        };
    },
    view(ctrl, args) {//tabindex="-1" role="dialog"
        return <ModalBase
            id={args.id}
            callback={args.callback}
            content={[
                <IndentModalBody
                    id={args.id}
                    content={args.content}
                    indent={args.indent}
                    sign={args.sign}
                    callback={{
                        increment: ctrl.indentIncrement,
                        decrement: ctrl.indentDecrement,
                        signOk: ctrl.signOk,
                        signTask: ctrl.signTask,
                        signImportant: ctrl.signImportant,
                        indentSplice: ctrl.indentSplice,
                        remove: ctrl.remove
                    }}/>,
                    <IndentModalFooter callback={args.callback}/>
                ]}/>;
    }
}

export default IndentEditModal;
