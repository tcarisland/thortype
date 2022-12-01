package com.thortype.tools.utils;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.thortype.tools.OpenTypeDataExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.thortype.tools.model.TcFont;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DirectoryHelper {
  @Autowired
  private OpenTypeDataExtractor openTypeDataExtractor;

  public List<TcFont> listFontDir(String dir) {
		File fontDir = new File(dir);
		log.info("{} exists {}", dir, fontDir.exists());
		return fontDir.exists() ? Arrays
				.stream(fontDir.listFiles())
				.map(u -> TcFont.parse(u.toPath(), openTypeDataExtractor))
				.collect(Collectors.toList())
				: null;
	}

}
