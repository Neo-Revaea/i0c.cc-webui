'use client';

import { useMemo } from "react";

import { GroupTree } from "@/components/ui/group-tree";
import { Sidebar } from "@/components/ui/sidebar";
import { useRedirectsGroups } from "./use-redirects-groups";

export function RedirectsGroupsManager() {
  const {
    isLoading,
    loadError,
    slotsKey,
    rootGroup,
    selectedGroupId,
    selectedGroup,
    selectGroup,
    editingGroupId,
    editingName,
    setEditingName,
    beginRename,
    cancelRename,
    commitRename,
    addGroup,
    removeGroup,
    isPending,
    save,
    resultMessage,
    lastCommitUrl
  } = useRedirectsGroups();

  const sidebarFooter = useMemo(
    () => (
      <div className="space-y-3">
        <button
          type="button"
          onClick={save}
          disabled={isPending}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isPending ? "保存中..." : "保存改动"}
        </button>
        {resultMessage ? (
          <p className="text-sm text-slate-600">
            {resultMessage}
            {lastCommitUrl ? (
              <>
                ，
                <a
                  href={lastCommitUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline hover:text-blue-500"
                >
                  查看提交
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    ),
    [isPending, lastCommitUrl, resultMessage, save]
  );

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[minmax(0,1fr),20rem]">
        <section className="min-w-0">
          <div className="text-sm text-slate-500">加载中...</div>
        </section>
        <Sidebar className="order-1 md:order-2" title="分组" footer={sidebarFooter}>
          <div />
        </Sidebar>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[minmax(0,1fr),20rem]">
        <section className="min-w-0">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{loadError}</div>
        </section>
        <Sidebar className="order-1 md:order-2" title="分组" footer={sidebarFooter}>
          <div className="text-sm text-slate-600">无法加载分组</div>
        </Sidebar>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[minmax(0,1fr),20rem]">
      <Sidebar className="order-1 md:order-2" title="分组管理" footer={sidebarFooter}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-500">{slotsKey}</span>
          <button
            type="button"
            onClick={() => addGroup(rootGroup.id)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            新增分组
          </button>
        </div>

        {rootGroup.children.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">暂无分组</p>
        ) : (
          <div className="mt-4">
            <GroupTree
              groups={rootGroup.children}
              selectedGroupId={selectedGroupId}
              editingGroupId={editingGroupId}
              editingName={editingName}
              onSelectGroup={selectGroup}
              onAddChildGroup={addGroup}
              onBeginRenameGroup={beginRename}
              onEditingNameChange={setEditingName}
              onCommitRenameGroup={commitRename}
              onCancelRename={cancelRename}
              onRemoveGroup={removeGroup}
            />
          </div>
        )}
      </Sidebar>

      <section className="order-2 min-w-0 md:order-1">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-lg font-semibold text-slate-900">分组</h1>
          <p className="mt-1 text-sm text-slate-500">{selectedGroup ? selectedGroup.name : "从右侧选择分组"}</p>
        </div>
      </section>
    </div>
  );
}
