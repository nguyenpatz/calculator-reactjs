import {useReducer} from "react";
import NumberButton from "./NumberButton";
import OperationButton from "./OperationButton";
import './App.css';

const initialState = {
  previousOperand: null,
  currentOperand: null,
  operation: null,
};

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE: "delete",
  EVALUATE: "evaluate",
}

// action object includes type,number,operation 

function reducer(state, action) {
  switch(action.type) {
    case ACTIONS.ADD_DIGIT:
      if(state.currentOperand === "0" && action.number === "0") {
        return state; 
      }
      if(action.number === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand||""}${action.number}`,
      }
      break;

    case ACTIONS.CLEAR:
      return {};
      break;

    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if(state.previousOperand == null) {
          return {
          ...state,
          operation: action.operation,
          previousOperand: `${state.currentOperand||""}`,
          currentOperand:null,
        }
      }
      if(state.currentOperand == null) {
        return{
          ...state,
          operation: action.operation,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.operation,
        currentOperand:null,
      }
    case ACTIONS.EVALUATE:
      if(state.currentOperand === null) {
        return state;
      }
      if(state.previousOperand === null) {
        return {
          ...state,
          currentOperand: state.currentOperand
        }
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        operation: null,
        previousOperand: null,
      }

    case ACTIONS.DELETE:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }
  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  let computation = "";
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(current)) return "";
  switch(operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current; 
      break;
  }
  return computation.toString();
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previousOperand">{state.previousOperand}{state.operation}</div>
        <div className="currentOperand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE})}>DEL</button>
      <OperationButton dispatch={dispatch} operation="/"/>
      <NumberButton dispatch={dispatch} number="1"/>
      <NumberButton dispatch={dispatch} number="2"/>
      <NumberButton dispatch={dispatch} number="3"/>
      <OperationButton dispatch={dispatch} operation="+"/>
      <NumberButton dispatch={dispatch} number="4"/>
      <NumberButton dispatch={dispatch} number="5"/>
      <NumberButton dispatch={dispatch} number="6"/>
      <OperationButton dispatch={dispatch} operation="-"/>
      <NumberButton dispatch={dispatch} number="7"/>
      <NumberButton dispatch={dispatch} number="8"/>
      <NumberButton dispatch={dispatch} number="9"/>
      <OperationButton dispatch={dispatch} operation="x"/>
      <NumberButton dispatch={dispatch} number="."/>
      <NumberButton dispatch={dispatch} number="0"/>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
