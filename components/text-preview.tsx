import React from 'react';
import { Font } from '../data/font';
import { GetStaticProps } from 'next';
import { Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DownloadIcon from '@mui/icons-material/Download';


export interface TextPreviewProps {
    fontFilePath: string,
    fontName: string,
    font: Font,
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default class TextPreview extends React.Component<TextPreviewProps> {
    fontCssName = "tc-" + this.props.fontName.replace(/\/fonts\/(.*?)\//g, "$1");
    buttonStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded";

    fontStyle = {
        fontFamily: this.fontCssName,
    }


    render(): React.ReactNode {
        return(
            <div>
                <Tooltip title="Try the font with your own text" placement='top'>
                    <div>
                        <textarea className="text-4xl w-full mb-2 bg-slate-100 p-2 pb-32 h-screen-70" defaultValue={this.props.font?.meta.sampleText} style={this.fontStyle}></textarea>
                    </div>
                </Tooltip>
            <div>
            <div className='flex justify-start gap-2'>
                            <Tooltip title="Download" placement='top'>
                                <button className={ this.buttonStyle }>
                                    <a href={this.props.fontFilePath} download>
                                    <DownloadIcon>
                                    </DownloadIcon>
                                    </a>
                                </button>
                            </Tooltip>
                            <Tooltip title='Take Snapshot' placement='top'>
                                <button className={ this.buttonStyle }>
                                    <CameraAltIcon></CameraAltIcon>
                                </button>
                            </Tooltip>
                        </div>
            </div>            
            </div>

        )
    }
}