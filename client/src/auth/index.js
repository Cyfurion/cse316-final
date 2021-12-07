import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    SHOW_ERROR: "SHOW_ERROR",
    HIDE_ERROR: "HIDE_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMsg: ""
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMsg: auth.errorMsg
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMsg: ""
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMsg: ""
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: ""
                })
            }
            case AuthActionType.SHOW_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: payload
                })
            }
            case AuthActionType.HIDE_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: ""
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        if (auth.loggedIn === false) { return; }
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        const response = await api.registerUser(userData);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
    }

    auth.loginUser = async function(userData, store) {
        const response = await api.loginUser(userData);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            });
            history.push("/");
        } else {
            auth.showError(response.errorMessage);
        }
    }

    auth.logoutUser = function() {
        authReducer({
            type: AuthActionType.LOGOUT_USER,
            payload: null
        })
    }

    auth.showError = function(msg) {
        authReducer({
            type: AuthActionType.SHOW_ERROR,
            payload: msg
        })
    }
    auth.hideError = function() {
        authReducer({
            type: AuthActionType.HIDE_ERROR,
            payload: null
        })
    }

    return (
        <AuthContext.Provider value={{ auth }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
