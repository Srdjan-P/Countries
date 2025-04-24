import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Loader from "./components/Loader";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const url =
      "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json";
    const response = await axios.get(url);
    const data = Object.values(response.data);
    setCountries(data);
    setIsLoading(false);
  };

  const filteredData = countries.filter((item) => {
    if (input === "" && region === "") {
      return item;
    } else if (input === "" && region) {
      return item.region === region;
    } else {
      return (
        item.region === region &&
        (item.name.toLowerCase().includes(input) ||
          item.capital.toLowerCase().includes(input))
      );
    }
  });

  return (
    <div className="wrapper">
      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search for..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Regions</InputLabel>
              <Select
                className="select"
                style={{ width: "200px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={region}
                label="Regions"
                onChange={(event) => setRegion(event.target.value)}
              >
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Americas">America</MenuItem>
                <MenuItem value="Oceania">Oceania</MenuItem>
                <MenuItem value="Antarctic">Antarctic</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="country-container">
          {filteredData.map((country) => {
            return (
              <div key={country.name} className="country">
                <img src={country.flag.large} alt={country.name} />
                <div className="details">
                  <h4>{country.name}</h4>
                  <p>
                    <b>population: </b>
                    {country.population}
                  </p>
                  <p>
                    <b>Region: </b>
                    {country.region}
                  </p>
                  <p>
                    <b>Capital: </b>
                    {country.capital}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
