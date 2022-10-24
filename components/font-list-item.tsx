import React from 'react';
import Image from "next/image";
import Link from 'next/link';

type FontListItemProps = {
    name: string;
}

const width = "400";
const height = "300";

class FontListItem extends React.Component<FontListItemProps> {

    render() {
        return <div>
            <Link href={"fonts/" + this.props.name}>
                <a>
                    <Image className='fontListItem' alt={this.props.name} src={"fonts/" + this.props.name + ".jpg"} width={ width } height={ height }>
                    </Image>
                </a>
            </Link>
        </div>
    }
}

export default FontListItem;