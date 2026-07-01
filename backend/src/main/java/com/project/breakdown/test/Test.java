package com.project.breakdown.test;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class Test {
	
	private final SimpMessagingTemplate messagingTemplate;
	public Test(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}
	
	@GetMapping()
	public String test() {
	    messagingTemplate.convertAndSend("/topic/requests", "HELLO TEST");
	    return "sent";
	}
}
