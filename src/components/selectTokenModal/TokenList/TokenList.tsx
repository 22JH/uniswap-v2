/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { tokenListContainer } from "./TokenList.css";

import { getTokens } from "../../../api/getTokens";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { TokenType } from "types/Token.type";
import { ValueType } from "types/Value.type";

interface TokenListProps {
  searchedToken: TokenType[];
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
  setModalClicked: React.Dispatch<React.SetStateAction<boolean>>;
  value: ValueType;
}

export default function TokenList({
  searchedToken,
  setValue,
  setModalClicked,
  value,
}: TokenListProps) {
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

  const handleTokenCliked = (tokenSymbol: string, tokenId: string) => {
    if (value.tokenId === tokenId) return;

    setValue((prev) => ({ ...prev, tokenSymbol, tokenId }));

    const _searched: string[] = JSON.parse(
      localStorage.getItem("recentSearched") || "[]"
    );
    const _newSearched = [{ tokenSymbol, tokenId }, ..._searched];
    localStorage.setItem("recentSearched", JSON.stringify(_newSearched));
    setModalClicked(false);
  };

  if (searchedToken) {
    return (
      <div css={tokenListContainer}>
        {searchedToken?.map((token: TokenType) => {
          return (
            <div
              key={`${token.id}`}
              onClick={() => handleTokenCliked(token.symbol, token.id)}
              className="tokenCard">
              <p className="tokenSymbol">{token.symbol}</p>
              <p className="tokenName">{token.name}</p>
            </div>
          );
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
              return (
                <div
                  key={`${token.id}_${pageIndex}`}
                  onClick={() => handleTokenCliked(token.symbol, token.id)}
                  className="tokenCard">
                  <p className="tokenSymbol">{token.symbol}</p>
                  <p className="tokenName">{token.name}</p>
                </div>
              );
            });
          })}
        <div ref={observeTarget} />
      </div>
    );
  }
}
