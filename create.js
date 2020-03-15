import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        trailId: uuid.v1(),
        trailName: data.trailName,
        peakElevation: data.peakElevation,
        trailDuration: data.trailDuration,
        roundtripLength: data.roundtripLength,
        elevationGain: data.elevationGain,
        description: data.description,
        createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}