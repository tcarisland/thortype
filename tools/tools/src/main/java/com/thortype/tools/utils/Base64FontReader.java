package com.thortype.tools.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Base64;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton")
public class Base64FontReader {

	public String getBase64String(Path fontPath) {
		try {
			FileInputStream fis = new FileInputStream(fontPath.toFile());
			byte font[] = new byte[(int) fontPath.toFile().length()];
			fis.read(font);
			fis.close();
			byte encodedFont[] = Base64.getEncoder().encode(font);
			return new String(encodedFont);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}

}
