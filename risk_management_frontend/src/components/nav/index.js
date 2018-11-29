import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    
    render() {
        return (
            <div>
                <Navbar color="indigo" dark expand="lg" scrolling>
                    <NavbarBrand href="/">
                        <strong>Risk Management App</strong>
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                    <Collapse isOpen={this.state.collapse} navbar>
                        <NavbarNav left>
                            <NavItem>
                                <NavLink to="/field-types">Field Types</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/risk-types">Risk Types</NavLink>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default Nav