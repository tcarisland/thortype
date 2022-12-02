import React from 'react';
import { Font } from '../data/font';
import { GetStaticProps } from 'next';
import { Box, Modal, Tooltip, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DownloadIcon from '@mui/icons-material/Download';


export interface TextPreviewProps {
    fontFilePath: string,
    fontName: string,
    font: Font,
}

export interface TextPreviewState {
    open: boolean,
    base64Snapshot: string
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default class TextPreview extends React.Component<TextPreviewProps, TextPreviewState> {
    fontCssName = "tc-" + this.props.fontName.replace(/\/fonts\/(.*?)\//g, "$1");
    buttonStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded";

    constructor(props: TextPreviewProps) {
        super(props);
        this.state = {
            open: false,
            base64Snapshot: ""
        };
    }

    fontStyle = {
        fontFamily: this.fontCssName,
    }

    createSnapshot() {
        this.setState({
            ...this.state,
            open: true
        })
    }

    style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        color: "black",
        p: 4,
      };

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
                                    <button className={ this.buttonStyle } onClick={() => { this.createSnapshot() }}>
                                        <CameraAltIcon></CameraAltIcon>
                                    </button>
                                </Tooltip>
                            </div>
                </div>
                <Modal
                    open={this.state.open}
                    onClose={() => { this.setState({ open: false }) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={this.style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            { this.props.fontName } snapshot
                        </Typography>
                        <img src={this.state.base64Snapshot}>

                        </img>
                    </Box>
                </Modal>
            </div>

        )
    }
}