package goshipcode.mydevskills;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@Data
@DynamoDbBean
public class Skill {

    @NotNull
    private String skillName;

    @NotNull
    private Integer rating;

    @NotNull
    private String description;
}
