export const Stats = ({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) => {
  return (
    <div className={`card w-full shadow-lg rounded-2xl bg-base-200 transition-transform transform hover:scale-105 ${color}`}>
      <div className="card-body p-4 flex flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{value}</h2>
          <p className="text-sm text-base-content/80">{title}</p>
        </div>
        <div className="text-3xl text-base-content">
          {icon}
        </div>
      </div>
    </div>
  );
};