package goshipcode.mydevskills;

import org.springframework.beans.factory.annotation.Autowired;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbIndex;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.model.GetItemEnhancedRequest;
import software.amazon.awssdk.enhanced.dynamodb.model.Page;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@org.springframework.stereotype.Service
public class Service {

    private static final String KEY_PREFIX = "UserId#";

    private DynamoDbTable<Skills> dynamoDbTable;

    @Autowired
    public Service(DynamoDbTable<Skills> dynamoDbTable) {
        this.dynamoDbTable = dynamoDbTable;
    }

    public Skills getSkills(String userId) {

        Key key = Key.builder()
                .partitionValue(KEY_PREFIX + userId)
                .build();

        // Get the item by using the key.
        Skills result = dynamoDbTable.getItem((GetItemEnhancedRequest.Builder requestBuilder) -> requestBuilder.key(key));

        return result;

    }

    public Skills getSkillsByUniqueUrl(String uniqueUrl) {

        DynamoDbIndex<Skills> emailIndex = dynamoDbTable.index("uniqueUrlPath-index");
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
        skills.setUserId(KEY_PREFIX + skills.getUserId());
        dynamoDbTable.putItem(skills);
    }

}
