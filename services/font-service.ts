import FontFileSuffix from "../model/font-file-suffix";
import { FontStandard } from "../model/font-standard";
import Font from "../model/font";
import fonts from "../data/font-list";

export default class FontService {

    static get fontList(): string[] {
        return fonts.map(font => font.name);
    }

    static get fontFileSuffixes(): FontFileSuffix[] {
        return fontFileSuffixes;
    }

    public static findFont(name: string): Font | undefined {
        return fonts.find(font => font.name === name);
    }

    public static getFontFilePath(font: Font) {
        return font.name + fontFileSuffixes.find(suffix => suffix.type === font.type)?.suffix;
    }

}

const fontFileSuffixes: FontFileSuffix[] = [
    { type: FontStandard.OpenType, suffix: ".otf" },
    { type: FontStandard.TrueType, suffix: ".ttf" }
]
