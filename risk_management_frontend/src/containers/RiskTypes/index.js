import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    Row, Col, Input, Button, Modal, ModalBody, ModalFooter,
    ModalHeader, Table, TableBody, TableHead, ListGroup, ListGroupItem
} from 'mdbreact'

import * as risksActions from '../../actions/risks'


class RiskTypes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            riskTypes: [],
            activeListItem: 0,
            fieldName: '',
            description: '',
            riskName: '',
            fieldType: '',
            addedFields: [],
            showKeyValue: false,
            keyValue: [],
            isAddingFieldType: false,
            isGettingFieldTypes: false,
            getRiskTypesError: null,
            addRiskTypeError: null,
            addRiskTypeSuccess: false
        }
    }

    componentDidMount() {
        this.props.riskAction.getRiskTypes()
        this.props.riskAction.getFieldTypes()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.risks.riskTypes !== nextProps.risks.riskTypes) {
            this.setState({
                riskTypes: nextProps.risks.riskTypes
            })
        }

        if (this.props.risks.isAddingRiskType !== nextProps.risks.isAddingRiskType) {
            this.setState({ isAddingRiskType: nextProps.risks.isAddingRiskType })
        }

        if (this.props.risks.isGettingRiskTypes !== nextProps.risks.isGettingRiskTypes) {
            this.setState({ isGettingRiskTypes: nextProps.risks.isGettingRiskTypes })
        }

        if (this.props.risks.getRiskTypesError !== nextProps.risks.getRiskTypesError) {
            this.setState({ getRiskTypesError: nextProps.risks.getRiskTypesError })
        }

        if (this.props.risks.addRiskTypeError !== nextProps.risks.addRiskTypeError) {
            this.setState({ addRiskTypeError: nextProps.risks.addRiskTypeError })
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    inputChanged = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    fieldTypeChanged = (e) => {
        let showKeyValue = false
        let keyValue = []

        if (e.target.value === 'Enumeration') {
            showKeyValue = true
            keyValue = [{ key: '', value: '' }]
        }

        this.setState({
            fieldType: e.target.value,
            showKeyValue,
            keyValue
        })
    }

    addField = () => {
        let newField = {
            name: this.state.fieldName,
            type: this.state.fieldType,
        }

        if (this.state.fieldType === 'Enumeration') {
            newField.values = this.state.keyValue
        }

        this.setState({
            addedFields: [...this.state.addedFields, newField],
            fieldName: '',
            fieldType: '',
            keyValue: [],
            showKeyValue: false
        })
    }

    renderParentListItems = () => {
        if (this.state.riskTypes.length > 0) {
            return this.state.riskTypes.map((risk, index) => {
                return (
                    <ListGroupItem
                        key={index}
                        onClick={() => this.setState({ activeListItem: index })}
                        style={{
                            backgroundColor: this.state.activeListItem === index ? '#007bff' : 'white',
                            color: this.state.activeListItem === index ? 'white' : 'black'
                        }}
                    ><strong>{risk.name}</strong><p>{risk.description}</p></ListGroupItem>
                )
            })
        }

        return null
    }

    renderChildListItems = () => {
        if (this.state.riskTypes.length > 0) {
            return this.state.riskTypes[this.state.activeListItem].fields.map((risk, index) => {
                return (
                    <ListGroupItem key={index}>{risk.name}</ListGroupItem>
                )
            })
        }

        return null
    }

    renderFieldTypes = () => {
        if (this.props.risks.fieldTypes.length > 0) {
            return this.props.risks.fieldTypes.map((field, index) => {
                return <option key={index} value={field.name}>{field.name}</option>
            })
        }

        return null
    }

    renderTableBody = () => {
        if (this.state.addedFields.length > 0) {
            return this.state.addedFields.map((field, index) => {
                return (
                    <tr key={index}>
                        <td>{field.name}</td>
                        <td>{field.type}</td>
                        <td>{field.values && field.values.length > 0 ? field.values.map(kv => kv.value).join(', ') : null}</td>
                    </tr>
                )
            })
        }

        return <tr><td colSpan="3" className="text-center">No fields added</td></tr>
    }

    keyValueChanged = (e, index) => {
        let currKeyVal = this.state.keyValue
        currKeyVal[index][e.target.name] = e.target.value
        this.setState({
            keyValue: currKeyVal
        })
    }

    renderKeyValueRows = () => {
        return this.state.keyValue.map((kv, index) => {
            return (
                <tr key={index}>
                    <td>
                        <div className="form-group">
                            <input
                                type="text"
                                name="key"
                                className="form-control"
                                onChange={(e) => this.keyValueChanged(e, index)}
                                value={this.state.keyValue[index].key}
                            />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <input
                                type="text"
                                name="value"
                                className="form-control"
                                onChange={(e) => this.keyValueChanged(e, index)}
                                value={this.state.keyValue[index].value}
                            />
                        </div>
                    </td>
                </tr>
            )
        })
    }

    addKeyValue = () => {
        let newKeyValue = this.state.keyValue
        newKeyValue.push({ key: '', value: '' })
        this.setState({ keyValue: newKeyValue })
    }

    save = () => {
        this.setState({ addRiskTypeSuccess: false })
        this.props.riskAction.addRiskTypes({
            name: this.state.riskName,
            description: this.state.description,
            fields: this.state.addedFields
        })
            .then(response => {
                if (response) {
                    this.setState({ 
                        addRiskTypeSuccess: true,
                        description: '',
                        riskName: '',
                        addedFields: [] 
                    })
                }
            })
    }

    render() {
        return (
            <Row>
                <Col md="12">
                    <h1 className="text-center">Risk Types</h1>
                    <Button onClick={this.toggle}>Add Risk Type</Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Add Risk Type</ModalHeader>
                        <ModalBody style={{ padding: '0 30px' }}>
                            {this.state.addRiskTypeError ? (
                                <div className="alert alert-danger">{this.state.addRiskTypeError}</div>
                            ) : null}
                            {this.state.addRiskTypeSuccess ? (
                                <div className="alert alert-success">Successfully added</div>
                            ) : null}
                            <form>
                                <h3>Risk Information</h3>
                                <Input
                                    label="Risk Name"
                                    group
                                    type="text"
                                    name="riskName"
                                    value={this.state.riskName}
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
                                <Table>
                                    <TableHead>
                                        <tr>
                                            <th>Field Name</th>
                                            <th>Field Type</th>
                                            <th>Values</th>
                                        </tr>
                                    </TableHead>
                                    <TableBody>
                                        {this.renderTableBody()}
                                    </TableBody>
                                </Table>
                                <h3>Fields</h3>
                                <Input
                                    label="Field Name"
                                    group
                                    type="text"
                                    name="fieldName"
                                    value={this.state.fieldName}
                                    onChange={this.inputChanged}
                                />
                                <div className="form-group">
                                    <label>Field Type</label>
                                    <select
                                        name="fieldType"
                                        className="form-control"
                                        onChange={this.fieldTypeChanged}
                                        value={this.state.fieldType}
                                    >
                                        <option value=""></option>
                                        {this.renderFieldTypes()}
                                    </select>
                                </div>

                                {this.state.showKeyValue ? (
                                    <Table>
                                        <TableHead>
                                            <tr>
                                                <th>Key</th>
                                                <th>Value</th>
                                            </tr>
                                        </TableHead>
                                        <TableBody>
                                            {this.renderKeyValueRows()}
                                            <tr>
                                                <td colSpan="2" className="text-right">
                                                    <Button onClick={this.addKeyValue}>+</Button>
                                                </td>
                                            </tr>
                                        </TableBody>
                                    </Table>
                                ) : null}

                                <Button onClick={this.addField}>Add Field</Button>
                            </form>
                        </ModalBody>
                        <ModalFooter style={{ justifyContent: 'space-between' }}>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                            <Button
                                color="success"
                                onClick={this.save}
                                disabled={!this.state.name && this.state.addedFields.length < 1}
                            >Save</Button>
                        </ModalFooter>
                    </Modal>
                </Col>

                <Col md="6">
                    <h3>Risk Type</h3>
                    <ListGroup>
                        {this.renderParentListItems()}
                    </ListGroup>
                </Col>

                <Col md="6">
                    <h3>Fields</h3>
                    <ListGroup>
                        {this.renderChildListItems()}
                    </ListGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(RiskTypes)

