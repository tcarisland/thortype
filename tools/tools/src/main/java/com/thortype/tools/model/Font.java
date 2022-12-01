package com.thortype.tools.model;

import java.nio.file.Path;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.thortype.tools.opentype.OpenTypeMetaExtractor;
import com.thortype.tools.opentype.OpenTypeMeta;
import com.thortype.tools.types.FontStandard;
import com.thortype.tools.typescript.FontTsxField;

import lombok.Data;

@Data
public class Font {

	@FontTsxField
	String name;
  @FontTsxField("Meta")
  OpenTypeMeta meta;
	@FontTsxField("FontStandard")
	@JsonRawValue
	FontStandard type;
	@FontTsxField
	String encoding;
	@JsonIgnore
	Path path;

	public static Font parse(Path path, OpenTypeMetaExtractor openTypeDataExtractor) {
		Font font = new Font();
		font.path = path;
		font.type = FontStandard.parse(path.toFile().getPath());
		font.name = extractName(path.toFile().getName(), font.type);
		font.encoding = "";
    font.meta = openTypeDataExtractor.readOpenTypeData(path);
		return font;
	}

	public String formatBase64(String base64) {
		return String.format("data:font/%s;base64,%s", this.type.name().toLowerCase(), base64);
	}

	private static String extractName(String filename, FontStandard type) {
		return filename.substring(0, filename.length() - type.getSuffix().length());
	}
}
