import m from 'mithril';
import uuid from 'uuid';

import Jumbotron from '../../components/jumbotron.jsx';
import MinutesAddInput from '../../components/minutes.add.input.jsx';

export default class Top {
    view(ctrl) {
        return <div className='container-fluid'>
            <div className='row'>
                <Jumbotron
                    content=<MinutesAddInput  size='lg'/>
                    catchCopy={'会議だけでは何も生まない'}
                    text={[
                        <p>会議自体が仕事になっていませんか？</p>,
                        <p>あるべき姿の会議を取り戻しましょう。</p>
                    ]}/>
            </div>
        </div>;
    }
}
