import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createServerActionsKeyFactory,
  setupServerActionHooks,
} from "zsa-react-query";
import { useQueryClient } from "@tanstack/react-query";

export const QueryKeyFactory = createServerActionsKeyFactory({
  getPosts: () => ["getPosts"],
  getFriends: () => ["getFriends"],
  getPostsAndFriends: () => ["getPosts", "getFriends"],
  somethingElse: (id: string) => ["somethingElse", id],
  getRandomNumber: () => ["getRandomNumber"],
  getTodos: () => ["getTodos"],
});

const {
  useServerActionQuery,
  useServerActionMutation,
  useServerActionInfiniteQuery,
} = setupServerActionHooks({
  hooks: {
    useQuery: useQuery,
    useMutation: useMutation,
    useInfiniteQuery: useInfiniteQuery,
  },
  queryKeyFactory: QueryKeyFactory,
});

export {
  useServerActionInfiniteQuery,
  useServerActionMutation,
  useServerActionQuery,
};
