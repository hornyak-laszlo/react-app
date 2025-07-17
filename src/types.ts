export type ApiResponse = {
  annotations: {
    dataset_link: string;
    hidden_measures: string;
    topic: string;
    table: string;
    dataset_name: string;
    source_description: string;
    source_name: string;
    subtopic: string;
  };
  data: {
    'Nation ID': string;
    Nation: string;
    Year: number;
    'Total Population': number;
  }[];
  page: {
    limit: number;
    offset: number;
    total: number;
  };
  columns: string[];
};

export type PopulationData = {
  year: number;
  population: number;
};
