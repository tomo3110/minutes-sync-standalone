import m from 'mithril';
import $ from 'jquery';
import Clipboard from 'clipboard';
import pdfMake from 'pdfmake';
import 'jquery-qrcode';

const border = '------------------------------------------------------------------------------------------------------';
const nl = '\n';
const tb = '\t';

function setIndet(indent) {
    let resolte = '';
    for (var i = 0; i < indent; i++) {
        resolte += tb;
    }
    return resolte;
};

function setSign(sign) {
    switch (sign) {
        case 0: {
            return '';
        }
        case 1: {
            return '【決定】';
        }
        case 2: {
            return '【課題】';
        }
        case 3: {
            return '【重要】';
        }
        default: {
            return '';
        }
    }
};

function indentParse(list = [], liSign = "− ") {
    let resolte = '';
    for (var i = 0; i < list.length; i++) {
        resolte += setIndet(list[i].indent) + liSign + list[i].content + setSign(list[i].sign) + nl
        + indentParse(list[i].children);
    }
    return resolte;
};

function agendaParse(list = []) {
    let resolte = '';
    for (var i = 0; i < list.length; i++) {
        resolte += `${i + 1}. ${list[i].title}` + nl
        + indentParse(list[i].list, '・') + nl;
    }
    return resolte;
};

function minutesParse(data) {
    return data.title + nl
    + border + nl
    + '場所　:　' + data.where + nl
    + '日付　:　' + data.day + nl
    + '時間　:　' + `${data.startTime} 〜 ${data.endTime}` + nl
    + '書記　:　' + data.secretary + nl
    + '参加者:　' + data.entryList + nl
    + border + nl
    + agendaParse(data.agendaList)
    + border;
};

function jsonParse(data) {
    return JSON.parse(JSON.stringify(data));
};


export function textExport(data) {
    return jsonParse(data);
};


const MinutesShareCopy = {
    controller: function(item) {
        const ctrl = this;
        this.copy = function(element, init, context) {
            if(init) return false;
            const clipboard = new Clipboard(element);
        };
    },
    view(ctrl, item) {
        return <section className='form-group'>
            <div className='input-group'>
                <input type='text'
                    className='form-control'
                    id='minutes-url-copy'
                    value={item.url}/>
                <span className='input-group-btn'>
                    <button
                        className='btn btn-default'
                        config={ctrl.copy}
                        data-clipboard-target='#minutes-url-copy'
                        data-clipboard-action='copy'>
                        コピー
                    </button>
                </span>
            </div>
        </section>;
    }
};



const MinutesShareText = {
    controller: function(text) {
        const ctrl = this;
        this.copy = function(element, init, context) {
            if(init) return false;
            const clipboard = new Clipboard(element);
        };
    },
    view(ctrl, text) {
        return <section>
            <section className='form-group'>
                <textarea className='form-control' id='minutes-test-copy' rows='25'>
                    {minutesParse(jsonParse(text.data()))}
                </textarea>
            </section>
            <button
                className='btn btn-default btn-block'
                data-clipboard-target='#minutes-test-copy'
                data-clipboard-action='copy'
                config={ctrl.copy}>
                コピー
            </button>
        </section>;
    }
};



const MinutesShare = {
    controller: function(share) {
        const ctrl = this;
        // this.baseUrl = `http://localhost:5000/?/minutes/${share.minutes_id}`;
        this.baseUrl = `https://minutes-lives-20160605.herokuapp.com/?/minutes/${share.minutes_id}`;
        this.config = function(element, init) {
            if(init) {
                $(element).html('');
                $(element).qrcode(ctrl.baseUrl);
            }
        };
    },
    view(ctrl, share) {
        return <div className='content'>
            <h3>QRコード</h3>
            <section className='row'>
                <div className='col-sm-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <div config={ctrl.config}></div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <h5>URLのコピー</h5>
                    <MinutesShareCopy url={ctrl.baseUrl}/>
                    <hr/>
                    <h5>印刷</h5>
                    <ul>
                        <li>QRコードを印刷する場合は下の印刷ボタンを押してください。</li>
                        <li>
                            <b>「合言葉」</b>と<b>「出席」</b>を参加者から取る場合は、
                            <b>[設定・その他] > [各種設定]</b>
                            からそれぞれ設定してください。
                        </li>
                    </ul>
                    <button className='btn btn-default btn-block'>印刷</button>
                </div>
            </section>
            <hr/>
            <h3>テキストデータ</h3>
            <MinutesShareText data={share.data}/>
            <hr/>
        </div>;
    }
};

export default MinutesShare;
