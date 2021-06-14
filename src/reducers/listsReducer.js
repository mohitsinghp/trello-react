import { CONSTANTS } from '../actions/index'

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
        case CONSTANTS.UPDATE_LIST:
            return {
                list:  [ ...action.payload.list],
                id: action.payload._id
             }
        default:
            return state;
    }
};

export default listsReducer;