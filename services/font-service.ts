import FontFileSuffix from "../model/font-file-suffix";
import { FontStandard } from "../model/font-standard";
import Font from "../model/font";

export default class FontService {

    static get fontList(): string[] {
        return fontList.map(font => font.name);
    }

    static get fontFileSuffixes(): FontFileSuffix[] {
        return fontFileSuffixes;
    }

    public static findFont(name: string): Font | undefined {
        return fontList.find(font => font.name === name);
    }

    public static getFontFilePath(font: Font) {
        return font.name + fontFileSuffixes.find(suffix => suffix.type === font.type)?.suffix;
    }

}

const fontFileSuffixes: FontFileSuffix[] = [
    { type: FontStandard.OpenType, suffix: ".otf" },
    { type: FontStandard.TrueType, suffix: ".ttf" }
]

const fontList: Font[] = [
    { "name": "pipeline", "type": FontStandard.OpenType },
    { "name": "tuscan-modular", "type": FontStandard.OpenType },
    { "name": "16-segment-display", "type": FontStandard.OpenType },
    { "name": "anderson", "type": FontStandard.TrueType },
    { "name": "belleview", "type": FontStandard.OpenType },
    { "name": "betong", "type": FontStandard.TrueType },
    { "name": "borgen", "type": FontStandard.OpenType },
    { "name": "brush-off", "type": FontStandard.TrueType },
    { "name": "buckley-junior", "type": FontStandard.OpenType },
    { "name": "cardboard-cutout", "type": FontStandard.OpenType },
    { "name": "caroline", "type": FontStandard.TrueType },
    { "name": "college-sans", "type": FontStandard.TrueType },
    { "name": "dm80", "type": FontStandard.OpenType },
    { "name": "giovanni", "type": FontStandard.TrueType },
    { "name": "hairline", "type": FontStandard.OpenType },
    { "name": "high-society", "type": FontStandard.TrueType },
    { "name": "hothead", "type": FontStandard.TrueType },
    { "name": "i8080", "type": FontStandard.TrueType },
    { "name": "inverted-stencil", "type": FontStandard.TrueType },
    { "name": "klub-katz", "type": FontStandard.TrueType },
    { "name": "manos", "type": FontStandard.TrueType },
    { "name": "metal-plate", "type": FontStandard.OpenType },
    { "name": "modum", "type": FontStandard.TrueType },
    { "name": "monomod", "type": FontStandard.TrueType },
    { "name": "ortho-graphix", "type": FontStandard.OpenType },
    { "name": "ragtime", "type": FontStandard.OpenType },
    { "name": "roland", "type": FontStandard.TrueType },
    { "name": "salome", "type": FontStandard.TrueType },
    { "name": "snufkin", "type": FontStandard.OpenType },
    { "name": "solid-sans", "type": FontStandard.TrueType },
    { "name": "sullivan", "type": FontStandard.TrueType },
    { "name": "taylor-gothic", "type": FontStandard.OpenType },
    { "name": "taylor", "type": FontStandard.OpenType },
    { "name": "tuscan-black", "type": FontStandard.OpenType },
    { "name": "zx80", "type": FontStandard.TrueType }
];
