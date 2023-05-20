import { useState } from "react";
import raw from "./assets/sample.json";

const fetchData = () => raw as Samples;

function App() {
  const { items } = fetchData();
  const [item, setItem] = useState<null | Item>(null);
  const [sVarieties, setsVarieties] = useState<SelectedVariety[]>([]);

  const setsVariety = (variety: SelectedVariety) => {
    setsVarieties([...sVarieties, variety]);
    if (item === null) throw Error("Item not found!");
    let temp = item.varieties;
    temp.shift();
    setItem({ ...item, varieties: temp });
  };

  const createItemCode = () => {
    if (item === null) throw Error("Item not found!");
    return sVarieties.reduce((a, b) => a + `.${b.option.code}`, item.code);
  };

  const backButton = () => {
    setItem(null);
    setsVarieties([]);
  };

  return (
    <main className="w-full h-full justify-center items-center gap-10 flex text-center flex-col">
      <div className="container m-auto bg-slate-100 rounded-md p-10 flex flex-col items-center mt-10 text-stone-800 relative">
        {item === null ? (
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
        ) : (
          <>
            <button
              onClick={backButton}
              className="absolute top-5 left-20 font-medium rounded-xl p-1 px-2 bg-slate-400 text-neutral-100 "
            >{`< Back`}</button>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-medium bg-slate-200 px-5 py-2 rounded-full">
                {item.description}
              </h2>
              {item.varieties.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  <VarietiesSelector
                    varietyCode={item.varieties[0]}
                    onClick={setsVariety}
                  />
                </ul>
              ) : (
                <div>{createItemCode()}</div>
              )}
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
    <li className=" bg-gray-200 hover:bg-gray-300 hover:text-stone-700 rounded-xl">
      <button className="p-3 w-full" onClick={() => onClick()}>
        {children}
      </button>
    </li>
  );
}

type VarietiesSelectorProps = {
  varietyCode: String;
  onClick: (e: SelectedVariety) => void;
};

function VarietiesSelector({ varietyCode, onClick }: VarietiesSelectorProps) {
  const { varieties } = fetchData();
  let variety = varieties.find((e) => e.code === varietyCode);
  if (variety === undefined) return <div>Could not find Variety!</div>;
  return (
    <div className="flex flex-col rounded-md bg-gray-100 justify-center items-center p-3 gap-1">
      <span>{variety.description}</span>
      <ul className="flex gap-2">
        {variety.options.map((e) => (
          <ListButton
            key={e.code}
            onClick={() => onClick({ code: variety!.code, option: e })}
          >
            {e.description}
          </ListButton>
        ))}
      </ul>
    </div>
  );
}

export default App;
