import { ACTIONS } from "./App";

export default function NumberButton ({dispatch, number}) {
	return (
		<button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, number: number })}>{number}</button>
	);
}