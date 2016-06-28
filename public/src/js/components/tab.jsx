import m from 'mithril';

const TabItem = {
    controller: function(item) {
        this.onclicked = function() {
            item.active(item.id);
        };
    },
    view(ctrl, item) {
        return <li className={(item.active() === item.id) ? 'active' : ''}>
            <a key={item.id} onclick={ctrl.onclicked}>
                {item.title}
            </a>
        </li>;
    }
};

export const TabList = {
    view(ctrl, props) {
        return <ol className='nav nav-tabs'>
            {props.list.map(item => <TabItem {...item} active={props.active}/>)}
        </ol>;
    }
};

const TabContentItem = {
    view(ctrl, item) {
        return <div
            className={(item.active() === item.id) ? 'tab-pane fade in active' : 'tab-pane fade'}
            id={item.id}>
            {item.content}
        </div>;
    }
};

export const TabContentList = {
    view(ctrl, props) {
        return <div className='tab-content'>
            {props.list.map(item => <TabContentItem {...item} active={props.active}/>)}
        </div>;
    }
};

const TabView = {
    controller: function(args) {
        this.active = m.prop(args.active);
    },
    view(ctrl, args) {
        return <div>
            <TabList list={args.list} active={ctrl.active}/>
            <TabContentList list={args.list} active={ctrl.active}/>
        </div>;
    }
};

export default TabView;
