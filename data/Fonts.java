import java.io.File;
import java.io.PrintWriter;

public class Fonts {

    public static enum FontStandard {
        OpenType("OpenType"),
        TrueType("TrueType");

        String type;

        FontStandard(String t) {
            type = t;
        } 
    }

    public static class Font {
        String name;
        FontStandard type;
        public Font(String name, FontStandard type) {
            this.name = name;
            this.type = type;
        }
    }

    static Font fonts[] = {
        new Font("pipeline", FontStandard.OpenType),
        new Font("tuscan-modular", FontStandard.OpenType),
        new Font("16-segment-display", FontStandard.OpenType),
        new Font("cardboard-cutout", FontStandard.OpenType),
        new Font("demodulator", FontStandard.TrueType),
        new Font("anderson", FontStandard.TrueType),
        new Font("belleview", FontStandard.OpenType),
        new Font("betong", FontStandard.TrueType),
        new Font("borgen", FontStandard.OpenType),
        new Font("brush-off", FontStandard.TrueType),
        new Font("buckley-junior", FontStandard.OpenType),
        new Font("caroline", FontStandard.TrueType),
        new Font("college-sans", FontStandard.TrueType),
        new Font("dm80", FontStandard.OpenType),
        new Font("giovanni", FontStandard.TrueType),
        new Font("hairline", FontStandard.OpenType),
        new Font("high-society", FontStandard.TrueType),
        new Font("hothead", FontStandard.TrueType),
        new Font("i8080", FontStandard.TrueType),
        new Font("inverted-stencil", FontStandard.TrueType),
        new Font("klub-katz", FontStandard.TrueType),
        new Font("manos", FontStandard.TrueType),
        new Font("metal-plate", FontStandard.OpenType),
        new Font("modum", FontStandard.TrueType),
        new Font("monomod", FontStandard.TrueType),
        new Font("ortho-graphix", FontStandard.OpenType),
        new Font("ragtime", FontStandard.OpenType),
        new Font("roland", FontStandard.TrueType),
        new Font("salome", FontStandard.TrueType),
        new Font("snufkin", FontStandard.OpenType),
        new Font("solid-sans", FontStandard.TrueType),
        new Font("sullivan", FontStandard.TrueType),
        new Font("taylor-gothic", FontStandard.OpenType),
        new Font("taylor", FontStandard.OpenType),
        new Font("tuscan-black", FontStandard.OpenType),
        new Font("zx80", FontStandard.TrueType)
    };

    public static void main(String args[]) throws Exception {
        File fontList = new File("font-list.tsx");
        PrintWriter flout = new PrintWriter(fontList);
        for(Font font: fonts) {
            String fontName = "tc" + font.name.replaceAll("-", "");
            File file = new File(font.name + ".tsx");
            PrintWriter out = new PrintWriter(file);
            out.println("import Font from \"../model/font\";");
            out.println("import { FontStandard } from \"../model/font-standard\";");
            out.println("");
            out.printf("const %s: Font = {%n", fontName);
            out.printf("    name: \"%s\",%n", font.name);
            out.printf("    type: FontStandard.%s%n", font.type);
            out.println("}");
            out.printf("export default %s%n;", fontName);
            out.close();

            flout.printf("import %s from \"./%s\";%n", fontName, font.name);
        }

        flout.println("import Font from \"../model/font\";\n\nconst fonts: Font[] = [");

        for(Font font: fonts) {
            String fontName = "    tc" + font.name.replaceAll("-", "");
            flout.println(fontName + ",");
        }

        flout.println("];\n\nexport default fonts;");
        flout.close();
    }

}