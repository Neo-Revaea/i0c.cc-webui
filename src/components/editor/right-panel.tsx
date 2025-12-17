'use client';

import type { ReactNode } from "react";

export type EditorMode = "rules" | "json";

export type RightPanelProps = {
  editorMode: EditorMode;
  onEnterRulesMode: () => void;
  onEnterJsonMode: () => void;
  jsonDraft: string;
  onJsonDraftChange: (value: string) => void;
  jsonError: string | null;
  rulesContent: ReactNode;
};

export function RightPanel({
  editorMode,
  onEnterRulesMode,
  onEnterJsonMode,
  jsonDraft,
  onJsonDraftChange,
  jsonError,
  rulesContent,
}: RightPanelProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={onEnterRulesMode}
            className={
              "rounded-lg px-3 py-1.5 text-xs font-medium transition " +
              (editorMode === "rules" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50")
            }
          >
            规则编辑
          </button>
          <button
            type="button"
            onClick={onEnterJsonMode}
            className={
              "rounded-lg px-3 py-1.5 text-xs font-medium transition " +
              (editorMode === "json" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50")
            }
          >
            JSON 编辑
          </button>
        </div>
        <p className="text-xs text-slate-500">{editorMode === "json" ? "保存将以此 JSON 为准" : "编辑规则并保存"}</p>
      </div>

      {editorMode === "json" ? (
        <div className="space-y-3">
          {jsonError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {jsonError}
            </div>
          ) : null}

          <textarea
            value={jsonDraft}
            onChange={(e) => onJsonDraftChange(e.target.value)}
            spellCheck={false}
            className="min-h-[60vh] w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 font-mono text-xs text-slate-900 outline-none focus:border-slate-300"
          />
          <p className="text-xs text-slate-500">提示：切回“规则编辑”后会以解析后的内容为准。</p>
        </div>
      ) : (
        rulesContent
      )}
    </div>
  );
}
