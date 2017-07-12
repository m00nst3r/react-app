import * as React from "react";
import {connect} from 'react-redux'
import {changeHeight} from '../actions'
import {RaisedButton, TextField} from 'material-ui'

class TModal extends React.Component {
    render() {
        return (
            <div>
                <TextField onChange={e => {
                    console.log(this);
                    console.log(e.target.value);
                }} id="windowHeight"/>
                <RaisedButton
                    label="Submit"
                    onClick={ e => {}}/>
            </div>
        )
    }
}

let TestModal = ({ dispatch }) => {
    return (
        <TModal/>
    )
};

const VisibleTodoList = connect()(TestModal);

export default VisibleTodoList;