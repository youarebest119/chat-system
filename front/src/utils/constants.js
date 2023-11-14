export const ROUTES = {
    LOGIN: "/",
    REGISTER: "/register",
    INBOX: "/auth/inbox",
    INBOX_USER: "/auth/inbox/:id",
    AUTH: "/auth"
}


export const API_URL = {
    USER: {
        LOGIN: "http://localhost:5055/api/v1/login", // post request
        REGISTER: "http://localhost:5055/api/v1/register", // post request
        USERS: "http://localhost:5055/api/v1/users", // get request
        MY_PROFILE: "http://localhost:5055/api/v1/user", // get request
        INBOX_USERS: "http://localhost:5055/api/v1/inbox",
    },
    CHAT: {
        INITIATE: "http://localhost:5055/api/v1/inbox/initiate", // post request
        RECENT_CHAT: "http://localhost:5055/api/v1/inbox", // :id // get request
        MARK_READ_CHAT: "http://localhost:5055/api/v1/inbox/chat", // :id // put request
        MARK_READ_MSG: "http://localhost:5055/api/v1/inbox/message", // :id // put request
        DELETE_MSG: "http://localhost:5055/api/v1/inbox/message",  // :id // delete request
        GET_MSG: "http://localhost:5055/api/v1/inbox/message", // :id // get request
    },
}