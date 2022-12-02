package com.thortype.tools.opentype;

import com.thortype.tools.typescript.FontTsxField;
import lombok.Data;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;

@Data
@Slf4j
public class OpenTypeMeta {
    @FontTsxField
    @OpenTypeMetaField(OpenTypeNameTableName.DESCRIPTION)
    private String description = "";
    @FontTsxField
    @OpenTypeMetaField(OpenTypeNameTableName.LICENSE_URL)
    private String licenseUrl = "";
    @FontTsxField
    @OpenTypeMetaField(OpenTypeNameTableName.DESIGNER_URL)
    private String designerUrl = "";
    @FontTsxField
    @OpenTypeMetaField(OpenTypeNameTableName.MANUFACTURER_URL)
    private String manufacturerUrl = "";
    @FontTsxField
    @OpenTypeMetaField(OpenTypeNameTableName.SAMPLE_TEXT)
    private String sampleText = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG";

    public void set(String data, OpenTypeNameTableName index) {
        for(Field f : OpenTypeMeta.class.getDeclaredFields()) {
          if(f.isAnnotationPresent(OpenTypeMetaField.class) && f.getAnnotation(OpenTypeMetaField.class).value() == index) {
            f.setAccessible(true);
            try {
              f.set(this, data);
            } catch (IllegalAccessException e) {
              log.error("could not set " + index, e);
            }
          }
        }
    }
    @Override
    public String toString() {
      return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

