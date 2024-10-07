export const myAction = (payload) => {
    return {
        type: "ADD",
        payload
    }
}

export const deleteItem = (index) => {
    return {
        type: "DELETE",
        payload: index
    }
}

export const editItem = (index, newText) => {
    return {
        type: "EDIT",
        payload: { index, newText }
    }
}