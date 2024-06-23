"use server";
import { DocumentNode } from "graphql";
import { GraphQLClient, RequestDocument } from "graphql-request";
import { cookies } from "next/headers";
import { print, type ExecutionResult } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function getCookieHeaders() {
  // const cookieToSTring = await cookies.toString()
  return { Cookie: cookies.toString() };
}

export async function serverFetch(document: RequestDocument, tags?: string[]) {
  const res = await fetch("http://localhost:4000/", {
    mode: "cors",
    method: "POST",
    credentials: "include",
    body: JSON.stringify(document),
    headers: {
      Cookie: cookies().toString(),
    },
    next: {
      tags: tags,
    },
  });
  return await res.json();
}

export async function customFetcher<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  fetchOptions?: RequestInit,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Cookie: cookies().toString(),
    },

    body: JSON.stringify({
      query: print(document),
      variables,
    }),
    ...fetchOptions,
  });

  const { data } = await response.json();
  return data;
}
