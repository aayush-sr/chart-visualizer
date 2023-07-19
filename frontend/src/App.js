import { useState, useEffect } from "react";
import { BarChart } from "./components/BarChart";
import "./styles.css";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Data } from "./utils/data";
import axios from 'axios';

function processData(Data) {
  return {
    labels: Data.map((data) => parseInt(data.date, 10)),

    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.value),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };
}

Chart.register(CategoryScale);

export default function App() {
  const [dataArr, setDataArr] = useState([]);
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => parseInt(data.date, 10)),

    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.value),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const [name, setName] = useState("");
  const [indicator, setIndicator] = useState("");
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.worldbank.org/v2/country/IN/indicator/1.3_ACCESS.ELECTRICITY.URBAN?date=1990:2001&format=json',
      );

      setChartData(processData(result.data[1]));
      // console.log(result.data[1]);
    };

    fetchData();

  }, []);

  const handleSaveView = (e) => {
    const userData = {
      name,
      country: name,
      indicator,
      startDate,
      endDate,
    };
   
      axios.post("https://localhost:9090", userData).then((response) => {
        console.log(response.status, response.data.token);
      }).catch(err=>console.log(err.message));
    
    

  };


  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleIndicatorChange = (e) => {
    setIndicator(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const result = await axios(
          'https://api.worldbank.org/v2/country/IN/indicator/1.3_ACCESS.ELECTRICITY.URBAN?date=1990:2001&format=json',
        );

        setChartData(processData(result.data[1]));

      }
      catch (err) {
        console.log(err);

      }

      // console.log(result.data[1]);
    };

    fetchData();
  };



  return (
    <div className="App">
      {/* <a href="http://localhost:9090/api/views"> See all saved views </a> */}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >

        <h2> Welcome! </h2>
        <h3> TS test </h3>
        <label>Country Name:</label>
        <br />
        <select
          type="text"
          value={name}
          required
          onChange={(e) => {
            handleChange(e);
          }}
        >
        </select>
        <br />

        <label>Indicator:</label>
        <br />
        <input
          type="text"
          value={indicator}
          required
          onChange={(e) => {
            handleIndicatorChange(e);
          }}
        />
        <br />

        <label>Start Date:</label>
        <br />
        <input
          type="text"
          value={startDate}
          required
          onChange={(e) => {
            handleStartDateChange(e);
          }}
        />
        <br />

        <label>End Date:</label>
        <br />
        <input
          type="text"
          value={endDate}
          required
          onChange={(e) => {
            handleEndDateChange(e);
          }}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleSaveView}>Save this as View</button>
      <BarChart chartData={chartData} />
    </div>
  );
}
