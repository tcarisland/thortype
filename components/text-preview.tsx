import React, { SyntheticEvent } from 'react';
import { Font } from '../data/font';
import { Box, Hidden, Modal, Tooltip, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import domtoimage from 'dom-to-image';
import TextPreviewToolbar, { TextPreviewToolbarAction } from './text-preview-toolbar';
import { timeStamp } from 'console';
import Head from 'next/head';
import { getAutoHeightDuration } from '@mui/material/styles/createTransitions';

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
    lineHeight: number,
    areaWidth: number,
    areaHeight: number
}

export default class TextPreview extends React.Component<TextPreviewProps, TextPreviewState> {
    fontCssName = "tc-" + this.props.fontName.replace(/\/fonts\/(.*?)\//g, "$1");
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
            lineHeight: 40,
            areaWidth: 820,
            areaHeight: 480
        };        
    }

    componentDidMount(): void {
        if(!document) {
            console.log("document is undefined")
            return;
        }
        const sampleTextArea = document.getElementById("fontDemoTextArea");
        sampleTextArea && (sampleTextArea.innerHTML = this.props.font.meta.sampleText);
        //window.addEventListener('resize', () => {console.log("")})
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
        let fontTextarea: HTMLElement = document.getElementById("fontAreaContainerDiv") as HTMLElement;
        const comp = this;
        const scale = 3;
        let style = {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: fontTextarea.clientWidth + 'px',
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
            file && this.convertBase64(file);
        }
    };

    convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onloadend = (e) => {
                console.log(e);
                let myCanvas = document.getElementById("fontDemoTextCanvas");
                let myImage = new Image();
                if(myCanvas && myImage && e.target?.result) {
                    myImage.src = e.target?.result.toString();
                    myImage.onload = () => {
                        var myContext = (myCanvas as HTMLCanvasElement).getContext("2d"); 
                        console.log({
                            "ow": myImage.width, "oh": myImage.height, 
                            "sw": this.state.areaWidth, "sh": this.state.areaHeight
                        })
                        let widthRatio = (this.state.areaWidth * 1.0) / (myImage.width * 1.0);
                        let width = myImage.width * widthRatio;
                        let height = myImage.height * widthRatio;
                        console.log({
                            "widthRatio": widthRatio,
                            "mIw": myImage.width,
                            "mIh": myImage.height,
                            "width": width,
                            "height": height
                        });
                        myContext?.drawImage(myImage, 0, 0, myImage.width * widthRatio, myImage.height * widthRatio);
                    }
                } else {
                    console.log("could not find canvas");
                }                
            };
    
            fileReader.onerror = (error) => {
                console.log({"error": error});
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

    textAreaDynamicStyle(): any {
        return {
            fontFamily: this.fontCssName,
            fontSize: this.state.fontSize + "px",
            lineHeight: this.state.lineHeight + "px",
            width: this.state.areaWidth,
            height: this.state.areaHeight
        }
    }

    buttonStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 mt-2 rounded ";
    textAreaStyle = "col-span-full row-span-full dark:text-slate-900 overflow-hidden ";

    render(): React.ReactNode {
        return(
            <div>
                <Tooltip title="Try the font with your own text" placement='top'>
                    <div id="fontAreaContainerDiv" className="grid grid-cols-1 grid-rows-1 mb-2" style={{width : this.state.areaWidth, height: this.state.areaHeight}}>
                        <canvas id="fontDemoTextCanvas" 
                        className={this.textAreaStyle}
                        width={this.state.areaWidth}
                        height={this.state.areaHeight}>
                        </canvas>
                        <div id="fontDemoTextArea"
                        contentEditable="true"
                        className={ this.textAreaStyle + " " + this.state.textAreaAlignment }
                        style={ this.textAreaDynamicStyle() }>
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