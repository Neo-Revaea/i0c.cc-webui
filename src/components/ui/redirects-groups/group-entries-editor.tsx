'use client';

import type { RedirectGroup } from "@/lib/redirects-groups/model";

import { RouteEntryEditor } from "@/components/ui/redirects-groups/route-entry-editor";

export type GroupEntriesEditorProps = {
  group: RedirectGroup;
  onAddEntry: (groupId: string) => void;
  onRemoveEntry: (groupId: string, entryId: string) => void;
  onUpdateEntryKey: (groupId: string, entryId: string, nextKey: string) => void;
  onUpdateEntryValue: (groupId: string, entryId: string, nextValue: unknown) => void;
};

export function GroupEntriesEditor({
  group,
  onAddEntry,
  onRemoveEntry,
  onUpdateEntryKey,
  onUpdateEntryValue,
}: GroupEntriesEditorProps) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-slate-900">{group.name}</h1>
          <p className="mt-1 text-sm text-slate-500">编辑该分组内的 redirects 规则</p>
        </div>

        <button
          type="button"
          onClick={() => onAddEntry(group.id)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          新增规则
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {group.entries.map((entry) => (
          <div key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <label className="block text-xs font-medium text-slate-600">Path key</label>
                <input
                  value={entry.key}
                  onChange={(e) => onUpdateEntryKey(group.id, entry.id, e.target.value)}
                  placeholder="/foo 或 /bar/baz"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-300"
                />
              </div>

              <button
                type="button"
                onClick={() => onRemoveEntry(group.id, entry.id)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                删除
              </button>
            </div>

            <div className="mt-4">
              <RouteEntryEditor
                value={entry.value}
                onChange={(next) => onUpdateEntryValue(group.id, entry.id, next)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
