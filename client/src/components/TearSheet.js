import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TearSheet extends Component {

    static propTypes = {
        children: PropTypes.node,
        height: PropTypes.number.isRequired,
    };

    static defaultProps = {
        height: 151,
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className='root'>
                <div className='tear-sheet-container'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default TearSheet;