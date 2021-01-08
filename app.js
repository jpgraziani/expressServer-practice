//this requires the package
const express = require('express');
const morgan = require('morgan');

//invoke the function to create the application
const app = express();
//method use() is for mounting middleware
app.use(morgan('dev'));

//get request at the root url
app.get('/hello', (req, res) => {
  res.send('olivia');
});

// app.get('/apple', (req, res) => {
//   res.status(200).send('hello')
// })

// app.get('/echo', (req, res) => {
//   const responseText = `here are some details:
//     Base URL: ${req.baseUrl}
//     Host: ${req.hostname}
//     Path: ${req.path}
//   `;
//   res.send(responseText);
// })

/*
sometimes the server needs to send JSON data to the client. To do so a content-type header needs to be set indicating to the client that the body of the response contains JSON.

The .json() method handles all of this for you. It sets the correct content-type and converts the parameter provided to a JSON string using JSON.stringify(). 
*/
app.get('/video', (req, res) => {
  const video = {
    title: 'Cats falling over',
    description: '15 minutes of hilarious fun as cats fall over',
    length: '15.40'
  }
  res.json(video)
});

/*
another object sending an array
*/

app.get('/colors', (req, res) => {
  const colors = [
    {
      name: "red",
      rgb: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "0000FF"
    },
  ];
  res.json(colors);
})

/*
debug with express
*/

app.get('/grade', (req, res) => {
  const { mark } = req.query;

  if (!mark) {
    return res
      .status(400)
      .send('Please provide a mark');
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    return res
      .status(400)
      .send('Mark must be a numeric value');
  }

  if (numericMark < 0 || numericMark > 100) {
    return res
      .status(400)
      .send('Mark must be in range 0 to 100');
  }

  if (numericMark >= 90) {
    return res.send('A');
  }
  if (numericMark >= 80) {
    return res.send('B');
  }

  if (numericMark >= 70) {
    return res.send('C');
  }

  res.send('F');
})

//listen to port 8000
app.listen(8000, () => {
  console.log('Express is on 8000');
});




//after this run npm start localhost:8000
//control + C stop server