export default function Side({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-96 md:w-2/5 mx-4 p-4 border border-red-900">
      {children}
    </div>
  );
}
