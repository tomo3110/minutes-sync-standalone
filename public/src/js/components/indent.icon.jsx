import m from 'mithril';

const IndentIcon = {
    view(ctrl, props) {
        return <span className='indent--icon'>
            {(() => {
                switch (props.sign()) {
                    case 0: {
                        return '・';
                    }
                    case 1: {
                        return <i className='glyphicon glyphicon-ok-sign my-ok-icon' style='color: #2bc60b;'></i>;
                    }
                    case 2: {
                        return <i className='glyphicon glyphicon-question-sign my-imp-icon' style='color: #e2142d;'></i>;
                    }
                    case 3: {
                        return <i className='glyphicon glyphicon-info-sign my-info-icon' style='color: #e6a21e;'></i>;
                    }
                    default: {
                        return '・';
                    }
                }
            })()}
        </span>;
    }
}

export default IndentIcon;
