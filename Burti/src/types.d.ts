type Samples = {
  varieties: Variety[];
  items: Item[];
};

type Item = {
  code: string;
  description: string;
  varieties: string[];
};

type Variety = {
  code: string;
  description: string;
  options: Option[];
};

type Option = {
  code: string;
  description: string;
};
