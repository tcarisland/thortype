package com.thortype.tools.json;

import com.thortype.tools.opentype.OpenTypeSubtable;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CharacterDefinitionTypescriptRenderer extends TypescriptRenderer<Map<String, String>> {
  @Override
  public String render(Map<String, String> obj) {
    return renderDefinitionFromMap("Subtable", obj);
  }

  public String render() {
    return render(getFieldMap(OpenTypeSubtable.class.getDeclaredFields()));
  }

}
