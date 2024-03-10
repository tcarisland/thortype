package com.thortype.tools.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.thortype.tools.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thortype.tools.model.Font;
import com.thortype.tools.utils.Base64FontReader;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FontWriter {

	private PrintWriter printWriter;

	@Autowired
	private Base64FontReader fontReader;
	@Autowired
	private FontDefinitionTypescriptRenderer fontDefinitionTypescriptRenderer;
	@Autowired
	private FontStandardTypescriptRenderer fontStandardTypescriptRenderer;
  @Autowired
  private CharacterMapDefinitionTypescriptRenderer characterMapDefinitionTypescriptRenderer;
  @Autowired
  private SubtableDefinitionTypescriptRenderer subtableDefinitionTypescriptRenderer;
	@Autowired
	private FontTypescriptRenderer fontRenderer;
  @Autowired
  private MetaDefinitionTypescriptRenderer metaRenderer;

	public void printFontDefinition(File outDirPath) {
		try {
			File outFile = new File(outDirPath.getPath() + "/font.ts");
			PrintWriter pw = new PrintWriter(outFile);
			pw.println(fontStandardTypescriptRenderer.render());
			pw.println(fontDefinitionTypescriptRenderer.render());
      pw.println(characterMapDefinitionTypescriptRenderer.render());
      pw.println(subtableDefinitionTypescriptRenderer.render());
      pw.println(metaRenderer.render());
			pw.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public void printFont(File outDirPath, List<Font> fontList) {
		if (!outDirPath.exists() && outDirPath.getParentFile().exists()) {
			outDirPath.mkdir();
		}
		try {
			initPrint(outDirPath);
			for(Font font : fontList) {
				font.setEncoding(font.formatBase64(fontReader.getBase64String(font.getPath())));
				printFont(font);
			}
			closePrint();
		} catch (IOException e) {
			log.info(e.getLocalizedMessage());
			e.printStackTrace();
		}
	}

	public void initPrint(File outDirPath) throws IOException {
		File file = new File(outDirPath.getPath() + "/font-list-data.ts");
		printWriter = new PrintWriter(file);
		printWriter.println("import { Font, FontStandard } from \"./font\";\n");
		log.info("init file {}", outDirPath.getAbsolutePath());
		printWriter.println("const fonts: Font[] = [");
	}

  int i = 0;

	public void printFont(Font font) throws IOException {
		log.info("{} : printing font {}", ++i , font.getName());
		printWriter.printf("%s,%n", this.fontRenderer.render(font));
	}

	public void closePrint() throws IOException {
		log.info("closing writer");
		printWriter.println("];");
		printWriter.println("export default fonts;");
		printWriter.close();
	}

}
