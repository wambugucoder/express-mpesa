const express = require('express');
const request= require('request');
const keys = require("../config/keys");
const router = express.Router();

//access-token middleware

  function accesstoken (req,res,next) {
    auth = "Basic " + new Buffer(keys.consumer_key + ":" + keys.consumer_secret).toString("base64");
  
request(
  {
    url : keys.url,
    headers : {
      "Authorization" : auth
    }
  },
  function (error, response, body) {
    if (error) {
        console.log(error)
    } else {
       
        req.access_token=JSON.parse(body).access_token
        next()
    }
  }
)
}
router.get('/accesstoken', (req, res) => {
    auth = "Basic " + new Buffer(keys.consumer_key + ":" + keys.consumer_secret).toString("base64");
  
    request(
      {
        url : keys.url,
        headers : {
          "Authorization" : auth
        }
      },
      function (error, response, body) {
        if (error) {
            console.log(error)
        } else {
           
           console.log(body);
        }
      }
    )
});
//register urls
router.get('/register', accesstoken,(req, res) => {
   let oauth_token = req.access_token,
   url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    auth = "Bearer " + oauth_token;
  
    request(
      {
        method: 'POST',
        url : url,
        headers : {
          "Authorization" : auth
        },
        json : {
          "ShortCode": "600111 ",
          "ResponseType": "Confirm ",
          "ConfirmationURL": "http://ip_address:port/confirmation",
          "ValidationURL": "http://ip_address:port/validation_url"
        }
      },
      function (error, response, body) {
        // TODO: Use the body object to extract the 
        console.log(body)
      }
    )
});

//GET ACCOUNT BALANCE
router.get('/account-balance',accesstoken, (req, res) => {
    oauth_token = req.access_token,
    url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query"
    auth = "Bearer " + oauth_token;
  
    request(
      {
        method: 'POST',
        url : keys.url,
        headers : {
          "Authorization" : auth
        },
        json : {
          "Initiator":" ",
          "SecurityCredential":" ",
          "CommandID":"AccountBalance",
          "PartyA":" ",
          "IdentifierType":"4",
          "Remarks":" ",
          "QueueTimeOutURL":"https://ip_address:port/timeout_url",
          "ResultURL":"https://ip_address:port/result_url"
          }
      },
      function (error, response, body) {
        // TODO: Use the body object to extract the response
        console.log(body)
      }
    )
});
//LIPA NA Mpesa
router.post('/lipa-online', (req, res) => {
    oauth_token = req.access_token,
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    auth = "Bearer " + oauth_token;
  
    request(
      {
        method: 'POST',
        url : keys.url,
        headers : {
          "Authorization" : auth
        },
      json : {
        "BusinessShortCode": " ",
        "Password": " ",
        "Timestamp": " ",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": " ",
        "PartyA": " ",
        "PartyB": " ",
        "PhoneNumber": " ",
        "CallBackURL": "https://ip_address:port/callback",
        "AccountReference": " ",
        "TransactionDesc": " "
      }
    },
      function (error, response, body) {
        // TODO: Use the body object to extract the response
        console.log(body)
      }
    )
  
});
//MPESA REVERSAL
router.get('/reverse',accesstoken, (req, res) => {
    oauth_token = req.access_token,
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    auth = "Bearer " + oauth_token;
  
    request(
      {
        method: 'POST',
        url : keys.url,
        headers : {
          "Authorization" : auth
        },
      json : {
        "BusinessShortCode": " ",
        "Password": " ",
        "Timestamp": " ",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": " ",
        "PartyA": " ",
        "PartyB": " ",
        "PhoneNumber": " ",
        "CallBackURL": "https://ip_address:port/callback",
        "AccountReference": " ",
        "TransactionDesc": " "
      }
    },
      function (error, response, body) {
        // TODO: Use the body object to extract the response
        console.log(body)
      }
    )
});




















module.exports = router