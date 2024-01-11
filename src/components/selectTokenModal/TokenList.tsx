/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { getTokens } from "../../api/getTokens";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { TokenType } from "types/Token.type";

interface TokenListProps {
  searchedToken: TokenType[];
}

const tokenListContainer = css`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const tokenCard = css`
  border: 1px solid black;
  &:hover {
    background-color: grey;
  }
`;

export default function TokenList({ searchedToken }: TokenListProps) {
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
        pages: data?.pages,
        pageParams: data?.pageParams,
      }),
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !searchedToken,
    }
  );

  useEffect(() => {
    if (hasNextPage && observeTarget.current) {
      observe(observeTarget.current);
    } else if (!hasNextPage && observeTarget.current) {
      unobserve(observeTarget.current);
    }
  }, [hasNextPage, observe, unobserve, data]);

  if (searchedToken) {
    return (
      <div css={tokenListContainer}>
        {searchedToken?.map((token: TokenType) => {
          return <div key={`${token.id}`}>{token.symbol}</div>;
        })}
        <div ref={observeTarget} />
      </div>
    );
  } else {
    return (
      <div css={tokenListContainer}>
        {data?.pages &&
          data?.pages.map((page: TokenType[], pageIndex: number) => {
            return page.map((token: TokenType) => {
              return <div key={`${token.id}_${pageIndex}`}>{token.symbol}</div>;
            });
          })}
        <div ref={observeTarget} />
      </div>
    );
  }
}
