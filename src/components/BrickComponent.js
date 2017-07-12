import * as React from "react";
import PropTypes from 'prop-types';

class BrickComponent extends React.Component {
    render() {
        return (
            <div className="App-Block">
                <div className="box-title columns">
                    <div className="column is-three-quarters">{this.props.title || 'Title'}</div>
                </div>
                <div className="box-body">{this.props.children}</div>
            </div>
        )
    }
}

BrickComponent.propTypes = {
    title: PropTypes.string
};

export default BrickComponent;