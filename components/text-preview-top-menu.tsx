import React, { ReactNode } from "react";
import {Tooltip} from "@mui/material";
import {EmojiFlags, EmojiSymbols, TextFields} from "@mui/icons-material";

export interface TextPreviewTopMenuProps {
  fontName: string,
  location: string
}

export interface TextPreviewTopMenuState {
  previewPage: TopMenuAction
}

export enum TopMenuAction {
  TEXT_PREVIEW,
  CHARACTER_LIST
}

interface TopMenuButton {
  action: TopMenuAction,
  icon: ReactNode,
  title: string,
  path: string
}
export default class TextPreviewTopMenu extends React.Component<TextPreviewTopMenuProps, TextPreviewTopMenuState> {
  buttonStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded w-12 h-12";
  buttonList: TopMenuButton[] = [
    {
      action: TopMenuAction.TEXT_PREVIEW,
      icon: <TextFields></TextFields>,
      title: "Text Preview",
      path: "fonts"
    },
    {
      action: TopMenuAction.TEXT_PREVIEW,
      icon: <EmojiSymbols></EmojiSymbols>,
      title: "Character List",
      path: "characterlist"
    },
  ]

  constructor(props: TextPreviewTopMenuProps) {
    super(props);
  }

  getRelativePathName(button: TopMenuButton): string {
    return "/" + button.path + "/" + this.props.fontName
  }

  renderButton(b: TopMenuButton, i: number) {
    return(
      <Tooltip key={"textPreviewButton" + i} title={b.title} placement='left'>
        <button className={this.buttonStyle}>
          <a href={this.getRelativePathName(b)}>
            {b.icon}
          </a>
        </button>
      </Tooltip>
  )
  }
  render(): React.ReactNode {
    let i = 1;

    return <div className="sticky top-2 pb-4"><div className="inline-flex flex-row justify-center space-x-2">
      {
        this.buttonList.map((b) => {
          return(this.renderButton(b, ++i));
        })
      }
    </div></div>
  }
}
