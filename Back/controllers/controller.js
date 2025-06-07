const { Client } = require('@notionhq/client');
var nodemailer = require('nodemailer');
// require("dotenv").config();
const notion = new Client({ auth: process.env.API_KEY });
const DB_ID = process.env.DB_ID;
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(400).json({ message: "Session Expired" });
  }
  try{
    const data = jwt.verify(cookie, process.env.SECRET);
    res.status(200).send("Hello");
  }
  catch(error){
    res.status(400).send("Session Expired");
  }
  
}



const login = async (req, res) => {

  const { PAN, pass } = req.body;
  try {
    const response = await notion.databases.query({
      database_id: DB_ID,
      filter: {
      property: "PAN Number",
      rich_text: {
        contains: PAN
      }
    }
    });
    const ln = response.results.length;
    if (ln === 0) {
      return res.status(400).json({ message: "Incorrect PAN or User Not Found!" });
    }
    else if (ln !== 0 && response.results[0].properties.Formula.formula.string !== pass) return res.status(400).json({ message: "Password Incorrect!" });
    else {
      const tok = jwt.sign({

        PAN: PAN,
        Page_ID: response.results[0].id
      },
        process.env.SECRET,
        {
          expiresIn: "24h"
        })

      const cookieOptions = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,         // MUST be true on Vercel (HTTPS only)
  sameSite: 'None'      // Cross-origin cookie support
      }
      res.cookie("token", tok, cookieOptions);
      res.status(200).json({ message: "Successfully Login", token: tok });
    }
  } catch (error) {

    res.status(500).send('Failed to fetch data from Notion');
  }
}

const mfd = async (req, res) => {

  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(400).json({ message: "Session Expired" });
  }
  try{
    const data = jwt.verify(cookie, process.env.SECRET);
  const page_id = data.Page_ID;
  const MFD_ID = process.env.MFD_ID
  const PAN = data.PAN;
  const response2 = await notion.databases.query({ database_id: MFD_ID
     ,filter: {
    property: "PAN Number",
    rollup: {
      any: {
        rich_text: {
          equals: PAN
        }
      }
    }
  } 
  });
  

  //

  // const response = await notion.pages.retrieve({
  //   page_id: page_id
  // });
  // const ln = response.properties.MF.relation.length;
  const items = [];

 for(var i=0;i<response2.results.length;i++){
    items.push({"id":response2.results[i].id});
    items[i]["Name"] = response2.results[i].properties.Task_name.title[0].text.content;
    items[i]["Status"] = response2.results[i].properties.Status.status.name || " ";
    items[i]["Due"] = response2.results[i].properties.Due.date ? response2.results[i].properties.Due.date.start : " ";
    items[i]["Frequency"] = response2.results[i].properties['Frequency (Months)'].number || " ";
    items[i]["Days_Left"] = response2.results[i].properties['Days Left'].formula.string || " ";
 }
  // for (var i = 0; i < ln; i++) {
  //   const temp = await notion.pages.retrieve({
  //     page_id: response.properties.MF.relation[i].id
  //   });
  //   items.push({ "id": response.properties.MF.relation[i].id });
  //   if (temp.properties.Name.title.length === 0) {
  //     items[i]["Name"] = "";
  //   }
  //   else {
  //     items[i]["Name"] = temp.properties.Name.title[0].text.content
  //   }
  //   items[i]["Status"] = temp.properties.Status.status.name;
  //   if (temp.properties.Due.date === null) {
  //     items[i]["Due"] = " "
  //   }
  //   else {
  //     items[i]["Due"] = temp.properties.Due.date.start
  //   }
  //   if (temp.properties.Frequency.number === null) {
  //     items[i]["Frequency"] = " "
  //   }
  //   else {
  //     items[i]["Frequency"] = temp.properties.Frequency.number
  //   }
  //   if (temp.properties.Days_Left.formula.number === null && temp.properties.Days_Left.formula.string === null) {
  //     items[i]["Days_Left"] = " "
  //   }
  //   else {
  //     items[i]["Days_Left"] = temp.properties.Days_Left.formula.number || temp.properties.Days_Left.formula.string
  //   }

  // }
  res.status(200).json(items);

  }

  catch(error){
    res.status(401).json({message:"Session Expired"});
  }
  

}

const comments = async (req, res) => {
  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(400).json({ message: "Session Expired" });
  }
  const { id } = req.body;
  const data = jwt.verify(cookie, process.env.SECRET);
  const response = await notion.comments.list({ block_id: id });
  const sz = response.results.length;
  const cmts = [];
  for (i = 0; i < sz; i++) {
    if (response.results[i].created_by.id !== "30e59ee6-b58b-4458-b950-3a4254c64cf4") {
      cmts.push({ "prsn": "admin" })
    }
    else {
      cmts.push({ "prsn": "user" })
    }

    cmts[i]["data"] = response.results[i].rich_text[0].text.content
  }
  res.status(200).json(cmts);
}

const create_cmt = async (req, res) => {

  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(400).json({ message: "Session Expired" });
  }

  const { id, cmt } = req.body;
  const response = await notion.comments.create({
    "parent": {
      "page_id": id
    },
    "rich_text": [
      {
        "text": {
          "content": cmt
        }
      }
    ]
  })
  res.status(200).send(response);
}

const forgotpassword = async (req, res) => {

  const { PAN } = req.body;
  if(!PAN){
    return res.status(400).json({message: "PAN Required"});
  }
  const response = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      property: "PAN Number",
      rich_text: {
        equals: PAN
      }
    }
  });
   
  if (response.results.length === 0) {
    return res.status(400).json({message:"User Not Found!"});
  }
    const email = response.results[0].properties.Email.email;
    if (!email) {
    return res.status(400).json({message:"Email Not Found"});
  }
    const token = jwt.sign({ Page_ID: response.results[0].id}, process.env.SECRET, { expiresIn: "15m" });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Your Password',
      text: `Link is valid for 15 minutes\n\nhttps://client-dashboard-suigenerisconsulting.netlify.app/createpassword?token=` + token
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).json({message: "Not Sent!"});
      } else {
        const atIndex = email.indexOf("@");
        res.status(200).json({message: `Mail sent to your mail ID: ${email.slice(0,2)}********${email.slice(indexOf-2,indexOf)}${email.slice(indexOf,email.length)}`});
      }
    });
}

const reset_password = async (req,res)=>{
  const {pass,confpass,token} = req.body;
  try{
    const values = jwt.verify(token,process.env.SECRET);
    const Page_ID = values.Page_ID;
    try{

      
      const response = await notion.pages.update({
        page_id: Page_ID,
        properties: {
          Password: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: pass,
                },
              },
            ],
          },
        },
      });
      
    }

    catch (error){
     return res.status(400).json({message: "Something went wrong!"});
    }
    return res.status(200).json({message:"Password Updated Successfull\nRedirect to login..."});
  }
  catch(error){
    return res.status(400).json({message:"Link Expired!"});
  }
}


const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,         // MUST be true on Vercel (HTTPS only)
  sameSite: 'None'      // Cross-origin cookie support
  }
  res.cookie("token", "", cookieOptions);
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logout" });
}

module.exports = { home, login, mfd, logout, comments, create_cmt, forgotpassword, reset_password};
