package goshipcode.mydevskills;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey;

import java.util.List;

@Data
@DynamoDbBean
public class Skills {
    @NotNull
    private String userId;

    @NotNull
    private String uniqueUrlPath;

    @NotNull
    private List<@Valid Skill> skillList;

    @DynamoDbPartitionKey
    public String getUserId() {
        return userId;
    }

    @DynamoDbSecondaryPartitionKey(indexNames = { "uniqueUrlPath-index" })
    public String getUniqueUrlPath() {
        return uniqueUrlPath;
    }
}
