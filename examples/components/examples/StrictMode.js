import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';

class BasicModalExample extends Component {
    static propTypes = {
        initialOpen: PropTypes.bool,
        toggleCode: PropTypes.func.isRequired,
    };

    static defaultProps = {
        initialOpen: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.initialOpen,
        };
    }

    toggleModal = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };

    render() {
        const { toggleCode } = this.props;
        const { isOpen } = this.state;

        // Note: Currently warns when modal is shown
        // issue ref: https://github.com/reactjs/react-transition-group/issues/429

        return (
            <div>
                <React.StrictMode>
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={this.toggleModal}>
                            Open
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={toggleCode}>
                            Code
                        </button>
                    </div>

                    <Modal isOpen={isOpen} isBasic autoWrap title="Howdy!" onCancel={this.toggleModal}>
                        <p>I’m a basic modal</p>
                    </Modal>
                </React.StrictMode>
            </div>
        );
    }
}

export default BasicModalExample;
