const initialstate = {
    arr: []
};

export const myReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                arr: [...state.arr, action.payload]
            };
        case "DELETE":
            const newArrDelete = [...state.arr];
            newArrDelete.splice(action.payload, 1);
            return {
                ...state,
                arr: newArrDelete
            };
        case "EDIT":
            const { index, newData } = action.payload;
            const newArrEdit = [...state.arr];
            newArrEdit[index] = newData;
            return {
                ...state,
                arr: newArrEdit
            };
        default:
            return state;
    }
};
