package com.thortype.tools;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
public class ToolsProperties {

	@Getter
	@Value("${fontDir}")
	private String fontDir;
	
	@Getter
	@Value("${outDir}")
	private String outDir;
	
}
