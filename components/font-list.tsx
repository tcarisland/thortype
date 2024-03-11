import React from 'react';
import FontListItem from './font-list-item';
import FontService from '../services/font-service';

export default class FontList extends React.Component {

    renderedItems: string[] = [];

    render() {
        let counter = 0;
        return <div className="fontListBox">
            <div className='fontList'>
                { FontService.fontList.map(item => ( <FontListItem key={++counter} name={item}></FontListItem>))}
            </div>
        </div>
    }
}
