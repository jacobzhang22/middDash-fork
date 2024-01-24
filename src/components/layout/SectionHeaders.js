export default function SectionHeaders({ mainHeader, subHeader }) {
  return (
    <>
      {mainHeader && (
        <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
      )}
      {subHeader && (
        <h2 className="text-primary font-bold text-2xl italic">{subHeader}</h2>
      )}
    </>
  );
}
