package com.thortype.tools.opentype;

import com.thortype.tools.typescript.FontTsxField;
import lombok.Data;

import java.util.List;

@Data
public class OpenTypeSubtable {
  @FontTsxField("number")
  private int subtableIndex;
  @FontTsxField("number[]")
  private List<Integer> characterList;
}
