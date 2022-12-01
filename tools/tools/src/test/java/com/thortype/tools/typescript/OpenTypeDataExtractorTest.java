package com.thortype.tools.typescript;

import java.nio.file.Path;
import java.nio.file.Paths;

import com.thortype.tools.opentype.OpenTypeMeta;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.thortype.tools.opentype.OpenTypeMetaExtractor;
import com.thortype.tools.ToolsProperties;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
class OpenTypeDataExtractorTest {

	@Autowired
	ToolsProperties props;
	@Autowired
  OpenTypeMetaExtractor extractor;

	@Test
	public void findFile() {
		log.info("{}", props.getFontDir());
    findFile("pipeline.otf", "klub-katz.otf");
	}

  public void findFile(String ...filename) {
    for(String n : filename) {
      Path fontPath = Paths.get(props.getFontDir(), n);
      log.info("{} exists {}", fontPath, fontPath.toFile().exists());
      OpenTypeMeta metadata = extractor.readOpenTypeData(fontPath);
      log.info("metadata:\n {}", metadata.toString());
    }
  }

}
