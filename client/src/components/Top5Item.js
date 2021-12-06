import { React } from "react";
/**
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
*/
function Top5Item(props) {
    let { index, updateCallback } = props;

    function handleChange(event) { updateCallback(index, event.target.value); }

    return (
        <input
            id={'item-' + index}
            key={props.key}
            className="top5-item"
            defaultValue={props.text}
            onInput={handleChange}
        />
    );
}

export default Top5Item;
