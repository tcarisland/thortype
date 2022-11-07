package com.tcarisland;
import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FontListWriter {

	private String dir;
	private String fontTsxDir;
	private String fontCssDir;
    
    public FontListWriter(String dir, String fontTsxDir, String fontCssDir) {
    	this.dir = dir;
    	this.fontTsxDir = fontTsxDir;
    	this.fontCssDir = fontCssDir;
    }

    public List<Font> loadFontsFromDirectory(String dir) {
    	FontUrlEncoder fue = new FontUrlEncoder(dir);
    	ArrayList<Font> fonts = new ArrayList<Font>();
    	
    	for(FontStandard fs: FontStandard.values()) {
        	fonts.addAll(fue
        			.getFonts(fs.suffix)
        			.stream().map(u -> { 
        				return new Font(u.toFile().getName().replaceAll(fs.suffix, ""), fs, u);
        				})
        			.collect(Collectors.toList()));    		    	}
    	return fonts;
    }
    
    public void run() throws Exception {
        File fontList = new File(String.format("%s/font-list.tsx", fontTsxDir));
        PrintWriter flout = new PrintWriter(fontList);
        List<Font> fonts = this.loadFontsFromDirectory(dir);
        for(Font font: fonts) {
            String base64 = FontUrlEncoder.getBase64String(font.path);
            switch(font.type) {
			case OpenType:
				base64 = String.format("data:font/opentype;base64,%s", base64);
				break;
			case TrueType:
				base64 = String.format("data:font/truetype;base64,%s", base64);
				break;
			default:
				throw new IllegalArgumentException();
            }
            String fontName = "tc" + font.name.replaceAll("-", "");
            File file = new File(String.format("%s/%s.tsx", fontTsxDir, font.name));
            File cssFile = new File(String.format("%s/%s.css", fontCssDir, font.name));
            PrintWriter out = new PrintWriter(file);
            PrintWriter cssOut = new PrintWriter(cssFile);
            cssOut.println("@font-face {");
            cssOut.println("font-display: block;");
            cssOut.printf("font-family: \"tc-%s\";%n", font.name);
            cssOut.printf("src: %s;%n", base64);
            cssOut.println("}");
            cssOut.close();

            out.println("import Font from \"../model/font\";");
            out.println("import { FontStandard } from \"../model/font-standard\";");
            out.println("");
            out.printf("const %s: Font = {%n", fontName);
            out.printf("    name: \"%s\",%n", font.name);
            out.printf("    type: FontStandard.%s,%n", font.type);
            out.printf("    encoding: \"%s\",%n", base64);
            out.println("}");
            out.printf("export default %s;%n", fontName);
            out.close();
            cssOut.close();

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