import { Toolbar, Tooltip } from "@mui/material";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import DownloadIcon from '@mui/icons-material/Download';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React, { ReactNode } from "react";
import { Font } from "../data/font";

export interface TextPreviewToolbarProps {
    onToolButtonClicked: Function,
    fontFilePath: string
}

export enum TextPreviewToolbarAction {
    SNAPSHOT,
    ALIGN_LEFT,
    ALIGN_CENTER,
    ALIGN_RIGHT,
    INCREASE_FONT_SIZE,
    DECREASE_FONT_SIZE,
    CAPTION
}

interface TextPreviewToolbarButton {
    action: TextPreviewToolbarAction,
    icon: ReactNode,
    title: string
}

export default class TextPreviewToolbar extends React.Component<TextPreviewToolbarProps> {
    buttonStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded";
    buttonList: TextPreviewToolbarButton[] = [
        {
            action: TextPreviewToolbarAction.SNAPSHOT,
            icon: <CameraAltIcon></CameraAltIcon>,
            title: "Take Snapshot"
        },
        {
            action: TextPreviewToolbarAction.ALIGN_LEFT,
            icon: <FormatAlignLeftIcon></FormatAlignLeftIcon>,
            title: "Align Left"
        },
        {
            action: TextPreviewToolbarAction.ALIGN_CENTER,
            icon: <FormatAlignCenterIcon></FormatAlignCenterIcon>,
            title: "Align Center"
        },
        {
            action: TextPreviewToolbarAction.ALIGN_RIGHT,
            icon: <FormatAlignRightIcon></FormatAlignRightIcon>,
            title: "Align Right"
        },
        {
            action: TextPreviewToolbarAction.DECREASE_FONT_SIZE,
            icon: <TextDecreaseIcon></TextDecreaseIcon>,
            title: "Decrease Font Size"
        },
        {
            action: TextPreviewToolbarAction.INCREASE_FONT_SIZE,
            icon: <TextIncreaseIcon></TextIncreaseIcon>,
            title: "Increase Font Size"
        },
        {
            action: TextPreviewToolbarAction.CAPTION,
            icon: <AddPhotoAlternateIcon></AddPhotoAlternateIcon>,
            title: "Caption Image"
        }
    ]

    renderButton(b: TextPreviewToolbarButton, i: number) {
        return(
            <Tooltip key={"textPreviewButton" + ++i} title={b.title} placement='top'>
                <button className={this.buttonStyle} onClick={() => { this.props.onToolButtonClicked(b.action);}}>
                    { b.icon }
                </button>
            </Tooltip>
        )
    }

    render(): React.ReactNode {
        let i = 1;
        return(
            <div key={"textPreviewButton0"} className='flex justify-start gap-2'>
                <Tooltip title="Download" placement='top'>
                    <button className={this.buttonStyle}>
                        <a href={this.props.fontFilePath} download>
                            <DownloadIcon></DownloadIcon>
                        </a>
                    </button>
                </Tooltip>
                {
                    this.buttonList.map((b) => {
                        return(this.renderButton(b, ++i));
                    })
                }
            </div>
        )
    }
}