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
  otherValue: ValueType;
  searchLoading: boolean;
}

export default function TokenList({
  searchedToken,
  setValue,
  setModalClicked,
  value,
  otherValue,
  searchLoading,
}: TokenListProps) {
  const observeTarget = useRef<HTMLDivElement | null>(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
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
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24,
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
    const _newSearched = [{ tokenSymbol, tokenId }, ..._searched].slice(0, 6);
    localStorage.setItem("recentSearched", JSON.stringify(_newSearched));
    setModalClicked(false);
  };

  if (searchedToken) {
    return (
      <div css={tokenListContainer}>
        {searchLoading && (
          <button className="tokenCard">
            <p className="tokenSymbol">토큰을 불러오는 중 입니다</p>
          </button>
        )}
        {searchedToken?.map((token: TokenType) => {
          return (
            <button
              key={`${token.id}`}
              onClick={() => handleTokenCliked(token.symbol, token.id)}
              className="tokenCard"
              disabled={
                token.id === value.tokenId || token.id === otherValue.tokenId
              }>
              <p className="tokenSymbol">{token.symbol}</p>
              <p className="tokenName">{token.name}</p>
            </button>
          );
        })}
      </div>
    );
  } else {
    return (
      <div css={tokenListContainer}>
        {data?.pages &&
          data?.pages.map((page: TokenType[], pageIndex: number) => {
            return page.map((token: TokenType) => {
              return (
                <button
                  key={`${token.id}_${pageIndex}`}
                  onClick={() => handleTokenCliked(token.symbol, token.id)}
                  className="tokenCard"
                  disabled={
                    token.id === value.tokenId ||
                    token.id === otherValue.tokenId
                  }>
                  <p className="tokenSymbol">{token.symbol}</p>
                  <p className="tokenName">{token.name}</p>
                </button>
              );
            });
          })}
        {isLoading && (
          <button className="tokenCard" disabled={true}>
            <p className="tokenSymbol">토큰을 불러오는 중 입니다</p>
          </button>
        )}
        {isError && (
          <button className="tokenCard" disabled={true}>
            <p className="tokenSymbol">
              API 요청 횟수가 초과했습니다. 1분뒤 다시 시도해 주세요
            </p>
          </button>
        )}

        <div className="target" ref={observeTarget} />
      </div>
    );
  }
}
