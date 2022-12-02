package com.thortype.tools.opentype;

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
        NameRecord nr = nameTable
          .getNameRecords()
          .stream()
          .filter(u -> u.getNameId() == n.ordinal())
          .findAny()
          .orElse(null);
        if(nr != null) {
          meta.set(nr.getString(), n);
        }
        log.info("looking for {} with id {} found {}", n, n.ordinal(), nr);
      });
    return meta;
  }
  public OpenTypeMeta readOpenTypeData(Path fontPath) {
    OpenTypeMeta metadata = new OpenTypeMeta();
    try {
      OTFParser parser = new OTFParser();
      OpenTypeFont font = parser.parse(fontPath.toFile());
      List<TTFTable> tables = font.getTables().stream().toList();
      NamingTable nameTable = (NamingTable) tables.stream().filter(u -> u instanceof NamingTable).findAny().orElse(null);
      metadata = addFields(
        nameTable,
        OpenTypeNameTableName.MANUFACTURER_URL,
        OpenTypeNameTableName.DESCRIPTION,
        OpenTypeNameTableName.DESIGNER_URL,
        OpenTypeNameTableName.LICENSE_URL,
        OpenTypeNameTableName.SAMPLE_TEXT
      );
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      throw new RuntimeException(e);
    } finally {
      return metadata;
    }
  }

}
