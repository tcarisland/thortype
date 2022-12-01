package com.thortype.tools.typescript;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface FontTsxField {
    public String value() default "string";
}
