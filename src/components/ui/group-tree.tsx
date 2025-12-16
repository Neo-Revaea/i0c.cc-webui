'use client';

import type { ReactNode } from "react";

import type { RedirectGroup } from "@/lib/redirects-groups/model";

export type GroupTreeProps = {
  groups: RedirectGroup[];
  selectedGroupId: string | null;
  editingGroupId: string | null;
  editingName: string;
  onSelectGroup: (groupId: string) => void;
  onAddChildGroup: (parentId: string) => void;
  onBeginRenameGroup: (groupId: string) => void;
  onEditingNameChange: (value: string) => void;
  onCommitRenameGroup: (groupId: string) => void;
  onCancelRename: () => void;
  onRemoveGroup: (groupId: string) => void;
};

export function GroupTree({
  groups,
  selectedGroupId,
  editingGroupId,
  editingName,
  onSelectGroup,
  onAddChildGroup,
  onBeginRenameGroup,
  onEditingNameChange,
  onCommitRenameGroup,
  onCancelRename,
  onRemoveGroup
}: GroupTreeProps) {
  const render = (items: RedirectGroup[], depth: number): ReactNode =>
    items.map((group) => {
      const selected = group.id === selectedGroupId;
      const isEditing = group.id === editingGroupId;
      const label = group.name.trim() || "未命名分组";

      return (
        <li key={group.id} className="space-y-2">
          <div
            className={`flex items-center justify-between gap-2 rounded-xl px-2 py-2 ${
              selected ? "bg-slate-50" : "hover:bg-slate-50"
            }`}
            style={{ paddingLeft: depth * 12 }}
          >
            <button
              type="button"
              onClick={() => onSelectGroup(group.id)}
              className="min-w-0 flex-1 text-left text-sm font-medium text-slate-700"
              title={label}
            >
              {isEditing ? (
                <input
                  value={editingName}
                  onChange={(event) => onEditingNameChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onCommitRenameGroup(group.id);
                    }
                    if (event.key === "Escape") {
                      onCancelRename();
                    }
                  }}
                  onBlur={() => onCommitRenameGroup(group.id)}
                  autoFocus
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <span className="block truncate">{label}</span>
              )}
            </button>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onAddChildGroup(group.id)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                title="新增子分组"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => onBeginRenameGroup(group.id)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
              >
                改名
              </button>
              <button
                type="button"
                onClick={() => onRemoveGroup(group.id)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"
              >
                删
              </button>
            </div>
          </div>

          {group.children.length > 0 ? <ul className="space-y-1">{render(group.children, depth + 1)}</ul> : null}
        </li>
      );
    });

  return <ul className="space-y-1">{render(groups, 0)}</ul>;
}
