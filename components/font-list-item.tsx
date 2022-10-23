import React from 'react';
import Image from "next/image";

type FontListItemProps = {
    name: string;
}

class FontListItem extends React.Component<FontListItemProps> {

    render() {
        return <div>
            <Image src={"fonts/" + this.props.name + ".jpg"} width="400px" height="300px"></Image>
        </div>
    }
}

export default FontListItem;