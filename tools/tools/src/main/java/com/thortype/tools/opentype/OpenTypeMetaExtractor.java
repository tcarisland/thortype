package com.thortype.tools.opentype;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import org.apache.fontbox.ttf.*;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class OpenTypeMetaExtractor {

  public OpenTypeMeta addFields(NamingTable nameTable, OpenTypeNameTableName ...tableNames) {
    final OpenTypeMeta meta = new OpenTypeMeta();
    if(nameTable == null) {
      return meta;
    }
    Arrays.stream(tableNames)
      .forEach(n -> {
          nameTable
            .getNameRecords()
            .stream()
            .filter(u -> {
              int nameId = u.getNameId();
              return nameId == n.ordinal();
            })
            .findAny()
            .ifPresent(nr -> meta.set(nr.getString(), n));
          //log.info("looking for {} with id {} found {}", n, n.ordinal(), nr);
      });
    return meta;
  }
  public OpenTypeMeta readOpenTypeData(OpenTypeFont font) throws IOException {
    OpenTypeMeta metadata = new OpenTypeMeta();
    OTFParser parser = new OTFParser();
    List<TTFTable> tables;
        tables = font.getTables().stream().toList();
        log.info("font {}", font);
    readGlyphTable(tables);
      NamingTable nameTable = (NamingTable) tables
        .stream()
        .filter(u -> u instanceof NamingTable)
        .findAny()
        .orElse(null);
    metadata = addFields(
      nameTable,
      OpenTypeNameTableName.MANUFACTURER_URL,
      OpenTypeNameTableName.DESCRIPTION,
      OpenTypeNameTableName.DESIGNER_URL,
      OpenTypeNameTableName.LICENSE_URL,
      OpenTypeNameTableName.SAMPLE_TEXT
    );
    return metadata;
  }

  private void readGlyphTable(List<TTFTable> tables) throws IOException {
    GlyphTable glyphTable = (GlyphTable) tables
      .stream()
      .filter(u -> u instanceof GlyphTable)
      .findAny()
      .orElse(null);
    if(glyphTable != null) {
      log.info("glyphTable {}", glyphTable);
    }
  }

}
