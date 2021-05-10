package com.ginger9.marketing.slackbot;

import com.ginger9.marketing.slackbot.SlackSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NotificationManager {

    private Logger logger = LoggerFactory.getLogger(NotificationManager.class);

    private final SlackSender slackSender;

    public NotificationManager(SlackSender slackSender) {
        this.slackSender = slackSender;
    }

    public void sendNotification() {
        logger.info("#### send Notification.");

        // generated Message
        String contents = generatedMessage();

        // send slack
        slackSender.sendSlack(contents);
    }

    /**
     * generated Message.
     *
     * @return
     */
    private String generatedMessage() {
        StringBuilder sb = new StringBuilder();

        sb.append("[Notification]").append(System.getProperty("line.separator"))
                .append("[Name] : ").append("Tester").append(System.getProperty("line.separator"))
                .append("[Message] : ").append("테스트 메시지 !!");

        return sb.toString();
    }
}