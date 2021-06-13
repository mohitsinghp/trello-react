import { CONSTANTS } from "./";
import axios from 'axios';

export const addList = (title,state) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: {
            title,
            state
        }
    };
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    }
}

export const getTrelloList = async (dispatch, getState) => {
    const response = await axios.get('http://localhost:3001/');

    localStorage.setItem('TrelloListID', response.data[0]._id);
    dispatch({ type: CONSTANTS.GET_LIST, payload: response.data[0] });
};
