import React, {ReactElement, SyntheticEvent} from 'react';
import { Font } from '../data/font';

export interface CharacterListProps {
    fontFilePath: string,
    fontName: string,
    font: Font,
}

export interface CharacterListState {
  width: number,
  height: number
}

export default class CharacterList extends React.Component<CharacterListProps, CharacterListState> {
    i = 0;
    fontCssName = "tc-" + this.props.fontName.replace(/\/fonts\/(.*?)\//g, "$1");
    
    textAreaDynamicStyle(): any {
      return {
        fontFamily: this.fontCssName,
        fontSize: "32px",
        lineHeight: "32px",
      }
    }
  
    constructor(props: CharacterListProps) {
        super(props);
        this.state = {
          width: 0,
          height: 0
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
              width: w,
              height: h
          });
      })
    }

    renderGlyph(glyph: number, i: number): ReactElement<any, any> {
      let unicodeString = String.fromCharCode(glyph);
      return <div style={{border: "1px solid black", padding: "1em", margin: "1em", textAlign: "center"}} key={"glyphPreviewBox" + i}>
        { unicodeString }
      </div>
    }
  
    render(): React.ReactNode {
        return(
          <div className='grid grid-cols-9 justify-center m-auto ' style={ this.textAreaDynamicStyle() }>
            {                                  
              this.props.font &&
              this.props.font.characterMap.subtables[0].characterList.map(
                characterIndex => { return this.renderGlyph(characterIndex, this.i++) }
                )
            }
          </div>

        )
    }
}