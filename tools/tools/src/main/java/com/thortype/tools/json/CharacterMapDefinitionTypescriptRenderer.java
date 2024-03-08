package com.thortype.tools.json;

import com.thortype.tools.opentype.OpenTypeCharacterMap;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CharacterMapDefinitionTypescriptRenderer extends TypescriptRenderer<Map<String, String>> {
  @Override
  public String render(Map<String, String> characterMap) {
    return renderDefinitionFromMap("CharacterMap", characterMap);
  }

  public String render() {
    return render(getFieldMap(OpenTypeCharacterMap.class.getDeclaredFields()));
  }

}
