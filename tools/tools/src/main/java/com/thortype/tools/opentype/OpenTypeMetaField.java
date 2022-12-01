package com.thortype.tools.opentype;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface OpenTypeMetaField {
    public OpenTypeNameTableName value() default OpenTypeNameTableName.INVALID;
}
