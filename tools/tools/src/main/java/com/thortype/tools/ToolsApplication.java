package com.thortype.tools;

import java.io.File;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.thortype.tools.model.Font;
import com.thortype.tools.services.FontWriter;
import com.thortype.tools.utils.DirectoryHelper;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class ToolsApplication {

	public static void main(String[] args) {
		log.info("Starting ToolsApplication {}", Arrays.toString(args));
		SpringApplication.run(ToolsApplication.class, args);
	}

	@Autowired
	private DirectoryHelper directoryHelper;
	@Autowired
	private ToolsProperties toolsProperties;
	@Autowired
	private FontWriter fontWriter;

	@PostConstruct
	public void onInit() {
    log.info("found productionRun argument, printing files");
    List<Font> fonts = directoryHelper.listFontDir(toolsProperties.getFontDir());
    File outputDir = new File(toolsProperties.getOutDir());
    fontWriter.printFont(outputDir, fonts);
    fontWriter.printFontDefinition(outputDir);
	}

}
