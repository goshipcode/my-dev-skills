package goshipcode.mydevskills;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.GetItemEnhancedRequest;
import software.amazon.awssdk.enhanced.dynamodb.model.Page;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.endpoints.internal.GetAttr;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.*;

@org.springframework.stereotype.Service
public class Service {

    @Value("${dynamodb.table.name}")
    private String dynamodbTableName;

    private static final String KEY_PREFIX = "UserId#";

    private DynamoDbEnhancedClient dynamoDbEnhancedClient;

    @Autowired
    public Service(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
    }

    public Skills getSkills(String userId) {

        DynamoDbTable<Skills> table = dynamoDbEnhancedClient.table(dynamodbTableName, TableSchema.fromBean(Skills.class));
        Key key = Key.builder()
                .partitionValue(KEY_PREFIX + userId)
                .build();

        // Get the item by using the key.
        Skills result = table.getItem((GetItemEnhancedRequest.Builder requestBuilder) -> requestBuilder.key(key));

        return result;

    }

    public Skills getSkillsByUniqueUrl(String uniqueUrl) {

       /* DynamoDbIndex<Skills> skillsDynamoDbIndex =
                dynamoDbEnhancedClient.table(dynamodbTableName,
                        TableSchema.fromBean(Skills.class))
                        .index("uniqueUrlPath-index");*/

        DynamoDbTable<Skills> table = dynamoDbEnhancedClient.table(dynamodbTableName, TableSchema.fromBean(Skills.class));


        DynamoDbIndex<Skills> emailIndex = table.index("uniqueUrlPath-index");
        QueryConditional q = QueryConditional.keyEqualTo(Key.builder().partitionValue(uniqueUrl).build());
        Iterator<Page<Skills>> result = emailIndex.query(q).iterator();
        List<Skills> skills = new ArrayList<>();

        while (result.hasNext()) {
            Page<Skills> userPage = result.next();
            skills.addAll(userPage.items());
        }

        if (skills.isEmpty()) return null;

        skills.get(0).setUserId(null);
        return skills.get(0);

    }

    public void saveSkills(Skills skills) {
        DynamoDbTable<Skills> table = dynamoDbEnhancedClient.table(dynamodbTableName, TableSchema.fromBean(Skills.class));
        skills.setUserId(KEY_PREFIX + skills.getUserId());

        //check if uniquePath is unique
        //1. query to other dynamodb table, and put if available

        table.putItem(skills);
    }

}
