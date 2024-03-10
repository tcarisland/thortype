package com.thortype.tools.opentype;

import com.thortype.tools.typescript.FontTsxField;
import lombok.Data;

@Data
public class OpenTypeCharacter {
  @FontTsxField("number")
  private int subtableIndex;
  @FontTsxField("number")
  private int[] characterIndex;
}
