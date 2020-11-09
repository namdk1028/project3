// import axios from "axios";


export default {
    namespaced: true,
    state: {
        controlInfo: {
            region: "",
            max_age: 30,
            min_age: 25,
            max_height: 200,
            min_height: 140,
            body: "",
            education: "",
            job: "",
            religion: "",
            drink: "",
            smoke: "",
        },
    },
    getters: {
        getControlInfo(state) {
            return state.controlInfo;
        },
    },
    mutations: {
        setRegion(state, region) {
            state.region = region;
        },
        setMaxAge(state, max_age) {
            state.max_age = max_age;
        },
        setMinAge(state, min_age) {
            state.min_age = min_age;
        },
        setMaxHeight(state, max_height) {
            state.max_height = max_height;
        },
        setMinHeight(state, min_height) {
            state.min_height = min_height;
        },
        setBody(state, body) {
            state.body = body;
        },
        setEducation(state, education) {
            state.education = education;
        },
        setJob(state, job) {
            state.job = job;
        },
        setReligion(state, religion) {
            state.religion = religion;
        },
        setDrink(state, drink) {
            state.drink = drink;
        },
        setSmoke(state, smoke) {
            state.smoke = smoke;
        },
    },
    actions: {
        updateControls() {

        }
    },
}