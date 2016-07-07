import 'bootstrap-sass/assets/javascripts/bootstrap/collapse';
import 'bootstrap-sass/assets/javascripts/bootstrap/transition';

import m from 'mithril';
import attachFastClick from 'fastclick';

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

import Top from './pages/top/index.jsx';
import Minutes from './pages/minutes/index.jsx';
import MinutesList from './pages/minutesList/index.jsx';


import vm from './vm';


vm.minutes.init();

attachFastClick(document.body);

m.route(document.getElementById('main'), '/home', {
    '/home': new Top(),
    '/minutes': new MinutesList(vm),
    '/minutes/:minutesId': new Minutes(vm.minutes),
});

/*
00ba01c7-79ba-44ff-9f7a-6ae86e0c3532
取得テスト用データ
取得に関して選べるのか動作テスト用です
*/

m.mount(document.getElementById('header'), {
    view(ctrl) {
        return <Header
            title='minutes-sync'
            version='v0.0.1'
            list={[
                {
                    name: '議事録一覧',
                    href: '/minutes',
                    isSignIn: false
                }
            ]}/>;
    }
});

//フッター
m.mount(document.getElementById('footer'), {
    view(ctrl) {
        return <Footer />;
    }
});
