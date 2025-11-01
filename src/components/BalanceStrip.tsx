"use client";

import { Account } from "@/types";
import Link from "next/link";

interface BalanceStripProps {
  totalBalance: number;
  accounts: Account[];
}

export default function BalanceStrip({ totalBalance, accounts }: BalanceStripProps) {
  const keyAccounts = accounts.slice(0, 3);

  return (
    <Link href="/accounts" className="block">
      <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6 hover:shadow-apple-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-apple-gray-dark">Total Balance</h3>
          <span className="text-xs text-apple-gray-dark">Tap to view accounts</span>
        </div>
        <div className="text-3xl font-semibold text-apple-gray-darker mb-4">
          ${totalBalance.toLocaleString()}
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {keyAccounts.map((account) => (
            <div key={account.id} className="flex-shrink-0">
              <div className="text-xs text-apple-gray-dark mb-1">{account.name}</div>
              <div className="text-sm font-semibold text-apple-gray-darker">
                ${account.balance.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

