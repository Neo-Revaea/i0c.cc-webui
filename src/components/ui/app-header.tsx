'use client';

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export function AppHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-slate-200/70 bg-white/80 backdrop-blur shadow-md rounded-b-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="i0c.cc"
            width={30}
            height={30}
            className="rounded-lg border-2 border-slate-400"
            priority
          />
          <span className="truncate text-lg font-semibold text-slate-900">i0c.cc 控制台</span>
          <span className="inline-flex h-5 items-center justify-center rounded-full border border-slate-200 bg-white px-2 text-[11px] font-medium leading-none text-slate-500">
            Beta
          </span>
        </div>

        {session ? (
          <div className="flex min-w-0 items-center gap-3 text-sm text-slate-700">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "GitHub 用户"}
                width={28}
                height={28}
                className="rounded-full border border-slate-200"
              />
            ) : null}
            <span className="max-w-[16rem] truncate text-sm text-slate-600">
              {session.user?.name ?? session.user?.email ?? "已登录"}
            </span>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              退出
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
