
class Base {
    constructor(args) {
        this.controller = (args.ctrl || function() {});
        this.view = args.view;
    }
}

export default Base;
