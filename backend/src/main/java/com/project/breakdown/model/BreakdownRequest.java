package com.project.breakdown.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;



@Document(collection = "requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BreakdownRequest {
	
	public enum RequestStatus {
	    PENDING,
	    SEARCHING_MECHANIC,
	    MECHANIC_ASSIGNED,
	    MECHANIC_ON_THE_WAY,
	    REPAIR_STARTED,
	    COMPLETED,
	    CANCELLED
	}

    @Id
    private String id;

    private String userEmail;

    private String location; // simple string (no lat/long)
    
    private String latitude;
    
    private String longitude;

    private String vehicleType;

    private String issue;
    
    private String description;

    private RequestStatus status;

    private String mechanicEmail;
    
    private LocalDateTime createdAt;

	public void setStatus(RequestStatus status) {
		// TODO Auto-generated method stub
		this.status = status;
	}
}
