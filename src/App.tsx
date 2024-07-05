import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import CustomCountrySelect, { CustomCountrySelectTester } from './CustomCountrySelect';
import { Container } from '@mui/material';

const initialData = {
  nom: "",
  paysVisites: []
};

const schema = {
  type: "object",
  properties: {
    nom: {
      type: "string",
      title: "Nom"
    },
    paysVisites: {
      type: "array",
      title: "Pays visités",
      items: {
        type: "string",
        enum: ["Belgique", "France", "Allemagne", "Italie", "Espagne", "Nigeria", "Afrique du Sud"]
      }
    }
  }
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/nom"
    },
    {
      type: "Control",
      scope: "#/properties/paysVisites"
    }
  ]
};

const App = () => {
  const [formData, setFormData] = useState(initialData);
  const renderers = [
    ...materialRenderers,
    { tester: CustomCountrySelectTester, renderer: CustomCountrySelect }
  ];

  return (
    <Container>
      <JsonForms
        data={formData}
        onChange={({ errors, data }) => setFormData(data)}
        schema={schema}
        uischema={uischema}
        renderers={renderers}
        cells={materialCells}
      />
    </Container>
  );
};

export default App;