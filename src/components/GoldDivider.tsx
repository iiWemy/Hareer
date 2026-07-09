import branchImg from "@/imports/hareer-tea-branch.png";

interface GoldDividerProps {
  withBranch?: boolean;
}

export default function GoldDivider({ withBranch = false }: GoldDividerProps) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden py-1">
      <div
        style={{
          height: 1,
          width: "100%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(248,211,118,0.3) 35%, rgba(248,211,118,0.5) 50%, rgba(248,211,118,0.3) 65%, transparent 100%)",
        }}
      />

      {withBranch && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: 0.06 }}
        >
          <img src={branchImg} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
