import {List} from 'immutable';
import NoticeModel from '../../../models/notices/NoticeModel';
import noticeFactory from '../../../models/notices/factory';

export const NOTIFIER_MESSAGE = 'notifier/MESSAGE';
export const NOTIFIER_CLOSE = 'notifier/CLOSE';
export const NOTIFIER_LIST = 'notifier/LIST';

const initialState = {
    notice: new NoticeModel(),
    list: new List()
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFIER_MESSAGE:
            return {
                ...state,
                notice: action.notice
            };
        case NOTIFIER_LIST:
            return {
                ...state,
                list: action.list
            };
        case NOTIFIER_CLOSE:
            return {
                ...state,
                notice: new NoticeModel()
            };
        default:
            return state;
    }
};

const retrieveNotices = () => {
    let notices = null;
    try {notices = JSON.parse(localStorage.getItem('chronoBankNotices'))} catch (e) {}
    if (!Array.isArray(notices)) notices = [];
    return notices;
};

const listNotices = (data = null) => (dispatch) => {
    let notices = data === null ? retrieveNotices() : data;
    let list = new List();
    for (let i in notices) {
        if (notices.hasOwnProperty(i)) {
            list = list.set(i, noticeFactory(notices[i].name, notices[i].data));
        }
    }
    dispatch({type: NOTIFIER_LIST, list});
};

const saveNotice = (notice: NoticeModel) => (dispatch) => {
    let notices = retrieveNotices();
    notices.unshift({
        name: notice.constructor.name,
        data: notice.toJS()
    });
    localStorage.setItem('chronoBankNotices', JSON.stringify(notices));
    dispatch(listNotices(notices));
};

const notify = (notice: NoticeModel) => (dispatch) => {
    dispatch({type: NOTIFIER_MESSAGE, notice});
    dispatch(saveNotice(notice));
};

const closeNotifier = () => ({type: NOTIFIER_CLOSE});

export {
    notify,
    closeNotifier,
    listNotices
}

export default reducer;