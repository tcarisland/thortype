package com.thortype.tools.opentype;

import lombok.extern.slf4j.Slf4j;
import org.apache.fontbox.cff.CFFCharset;
import org.apache.fontbox.ttf.*;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.ArrayList;
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
    map.setSubtables(new ArrayList<>());
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
    CmapTable cmapTable = (CmapTable) openTypeFont
      .getTables()
      .stream()
      .filter(u -> u instanceof  CmapTable)
      .findAny()
      .orElse(null);
      if(table != null) {
      CFFCharset charset = table.getFont().getCharset();
        try {
            Field f = CFFCharset.class.getDeclaredField("gidToSid");
            f.setAccessible(true);
            @SuppressWarnings("unchecked") Map<Integer, Integer> map = (Map<Integer, Integer>) f.get(charset);
            int numberOfGlyphs = map.size();
            characterMap.setNumberOfGlyphs(numberOfGlyphs);
            ArrayList<OpenTypeSubtable> subtableList = new ArrayList<>();
            if(cmapTable != null) {
              for(CmapSubtable cmapSubtable : cmapTable.getCmaps()) {
                OpenTypeSubtable subtable = new OpenTypeSubtable();
                subtable.setSubtableIndex(cmapSubtable.getPlatformId());
                ArrayList<Integer> characterList = new ArrayList<>();
                for(Integer gid : map.values()) {
                  if(cmapSubtable.getCharCodes(gid) != null && !cmapSubtable.getCharCodes(gid).isEmpty()) {
                    characterList.addAll(cmapSubtable.getCharCodes(gid));
                  }
                }
                subtable.setCharacterList(characterList);
                subtableList.add(subtable);
              }
            }
            characterMap.setSubtables(subtableList);
        } catch (NoSuchFieldException | IllegalAccessException | ClassCastException e) {
            throw new RuntimeException(e);
        }
    }
    return characterMap;
  }

}
