package com.thortype.tools.opentype;

import com.thortype.tools.typescript.FontTsxField;
import lombok.Data;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.util.Map;

@Data
public class OpenTypeCharacterMap {
  @FontTsxField("number")
  private long numberOfGlyphs;
  @FontTsxField("Glyph[]")
  private OpenTypeCharacter[] characters;
}
