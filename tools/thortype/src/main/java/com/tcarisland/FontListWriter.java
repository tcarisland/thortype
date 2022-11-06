package com.tcarisland;
import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FontListWriter {

	private String dir;
	private String fontTsxDir;
    
    public FontListWriter(String dir, String fontTsxDir) {
    	this.dir = dir;
    	this.fontTsxDir = fontTsxDir;
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
            String fontName = "tc" + font.name.replaceAll("-", "");
            File file = new File(String.format("%s/%s.tsx", fontTsxDir, font.name));
            PrintWriter out = new PrintWriter(file);
            String base64 = FontUrlEncoder.getBase64String(font.path);
            out.println("import Font from \"../model/font\";");
            out.println("import { FontStandard } from \"../model/font-standard\";");
            out.println("");
            out.printf("const %s: Font = {%n", fontName);
            out.printf("    name: \"%s\",%n", font.name);
            out.printf("    type: FontStandard.%s,%n", font.type);
            out.printf("    encoded: \"%s\",%n", base64);
            out.println("}");
            out.printf("export default %s;%n", fontName);
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