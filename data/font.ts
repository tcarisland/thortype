export enum FontStandard {
  OpenType,
  TrueType
}
export interface Font {
  meta: Meta,
  name: string,
  type: FontStandard,
  encoding: string
}
export interface Meta {
  designerUrl: string,
  licenseUrl: string,
  manufacturerUrl: string,
  description: string,
  sampleText: string
}
