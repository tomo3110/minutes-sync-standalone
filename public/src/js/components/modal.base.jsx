import m from 'mithril';

const ModalBase = {
    view(ctrl, modal) {
        return <div className='mymodal' id={modal.id}>
            <div className='backdrop' onclick={modal.callback}></div>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    {modal.content}
                </div>
            </div>
        </div>
    }
};

export default ModalBase;
