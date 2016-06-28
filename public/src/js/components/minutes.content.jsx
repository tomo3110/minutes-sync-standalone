import m from 'mithril';
import AgendaView from './agenda.view.jsx';
import MinutesInfo from './minutes.info.jsx';

const Minutes = {
    view(ctrl, args) {
        return <div className='content'>
            <h3>{args.data().title()}</h3>
            <hr/>
                <MinutesInfo {...args.data()} />
            <hr/>
            <AgendaView
                agendaList={args.data().agendaList}
                indentSplice={args.data().indentSplice}
                agendaAdd={args.agendaAdd}
                indentAdd={args.indentAdd}
                addAgendaTitle={args.newAgendaTitle}
                addIndentContent={args.newIndentContent}
                addIndentIndent={args.newIndent}
                addIndentSign={args.newSign}
                update={args.update} />
        </div>;
    }
}

export default Minutes;
