"use client";

import Link from "next/link";

interface QuickAction {
  label: string;
  action: () => void;
  href?: string;
}

interface QuickActionsProps {
  onCategorize?: () => void;
  onAddTransfer?: () => void;
  onInviteFriend?: () => void;
  onAskAI?: () => void;
}

export default function QuickActions({
  onCategorize,
  onAddTransfer,
  onInviteFriend,
  onAskAI,
}: QuickActionsProps) {
  const actions = [
    { label: "Categorize 5", onClick: onCategorize },
    { label: "Add transfer to BMW", onClick: onAddTransfer },
    { label: "Invite friend", onClick: onInviteFriend, href: "/social" },
    { label: "Ask Luni AI", onClick: onAskAI, href: "/chat" },
  ];

  const handleAction = (action: typeof actions[0]) => {
    if (action.onClick) {
      action.onClick();
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, index) => {
        const content = (
          <button
            key={index}
            onClick={() => handleAction(action)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-900 text-center"
          >
            {action.label}
          </button>
        );

        if (action.href) {
          return (
            <Link key={index} href={action.href}>
              {content}
            </Link>
          );
        }

        return content;
      })}
    </div>
  );
}

