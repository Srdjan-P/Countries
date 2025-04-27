import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Loader from "./components/Loader";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Button from "@mui/material/Button";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [originalCountries, setOriginalCountries] = useState([])
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [sortBy, setSortBy] = useState("Population")

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
      handleSort();
  }, [sortBy])

  useEffect(() => {
    addEventListener("scroll", handleScroll);
    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  const getCountries = async () => {
    const url =
      "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json";
    const response = await axios.get(url);
    const data = Object.values(response.data);
    setCountries(data);
    setOriginalCountries(data)
    setIsLoading(false);
  };

  const filteredData = countries.filter((item) => {
    if (input === "" && region === "All") {
      return item;
    } else {
      return (
        ((input === "" && region) && (item.region === region)) ||
        ((item.region === region || region === "All") &&
          (item.name.toLowerCase().includes(input) ||
            item.capital.toLowerCase().includes(input)))
      );
    }
  });

  const handleSort = () => {
    if(sortBy === "Population") {
      setCountries([...originalCountries])
      return;
    }

    const data = [...countries]
    if(sortBy === "Low to High") {
      data.sort((a,b) => a.population - b.population)
    } else if (sortBy === "High to Low") {
      data.sort((a,b) => b.population - a.population)
    }
    setCountries(data)
  }

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPos(position);
  };

  return (
    <>
      <div className="wrapper">
        <div className="main">
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search for..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <MenuItem value="All">All Regions</MenuItem>
                  <MenuItem value="Europe">Europe</MenuItem>
                  <MenuItem value="Asia">Asia</MenuItem>
                  <MenuItem value="Africa">Africa</MenuItem>
                  <MenuItem value="Americas">America</MenuItem>
                  <MenuItem value="Oceania">Oceania</MenuItem>
                  <MenuItem value="Antarctic">Antarctic</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                  className="select"
                  style={{ width: "200px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  label="Sort by"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="Population">Population</MenuItem>
                  <MenuItem value="Low to High">Low to High</MenuItem>
                  <MenuItem value="High to Low">High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="country-container">
            {filteredData.map(({ name, population, region, capital, flag }) => {
              return (
                <div key={name} className="country">
                  <img src={flag.large} alt={name} />
                  <div className="details">
                    <h4>{name}</h4>
                    <p>
                      <b>population: </b>
                      {population}
                    </p>
                    <p>
                      <b>Region: </b>
                      {region}
                    </p>
                    <p>
                      <b>Capital: </b>
                      {capital}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={`arrow ${scrollPos > 300 ? `show` : ""}`}>
        <Button
          variant="contained"
          size="small"
          onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowCircleUpIcon fontSize="large" />
        </Button>
      </div>
    </>
  );
}
