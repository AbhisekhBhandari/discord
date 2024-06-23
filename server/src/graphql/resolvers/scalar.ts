import dayjs from "dayjs";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom Scalar here.",
  serialize(value) {
    // runs while sending

    if (value instanceof Date) {
      return dayjs(value).format("MM-DD-YYYY");
    }
    throw new Error("Expected date!!");
  },
  parseValue(value) {
    // runs while receiving

    if (typeof value === "string") {
      return dayjs(value);
    }
    throw new Error("Expected a string date");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return dayjs(ast.value);
    }
    return null;
  },
});

export default { Date: dateScalar };
