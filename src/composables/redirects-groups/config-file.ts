'use client';

import { useCallback, useState, useTransition } from "react";

import { fetchRedirectsConfig, saveRedirectsConfig } from "./api";

export function useRedirectsConfigFile(options: {
  fallbackLoadErrorText: string;
  fallbackSaveErrorText: string;
  saveOkText: string;
  commitMessage: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [sha, setSha] = useState<string>("");

  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [lastCommitUrl, setLastCommitUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    setResultMessage(null);
    setLastCommitUrl(null);

    try {
      const data = await fetchRedirectsConfig({
        fallbackLoadErrorText: options.fallbackLoadErrorText,
      });

      setSha(data.config.sha);
      return data.config.content;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : options.fallbackLoadErrorText;
      setLoadError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [options.fallbackLoadErrorText]);

  const save = useCallback(
    (content: string) => {
      startTransition(async () => {
        setResultMessage(null);
        setLastCommitUrl(null);

        try {
          const result = await saveRedirectsConfig(
            {
              content,
              sha,
              message: options.commitMessage,
            },
            {
              fallbackSaveErrorText: options.fallbackSaveErrorText,
            }
          );

          setSha(result.sha);
          setLastCommitUrl(result.commitUrl);
          setResultMessage(options.saveOkText);
        } catch (error) {
          setResultMessage(
            error instanceof Error
              ? error.message
              : options.fallbackSaveErrorText
          );
        }
      });
    },
    [options.commitMessage, options.fallbackSaveErrorText, options.saveOkText, sha]
  );

  return {
    isLoading,
    loadError,
    isPending,
    load,
    save,
    resultMessage,
    lastCommitUrl,
  };
}
