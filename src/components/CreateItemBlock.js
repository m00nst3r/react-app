import * as React from "react";
import {MuiThemeProvider, RaisedButton} from "material-ui";

class CreateItemBlock extends React.Component {
    componentWillMount() {
        this.setState({
            iDs: [1, 2, 3, 4, 5]
        })
    }

    updateBook = (id) => {
        const options = {
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow'
        };
        return fetch(`http://localhost:3001/api/new/${id}`, options)
            .then(resp => resp.json())
            .then(response => {

            })
            .catch(error => {

            })
    };

    showState = () => {
        const promises = this.state.iDs.map(id => this.updateBook(id));
        Promise.all(promises).then(() => {
            console.log('END');
        });
    };
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton onClick={this.showState} label="Hello"/>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default CreateItemBlock;