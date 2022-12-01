package com.thortype.tools.json;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.thortype.tools.types.FontStandard;

@Component
public class FontStandardTypescriptRenderer extends TypescriptRenderer<List<String>>{
	
	public String getFields() {
		return getFieldList().stream().collect(Collectors.joining(",\n"));
	}
	
	public List<String> getFieldList() {
		return Arrays
				.stream(FontStandard.values())
				.map(u -> String.format("%s", u.name()))
				.collect(Collectors.toList());
	}

	public String render(List<String> obj) {
		return MessageFormat
				.format("export enum FontStandard {0}",
						this
						.toJsonString(obj)
						.replaceAll("\\[", "{")
						.replaceAll("\\]", "\\}")
						.replaceAll("\"", "")
						);
	}

	public Object render() {
		return render(this.getFieldList());
	}
	
	
}
