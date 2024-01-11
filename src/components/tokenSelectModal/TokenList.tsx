/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { getTokens } from "../../api/getTokens";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { TokenType } from "types/Token.type";

export default function TokenList() {
  const observeTarget = useRef<HTMLDivElement | null>(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["get-tokens"],
    ({ pageParam = 1 }) => getTokens(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data?.length === 0 ? undefined : nextPage;
      },
      select: (data) => ({
        pages: data.pages,
        pageParams: data.pageParams,
      }),
      onSuccess: (res) => console.log(res),
      refetchInterval: 30000, // 10 seconds,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  console.log(data?.pages, hasNextPage);
  console.log(1);

  useEffect(() => {
    if (hasNextPage && observeTarget.current) {
      observe(observeTarget.current);
    } else if (!hasNextPage && observeTarget.current) {
      unobserve(observeTarget.current);
    }
  }, [hasNextPage, observe, unobserve, data]);

  return (
    <div>
      {data?.pages &&
        data.pages.map((page, i) => (
          <div key={i}>
            {page.data.map((token: TokenType) => (
              <div key={token.id}>{token.name}</div>
            ))}
          </div>
        ))}
      <div ref={observeTarget} />
    </div>
  );
}
