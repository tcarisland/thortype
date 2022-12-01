package com.thortype.tools.json;

import org.springframework.stereotype.Component;

import com.thortype.tools.model.TcFont;

@Component
public class FontTypescriptRenderer extends TypescriptRenderer<TcFont> {

	@Override
	public String render(TcFont font) {
		return toJsonString(font);
	}

}
