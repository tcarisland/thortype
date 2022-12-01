package com.thortype.tools.types;

import lombok.Getter;

public enum FontStandard {
	OpenType(".otf"),
	TrueType(".ttf");

	@Getter
	private final String suffix;

	@Getter
	private final String tsxType = String.format("%s.%s", this.getClass().getSimpleName(), this.name());

	@Override
	public String toString() {
		return String.format("%s.%s", this.getClass().getSimpleName(), this.name());
	}

	public static FontStandard parse(String s) {
		for(FontStandard ft: FontStandard.values()) {
			if(s.endsWith(ft.getSuffix())) {
				return ft;
			}
		}
		return null;
	}

	FontStandard(String s) {
		this.suffix = s;
	}
}
