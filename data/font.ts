export enum FontStandard {
  OpenType,
  TrueType
}

export interface Glyph {
  glyphId: string,
  unicode: number
}

export interface CharacterMap {
  numberOfGlyphs: number,
  glyphs: Glyph[]
}

export interface Meta {
  designerUrl: string,
  licenseUrl: string,
  manufacturerUrl: string,
  description: string,
  sampleText: string
}

export interface Font {
  name: string,
  meta: Meta,
  characterMap: CharacterMap,
  type: FontStandard,
  dataUri: string
}

