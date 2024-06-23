import { MutationCreateTeamArgs, ResolverFn } from "../generated/graphql";
import { MyContext } from "../graphql/context";

const createResolver = <TResult, TParent, TArgs>(
  resolver: ResolverFn<TResult, TParent, MyContext, TArgs>
) => {
  const augment = (
    nextResolver: ResolverFn<TResult, TParent, MyContext, TArgs>
  ) => {
    const wrapper: ResolverFn<TResult, TParent, MyContext, TArgs> = async (
      parent,
      args,
      context,
      info
    ) => {
      await resolver(parent, args, context, info);
      return nextResolver(parent, args, context, info);
    };
    return createResolver(wrapper);
  };
  return Object.assign(resolver, { augment });
};

export const checkAuth = createResolver((parent, args, { userId }) => {
  if (!userId) {
    return
  }
});

// const createResolver = <TResult, TParent, TArgs>(
//   resolver: ResolverFn<TResult, TParent, MyContext, TArgs>
// ) => {
//   const augment = (
//     nextResolver: ResolverFn<TResult, TParent, MyContext, TArgs>
//   ) => {
//     const wrapper: ResolverFn<TResult, TParent, MyContext, TArgs> = async (
//       parent,
//       args,
//       context,
//       info
//     ) => {
//       await resolver(parent, args, context, info);
//       return nextResolver(parent, args, context, info);
//     };
//     return createResolver(wrapper);
//   };
//   return Object.assign(resolver, { augment });
// };

// export const checkAuth = createResolver((parent, args, { userId }) => {
//   if (!userId) {
//     throw new Error("Not Authenticated");
//   }
// });
