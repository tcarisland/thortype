package com.thortype.tools.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.PrettyPrinter;
import com.fasterxml.jackson.core.util.DefaultIndenter;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class TypescriptRenderer<T> {
	
	public static final ObjectMapper MAPPER = initObjectMapper();
	public static final PrettyPrinter PRETTY_PRINTER = initPrettyPrinter();
	
	@SuppressWarnings("deprecation")
	public static ObjectMapper initObjectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(JsonGenerator.Feature.QUOTE_FIELD_NAMES, false);
		objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		return objectMapper;
	}
	
	public static PrettyPrinter initPrettyPrinter() {
		DefaultPrettyPrinter prettyPrinter = new DefaultPrettyPrinter();
		prettyPrinter.indentArraysWith(DefaultIndenter.SYSTEM_LINEFEED_INSTANCE);
		return prettyPrinter;
	}
	
	public abstract String render(T obj);
	
	public String toJsonString(T obj) {
		try {
			return TypescriptRenderer
					.MAPPER
					.writer(PRETTY_PRINTER)
					.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			log.error("", e);
			return null;
		}
	}
	
}
