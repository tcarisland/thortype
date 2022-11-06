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
}