package com.thortype.tools.typescript;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.thortype.tools.OpenTypeDataExtractor;
import com.thortype.tools.ToolsProperties;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
class OpenTypeDataExtractorTest {

	@Autowired
	ToolsProperties props;
	@Autowired
	OpenTypeDataExtractor extractor;

	@Test
	public void findFile() {
		log.info("{}", props.getFontDir());
		Path fontPath = Paths.get(props.getFontDir(), "klub-katz.otf");
		OpenTypeDataExtractor.OpenTypeMetadata metadata = extractor.readOpenTypeData(fontPath);
    log.info("metadata:\n {}", metadata.toString());
	}

}
