package com.ginger9.marketing.controller;

import com.ginger9.marketing.slackbot.NotificationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
public class WebController {

    @Autowired
    private NotificationManager notificationManager;

    public void NotificationTest() {
        notificationManager.sendNotification();
    }


    @GetMapping("/greeting")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name, Model model) {
        model.addAttribute("name", name);
        NotificationTest();
        return "greeting";
    }

    @GetMapping("/slack")
    public void slackbot() {

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> request = new HashMap<String, Object>();
        request.put("username", "dev-test");
        request.put("text", "custom-slack-msg");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<Map<String, Object>>(request);

        String url = "https://hooks.slack.com/services/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"; // 사용할 슬랙의 Webhook URL 넣기

        restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

    }

}