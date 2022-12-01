package com.thortype.tools.typescript;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;

import com.thortype.tools.opentype.OpenTypeMetaExtractor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.thortype.tools.json.FontDefinitionTypescriptRenderer;
import com.thortype.tools.json.FontStandardTypescriptRenderer;
import com.thortype.tools.json.FontTypescriptRenderer;
import com.thortype.tools.model.Font;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
class RendererTest {

	@Autowired
	private FontDefinitionTypescriptRenderer definitionRenderer;
	@Autowired
	private FontStandardTypescriptRenderer standardRenderer;
	@Autowired
	private FontTypescriptRenderer fontRenderer;
  @Autowired
  private OpenTypeMetaExtractor openTypeDataExtractor;

	@Test
	void printDefinitions() throws SecurityException, ClassNotFoundException {
		Font font = Font.parse(new File("./tuscan-modular.ttf").toPath(), openTypeDataExtractor);
		assertEquals(font.getName(), "tuscan-modular");
		log.info("\n{}", definitionRenderer.render());
		log.info("\n{}", standardRenderer.render());
	}

	@Test
	void printFont() {
		Font font = Font.parse(new File("./tuscan-modular.ttf").toPath(), openTypeDataExtractor);
		font.setEncoding("encoding goes here");
		log.info("\n{}", fontRenderer.render(font));
	}
}
