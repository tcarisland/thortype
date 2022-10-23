import React from 'react';
import FontListItem from './font-list-item';

export default class FontList extends React.Component {
    items: string[] = ["16-segment-display", "anderson", "belleview", "betong", "borgen", "brush-off", "buckley-junior", "cardboard-cutout", "caroline", "college-sans", "dm80", "giovanni", "hairline", "high-society", "hothead", "i8080", "inverted-stencil", "klub-katz", "manos", "metal-plate", "modum", "monomod", "ortho-graphix", "ragtime", "roland", "salome", "snufkin", "solid-sans", "sullivan", "taylor-gothic", "taylor", "tuscan-black", "zx80"];

    renderedItems: string[] = [];


    render() {
        let counter = 0;
        return <div>
            { this.items.map(item => ( <FontListItem key={++counter} name={item}></FontListItem>))}
        </div>
    }
}