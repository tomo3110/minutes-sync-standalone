import m from 'mithril';
import uuid from 'uuid';

import Jumbotron from '../../components/jumbotron.jsx';
import MinutesAddInput from '../../components/minutes.add.input.jsx';


const ItemView = {
    view(ctrl, item) {
        return <div className='item'>
            <section><img src='https://placehold.it/150x150'></img></section>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
        </div>;
    }
};

const ListView = {
    view(ctrl, props) {
        return <section>
            {props.list.map(item => <ItemView title={item.title} text={item.text}/>)}
        </section>;
    }
};

export default class Top {
    view(ctrl) {
        return <div className='container-top'>
            <div className='row'>
                <Jumbotron
                    content=<MinutesAddInput  size='lg'/>
                    catchCopy={'会議だけでは何も生まない'}
                    text={[
                        <p>会議自体が仕事になっていませんか？</p>,
                        <p>会議のあるべき姿を取り戻しましょう。</p>
                    ]}/>
                    <h2 className='characteristic'>特徴</h2>
                    <div className='mymarketing'>
                        <ListView list={[
                            {
                                title: '登録不要',
                                text: '煩わしいユーザー登録、パスワード入力などはありません。今すぐに使い始めることができます。'
                            },{
                                title: '議事録の高速同期',
                                text: 'どこから会議に参加しても同じ情報を瞬時にチームに共有します。余計な仕事をあなたにさせるつもりはありません。'
                            },{
                                title: 'モバイル対応',
                                text: 'いつでも、どこでも、会議に参加することができます。'
                            }
                        ]} />
                    </div>
            </div>
        </div>;
    }
}
