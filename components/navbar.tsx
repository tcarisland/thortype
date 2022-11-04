import React from "react";
import { Nav } from 'react-bootstrap';
import Link from "next/link";
import pages from '../data/pages';
import NavItem from "./nav-item";

//{ FontService.fontList.map(item => ( <FontListItem key={++counter} name={item}></FontListItem>))}


export default class NavBar extends React.Component {

    render() {
        return <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-xl">
                <Link href="/">
                    <a className="navbar-brand">ThorType</a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample07XL">
                    <ul className="navbar-nav mr-auto">
                        {
                            pages.map(page => (<NavItem key={page.name} name={page.name} link={page.link}></NavItem>))
                        }
                    </ul>
                </div>
            </div>
        </Nav>
    }
}