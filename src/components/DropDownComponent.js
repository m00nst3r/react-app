import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css'

class DropDownComponent extends React.Component {
    componentWillMount() {
        this.setState({
            options: [
                { value: '#1', label: '#1' },
                { value: '#1', label: '#2' },
                { value: '#1', label: '#3' },
                { value: '#1', label: '#4' },
                { value: '#1', label: '#5' },
                { value: '#1', label: '#6' }
            ],
            selected: [],
            multi: true
        })
    }

    selectItem = (data) => {
        this.setState({
            selected: data
        })
    };

    render() {
        return (
            <div className="drop-down">
                <Select
                    onChange={this.selectItem}
                    value={this.state.selected}
                    multi={this.state.multi}
                    options={this.state.options}/>
            </div>
        )
    }
}

export default DropDownComponent;