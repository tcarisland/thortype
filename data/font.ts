export enum FontStandard {
  OpenType,
  TrueType
}
export interface Font {
  meta: Meta,
  name: string,
  characterMap: CharacterMap,
  type: FontStandard,
  encoding: string
}
export interface CharacterMap {
  characters: Glyph[],
  numberOfGlyphs: number
}
export interface Glyph { }
export interface Meta {
  designerUrl: string,
  licenseUrl: string,
  manufacturerUrl: string,
  description: string,
  sampleText: string
}
