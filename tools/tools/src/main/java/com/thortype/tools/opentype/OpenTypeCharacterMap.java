package com.thortype.tools.opentype;

import com.thortype.tools.typescript.FontTsxField;
import lombok.Data;

import java.util.List;

@Data
public class OpenTypeCharacterMap {
  @FontTsxField("number")
  private long numberOfGlyphs;
  @FontTsxField("Subtable[]")
  private List<OpenTypeSubtable> subtables;
}
