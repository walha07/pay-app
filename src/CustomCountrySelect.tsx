import React, { useState } from 'react';
import {
  ControlProps,
  RankedTester,
  rankWith,
  uiTypeIs,
  schemaTypeIs,
  schemaMatches,
  and,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Checkbox, FormControl, FormGroup, FormControlLabel, Typography } from '@mui/material';

const continents = {
  Europe: ["Belgique", "France", "Allemagne", "Italie", "Espagne"],
  Afrique: ["Nigeria", "Afrique du Sud"]
};

const CustomCountrySelect = (props: ControlProps) => {
  const { data = [], handleChange, path } = props;
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);

  const handleContinentChange = (continent: string) => {
    const allCountries = continents[continent];
    const newSelectedContinents = selectedContinents.includes(continent)
      ? selectedContinents.filter((c) => c !== continent)
      : [...selectedContinents, continent];

    const newSelectedCountries = selectedContinents.includes(continent)
      ? data.filter((country: string) => !allCountries.includes(country))
      : [...data, ...allCountries.filter((country) => !data.includes(country))];

    setSelectedContinents(newSelectedContinents);
    handleChange(path, newSelectedCountries);
  };

  const handleCountryChange = (country: string) => {
    const newSelectedCountries = data.includes(country)
      ? data.filter((c: string) => c !== country)
      : [...data, country];
    handleChange(path, newSelectedCountries);
  };

  return (
    <FormControl component="fieldset">
      <Typography variant="h6">Pays visités</Typography>
      <FormGroup>
        {Object.keys(continents).map((continent) => (
          <div key={continent}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedContinents.includes(continent)}
                  onChange={() => handleContinentChange(continent)}
                />
              }
              label={continent}
            />
            <FormGroup>
              {continents[continent].map((country) => (
                <FormControlLabel
                  key={country}
                  control={
                    <Checkbox
                      checked={data.includes(country)}
                      onChange={() => handleCountryChange(country)}
                    />
                  }
                  label={country}
                />
              ))}
            </FormGroup>
          </div>
        ))}
      </FormGroup>
    </FormControl>
  );
};

const CustomCountrySelectTester: RankedTester = rankWith(
  3,
  and(
    uiTypeIs("Control"),
    schemaTypeIs("array"),
    schemaMatches((schema) => schema.items && schema.items.enum)
  )
);

export default withJsonFormsControlProps(CustomCountrySelect);
export { CustomCountrySelectTester };