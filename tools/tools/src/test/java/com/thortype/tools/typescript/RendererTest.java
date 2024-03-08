package com.thortype.tools.typescript;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;

import com.thortype.tools.opentype.OpenTypeMetaExtractor;
import com.thortype.tools.services.FontParser;
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
  private FontParser fontParser;

	@Test
	void printDefinitions() throws SecurityException, ClassNotFoundException {
    try {
      Font font = fontParser.parse(new File("./tuscan-modular.ttf").toPath());
      assertEquals(font.getName(), "tuscan-modular");
      log.info("\n{}", definitionRenderer.render());
      log.info("\n{}", standardRenderer.render());
    } catch (Exception e) {
      log.error("printDefinitions failed", e);
    }
	}

	@Test
	void printFont() {
    try {
      Font font = fontParser.parse(new File("./tuscan-modular.ttf").toPath());
      font.setEncoding("encoding goes here");
      log.info("\n{}", fontRenderer.render(font));
    } catch(Exception e) {
      log.error("printFont failed", e);
    }
	}
}
