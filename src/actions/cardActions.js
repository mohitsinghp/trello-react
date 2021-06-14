import { CONSTANTS } from './';
import axios from 'axios';
let cardID = 0;

export const removeCard = (listID, cardID) => {
    return async (dispatch, getState) => {
        const newList = getState().data.list.map(list => {
            if (list.id === listID) {
                return {
                    ...list,
                    cards: list.cards.filter(card => card.id !== cardID)
                }
            } else {
                return list;
            }
        });
        const body = {
            list: newList,
            id: getState().data.id
        }

        const response = await axios.put('http://localhost:3001/'+ getState().data.id, body);
    
        dispatch({ type: CONSTANTS.UPDATE_LIST, payload: response.data[0] });
    }
}

export const addCard = (listID, text) => {
    return async (dispatch, getState) => {

        const newCard = {
            text: text,
            id: `card-${cardID}`
        };
        cardID += 1;

        const newList = getState().data.list.map(list => {
            if (list.id === listID) {
                return {
                    ...list,
                    cards: [...list.cards, newCard]
                }
            } else {
                return list;
            }
        });

        const body = {
            list: newList,
            id: getState().data.id
        }

        const response = await axios.put('http://localhost:3001/'+ getState().data.id, body);
    
        dispatch({ type: CONSTANTS.UPDATE_LIST, payload: response.data[0] });
    }
} 