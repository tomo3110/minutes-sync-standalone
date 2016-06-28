import m from 'mithril';
// import mo from 'moment';

const MinutesPanelItem = {
    controller: function (props) {
        this.clicked = function() {
            m.route(`/minutes/${props.minutes_id()}`);
        };
    },
    view(ctrl, props) {
        return <section className='panel panel-default projects__main' onclick={ctrl.clicked}>
            <div className="panel-body">
                <div className='panel-title'>{props.title()}</div>
                <div className='row'>
                    <div className='col-xs-3 col-sm-2 col-md-1' style='text-align: right;'>
                        <p>日付:</p>
                    </div>
                    <div className='col-xs-9 col-sm-10 col-md-11' style='text-align: left;'>
                        <p>{props.day()}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-3 col-sm-2 col-md-1' style='text-align: right;'>
                        <p>時間:</p>
                    </div>
                    <div className='col-xs-9 col-sm-10 col-md-11' style='text-align: left;'>
                        <p>{`${props.startTime()} 〜 ${props.endTime()}`}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-3 col-sm-2 col-md-1' style='text-align: right;'>
                        <p>場所:</p>
                    </div>
                    <div className='col-xs-9 col-sm-10 col-md-11' style='text-align: left;'>
                        <p>{props.where()}</p>
                    </div>
                </div>
            </div>
        </section>;
    }
};

const MinutesPanelView = {
    view(ctrl, args) {
        return <div className='container-fluid'>
            <section className='flux'>
                {(() => {
                    if(args.list.length > 0) {
                        return args.list.map(item => <MinutesPanelItem {...item}/>);
                    } else {
                        return <div>
                            <h4>議事録がありません</h4>
                            <p>新規登録をしましょう。</p>
                        </div>;
                    }
                })()}
            </section>
        </div>;
    }
};

export default MinutesPanelView;
