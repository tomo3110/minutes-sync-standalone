import m from 'mithril';
/**
* フッター
* @return {Mithrui.Virtul.DOM}
*/
const Footer = {
    view(ctrl, view) {
        return <footer className='myfooter'>
            <hr/>
            <p>This app is <b>MIT LICENSE</b></p>
        </footer>;
    }
};

export default Footer;
