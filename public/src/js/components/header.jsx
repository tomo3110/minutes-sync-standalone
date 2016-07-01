import m from 'mithril';
/**
* ヘッダー
* @return {Mithrui.Virtul.DOM}
*/
const Header = {
    view(ctrl, args) {
        return <nav className='navbar navbar-default' >
            <div className='container-fluid myheader-in'>
                <div className='navbar-header myheader-main'>
                    <button
                        className='navbar-toggle collapsed'
                        data-toggle='collapse'
                        data-target='#bs-example-navbar-collapse-1'
                        aria-expanded='false'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <div className='navbar-brand mybrand'>
                        <a href='/' config={m.route}>{args.title}</a>
                    </div>
                </div>
                <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                    <ul className='nav navbar-nav'>
                        {
                            args.list.map(item => <HeaderItem {...item} />)
                        }
                    </ul>
                </div>
            </div>
        </nav>;
    }
};
/**
* ヘッダーの項目
* @param {{name: String, herf: String, active: Boolen}}
* @return {Mithrui.Virtul.DOM}
*/
const HeaderItem = {
    view(ctrl, item) {
        return <li className={(item.href === m.route()) ? 'active' : ''}>
            <a href={item.href || '#'} config={m.route}>{item.name}</a>
        </li>;
    }
};

export default Header;
