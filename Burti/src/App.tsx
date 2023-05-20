import { useState } from "react";
import raw from "./assets/sample.json";

const fetchData = () => raw as Samples;

function App() {
  const { items } = fetchData();
  const [item, setItem] = useState<null | Item>(null);
  const [varieties, setVarieties] = useState<SelectedVariety[]>([]);

  const addVariety = (variety: SelectedVariety) => {
    if (item === null) throw Error("Item not found!");
    setVarieties([...varieties, variety]);
    item.varieties.shift();
  };

  const createItemCode = () => {
    if (item === null) throw Error("Item not found!");
    return varieties.reduce((a, b) => a + `.${b.option}`, item.code);
  };

  return (
    <main className="w-full h-full justify-center items-center gap-10 flex text-center flex-col">
      <div className="container m-auto bg-slate-100 rounded-md p-10 flex flex-col items-center mt-10 text-stone-800 relative font-sans w-max gap-3">
        {item === null ? (
          <>
            <h1 className="text-2xl font-semibold px-3 y-2">Produkti : </h1>
            <ul className="flex flex-col gap-3 w-max ">
              {items.map((e) => (
                <ListButton
                  key={e.code}
                  onClick={() => setItem(structuredClone(e))}
                >
                  {e.description}
                </ListButton>
              ))}
            </ul>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setItem(null);
                setVarieties([]);
              }}
              className="absolute top-2 left-2 font-medium rounded-xl p-1 px-2 bg-slate-400 text-stone-100  hover:bg-slate-600"
            >{`< Atpakaļ`}</button>
            <div className="flex flex-col gap-3 pt-3.5">
              <h2 className="text-xl font-medium bg-slate-200 px-5 py-2 rounded-full">
                {item.description}
              </h2>
              <div className="flex flex-col">
                {item.varieties.length > 0 ? (
                  <VarietySelector
                    varietyCode={item.varieties[0]}
                    onClick={addVariety}
                  />
                ) : (
                  <>
                    <span className="text-lg font-serif">{`Produkta Kods : `}</span>
                    <span className="font-semibold font-mono text-xl">
                      {createItemCode()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

type ListButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function ListButton({ children, onClick }: ListButtonProps) {
  return (
    <li className="bg-gray-200 hover:bg-gray-300 hover:text-stone-700 rounded-xl">
      <button className="px-3 py-1.5 w-full" onClick={() => onClick()}>
        {children}
      </button>
    </li>
  );
}

type VarietySelectorProps = {
  varietyCode: string;
  onClick: (e: SelectedVariety) => void;
};

function VarietySelector({ varietyCode, onClick }: VarietySelectorProps) {
  const { varieties } = fetchData();
  const variety = varieties.find((e) => e.code === varietyCode);
  if (variety === undefined) return <div>Could not find Variety!</div>;
  return (
    <div className="flex flex-col rounded-md bg-gray-100 justify-center items-center gap-1">
      <span className="text-lg">{variety.description + " :"}</span>
      <ul className="flex gap-2">
        {variety.options.map((e) => (
          <ListButton
            key={e.code}
            onClick={() => onClick({ code: variety.code, option: e.code })}
          >
            {e.description}
          </ListButton>
        ))}
      </ul>
    </div>
  );
}

export default App;
