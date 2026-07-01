package com.project.breakdown.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection = "requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BreakdownRequest {

    @Id
    private String id;

    private String userEmail;

    private String location; // simple string (no lat/long)

    private String vehicleType;

    private String issue;

    private String status; // PENDING, ACCEPTED

    private String mechanicEmail;
}
