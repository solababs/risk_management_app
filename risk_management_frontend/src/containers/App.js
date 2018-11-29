import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { Container } from 'mdbreact'

import Nav from '../components/nav'
import Risks from './Risks'
import FieldTypes from './FieldTypes'
import RiskTypes from './RiskTypes'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static propTypes = {

    }

    render() {
        return (
            <div className="container-fluid" style={{padding: 0}}>
                <Nav />
                <Container style={{padding:'20px'}}>
                    <Switch>
                        <Route exact path="/" component={Risks} />
                        <Route path="/field-types" component={FieldTypes} />
                        <Route path="/risk-types" component={RiskTypes} />
                    </Switch>
                </Container>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))