package com.tcarisland;

import com.tcarisland.data.Constants;

public class App 
{
	
	public static void main( String[] args ) {
    	FontListWriter writer = new FontListWriter(Constants.FONT_DIR_URL, Constants.FONT_LIST_OUT);
    	try {
			writer.run();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }    
    
}
