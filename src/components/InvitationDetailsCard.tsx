interface InvitationDetailsCardProps {
  organization: string;
  role: string;
  email: string;
}

export function InvitationDetailsCard({
  organization,
  role,
  email,
}: InvitationDetailsCardProps) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6 text-sm shadow-card-glow">
      <div className="flex justify-between items-center mb-3 last:mb-0 border-b border-white/5 pb-3 last:border-0 last:pb-0">
        <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">
          Organization
        </span>
        <span className="text-gray-200 font-medium">{organization}</span>
      </div>
      <div className="flex justify-between items-center mb-3 last:mb-0 border-b border-white/5 pb-3 last:border-0 last:pb-0">
        <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">
          Role
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-violet-300 font-medium bg-violet-500/10 px-2 py-0.5 rounded text-xs border border-violet-500/20">
            {role}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">
          Email
        </span>
        <span className="text-gray-200 font-medium">{email}</span>
      </div>
    </div>
  );
}
