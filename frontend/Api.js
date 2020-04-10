const Base =  "http://localhost:3000/api";

const API = {
    Base,
    Item: {
        Add:      Base + "/add",
        Remove:   Base + "/remove",
        Decrease: Base + "/decrease",
        Increase:   Base + "/increase",
        GetAll:   Base + "/get-items"
    }
}

const AppActions= {
    Item: {
        Add: "added-item",
        Remove: "removed-item",
        Decrease: "decrease-item",
        Increase: "increase-item"
    }
}
export { API, AppActions };