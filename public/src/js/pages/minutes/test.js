import assert from 'power-assert';
import vm from './vm';
import MinutesModel from '../../models/minutes.model';

export default function() {
    describe('minutes pages', () => {
        describe('vm.init default props', () => {
            before(() => {
                vm.init();
            });
            it('.data()', () => {
                assert(vm.data() === undefined);
            });
            it('.newSign()', () => {
                assert(vm.newSign() === 0);
            });
            it('.newIndent()', () => {
                assert(vm.newIndent() === 1);
            });
            it('.newAgendaTitle()', () => {
                assert(vm.newAgendaTitle() === '');
            });
            it('.newIndentContent()', () => {
                assert(vm.newIndentContent() === '');
            });
            it('.list', () => {
                assert(vm.list.length === 0);
            });
        });
        xdescribe('socket.io', () => {
            before(() => {
                vm.socket('9d55db40-f2f5-4d17-b90a-d5554178de0c');
            });
            it('初期化処理', (done) => {
                assert(vm.data());
            });
        });
        describe('model', () => {
            describe('minutes', () => {
                it('クラスのインスタンス', () => {
                    const minutesModel = new MinutesModel({
                        objectId: 1
                    });
                    assert(minutesModel.title() === '');
                    assert(minutesModel.objectId() === 1);
                    assert(minutesModel.agendaList.length === 0);
                });
                it('プロパティの再代入', () => {
                    const minutesModel = new MinutesModel({
                        objectId: 1,
                        title: 'hello'
                    });
                    assert(minutesModel.title() === 'hello');
                    minutesModel.title('world!');
                    assert(minutesModel.title() === 'world!');
                });
                it('agendaの追加', () => {
                    const minutesModel = new MinutesModel({
                        objectId: 1,
                        title: 'hello',
                        agendaList: [
                            {
                                title: 'テスト1'
                            }, {
                                title: 'テスト2'
                            }, {
                                title: 'テスト3'
                            }
                        ]
                    });
                    assert(minutesModel.agendaList.length === 3);
                    assert(minutesModel.agendaList[1].title() === 'テスト2');
                    minutesModel.update({
                        objectId: 1,
                        title: 'hello, world!',
                        agendaList: [
                            {
                                title: 'レッスン1'
                            }, {
                                title: 'レッスン2'
                            }
                        ]
                    });
                    assert(minutesModel.title() === 'hello, world!');
                    assert(minutesModel.agendaList.length === 2);
                    assert(minutesModel.agendaList[1].title() === 'レッスン2');
                });
                it('参加者の追加', () => {
                    const minutesModel = new MinutesModel({
                        objectId: 1,
                        title: 'hello',
                        agendaList: [
                            {
                                title: 'テスト1'
                            }, {
                                title: 'テスト2'
                            }, {
                                title: 'テスト3'
                            }
                        ]
                    });
                    assert(minutesModel.entryList.length === 0);
                    minutesModel.addEntryList('田中太郎')
                    assert(minutesModel.entryList.length === 1);
                    assert(minutesModel.entryList[0]() === '田中太郎');
                });
            });
        });
    });
};
