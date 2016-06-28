import m from 'mithril';

const ModalButtonFooter = {
    view(ctrl, footer) {
        return <div className="modal-footer">
            <button type="button" className="btn btn-default" onclick={footer.button2.callback}>
                {footer.button2.name}
            </button>
            <button type="button" className="btn btn-success" onclick={footer.button1.callback}>
                {footer.button1.name}
            </button>
        </div>;
    }
};

export default ModalButtonFooter;
