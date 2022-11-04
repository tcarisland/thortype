import React from 'react';
import Link from 'next/link';
import { NavPage } from '../types/nav-page';

export default class NavItem extends React.Component<NavPage> {
    render() {
        return <li className="nav-item">
            <Link href={this.props.link}>
                <a className="nav-link">{this.props.name}</a>
            </Link>
        </li>
    }
}