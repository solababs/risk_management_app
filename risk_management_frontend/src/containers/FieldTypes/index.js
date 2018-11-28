import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Input, Button, Modal, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableHead } from 'mdbreact'
import * as risksActions from '../../actions/risks'



class FieldTypes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            fieldTypes: [],
            name: '',
            description: '',
            addFieldTypeSuccess: false,
            isAddingFieldType: false,
            isGettingFieldTypes: false,
            getFieldTypesError: null,
            addFieldTypeError: null
        }
    }

    componentDidMount() {
        this.props.riskAction.getFieldTypes()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.risks.fieldTypes !== nextProps.risks.fieldTypes) {
            this.setState({
                fieldTypes: nextProps.risks.fieldTypes
            })
        }

        if (this.props.risks.isAddingFieldType !== nextProps.risks.isAddingFieldType) {
            this.setState({ isAddingFieldType: nextProps.risks.isAddingFieldType })
        }

        if (this.props.risks.isGettingFieldTypes !== nextProps.risks.isGettingFieldTypes) {
            this.setState({ isGettingFieldTypes: nextProps.risks.isGettingFieldTypes })
        }

        if (this.props.risks.getFieldTypesError !== nextProps.risks.getFieldTypesError) {
            this.setState({ getFieldTypesError: nextProps.risks.getFieldTypesError })
        }

        if (this.props.risks.addFieldTypeError !== nextProps.risks.addFieldTypeError) {
            this.setState({ addFieldTypeError: nextProps.risks.addFieldTypeError })
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderTableRows = () => {
        if (this.state.fieldTypes.length > 0) {
            return this.state.fieldTypes.map((field, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{field.name}</td>
                        <td>{field.description}</td>
                    </tr>
                )
            })
        }

        return (
            <tr>
                <td colSpan="3" className="text-center">No fields yet</td>
            </tr>
        )
    }

    save = () => {
        this.setState({ addFieldTypeSuccess: false })
        this.props.riskAction.addFieldTypes({
            name: this.state.name,
            description: this.state.description
        })
            .then(response => {
                if (response) {
                    this.setState({ 
                        addFieldTypeSuccess: true,
                        description: '',
                        name: '' 
                    })
                }
            })
    }

    inputChanged = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    render() {
        return (
            <Row>
                <Col md="8" className="offset-md-2">
                    <h1 className="text-center">Field Types</h1>
                    <Button onClick={this.toggle}>Add Field Type</Button>
                    <Table striped hover responsive>
                        <TableHead color="primary-color" textWhite>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {this.renderTableRows()}
                        </TableBody>
                    </Table>

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Add Field Type</ModalHeader>
                        <ModalBody style={{ padding: '0 30px' }}>
                            {this.state.addFieldTypeError ? (
                                <div className="alert alert-danger">{this.state.addFieldTypeError}</div>
                            ) : null}
                            {this.state.addFieldTypeSuccess ? (
                                <div className="alert alert-success">Successfully added</div>
                            ) : null}
                            <form>
                                <Input
                                    label="Name"
                                    group
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.inputChanged}
                                />
                                <Input
                                    label="Description"
                                    group
                                    type="textarea"
                                    rows="3"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.inputChanged}
                                />
                            </form>
                        </ModalBody>
                        <ModalFooter style={{ justifyContent: 'space-between' }}>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                            <Button
                                color="success"
                                onClick={this.save}
                                disabled={!this.state.name}
                            >Save</Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        risks: state.risks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        riskAction: bindActionCreators(risksActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldTypes)

