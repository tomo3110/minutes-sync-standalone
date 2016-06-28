import m from 'mithril';

const ModalBody = {
    view(ctrl, body) {
        return <div className='modal-body'>
            {body.content}
        </div>;
    }
};

export default ModalBody;
