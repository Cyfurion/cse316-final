import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/**
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers.
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    UPDATE_LIST_DATA: "UPDATE_LIST_DATA",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_LIST_DATA: "LOAD_LIST_DATA",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_OPENED_LIST: "SET_OPENED_LIST",
    CHANGE_VIEW: "CHANGE_VIEW",
    SORT_LIST_DATA: "SORT_LIST_DATA"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        listData: [],
        currentList: null,
        openedList: null,
        newListCounter: 0,
        listMarkedForDeletion: null,
        view: "home"
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE DATA
            case GlobalStoreActionType.UPDATE_LIST_DATA: {
                return setStore({
                    listData: payload.listData,
                    currentList: null,
                    openedList: store.openedList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    listData: store.listData,
                    currentList: null,
                    openedList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    listData: store.listData,
                    currentList: payload,
                    openedList: null,
                    newListCounter: store.newListCounter + 1,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_LIST_DATA: {
                return setStore({
                    listData: payload,
                    currentList: null,
                    openedList: store.openedList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    listData: store.listData,
                    currentList: null,
                    openedList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: payload,
                    view: store.view
                });
            }
            // PREPARE TO CLEAR A LIST FROM DELETION
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    listData: store.listData,
                    currentList: null,
                    openedList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // SET CURRENT LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    listData: store.listData,
                    currentList: payload,
                    openedList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // SET OPENED LIST
            case GlobalStoreActionType.SET_OPENED_LIST: {
                return setStore({
                    listData: store.listData,
                    currentList: null,
                    openedList: payload,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: store.view
                });
            }
            // CHANGE VIEW
            case GlobalStoreActionType.CHANGE_VIEW: {
                return setStore({
                    listData: store.listData,
                    currentList: null,
                    openedList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: payload
                });
            }
            // SORT BY
            case GlobalStoreActionType.SORT_LIST_DATA: {
                return setStore({
                    listData: store.listData.sort(payload),
                    currentList: null,
                    openedList: store.openedList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    view: store.view
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (auth.user.email !== top5List.ownerEmail) { return; }
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) { store.loadListData(); }
            }
            updateList(top5List);
        }
    }
    store.changeListItems = async function (id, items) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (auth.user.email !== top5List.ownerEmail) { return; }
            top5List.items = items;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) { store.loadListData(); }
            }
            updateList(top5List);
        }
    }
    store.publishList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (auth.user.email !== top5List.ownerEmail) { return; }
            top5List.published = true;
            let today = new Date();
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            top5List.publishedDate = monthNames[today.getMonth()] + " " + + today.getDate() + ", " + today.getFullYear();
            async function updateList(top5List) {
                let response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) { store.loadListData(); }
            }
            updateList(top5List);
        }  
    }
    store.comment = async function (user, body) {
        let response = await api.getTop5ListById(store.openedList._id)
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.comments.unshift({name: user, body: body});
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) { store.loadListData(); }
            }
            updateList(top5List);
        }
    }
    store.rate = async function (id, rating) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let likes = top5List.likes;
            let dislikes = top5List.dislikes;
            let email = auth.user.email;
            if (rating === "like") {
                if (likes.includes(email)) {
                    likes.splice(likes.indexOf(email), 1);
                } else {
                    likes.push(email);
                    if (dislikes.includes(email)) { dislikes.splice(dislikes.indexOf(email), 1); }
                }
            } else if (rating === "dislike") {
                if (dislikes.includes(email)) {
                    dislikes.splice(dislikes.indexOf(email), 1);
                } else {
                    dislikes.push(email);
                    if (likes.includes(email)) { likes.splice(likes.indexOf(email), 1); }
                }
            } else {
                return;
            }
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) { store.loadListData(); }
            }
            updateList(top5List);
        }
    }
    store.sortBy = function (type) {
        let convertDate = function (date) {
            date = date.split(" ");
            const monthNames = [null, "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            let day = date[1].substring(0, date[1].length - 1);
            if (day.length === 1) { day = "0" + day; }
            let month = monthNames.indexOf(date[0]);
            if (month.length === 1) { month = "0" + month; }
            return date[2] + month + day;
        }
        switch (type) {
            case "new":
                storeReducer({
                    type: GlobalStoreActionType.SORT_LIST_DATA,
                    payload: (a, b) => { 
                        if (!a.published) { return 1; }
                        if (!b.published) { return -1; }
                        return convertDate(b.publishedDate) - convertDate(a.publishedDate); 
                    }
                });
                break;
            case "old":
                storeReducer({
                    type: GlobalStoreActionType.SORT_LIST_DATA,
                    payload: (a, b) => { 
                        if (!a.published) { return 1; }
                        if (!b.published) { return -1; }
                        return convertDate(a.publishedDate) - convertDate(b.publishedDate); 
                    }
                });
                break;
            case "views":
                storeReducer({
                    type: GlobalStoreActionType.SORT_LIST_DATA,
                    payload: (a, b) => { 
                        if (!a.published) { return 1; }
                        if (!b.published) { return -1; }
                        return b.views - a.views; 
                    }
                });
                break;
            case "likes":
                storeReducer({
                    type: GlobalStoreActionType.SORT_LIST_DATA,
                    payload: (a, b) => { 
                        if (!a.published) { return 1; }
                        if (!b.published) { return -1; }
                        return b.likes.length - a.likes.length; 
                    }
                });
                break;
            case "dislikes":
                storeReducer({
                    type: GlobalStoreActionType.SORT_LIST_DATA,
                    payload: (a, b) => { 
                        if (!a.published) { return 1; }
                        if (!b.published) { return -1; }
                        return b.dislikes.length - a.dislikes.length; 
                    }
                });
                break;
            default:
                return;
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: [" ", " ", " ", " ", " "],
            ownerEmail: auth.user.email,
            ownerName: auth.user.firstName + " " + auth.user.lastName,
            published: false,
            publishedDate: "unpublished",
            likes: [],
            dislikes: [],
            views: 0,
            comments: [],
            communityPoints: []
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            });

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        } else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE DATA SO WE CAN LIST ALL THE LISTS
    store.loadListData = async function (filter) {
        if (!filter) {
            switch (store.view) {
                case "home":
                    filter = { ownerEmail: auth.user.email }
                    break;
                case "all":
                    filter = { published: true }
                    break;
                case "user":
                    filter = { published: true }
                    break;
                case "community":
                    filter = { ownerEmail: "community" }
                    break;
                default:
                    return;
            }
        }
        const response = await api.getTop5Lists(filter);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_LIST_DATA,
                payload: response.data.data
            });
        } else {
            console.log("API FAILED TO GET THE LISTS");
        }
    }

    // THE FOLLOWING 4 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // and unmarkListForDeletion
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (auth.user.email !== top5List.ownerEmail) { return; }
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }
    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadListData();
            history.push("/");
            store.unmarkListForDeletion();
        }
    }
    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }
    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (auth.user.email !== top5List.ownerEmail) { return; }
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }
    store.setOpenedList = async function (id) {
        if (!id) {
            storeReducer({
                type: GlobalStoreActionType.SET_OPENED_LIST,
                payload: null
            });
        } else {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                if (top5List.published) {
                    top5List.views = top5List.views + 1;
                    async function updateList(top5List) {
                        response = await api.updateTop5ListById(id, top5List);
                        if (response.data.success) {
                            let filter = {};
                            switch (store.view) {
                                case "home":
                                    filter = { ownerEmail: auth.user.email }
                                    break;
                                case "all":
                                    filter = { published: true }
                                    break;
                                case "user":
                                    filter = { published: true }
                                    break;
                                case "community":
                                    filter = { ownerEmail: "community" }
                                    break;
                                default:
                                    return;
                            }
                            const response = await api.getTop5Lists(filter);
                            if (response.data.success) {
                                setStore({
                                    listData: response.data.data,
                                    currentList: null,
                                    openedList: top5List,
                                    newListCounter: store.newListCounter,
                                    listMarkedForDeletion: null,
                                    view: store.view
                                });
                            } else {
                                console.log("API FAILED TO GET THE LISTS");
                            }
                        }
                    }
                    updateList(top5List);
                } else {
                    storeReducer({
                        type: GlobalStoreActionType.SET_OPENED_LIST,
                        payload: response.data.top5List
                    });
                }
            }
        }
    }

    store.setView = async function (view) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_VIEW,
            payload: view
        });
        let filter = {};
        switch (view) {
            case "home":
                filter = { ownerEmail: auth.user.email }
                break;
            case "all":
                filter = { published: true }
                break;
            case "user":
                filter = { published: true }
                break;
            case "community":
                filter = { ownerEmail: "community" }
                break;
            default:
                return;
        }
        const response = await api.getTop5Lists(filter);
        if (response.data.success) {
            setStore({
                listData: response.data.data,
                currentList: null,
                openedList: null,
                newListCounter: store.newListCounter,
                listMarkedForDeletion: null,
                view: view
            });
        } else {
            console.log("API FAILED TO GET THE LISTS");
        }

    }

    return (
        <GlobalStoreContext.Provider value={{ store }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
