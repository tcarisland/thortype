package com.thortype.tools.json;

import com.thortype.tools.opentype.OpenTypeMeta;
import com.thortype.tools.typescript.FontTsxField;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class MetaDefinitionTypescriptRenderer extends TypescriptRenderer<Map<String, String>> {

	String format = "";

	public String render(Map<String, String> obj) {
		return MessageFormat
				.format("export interface Meta {0}",
						toJsonString(obj))
				.replaceAll("\"", "")
				.replaceAll(" :", ":");
	}

	public String render() {
		return render(getFieldMap());
	}

	public Map<String, String> getFieldMap() {
		return Arrays
			.stream(OpenTypeMeta.class.getDeclaredFields())
			.filter(field -> field.isAnnotationPresent(FontTsxField.class))
			.map(field -> {
				field.setAccessible(true);
				return Arrays.asList(field.getName(), field.getDeclaredAnnotation(FontTsxField.class).value());
			})
			.collect(Collectors.toMap(e -> e.get(0), e -> e.get(1)));
	}

}
