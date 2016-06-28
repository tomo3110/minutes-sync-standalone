import m from 'mithril';
export default {
    title: m.prop('testMinutes'),
    addValue: m.prop(''),
    callback: () => {
        console.log('hello');
    },
    agendaList: [
        {
            title: m.prop('test'),
            isEdit: m.prop(false),
            list: [
                {
                    indent:  m.prop(1),
                    state:  m.prop(1),
                    content: m.prop('以下企業が選定候補です。'),
                    isEdit: m.prop(false)
                },{
                    indent:  m.prop(2),
                    state:  m.prop(0),
                    content: m.prop('a案：アンサーエコー 株式会社'),
                    isEdit: m.prop(false)
                },{
                    indent:  m.prop(2),
                    state:  m.prop(0),
                    content: m.prop('b案：株式会社 ブラザーフット'),
                    isEdit: m.prop(false)
                }
            ]
        }, {
            title: m.prop('test2'),
            isEdit: m.prop(false),
            list: [
                {
                    indent:  m.prop(1),
                    state:  m.prop(1),
                    content: m.prop('以下企業が選定候補です。'),
                    isEdit: m.prop(false)
                },{
                    indent:  m.prop(2),
                    state:  m.prop(0),
                    content: m.prop('a案：アンサーエコー 株式会社'),
                    isEdit: m.prop(false)
                }
            ]
        }, {
            title: m.prop('test3'),
            isEdit: m.prop(false),
            list: []
        }
    ]
};
