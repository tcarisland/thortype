package com.thortype.tools.json;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CharacterDefinitionTypescriptRenderer extends TypescriptRenderer<Map<String, String>> {
  @Override
  public String render(Map<String, String> obj) {
    return renderDefinitionFromMap("Glyph", obj);
  }

  public String render() {
    return render(getFieldMap(Character.class.getDeclaredFields()));
  }

}
