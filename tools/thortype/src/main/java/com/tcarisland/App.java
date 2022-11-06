package com.tcarisland;

import java.nio.file.Path;

public class App 
{
	
	private static final String URL = "../../public/static/fonts";
	
    public static void main( String[] args ) {
    	FontUrlEncoder fue = new FontUrlEncoder(URL);
    	
    	Path path = fue.getOpenTypeFonts().get(0);
    	System.out.println(path.toAbsolutePath());
    	System.out.println("\n\n");
    	System.out.println(fue.getBase64String(path) + "\n");
    }    
    
}
