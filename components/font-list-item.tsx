import React from 'react';
import Image from "next/image";
import Link from 'next/link';

type FontListItemProps = {
    name: string;
}

class FontListItem extends React.Component<FontListItemProps> {

    render() {
        return <div>
            <Link href={"fonts/" + this.props.name}>
                <a>
                    <Image alt={this.props.name} src={"fonts/" + this.props.name + ".jpg"} width="400px" height="300px">                    
                    </Image>
                </a>
            </Link>
        </div>
    }
}

export default FontListItem;