package com.thortype.tools.services;

import com.thortype.tools.model.Font;
import com.thortype.tools.opentype.OpenTypeCharacterMap;
import com.thortype.tools.opentype.OpenTypeCharacterMapExtractor;
import com.thortype.tools.opentype.OpenTypeCharacter;
import com.thortype.tools.opentype.OpenTypeMetaExtractor;
import com.thortype.tools.types.FontStandard;
import lombok.extern.slf4j.Slf4j;
import org.apache.fontbox.ttf.OTFParser;
import org.apache.fontbox.ttf.OpenTypeFont;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.file.Path;

@Component
@Slf4j
public class FontParser {

  OpenTypeMetaExtractor openTypeMetaExtractor;
  OpenTypeCharacterMapExtractor characterMapExtractor;

  public FontParser(@Autowired OpenTypeMetaExtractor openTypeMetaExtractor, @Autowired OpenTypeCharacterMapExtractor characterMapExtractor) {
    this.openTypeMetaExtractor = openTypeMetaExtractor;
    this.characterMapExtractor = characterMapExtractor;

  }

  public Font parse(Path path) throws Exception {
    Font font = new Font();
    font.setPath(path);
    font.setType(FontStandard.parse(path.toFile().getPath()));
    font.setName(extractName(path.toFile().getName(), font.getType()));
    font.setEncoding("");
    readFile(font, path);
    return font;
  }

  public void readFile(Font thorTypeFont, Path fontPath) {
    try {
      OTFParser parser = new OTFParser();
      OpenTypeFont font = parser.parse(fontPath.toFile());
      thorTypeFont.setMeta(openTypeMetaExtractor.readOpenTypeData(font));
      thorTypeFont.setCharacterMap(characterMapExtractor.readOpenTypeFont(font));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      throw new RuntimeException(e);
    }
  }
  private String extractName(String filename, FontStandard type) throws IllegalArgumentException {
    if(type == null) {
      throw new IllegalArgumentException(String.format("could not extract name from %s", filename));
    }
    return filename.substring(0, filename.length() - type.getSuffix().length());
  }

}
