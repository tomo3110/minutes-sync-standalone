
// import 'babel-polyfill';
import 'bootstrap-sass/assets/javascripts/bootstrap/collapse';
import 'bootstrap-sass/assets/javascripts/bootstrap/transition';

import m from 'mithril';

import Header from './components/header.jsx';
import footer from './components/footer.jsx';

import Top from './pages/top/index.jsx';
import Minutes from './pages/minutes/index.jsx';
import MinutesList from './pages/minutesList/index.jsx';


import vm from './vm';


vm.minutes.init();

m.route(document.getElementById('main'), '/home', {
    '/home': new Top(),
    '/about': new Top(vm),
    '/minutes': new MinutesList(vm),
    '/minutes/:minutesId': new Minutes(vm.minutes),
    // '/howto': new MinutesList(),
});

/*
00ba01c7-79ba-44ff-9f7a-6ae86e0c3532
取得テスト用データ
取得に関して選べるのか動作テスト用です
*/

m.mount(document.getElementById('header'), {
    view(ctrl) {
        return <Header
            title='Nakuse the "that" !'
            list={[
                {
                    name: 'このサービスについて',
                    href: '/about',
                    isSignIn: false
                },{
                    name: '議事録一覧',
                    href: '/minutes',
                    isSignIn: false
                }
            ]}/>;
    }
});

//フッター
m.mount(document.getElementById('footer'), {
    controller() {},
    view() {
        return footer();
    }
});
