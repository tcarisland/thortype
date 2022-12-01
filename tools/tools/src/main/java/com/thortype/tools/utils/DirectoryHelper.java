package com.thortype.tools.utils;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.thortype.tools.model.Font;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DirectoryHelper {
	
	public List<Font> listFontDir(String dir) {
		File fontDir = new File(dir);
		log.info("{} exists {}", dir, fontDir.exists());
		return fontDir.exists() ? Arrays
				.stream(fontDir.listFiles())
				.map(u -> Font.parse(u.toPath()))
				.collect(Collectors.toList())
				: null;
	}
	
}
