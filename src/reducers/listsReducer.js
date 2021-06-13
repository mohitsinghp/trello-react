import { CONSTANTS } from '../actions/index'
import axios from 'axios';

let listID = 0;
let cardID = 0;

// const initialState = [
//     // {
//     //     title: "last episode",
//     //     id: `list-${0}`,
//     //     cards: [
//     //         {
//     //             id: `card-${0}`,
//     //             text: "we created a static list and a static card"
//     //         },
//     //         {
//     //             id: `card-${1}`,
//     //             text: "we used a mix between materila UI and React styled components"
//     //         }
//     //     ]
//     // },
//     // {
//     //     title: "This episode",
//     //     id: `list-${1}`,
//     //     cards: [
//     //         {
//     //             id: `card-${2}`,
//     //             text: "We will create our first reducer"
//     //         },
//     //         {
//     //             id: `card-${3}`,
//     //             text: "render many cards on our list with static data"
//     //         },
//     //         {
//     //             id: `card-${4}`,
//     //             text: "some little changes forgot in the previous list"
//     //         }
//     //     ]
//     // }
// ];

const initialState = {
    list : [],
    id: ''
}
const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_LIST:
            return {
               list:  [ ...action.payload.list],
               id: action.payload._id
            }
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload.title,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1

            return {
                list : [...state.list, newList],
                id: state.id
            }

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            };
            cardID += 1;

            const newList = state.list.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });

            return {
                list: newList,
                id: state.id
            }
            // return newState;
        }

        case CONSTANTS.REMOVE_CARD: {
            const newList = state.list.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: list.cards.filter(card => card.id !== action.payload.cardID)
                    }
                } else {
                    return list;
                }
            });

            return {
                list: newList,
                id: state.id
            }
        }

        case CONSTANTS.REMOVE_LIST: {
            const newList = state.list.filter(list => list.id !== action.payload.listID);
            return {
                list: newList,
                id: state.id
            }
        }

        case CONSTANTS.DRAG_HAPPENED: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                type
            } = action.payload;

            const newList = [...state.list];

            //dragging lists around
            if (type === "list") {
                const list = newList.splice(droppableIndexStart, 1);
                newList.splice(droppableIndexEnd, 0, ...list);
                return newList;
            }

            //Drag and drop happens in the same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.list.find(list => droppableIdStart === list.id)
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== droppableIdEnd) {
                //find the list where dragging happened
                const listStart = state.list.find(list => droppableIdStart === list.id)
                //pull out the card from this list
                const card = listStart.cards.splice(droppableIndexStart, 1);
                //find the list where drag ended
                const listEnd = state.list.find(list => droppableIdEnd === list.id);
                //put the card in the new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }

            // return newState;
            return {
                list: newList,
                id: state.id
            }
        }
        default:
            return state;
    }
};

export default listsReducer;