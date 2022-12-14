import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_KEY } = process.env


export const dataSlice = createSlice({
    name: "data",
    initialState: {
        games: [],
        developers: [],
        platforms: [],
        stores: [],
        search: [],
    },
    reducers: {
        addGames: (state, actions) => {
            state.games = actions.payload
        },
        addDevelopers: (state, actions) => {
            state.developers = actions.payload
        },
        addPlatforms: (state, actions) => {
            state.platforms = actions.payload
        },
        addStores: (state, actions) => {
            state.stores = actions.payload
        },
        addSearch: (state, actions) => {
            state.search = actions.payload
        },


    },
});


export const {
    addGames,
    addDevelopers,
    addPlatforms,
    addStores,
    addSearch
} = dataSlice.actions;


export default dataSlice.reducer;



export const getGames = (page = 1) => async (dispatch) => {


    try {
        const resp = await axios.get(`https://api.rawg.io/api/games?key=${REACT_APP_KEY?.slice(0, 33)}&page=${page}&page_size=20`);
        dispatch(addGames(resp.data));
    } catch (error) {
        console.log(error)
    }
};

export const getDevelopers = (page = 1) => async (dispatch) => {


    try {
        const resp = await axios.get(`https://api.rawg.io/api/developers?key=${REACT_APP_KEY?.slice(0, 33)}&page=${page}&page_size=20`);
        dispatch(addDevelopers(resp.data));
    } catch (error) {
        console.log(error)
    }
};

export const getPlatforms = (page = 1) => async (dispatch) => {


    try {
        const resp = await axios.get(`https://api.rawg.io/api/platforms?key=${REACT_APP_KEY?.slice(0, 33)}&page=${page}&page_size=20`);
        dispatch(addPlatforms(resp.data));
    } catch (error) {
        console.log(error)
    }
};

export const getStores = (page = 1) => async (dispatch) => {


    try {
        const resp = await axios.get(`https://api.rawg.io/api/stores?key=${REACT_APP_KEY?.slice(0, 33)}&page=${page}&page_size=20`);
        dispatch(addStores(resp.data));
    } catch (error) {
        console.log(error)
    }
};

export const getGameSearch = (title) => async (dispatch) => {
    try {
        const resp = await axios.get(`https://api.rawg.io/api/games?search=${title}&key=${REACT_APP_KEY?.slice(0, 33)}`);
        dispatch(addSearch(resp.data.results));
    } catch (error) {
        console.log(error)
    }
};