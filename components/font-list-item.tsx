import React from 'react';

type FontListItemProps = {
    name: string;
    children: React.ReactNode;
}

class FontListItem extends React.Component<FontListItemProps> {

    render() {
        return <div>
            <h1>
                {this.props.name}
            </h1>
        </div>
    }
}

export default FontListItem;