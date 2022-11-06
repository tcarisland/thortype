import React from 'react';
import Image from "next/image";
import Link from 'next/link';

type FontListItemProps = {
    name: string;
}

const width = "300";
const height = "200";

class FontListItem extends React.Component<FontListItemProps> {

    ucwords(str: string): string {
        str = str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
            function (firstLetter) {
                return firstLetter.toUpperCase();
            });
        return str.replace("-", " ");
    }

    render() {
        return <div>
            <label htmlFor={this.props.name} className='block'>{this.ucwords(this.props.name)}</label>
            <Link id={this.props.name} href={"fonts/" + this.props.name}>
                <a>
                    <Image className='fontListItem' alt={this.props.name} src={"fonts/" + this.props.name + ".jpg"} width={width} height={height}>
                    </Image>
                </a>
            </Link>
        </div>
    }
}

export default FontListItem;