import m from 'mithril';

export default class About {
    constructor(vm) {
        this.controller = function() {
        };
    }
    view(ctrl) {
        return <section className='container'>
            <h2 className='pages-title'>minutes-syncとは？</h2>
            <p>議事録の管理で消耗している人の力になるべく製作・運営されています。</p>
            <section className='container-fluid-card'>
                <div className='col-sm-3'>
                    <p style='text-align: center;'><img style='width: 150px;height: 150px;' src='/asset/imgs/minutes.img5.png'></img></p>
                </div>
                <div className='col-sm-9'>
                    <section className=''>
                        テスト
                    </section>
                </div>
            </section>
            <br/>
            <section className='container-fluid-card'>
                <div className='col-sm-3'>
                    <p style='text-align: center;'><img style='width: 150px;height: 150px;' src='/asset/imgs/minutes.img3.png'></img></p>
                </div>
                <div className='col-sm-9'>
                    <section className=''>
                        テスト
                    </section>
                </div>
            </section>
            <br/>
            <section className='container-fluid-card'>
                <div className='col-sm-3'>
                    <p style='text-align: center;'><img style='width: 150px;height: 150px;' src='/asset/imgs/minutes.img2.png'></img></p>
                </div>
                <div className='col-sm-9'>
                    <section className=''>
                        テスト
                    </section>
                </div>
            </section>

        </section>;
    }
}
