import m from 'mithril';

const ModalHeader = {
    view(ctrl, header) {
        return <div className="modal-header">
            <button type="button" className="close" onclick={header.callback}>
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{header.title}</h4>
        </div>;
    }
};

export default ModalHeader;
