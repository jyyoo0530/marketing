package com.ginger9.marketing.slackbot;

import com.ginger9.marketing.slackbot.SlackMessage;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SlackSender {

    private Logger logger = LoggerFactory.getLogger(SlackSender.class);

    @Value("${notification.slack.enabled}")
    private boolean slackEnabled;

    @Value("${notification.slack.webhook.url}")
    private String webhookUrl;

    @Value("${notification.slack.channel}")
    private String channel;

    @Value("${notification.slack.botName}")
    private String botName;

    @Value("${notification.slack.icon.emoji}")
    private String iconEmoji;

    @Value("${notification.slack.icon.url}")
    private String iconUrl;

    public void sendSlack(String contents) {
        if (slackEnabled) {
            try {
                // create slack Message
                SlackMessage slackMessage = new SlackMessage(contents, channel, botName, iconEmoji, iconUrl);
                String payload = new Gson().toJson(slackMessage);

                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);

                // send the post request
                HttpEntity<String> entity = new HttpEntity<>(payload, headers);
                restTemplate.postForEntity(webhookUrl, entity, String.class);

            } catch (Exception e) {
                logger.error("Unhandled Exception occurred while send slack. [Reason] : ", e);
            }
        }
    }
}