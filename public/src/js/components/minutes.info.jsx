import m from 'mithril';
import moment from 'moment';

const MinutesInfo = {
    view(ctrl, info) {
        return <section>
            <div className='row'>
                <div className='col-xs-6'>
                    <p><b>日　付:　</b>{moment(info.day()).format('YYYY/MM/DD') || 'いつ？'}</p>
                    <p><b>場　所:　</b>{info.where() || 'どこで'}</p>
                </div>
                <div className='col-xs-6'>
                    <p><b>時　間:　</b>{`${info.startTime() || '開始'} 〜 ${info.endTime() || '終了'}`}</p>
                    <p><b>書　記:　</b>{info.secretary() || '誰が'}</p>
                </div>
            </div>
            <p><b>参加者:</b>
                {(() => {
                    if(info.entryList.length) {
                        return info.entryList.map(item =>  '　' + item());
                    } else {
                        return '　誰と一緒に';
                    }
                })()}
            </p>
        </section>;
    }
};

export default MinutesInfo;
