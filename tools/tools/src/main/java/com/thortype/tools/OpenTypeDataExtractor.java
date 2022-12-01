package com.thortype.tools;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

import lombok.Data;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.fontbox.ttf.*;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class OpenTypeDataExtractor {

  @Data
  public static class OpenTypeMetadata {
    private String description = "";

    @Override
    public String toString() {
      return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
  }
	public OpenTypeMetadata readOpenTypeData(Path fontPath) {
    OpenTypeMetadata metadata = new OpenTypeMetadata();
    try {
      OTFParser parser = new OTFParser();
      OpenTypeFont font = parser.parse(fontPath.toFile());
      List<TTFTable> tables = font.getTables().stream().toList();
      NamingTable nameTable = (NamingTable) tables.get(5);
      metadata = new OpenTypeMetadata();
      metadata.setDescription(nameTable.getNameRecords().get(12).getString());
    } catch (IOException e) {
      throw new RuntimeException(e);
    } finally {
      return metadata;
    }
  }

}
