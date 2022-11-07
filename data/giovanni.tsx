import Font from "../model/font";
import { FontStandard } from "../model/font-standard";

const tcgiovanni: Font = {
    name: "giovanni",
    type: FontStandard.TrueType,
    encoding: "data:font/truetype;base64,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",
}
export default tcgiovanni;
