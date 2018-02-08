package com.happyelements.config;
import java.util.Map;

import org.simpleframework.xml.ElementMap;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Root;

import com.twofishes.config.manager.ConfigManager;

@Root(name="AmbariConfig")
public class AmbariConfig {
    @ElementMap(entry = "p", key = "key", attribute = true, inline = true, data=true,required = false)
    private Map<String, String> attributes;

    public String getAttribute(String name){
        return attributes.get(name);
    }

    public static AmbariConfig get(){return ConfigManager.get(AmbariConfig.class);}
}

