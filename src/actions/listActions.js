import { CONSTANTS } from "./";
import axios from 'axios';

let listID = 0;

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return async (dispatch, getState) => {

        const newList = [...getState().data.list];

        //dragging lists around
        if (type === "list") {
            const list = newList.splice(droppableIndexStart, 1);
            newList.splice(droppableIndexEnd, 0, ...list);
            return newList;
        }

        //Drag and drop happens in the same list
        if (droppableIdStart === droppableIdEnd) {
            const list = getState().data.list.find(list => droppableIdStart === list.id)
            const card = list.cards.splice(droppableIndexStart, 1);
            list.cards.splice(droppableIndexEnd, 0, ...card)
        }

        if (droppableIdStart !== droppableIdEnd) {
            //find the list where dragging happened
            const listStart = getState().data.list.find(list => droppableIdStart === list.id)
            //pull out the card from this list
            const card = listStart.cards.splice(droppableIndexStart, 1);
            //find the list where drag ended
            const listEnd = getState().data.list.find(list => droppableIdEnd === list.id);
            //put the card in the new list
            listEnd.cards.splice(droppableIndexEnd, 0, ...card)
        }

        const body = {
            list: newList,
            id: getState().data.id
        }

        const response = await axios.put('http://localhost:3001/'+ getState().data.id, body);
    
        dispatch({ type: CONSTANTS.UPDATE_LIST, payload: response.data[0] });
    }
}

export const getTrelloList = async (dispatch) => {
    const response = await axios.get('http://localhost:3001/');

    localStorage.setItem('TrelloListID', response.data[0]._id);
    dispatch({ type: CONSTANTS.GET_LIST, payload: response.data[0] });
};

export const addList = (title) => {
    return async (dispatch, getState) => {
        const newList = {
            title: title,
            cards: [],
            id: `list-${listID}`
        }
        listID += 1

        const body =  {
            list : [...getState().data.list, newList],
            id: getState().data.id
        }

        // const {items} = getState();
        const response = await axios.put('http://localhost:3001/'+ getState().data.id, body);
    
        // localStorage.setItem('TrelloListID', response.data[0]._id);
    
        dispatch({ type: CONSTANTS.UPDATE_LIST, payload: response.data[0] });
    }
}

export const removeList = (listID) => {
    return async (dispatch, getState) => {
        const newList = getState().data.list.filter(list => list.id !== listID);
        
        const body = {
            list: newList,
            id: getState().data.id
        }

        const response = await axios.put('http://localhost:3001/'+ getState().data.id, body);
    
        dispatch({ type: CONSTANTS.UPDATE_LIST, payload: response.data[0] });
    }
} 

