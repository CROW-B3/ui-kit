interface Field {
  label: string;
  value: string;
  variant?: 'default' | 'badge';
}

interface InvitationDetailsCardProps {
  fields: Field[];
}

export function InvitationDetailsCard({ fields }: InvitationDetailsCardProps) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6 text-sm shadow-card-glow">
      {fields.map((field, index) => (
        <div
          key={index}
          className={`flex justify-between items-center ${
            index !== fields.length - 1
              ? 'mb-3 border-b border-white/5 pb-3'
              : ''
          }`}
        >
          <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">
            {field.label}
          </span>
          {field.variant === 'badge' ? (
            <div className="flex items-center gap-1.5">
              <span className="text-violet-300 font-medium bg-violet-500/10 px-2 py-0.5 rounded text-xs border border-violet-500/20">
                {field.value}
              </span>
            </div>
          ) : (
            <span className="text-gray-200 font-medium">{field.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
