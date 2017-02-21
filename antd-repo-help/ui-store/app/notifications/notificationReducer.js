import { MESSAGES, CLEAR_MESSAGES } from './notificationActions';

const Message = (state = null, action) => {
    switch (action.type) {
        case MESSAGES:
            return action.message;
        case CLEAR_MESSAGES:
            return null;
        default:
            return state;
    }
};

export default Message;
