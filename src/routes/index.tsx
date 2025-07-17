import type { ApiResponse, PopulationData } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

// https://honolulu-api.datausa.io/tesseract/data.jsonrecords?cube=pums_5&drilldowns=Nation,Year&measures=Total+Population

export const Route = createFileRoute('/')({
  component: App,
  loader: async (): Promise<PopulationData[]> => {
    const response = await fetch(
      'https://honolulu-api.datausa.io/tesseract/data.jsonrecords?cube=pums_5&drilldowns=Nation,Year&measures=Total+Population',
    );
    const jsonResponse = (await response.json()) as ApiResponse;
    return jsonResponse.data
      .filter((d) => d['Nation ID'] === '01000US')
      .map((d) => ({
        year: d.Year,
        population: d['Total Population'],
      }));
  },
});

function App() {
  const data = Route.useLoaderData();
  const [yearCount, setYearCount] = React.useState(3);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYearCount(Number(event.target.value));
  };

  const filteredData = data.slice(-yearCount);

  return (
    <>
      <header
        className="container"
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
      >
        <hgroup>
          <h1>USA population data history</h1>
        </hgroup>
      </header>
      <main className="container">
        <section>
          <label htmlFor="year-select">
            Select how many years of data to show
          </label>
          <select
            id="year-select"
            name="years"
            aria-label="Select how many years of data to show"
            required
            value={yearCount}
            onChange={handleYearChange}
          >
            <option value="3">3 years</option>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
          </select>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}
