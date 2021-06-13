import { CONSTANTS } from './';

export const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID }
    };
};

export const removeCard = (listID, cardID) => {
    return {
        type: CONSTANTS.REMOVE_CARD,
        payload: { listID, cardID }
    }
}

export const removeList = (listID) => {
    return {
        type: CONSTANTS.REMOVE_LIST,
        payload: {listID}
    }
}