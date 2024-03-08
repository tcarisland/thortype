package com.thortype.tools.opentype;

import com.thortype.tools.typescript.FontTsxField;
import lombok.Data;

@Data
public class OpenTypeCharacter {
  @FontTsxField
  private String name;
  @FontTsxField
  private long characterIndex;
}
