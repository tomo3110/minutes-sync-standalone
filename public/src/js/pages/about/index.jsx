import m from 'mithril';

export default class About {
    constructor(vm) {
        this.controller = function() {
        };
    }
    view(ctrl) {
        return <section className='container-fluid'>
            <h2 className='pages-title'>minutes-syncとは？</h2>
            <ol>
                <li>登録不要</li>
                <li>議事録の高速同期</li>
                <li>モバイル対応</li>
            </ol>
        </section>;;
    }
}
