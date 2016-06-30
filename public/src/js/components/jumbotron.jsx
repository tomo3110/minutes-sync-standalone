import m from 'mithril';

const Jumbotron = {
    view(ctrl, args) {
        return <div className='myjumbotron'>
            <h2>{args.catchCopy}</h2>
            <section className='locad' key='catch-copy-text'>{args.text}</section>
            <section key='catch-copy-content'>{args.content}</section>
        </div>;
    }
};

export default Jumbotron;
