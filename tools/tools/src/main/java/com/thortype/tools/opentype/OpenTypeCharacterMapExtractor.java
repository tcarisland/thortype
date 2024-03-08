package com.thortype.tools.opentype;

import com.thortype.tools.model.Font;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.fontbox.cff.CFFCharset;
import org.apache.fontbox.ttf.CFFTable;
import org.apache.fontbox.ttf.OpenTypeFont;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class OpenTypeCharacterMapExtractor {

  public OpenTypeCharacterMap readOpenTypeFont(OpenTypeFont openTypeFont) {
    log.info("{}", openTypeFont);
    if (openTypeFont.isPostScript()) {
      return parseTTF(openTypeFont);
    }
    OpenTypeCharacterMap map = new OpenTypeCharacterMap();
    map.setNumberOfGlyphs(0);
    map.setCharacters(new OpenTypeCharacter[]{});
    return map;
  }

  private OpenTypeCharacterMap parseTTF(OpenTypeFont openTypeFont) {
    OpenTypeCharacterMap characterMap = new OpenTypeCharacterMap();
    CFFTable table = (CFFTable) openTypeFont
      .getTables()
      .stream()
      .filter(u -> u instanceof CFFTable)
      .findAny()
      .orElse(null);
    if(table != null) {
      CFFCharset charset = table.getFont().getCharset();
        try {
            Field f = CFFCharset.class.getDeclaredField("nameToSid");
            f.setAccessible(true);
            Map<String, Integer> map = (Map<String, Integer>) f.get(charset);
            int numberOfGlyphs = map.size();
            OpenTypeCharacter characters[] = new OpenTypeCharacter[numberOfGlyphs];
            characterMap.setNumberOfGlyphs(numberOfGlyphs);
            ArrayList<OpenTypeCharacter> characterList = new ArrayList<OpenTypeCharacter>();
            for(String str : map.keySet()) {
              OpenTypeCharacter character = new OpenTypeCharacter();
              character.setCharacterIndex(map.get(str));
              character.setName(str);
              characterList.add(character);
            }
            for(int i = 0; i < numberOfGlyphs; i++) {
              characters[i] = characterList.get(i);
            }
            characterMap.setCharacters(characters);
        } catch (NoSuchFieldException | IllegalAccessException | ClassCastException e) {
            throw new RuntimeException(e);
        }
    }
    return characterMap;
  }

}
