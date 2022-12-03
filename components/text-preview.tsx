import React from 'react';
import { Font } from '../data/font';
import { GetStaticProps } from 'next';
import { Box, Modal, Tooltip, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DownloadIcon from '@mui/icons-material/Download';
import domtoimage from 'dom-to-image';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import { fontFamily } from '@mui/system';

export interface TextPreviewProps {
    fontFilePath: string,
    fontName: string,
    font: Font,
}

export interface TextPreviewState {
    open: boolean,
    base64Snapshot: string,
    textAreaAlignment: string,
    fontSize: number,
    lineHeight: number
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}, // will be passed to the page component as props
    }
}

export enum TextPreviewAlign {
    LEFT,
    CENTER,
    RIGHT
}

export default class TextPreview extends React.Component<TextPreviewProps, TextPreviewState> {
    fontCssName = "tc-" + this.props.fontName.replace(/\/fonts\/(.*?)\//g, "$1");
    fontStyle = {
        fontFamily: this.fontCssName,
    }
    textAreaStyle = "w-full mb-2 bg-slate-100 p-2 pb-32 h-screen-70 ";
    buttonStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded";
    
    constructor(props: TextPreviewProps) {
        super(props);
        this.state = {
            open: false,
            base64Snapshot: "",
            textAreaAlignment: "",
            fontSize: 36,
            lineHeight: 40
        };        
    }

    componentDidMount(): void {
        const sampleTextArea = document.getElementById("fontDemoTextArea");
        sampleTextArea && (sampleTextArea.innerHTML = this.props.font.meta.sampleText);
    }

    updateSnapshot(snapshot: string) {
        this.setState({
            ...this.state,
            open: true,
            base64Snapshot: snapshot
        }); 
    }

    increaseFontSize(increaseAmount: number) {
        console.log({"increaseAmount": increaseAmount});
        const lh = this.state.lineHeight + increaseAmount;
        const fs = this.state.fontSize + increaseAmount;
        this.setState({
            ...this.state,
            lineHeight: lh,
            fontSize: fs
        });
    }

    createSnapshot() {
        let fontTextarea: HTMLElement = document.getElementById("fontDemoTextArea") as HTMLElement;
        const comp = this;
        const scale = 10;
        let style = {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            // use original width of DOM element to avoid part of the image being cropped out
            width: fontTextarea.clientWidth + 'px',
            // use original height of DOM element
            height: fontTextarea.clientHeight + 'px'
        };
        const opt = {
            width: fontTextarea.clientWidth * scale,
            height: fontTextarea.clientHeight * scale,
            style: style
        }
        domtoimage.toPng(fontTextarea, opt)
            .then(function (dataUrl: string) {
                comp.updateSnapshot(dataUrl);    
            })
            .catch(function (error: any) {
                console.error('oops, something went wrong!', error);
            });
    }

    style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        color: "black",
        p: 4,
    };

    handleClose() {
        this.setState({
            ...this.state,
            open: false
        });
    }

    uploadImage() {
        console.log("uploadImage clicked");
    }

    updateAlignment(align: TextPreviewAlign) {
        let alignment: string = "";
        switch(align) {
            case TextPreviewAlign.LEFT:
                alignment = "text-left";
                break;
            case TextPreviewAlign.CENTER:
                alignment = "text-center";
                break;
            case TextPreviewAlign.RIGHT:
                alignment = "text-right";
                break;
        }
        this.setState({
            ...this.state,
            textAreaAlignment: alignment
        });
    }

    render(): React.ReactNode {
        return(
            <div>
                <Tooltip title="Try the font with your own text" placement='top'>
                    <div>
                        <div id="fontDemoTextArea" contentEditable="true" className={ this.textAreaStyle + " " + this.state.textAreaAlignment } style={{fontFamily: this.fontCssName, fontSize: this.state.fontSize + "px", lineHeight: this.state.lineHeight + "px"}}>
                        </div>
                    </div>
                </Tooltip>
            <div>
                <div className='flex justify-start gap-2'>
                        <Tooltip title="Download" placement='top'>
                            <button className={ this.buttonStyle }>
                                <a href={this.props.fontFilePath} download>
                                <DownloadIcon></DownloadIcon>
                                </a>
                            </button>
                        </Tooltip>
                        <Tooltip title='Take Snapshot' placement='top'>
                            <button className={ this.buttonStyle } onClick={() => { this.createSnapshot() }}>
                                <CameraAltIcon></CameraAltIcon>
                            </button>
                        </Tooltip>
                        <Tooltip title="Align Left" placement='top'>
                            <button className={ this.buttonStyle } onClick={() => { this.updateAlignment(TextPreviewAlign.LEFT)}} >
                                <FormatAlignLeftIcon></FormatAlignLeftIcon>
                            </button>
                        </Tooltip>
                        <Tooltip title="Align Center" placement='top'>
                            <button className={ this.buttonStyle } onClick={() => { this.updateAlignment(TextPreviewAlign.CENTER)}}>
                                <FormatAlignCenterIcon></FormatAlignCenterIcon>
                            </button>
                        </Tooltip>
                        <Tooltip title="Align Right" placement='top'>
                            <button className={ this.buttonStyle } onClick={() => { this.updateAlignment(TextPreviewAlign.RIGHT)}}>
                                <FormatAlignRightIcon></FormatAlignRightIcon>
                            </button>
                        </Tooltip>
                        <Tooltip title="Increase Font Size">
                            <button className={ this.buttonStyle } onClick={() => {this.increaseFontSize(4)
                            }}>
                                <TextIncreaseIcon></TextIncreaseIcon>
                            </button>
                        </Tooltip>
                        <Tooltip title="Decrease Font Size">
                            <button className={ this.buttonStyle } onClick={() => {this.increaseFontSize(-4)}}>
                                <TextDecreaseIcon></TextDecreaseIcon>
                            </button>
                        </Tooltip>
                        <Tooltip title="Caption Image" placement='top'>
                            <button className={ this.buttonStyle } onClick={() => { this.uploadImage()}}>
                                <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <Modal
                    open={this.state.open}
                    onClose={() => { this.handleClose() }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={this.style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            { this.props.fontName } snapshot
                        </Typography>
                        <img id="snapshotImage" src={this.state.base64Snapshot}></img>
                        <Tooltip title="Download" placement='top'>
                            <button className={ this.buttonStyle + "mt-2"}>
                                <a download={ this.props.fontName + "-snapshot.png"} href={this.state.base64Snapshot}>
                                    <DownloadIcon>
                                    </DownloadIcon>
                                </a>
                            </button>
                        </Tooltip>
                    </Box>
                </Modal>
            </div>

        )
    }
}