package com.tcarisland;

import java.nio.file.Path;

public class App 
{
	
	private static final String URL = "../../public/static/fonts";
	private static final String FONT_OUT = "../../data";
	
    public static void main( String[] args ) {
    	FontListWriter writer = new FontListWriter(URL, FONT_OUT);
    	try {
			writer.run();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }    
    
}
