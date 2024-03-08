package com.thortype.tools.json;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import com.thortype.tools.model.Font;
import com.thortype.tools.typescript.FontTsxField;
import org.springframework.stereotype.Component;

@Component
public class FontDefinitionTypescriptRenderer extends TypescriptRenderer<Map<String, String>> {

	String format = "";

	public String render(Map<String, String> obj) {
		return MessageFormat
				.format("export interface Font {0}",
						toJsonString(obj))
				.replaceAll("\"", "")
				.replaceAll(" :", ":");
	}

	public String render() {
		return render(getFieldMap(Font.class.getDeclaredFields()));
	}

}
