const { StateGraph } = require("@langchain/langgraph");
const{State} = require("./state.js");

const graph = new StateGraph(State)
module.exports = { graph };