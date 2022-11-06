package com.tcarisland;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.codec.binary.Base64;

public class FontUrlEncoder {

	private Path path;
	
	public FontUrlEncoder(String dir) {
		this.path = Paths.get(dir);
	}
	
	public String getBase64String(Path fontPath) {
		try {
			FileInputStream fis = new FileInputStream(fontPath.toFile());
			byte font[] = new byte[(int) fontPath.toFile().length()];
			fis.read(font);
			fis.close();
			byte encodedFont[] = Base64.encodeBase64(font);
			return new String(encodedFont);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public List<Path> getTrueTypeFonts() {
		return getFonts(".ttf");
	}
	
	public List<Path> getOpenTypeFonts() {
		return getFonts(".otf");
	}
	
	public List<Path> getFonts(String type) {
		File files[] = this.path.toFile().listFiles();
		return Arrays.stream(files)
				.filter(Objects::nonNull)
				.filter(u -> u.getAbsolutePath().endsWith(type))
				.map(u -> u.toPath())
				.collect(Collectors.toList());
	}

}
