import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    Row, Col, Input, Button, CheckBox
} from 'mdbreact'

import * as risksActions from '../../actions/risks'


class Risks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            riskTypes: [],
            fieldsToRender: []
        }
    }

    componentDidMount() {
        this.props.riskAction.getRiskTypes()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.risks.riskTypes !== nextProps.risks.riskTypes) {
            this.setState({
                riskTypes: nextProps.risks.riskTypes
            })
        }

        if (this.props.risks.isGettingRiskTypes !== nextProps.risks.isGettingRiskTypes) {
            this.setState({ isGettingRiskTypes: nextProps.risks.isGettingRiskTypes })
        }
    }

    inputChanged = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    renderRiskTypes = () => {
        if (this.state.riskTypes.length > 0) {
            return this.state.riskTypes.map((risk, index) => {
                return <option key={index} value={risk.id}>{risk.name}</option>
            })
        }

        return null
    }

    riskTypeChanged = (e) => {
        this.setState({ riskType: e.target.value })
        let fields = null

        this.state.riskTypes.map(risk => {
            if (risk.id === e.target.value) {
                fields = risk.fields
            }
        })

        this.setState({ fieldsToRender: fields })
    }

    renderFields = (fields) => {
        return fields.map((field, index) => {
            if (field.type === 'Text') {
                return (
                    <Input
                        key={index}
                        label={field.name}
                        group
                        type="text"
                    />
                )
            } else if (field.type === 'Boolean') {
                return (
                    <Input
                        key={index}
                        label={field.name}
                        type="checkbox"
                    />
                )
            } else if (field.type === 'Enumeration') {
                return (
                    <div className="form-group" key={index}>
                        <label>{field.name}</label>
                        <select className="form-control">
                            <option value=""></option>
                            {field.values.map(val => {
                                return <option value={val.key}>{val.value}</option>
                            })}
                        </select>
                    </div>
                )
            } else if (field.type === 'Number') {
                return (
                    <Input
                        key={index}
                        label={field.name}
                        type="number"
                    />
                )
            }
        })
    }

    save = () => {
        alert('Saving...')
    }


    render() {
        return (
            <Row>
                <Col md="6" className="offset-md-3">
                    <h1 className="text-center">Risks</h1>

                    <div className="form-group">
                        <label>Risk Type</label>
                        <select
                            name="riskType"
                            className="form-control"
                            onChange={this.riskTypeChanged}
                            value={this.state.riskType}
                        >
                            <option value=""></option>
                            {this.renderRiskTypes()}
                        </select>
                    </div>

                    {this.renderFields(this.state.fieldsToRender)}
                    <Button
                        color="success"
                        onClick={this.save}
                        disabled={!this.state.riskType}
                    >Save</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Risks)

