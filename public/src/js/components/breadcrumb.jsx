import m from 'mithril';

class BreadcrumbModel {
    constructor(item, index) {
        this.index = m.prop(index);
        this.title = m.prop(item.title);
        this.url = m.prop(item.url);
    }
}

const Breadcrumb = {
    controller: function(props) {
        this.add = function(item, index) {
            props.list.push(
                new BreadcrumbModel(
                    item,
                    index || props.list.length
                )
            );
        };
        this.remove = function(index) {
            if(index) {
                props.list.splice(index, 1);
            } else {
                props.list.pop();
            }
        };
        this.onunload = function() {
            props.list = new Array();
        };
    },
    view(ctrl, props) {
        return <ul className="breadcrumb">
            {props.list.map(item => {
                if(item.url === m.route()) {
                    return <li className="active">{item.title}</li>;
                } else {
                    return <li><a href={item.url}>{item.title}</a></li>;
                }
            })}
        </ul>;
    }
};

export default Breadcrumb;
