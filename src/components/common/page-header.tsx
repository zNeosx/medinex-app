type Props = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};
const AdminPagesHeader = ({ title, subtitle, children }: Props) => {
  return (
    <div className="flex gap-2 max-lg:flex-col lg:items-center lg:justify-between">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="font-normal text-gray-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default AdminPagesHeader;
