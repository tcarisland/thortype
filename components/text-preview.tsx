import React, { SyntheticEvent } from 'react';
import { Font } from '../data/font';
import { Box, Hidden, Modal, Tooltip, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import domtoimage from 'dom-to-image';
import TextPreviewToolbar, { TextPreviewToolbarAction } from './text-preview-toolbar';

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

export default class TextPreview extends React.Component<TextPreviewProps, TextPreviewState> {
    buttonStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded";
    fontCssName = "tc-" + this.props.fontName.replace(/\/fonts\/(.*?)\//g, "$1");
    textAreaStyle = "w-full mb-2 bg-slate-100 p-2 pb-32 h-screen-70 overflow-hidden ";
    fileInput: HTMLInputElement | undefined = undefined;
    fontStyle = {
        fontFamily: this.fontCssName,
    }
    boxStyle = {
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

    setFileInputRef: (element: HTMLInputElement) => void;

    constructor(props: TextPreviewProps) {
        super(props);
        this.setFileInputRef = (element: HTMLInputElement) => {
            this.fileInput = element;
        };
        this.state = {
            open: false,
            base64Snapshot: "",
            textAreaAlignment: "",
            fontSize: 36,
            lineHeight: 40
        };        
    }

    componentDidMount(): void {
        if(!document) {
            console.log("document is undefined")
            return;
        }
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
        const lh = this.state.lineHeight + increaseAmount;
        const fs = this.state.fontSize + increaseAmount;
        this.setState({
            ...this.state,
            lineHeight: lh,
            fontSize: fs
        });
    }

    createSnapshot() {
        if(!document) {
            console.error("document is undefined")
            return;
        }
        let fontTextarea: HTMLElement = document.getElementById("fontDemoTextArea") as HTMLElement;
        const comp = this;
        const scale = 5;
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

    handleClose() {
        this.setState({
            ...this.state,
            open: false
        });
    }

    uploadImage() {
        this.fileInput?.click();
    }

    handleFileUpload = (event: SyntheticEvent) => {
        const target = event && event.target as HTMLInputElement;
        if(target) {
            const file = (target && target.files) && target.files[0];
            const base64Image = file && this.convertBase64(file);
            base64Image && base64Image.then((e) => {
                const sampleTextArea = document.getElementById("fontDemoTextArea");
                sampleTextArea && (sampleTextArea.style.background = 'url(' + e + ') no-repeat left top');
                sampleTextArea && (sampleTextArea.style.backgroundSize = "100%");
            });
        }
    };

    convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    updateAlignment(alignment: string) {
        this.setState({
            ...this.state,
            textAreaAlignment: alignment
        });
    }

    onToolButtonClicked(action: TextPreviewToolbarAction) {
        switch(action) {
            case TextPreviewToolbarAction.SNAPSHOT:
                this.createSnapshot();
                break;
            case TextPreviewToolbarAction.ALIGN_LEFT:
                this.updateAlignment("text-left");
                break;
            case TextPreviewToolbarAction.ALIGN_CENTER:
                this.updateAlignment("text-center");
                break;
            case TextPreviewToolbarAction.ALIGN_RIGHT:
                this.updateAlignment("text-right");
                break;
            case TextPreviewToolbarAction.INCREASE_FONT_SIZE:
                this.increaseFontSize(4);
                break;
            case TextPreviewToolbarAction.DECREASE_FONT_SIZE:
                this.increaseFontSize(-4);
                break;
            case TextPreviewToolbarAction.CAPTION:
                this.uploadImage();
                break;
        }
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
                <input
                    ref={this.setFileInputRef}
                    onChange={this.handleFileUpload}
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    multiple={false}
                />
                <TextPreviewToolbar fontFilePath={( this.props.fontFilePath )} onToolButtonClicked={(e: TextPreviewToolbarAction) => { this.onToolButtonClicked(e) }}></TextPreviewToolbar>
            </div>
                <Modal
                    open={this.state.open}
                    onClose={() => { this.handleClose() }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={this.boxStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            { this.props.fontName } snapshot
                        </Typography>
                        <img id="snapshotImage" src={this.state.base64Snapshot}></img>
                        <Tooltip title="Download" placement='top'>
                            <button className={ this.buttonStyle + " mt-4"}>
                                <a download={ this.props.fontName + "-snapshot.png"} href={ this.state.base64Snapshot }>
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