import React, {ReactElement, SyntheticEvent, useState} from 'react';
import { Font } from '../data/font';

export interface CharacterListProps {
    fontFilePath: string,
    fontName: string,
    font: Font,
}

export interface CharacterListState {
  width: number,
  height: number,
  fontFamily: string,
  fontSize: number,
  gridTemplateColumns: string,
}

export default class CharacterList extends React.Component<CharacterListProps, CharacterListState> {
    i = 0;
    fontCssName = "tc-" + this.props.fontName.replace(/\/fonts\/(.*?)\//g, "$1");
    glyphSize = 100
    padding= 20

    constructor(props: CharacterListProps) {
        super(props);
        this.state = {
          width: 1920,
          height: 1080,
          fontFamily: this.fontCssName,
          fontSize: 48,
          gridTemplateColumns: "repeat(" +this.calculateColumns(1920)+ ", 1fr)"
        };
    }

    componentDidMount(): void {
      if(!document || !window) {
          console.log("document is undefined")
          return;
      }
      window.addEventListener('resize', () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          this.setState({
              ...this.state,
              gridTemplateColumns: "repeat(" + this.calculateColumns(w)+ ", 1fr)",
              width: w,
              height: h
          });
          console.log("WIDTH")
          console.log(this.state.width)
      })
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.setState({
        ...this.state,
        gridTemplateColumns: "repeat(" + this.calculateColumns(w)+ ", 1fr)",
        fontFamily: this.fontCssName,
        width: w,
        height: h
      });
    }

    calculateColumns(width: number) {
      const cols = Math.floor(width / (this.glyphSize + (this.padding * 2))) - 2
      return cols >= 3 ? cols : 3
    }

    renderGlyph(glyph: number, i: number): ReactElement<any, any> {
      let unicodeString = String.fromCharCode(glyph);
      return <div style={{
        border: "1px solid black",
        width: this.glyphSize + "px",
        height: this.glyphSize + "px",
        lineHeight: "80px",
        textAlign: "center"}} key={"glyphPreviewBox" + i}>
        { unicodeString }
      </div>
    }

  isCharacterListNotEmpty() {
      return this.props.font &&
        this.props.font.characterMap &&
        this.props.font.characterMap.subtables[0] &&
        this.props.font.characterMap.subtables[0].characterList &&
        this.props.font.characterMap.subtables[0].characterList.length
  }

  render(): React.ReactNode {
        return(
          <div className="overflow-y-auto">
            {
              !this.isCharacterListNotEmpty() &&
              <div style={{
                margin: "auto",
                width: "50%",
                padding: "10px",
                textAlign: "center"
              }}>
                <p>
                  Oops... nothing to see here!
                </p>
                <p>
                  { this.props.fontName.charAt(0).toUpperCase() +  this.props.fontName.slice(1) + " " }
                   hasn&apos;t been formatted for preview yet.
                </p>
                <p>
                  Come back later.
                </p>
              </div>
            }
            <div className='grid justify-between gap-2'
                 style={{
                   width: this.state.width + "px",
                   height: this.state.height + "px",
                   fontFamily: this.state.fontFamily,
                   fontSize: this.state.fontSize + "px",
                   lineHeight: this.state.fontSize + "px",
                   gridTemplateColumns: this.state.gridTemplateColumns
                 }}>
              {
                this.isCharacterListNotEmpty() &&
                this.props.font.characterMap.subtables[0].characterList.map(
                  characterIndex => {
                    return this.renderGlyph(characterIndex, this.i++)
                  }
                )
              }
            </div>
          </div>

        )
    }
}
