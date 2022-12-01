package com.thortype.tools.json;

import org.springframework.stereotype.Component;

import com.thortype.tools.model.Font;

@Component
public class FontTypescriptRenderer extends TypescriptRenderer<Font> {

	@Override
	public String render(Font font) {
		return toJsonString(font);
	}

}
