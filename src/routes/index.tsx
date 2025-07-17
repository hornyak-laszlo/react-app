import type { ApiResponse, PopulationData } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import * as React from 'react';

const API_URL =
  'https://honolulu-api.datausa.io/tesseract/data.jsonrecords?cube=pums_5&drilldowns=Nation,Year&measures=Total+Population';

export const Route = createFileRoute('/')({
  component: App,
  loader: async (): Promise<PopulationData[]> => {
    const response = await fetch(API_URL);
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
          <h1>USA population history</h1>
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

          <div style={{ width: '100%', height: 600 }}>
            <ResponsiveContainer>
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid />
                <XAxis dataKey="year" />
                <YAxis tickCount={10} domain={[300000000, 'auto']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="population" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </>
  );
}
