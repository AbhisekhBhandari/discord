import { MapperKind, getDirective, mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { MyContext } from "../context";
import { newHandleTokens } from "../../lib/utils";

export function authDirective(directiveName: string) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTypeDefs: `directive @${directiveName} on OBJECT | FIELD_DEFINITION`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = async function (
              source,
              args,
              context: MyContext,
              info
            ) {
              try {
                await newHandleTokens(context.req, context.res);
                return resolve(source, args, context, info);
              } catch {
                throw Error("Not Authenticated");
              }
            };
            return fieldConfig;
          }
        },
      }),
  };
}
