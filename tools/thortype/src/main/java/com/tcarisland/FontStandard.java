package com.tcarisland;

public enum FontStandard {
    OpenType("OpenType", ".otf"),
    TrueType("TrueType", ".ttf");

    String type;
    String suffix;

    FontStandard(String t, String s) {
        type = t;
        this.suffix = s;
    } 
}