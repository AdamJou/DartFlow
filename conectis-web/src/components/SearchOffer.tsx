import {
  Stack,
  TextField,
  Typography,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { SetStateAction, useState, useEffect } from "react";

export const SearchOffer = () => {
  const [ooferta, setOferta] = useState("");
  const [jsonRequest, setJsonRequest] = useState("");

  const SzukajOferty = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7272/api/JobOffer/" + ooferta
      );
      setJsonRequest(res.data);
      console.log(jsonRequest);
    } catch (err) {
      console.log(err);
    }
  };

  function getOferta(val: { target: { value: SetStateAction<string> } }) {
    setOferta(val.target.value);
  }

  return (
    <Stack spacing={4} margin="40px">
      <Typography variant="h6">Wyszukaj ofertę</Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Oferta"
          value={ooferta}
          onChange={getOferta}
          variant="outlined"
        />
        <Button color="inherit" onClick={SzukajOferty}>
          Szukaj
        </Button>
      </Stack>
      <Box>
        <FormControl>
          <RadioGroup name="type-of-offer" row>
            <FormControlLabel
              control={<Radio />}
              label="Oferty mentora"
              value="mentor"
            />

            <FormControlLabel
              control={<Radio />}
              label="Oferty mentee"
              value="mentee"
            />
            <FormControlLabel
              control={<Radio />}
              label="Oferty pracy"
              value="jo"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </Stack>
  );
};
