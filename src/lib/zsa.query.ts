import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createServerActionsKeyFactory,
  setupServerActionHooks,
} from "zsa-react-query";

export const QueryKeyFactory = createServerActionsKeyFactory({
  getTodos: () => ["getTodos"],
  getTags: () => ["getTags"],
  getCategories: () => ["getCategories"],
  getCategoryWithTodos: (id: string) => ["getCategoryWithTodos", id],
  getTagWithTodos: (id: string) => ["getTagWithTodos", id],
  getAllInfoTodo: (id: string) => ["getAllInfoTodo", id],
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
