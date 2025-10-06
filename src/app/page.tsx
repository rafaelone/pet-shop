type Props = {
  title: string;
};

const Component = ({ title }: Props) => {
  console.log(title);
  return (
    <>
      <h2>Component</h2>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <Component title={1} />
    </div>
  );
}
