package com.thortype.tools.model;

import java.nio.file.Path;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.thortype.tools.opentype.OpenTypeCharacterMap;
import com.thortype.tools.opentype.OpenTypeMeta;
import com.thortype.tools.types.FontStandard;
import com.thortype.tools.typescript.FontTsxField;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class Font {

	@FontTsxField
	String name;
  @FontTsxField("Meta")
  OpenTypeMeta meta;
	@FontTsxField("FontStandard")
	@JsonRawValue
	FontStandard type;
  @FontTsxField("CharacterMap")
  OpenTypeCharacterMap characterMap;
  @FontTsxField
	String encoding;
	@JsonIgnore
	Path path;

	public String formatBase64(String base64) {
		return String.format("data:font/%s;base64,%s", this.type.name().toLowerCase(), base64);
	}

}
