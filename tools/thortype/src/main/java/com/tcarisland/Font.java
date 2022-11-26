package com.tcarisland;

import java.nio.file.Path;

public class Font {
    String name;
	FontStandard type;
    Path path;
    public Font(String name, FontStandard type, Path path) {
        this.name = name;
        this.type = type;
        this.path = path;
    }
    
    public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public FontStandard getType() {
		return type;
	}
	public void setType(FontStandard type) {
		this.type = type;
	}
	public Path getPath() {
		return path;
	}
	public void setPath(Path path) {
		this.path = path;
	}

}