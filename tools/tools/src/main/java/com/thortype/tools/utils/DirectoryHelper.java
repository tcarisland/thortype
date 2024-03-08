package com.thortype.tools.utils;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.thortype.tools.opentype.OpenTypeMetaExtractor;
import com.thortype.tools.services.FontParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.thortype.tools.model.Font;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DirectoryHelper {

  @Autowired
  private FontParser fontParser;

  public List<Font> listFontDir(String dir) {
		File fontDir = new File(dir);
		log.info("{} exists {}", dir, fontDir.exists());
		return fontDir.exists() ? Arrays
				.stream(Objects.requireNonNull(fontDir.listFiles()))
				.map(u -> {
          try {
            return fontParser.parse(u.toPath());
          } catch (Exception e) {
            return null;
          }
        })
        .filter(Objects::nonNull)
				.collect(Collectors.toList())
				: null;
	}

}
