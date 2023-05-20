import raw from "./assets/sample.json";

const fetchData = () => raw as Samples;

function App() {
  return (
    <div>
      {fetchData().items.map((e) => (
        <span>{e.code + " | "}</span>
      ))}
    </div>
  );
}

export default App;
