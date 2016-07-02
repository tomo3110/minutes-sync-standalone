import m from 'mithril';

const Jumbotron = {
    view(ctrl, args) {
        return <div className='myjumbotron'>
            <h2>{args.catchCopy}</h2>
            <section className='locad'>{args.text}</section>
            <section className='catch-copy-content'>{args.content}</section>
        </div>;
    }
};

export default Jumbotron;
