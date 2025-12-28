import type { ReactNode } from 'react';

export interface PendingInvite {
  id: string;
  email: string;
  initials: string;
  status: 'pending' | 'accepted' | 'expired';
  permissions: {
    chat?: {
      components: string[];
      lookbackWindow: string;
    };
    interactions?: boolean;
    patterns?: boolean;
    teamManagement?: boolean;
    apiKeys?: {
      scopes: string[];
    };
  };
}

interface PendingInviteCardProps {
  invite: PendingInvite;
  onResend: (id: string) => void;
  onRevoke: (id: string) => void;
}

export function PendingInviteCard({
  invite,
  onResend,
  onRevoke,
}: PendingInviteCardProps) {
  const getAvatarColor = (email: string) => {
    const colors = [
      'from-violet-600 to-indigo-700',
      'from-gray-700 to-gray-800',
      'from-blue-900 to-blue-950',
      'from-emerald-900 to-emerald-950',
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="text-[9px] uppercase tracking-wider px-1.5 py-px rounded-sm border border-yellow-500/20 bg-yellow-500/10 text-yellow-500/80 font-medium">
            Pending
          </span>
        );
      case 'accepted':
        return (
          <span className="text-[9px] uppercase tracking-wider px-1.5 py-px rounded-sm border border-green-500/20 bg-green-500/10 text-green-500/80 font-medium">
            Accepted
          </span>
        );
      case 'expired':
        return (
          <span className="text-[9px] uppercase tracking-wider px-1.5 py-px rounded-sm border border-red-500/20 bg-red-500/10 text-red-500/80 font-medium">
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  const formatPermissions = (permissions: PendingInvite['permissions']) => {
    const tags: string[] = [];

    if (permissions.chat) {
      const components = permissions.chat.components.join(' + ');
      const lookback = permissions.chat.lookbackWindow.replace(
        /(\d+)(\w+)/,
        '≤ $1$2'
      );
      tags.push(`Chat: ${components} (${lookback})`);
    }

    if (permissions.interactions) {
      tags.push('Interactions');
    }

    if (permissions.patterns) {
      tags.push('Patterns');
    }

    if (permissions.teamManagement) {
      tags.push('Team management');
    }

    if (permissions.apiKeys && permissions.apiKeys.scopes.length > 0) {
      tags.push(`API keys: ${permissions.apiKeys.scopes.join(', ')}`);
    }

    return tags;
  };

  const permissionTags = formatPermissions(invite.permissions);

  return (
    <div className="py-4 flex flex-col gap-2 group first:pt-0">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(
              invite.email
            )} flex items-center justify-center text-[10px] font-bold text-white shadow-inner`}
          >
            {invite.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-200 font-medium">
                {invite.email}
              </span>
            </div>
            <div className="mt-0.5">{getStatusBadge(invite.status)}</div>
          </div>
        </div>
        {invite.status === 'pending' && (
          <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onResend(invite.id)}
              className="text-[10px] font-medium text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-wide"
            >
              Resend
            </button>
            <button
              type="button"
              onClick={() => onRevoke(invite.id)}
              className="text-[10px] font-medium text-gray-500 hover:text-red-400 transition-colors uppercase tracking-wide"
            >
              Revoke
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 ml-11 mt-1">
        {permissionTags.map((tag, index) => (
          <span
            key={index}
            className="text-[10px] px-1.5 py-px rounded bg-white/5 border border-white/10 text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
