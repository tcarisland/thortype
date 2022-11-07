package com.tcarisland;

import java.nio.file.Path;

public class App 
{
	
	private static final String URL = "../../public/static/fonts";
	private static final String FONT_OUT = "../../data";
	private static final String FONT_CSS_OUT = "../../styles/fonts";
	
    public static void main( String[] args ) {
    	FontListWriter writer = new FontListWriter(URL, FONT_OUT, FONT_CSS_OUT);
    	try {
			writer.run();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }    
    
}
