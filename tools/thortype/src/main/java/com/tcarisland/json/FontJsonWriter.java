package com.tcarisland.json;

import com.tcarisland.FontListWriter;
import com.tcarisland.data.Constants;

public class FontJsonWriter {
	
	public static void main(String args[]) {
		FontListWriter flw = new FontListWriter();
		flw.loadFontsFromDirectory(Constants.FONT_DIR_URL).stream().forEach(u -> {			
			System.out.printf("%s %s %s%n", u.getName(), u.getPath(), u.getType());
		});;
	}

}
